#!/usr/bin/env node

const { execSync } = require('child_process');
const { existsSync } = require('fs');
const path = require('path');

console.log('🔍 Running comprehensive validation...\n');

const checks = [
  {
    name: 'Type Check',
    command: 'npm run type-check',
    critical: true,
  },
  {
    name: 'Lint Check',
    command: 'npm run lint',
    critical: true,
  },
  {
    name: 'Format Check',
    command: 'npx prettier --check "**/*.{ts,tsx,js,jsx,json,md}"',
    critical: false,
  },
  {
    name: 'Unit Tests',
    command: 'npm test',
    critical: false,
  },
];

let failedChecks = 0;

for (const check of checks) {
  try {
    console.log(`✅ Running ${check.name}...`);
    execSync(check.command, { stdio: 'inherit' });
    console.log(`✅ ${check.name} passed\n`);
  } catch (error) {
    failedChecks++;
    console.log(`❌ ${check.name} failed\n`);
    if (check.critical) {
      console.log('🚨 Critical check failed. Stopping validation.');
      process.exit(1);
    }
  }
}

// Check for required files
const requiredFiles = [
  '.env.example',
  'package.json',
  'next.config.js',
  'tsconfig.json',
  'tailwind.config.js',
];

console.log('📁 Checking required files...');
for (const file of requiredFiles) {
  if (existsSync(path.join(__dirname, '..', file))) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} missing`);
    failedChecks++;
  }
}

if (failedChecks === 0) {
  console.log('🎉 All validations passed!');
  process.exit(0);
} else {
  console.log(`❌ ${failedChecks} checks failed`);
  process.exit(1);
}
