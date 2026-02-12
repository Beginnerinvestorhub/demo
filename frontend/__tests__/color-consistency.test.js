/**
 * Color Consistency Test Suite
 *
 * This test suite verifies that all pages follow the established color standards
 * defined in DESIGN_SYSTEM_COLORS.md
 *
 * Run with: npm test -- color-consistency.test.js
 */

const fs = require('fs');
const path = require('path');

// Color standards from DESIGN_SYSTEM_COLORS.md
const COLOR_STANDARDS = {
  // Prohibited colors (should NEVER be used)
  prohibited: {
    'text-amber-900': 'Use text-mechanica-moonlight-blue',
    'text-amber-800': 'Use text-gray-600 or text-mechanica-moonlight-blue',
    'text-blue-100': 'Use text-white',
    'bg-slate-100': 'Use bg-gray-50',
    'bg-gray-100': 'Use bg-gray-50',
    'border-amber-600/10': 'Use border-mechanica-moonlight-blue/10',
    'focus:ring-amber-600/10': 'Use focus:ring-mechanica-moonlight-blue/20',
    'focus:border-amber-600': 'Use focus:border-mechanica-moonlight-blue',
  },

  // Required colors (should be used)
  required: {
    'bg-gray-50': 'Standard page background',
    'text-mechanica-moonlight-blue': 'Headings and interactive elements',
    'text-gray-600': 'Body text',
    'text-white': 'Hero text',
    'border-mechanica-moonlight-blue/10': 'Standard borders',
    'focus:ring-mechanica-moonlight-blue/20': 'Focus rings',
  },

  // Hero section requirements
  hero: {
    'bg-gradient-to-br from-mechanica-moonlight-blue via-mechanica-moonlight-blue-light to-mechanica-moonlight-blue-dark':
      'Hero background',
    'text-white': 'Hero text',
    'text-yellow-400': 'Hero highlights',
  },
};

// Pages to test
const PAGES_TO_TEST = [
  'pages/index.tsx',
  'pages/login.tsx',
  'pages/signup.tsx',
  'pages/dashboard.tsx',
  'pages/onboarding.tsx',
  'pages/risk-assessment.tsx',
  'pages/portfolio-monitor.tsx',
  'pages/esg-screener.tsx',
  'pages/contact.tsx',
  'pages/fractional-share-calculator.tsx',
  'pages/tools.tsx',
  'pages/faq.tsx',
];

/**
 * Read file content
 */
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error(`Error reading file: ${filePath}`, error);
    return null;
  }
}

/**
 * Check for prohibited colors
 */
function checkProhibitedColors(content, filePath) {
  const violations = [];

  Object.entries(COLOR_STANDARDS.prohibited).forEach(([color, reason]) => {
    const regex = new RegExp(color.replace(/[\/]/g, '\\/'), 'g');
    const matches = content.match(regex);

    if (matches) {
      violations.push({
        color,
        count: matches.length,
        reason,
      });
    }
  });

  return violations;
}

/**
 * Check for required colors
 */
function checkRequiredColors(content, filePath) {
  const missing = [];

  Object.entries(COLOR_STANDARDS.required).forEach(([color, description]) => {
    const regex = new RegExp(color.replace(/[\/]/g, '\\/'), 'g');
    const matches = content.match(regex);

    if (!matches) {
      missing.push({
        color,
        description,
      });
    }
  });

  return missing;
}

/**
 * Check hero section colors
 */
function checkHeroColors(content, filePath) {
  const issues = [];

  // Check for hero section
  const heroSection = content.match(
    /<section[^>]*className="[^"]*bg-gradient-to-br[^"]*"/
  );
  if (heroSection) {
    // Check hero text color
    if (content.includes('text-blue-100')) {
      issues.push({
        issue: 'Hero description uses text-blue-100',
        fix: 'Use text-white instead',
      });
    }

    // Check for proper hero gradient
    if (!content.includes('from-mechanica-moonlight-blue')) {
      issues.push({
        issue: 'Hero section missing moonlight-blue gradient',
        fix: 'Use bg-gradient-to-br from-mechanica-moonlight-blue via-mechanica-moonlight-blue-light to-mechanica-moonlight-blue-dark',
      });
    }
  }

  return issues;
}

/**
 * Run color consistency tests
 */
function runColorConsistencyTests() {
  console.log('🎨 Color Consistency Test Suite\n');
  console.log('='.repeat(80));

  let totalViolations = 0;
  let totalMissing = 0;
  let totalIssues = 0;
  const pageResults = [];

  PAGES_TO_TEST.forEach(pagePath => {
    const fullPath = path.join(__dirname, '..', pagePath);
    const content = readFile(fullPath);

    if (!content) {
      console.log(`⚠️  Skipped: ${pagePath} (file not found)\n`);
      return;
    }

    console.log(`\n📄 Testing: ${pagePath}`);
    console.log('-'.repeat(80));

    const violations = checkProhibitedColors(content, pagePath);
    const missing = checkRequiredColors(content, pagePath);
    const issues = checkHeroColors(content, pagePath);

    let pageHasViolations = false;

    if (violations.length > 0) {
      pageHasViolations = true;
      console.log('\n❌ Prohibited colors found:');
      violations.forEach(v => {
        console.log(
          `   - ${v.color} (${v.count} occurrence${v.count > 1 ? 's' : ''})`
        );
        console.log(`     → ${v.reason}`);
      });
      totalViolations += violations.length;
    }

    if (missing.length > 0) {
      pageHasViolations = true;
      console.log('\n⚠️  Missing required colors:');
      missing.forEach(m => {
        console.log(`   - ${m.color}: ${m.description}`);
      });
      totalMissing += missing.length;
    }

    if (issues.length > 0) {
      pageHasViolations = true;
      console.log('\n⚠️  Hero section issues:');
      issues.forEach(i => {
        console.log(`   - ${i.issue}`);
        console.log(`     → ${i.fix}`);
      });
      totalIssues += issues.length;
    }

    if (!pageHasViolations) {
      console.log('✅ All color standards met');
    }

    pageResults.push({
      page: pagePath,
      violations: violations.length,
      missing: missing.length,
      issues: issues.length,
      passed: !pageHasViolations,
    });
  });

  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('\n📊 Test Summary\n');
  console.log(`Total pages tested: ${pageResults.length}`);
  console.log(`Pages passed: ${pageResults.filter(p => p.passed).length}`);
  console.log(`Pages failed: ${pageResults.filter(p => !p.passed).length}`);
  console.log(`Total prohibited color violations: ${totalViolations}`);
  console.log(`Total missing required colors: ${totalMissing}`);
  console.log(`Total hero section issues: ${totalIssues}`);

  // Failed pages
  const failedPages = pageResults.filter(p => !p.passed);
  if (failedPages.length > 0) {
    console.log('\n❌ Failed pages:');
    failedPages.forEach(p => {
      console.log(`   - ${p.page}`);
    });
  }

  // Exit code
  const hasFailures =
    totalViolations > 0 || totalMissing > 0 || totalIssues > 0;
  console.log(`\n${hasFailures ? '❌ Tests FAILED' : '✅ Tests PASSED'}`);

  process.exit(hasFailures ? 1 : 0);
}

// Run tests
runColorConsistencyTests();
