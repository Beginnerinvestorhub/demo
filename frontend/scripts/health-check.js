#!/usr/bin/env node

const { execSync } = require('child_process');
const { existsSync, readFileSync } = require('fs');
const path = require('path');

console.log('🏥 Running application health check...\n');

const checks = [];

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
checks.push({
  name: 'Node.js Version',
  status: majorVersion >= 20 ? 'healthy' : 'unhealthy',
  message: `Current: ${nodeVersion}, Required: >=20.0.0`,
});

// Check package.json dependencies
try {
  const packagePath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
  const depsCount = Object.keys(packageJson.dependencies || {}).length;
  const devDepsCount = Object.keys(packageJson.devDependencies || {}).length;

  checks.push({
    name: 'Dependencies',
    status: 'healthy',
    message: `${depsCount} dependencies, ${devDepsCount} dev dependencies`,
  });
} catch (error) {
  checks.push({
    name: 'Dependencies',
    status: 'unhealthy',
    message: 'Failed to read package.json',
  });
}

// Check environment files
const envFiles = ['.env.example', '.env.local'];
for (const envFile of envFiles) {
  const exists = existsSync(path.join(__dirname, '..', envFile));
  checks.push({
    name: `Environment File: ${envFile}`,
    status: exists ? 'healthy' : 'unhealthy',
    message: exists ? 'File exists' : 'File missing',
  });
}

// Check configuration files
const configFiles = ['next.config.js', 'tsconfig.json', 'tailwind.config.js'];
for (const configFile of configFiles) {
  const exists = existsSync(path.join(__dirname, '..', configFile));
  checks.push({
    name: `Config: ${configFile}`,
    status: exists ? 'healthy' : 'unhealthy',
    message: exists ? 'File exists' : 'File missing',
  });
}

// Check if node_modules exists
const nodeModulesExists = existsSync(
  path.join(__dirname, '..', 'node_modules')
);
checks.push({
  name: 'Node Modules',
  status: nodeModulesExists ? 'healthy' : 'unhealthy',
  message: nodeModulesExists ? 'Installed' : 'Not installed - run npm install',
});

// Check build directory
const nextDirExists = existsSync(path.join(__dirname, '..', '.next'));
checks.push({
  name: 'Next.js Build',
  status: nextDirExists ? 'healthy' : 'unhealthy',
  message: nextDirExists ? 'Build exists' : 'No build - run npm run build',
});

// Display results
console.log('Health Check Results:');
console.log('====================');

let healthyCount = 0;
let unhealthyCount = 0;

for (const check of checks) {
  const icon = check.status === 'healthy' ? '✅' : '❌';
  console.log(`${icon} ${check.name}: ${check.message}`);

  if (check.status === 'healthy') {
    healthyCount++;
  } else {
    unhealthyCount++;
  }
}

console.log('\n====================');
console.log(`Summary: ${healthyCount} healthy, ${unhealthyCount} unhealthy`);

if (unhealthyCount === 0) {
  console.log('🎉 Application is healthy!');
  process.exit(0);
} else {
  console.log('⚠️  Some health checks failed. Review the issues above.');
  process.exit(1);
}
