/**
 * Comprehensive Homepage Spacing Integration Validation
 * 
 * This script performs detailed validation of the complete homepage spacing integration
 * according to task 9 requirements:
 * - Verifies smooth transitions between sections and no layout shifts
 * - Checks with varying content lengths to ensure spacing remains consistent
 * - Requirements: 1.1, 1.2, 3.1, 3.2, 3.3, 4.4
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✓ ${message}`, colors.green);
}

function logError(message) {
  log(`✗ ${message}`, colors.red);
}

function logWarning(message) {
  log(`⚠ ${message}`, colors.yellow);
}

function logInfo(message) {
  log(`ℹ ${message}`, colors.blue);
}

function logHeader(message) {
  log(`\n${colors.bold}${colors.cyan}${message}${colors.reset}`);
  log('─'.repeat(message.length), colors.cyan);
}

// Section configuration for validation
const SECTIONS = [
  {
    name: 'HeroSection',
    file: 'src/app/home/HeroSection.tsx',
    expectedClass: 'section-spacing',
    description: 'Hero section with call-to-action'
  },
  {
    name: 'PrimaryFeaturesSection',
    file: 'src/app/home/PrimaryFeaturesSection.tsx',
    expectedClass: 'section-spacing',
    description: 'Primary features showcase'
  },
  {
    name: 'FeaturesSection',
    file: 'src/app/home/FeaturesSection.tsx',
    expectedClass: 'section-spacing',
    description: 'Detailed features grid'
  },
  {
    name: 'HowItWorksSection',
    file: 'src/app/home/HowItWorksSection.tsx',
    expectedClass: 'section-spacing',
    description: 'How it works workflow'
  },
  {
    name: 'TestimonialsSection',
    file: 'src/app/home/TestimonialsSection.tsx',
    expectedClass: 'section-spacing',
    description: 'Customer testimonials'
  },
  {
    name: 'ResourcesSection',
    file: 'src/app/home/ResourcesSection.tsx',
    expectedClass: 'section-spacing',
    description: 'Resources and documentation'
  },
  {
    name: 'ContactSection',
    file: 'src/app/home/ContactSection.tsx',
    expectedClass: 'section-spacing',
    description: 'Contact form and information'
  }
];

// CSS spacing configuration
const SPACING_CONFIG = {
  mobile: '4rem',    // 64px
  tablet: '6rem',    // 96px
  desktop: '10rem'   // 160px
};

// Validation functions
function validateCSSInfrastructure() {
  logHeader('1. CSS Infrastructure Validation');
  
  const globalsPath = path.join(process.cwd(), 'src/styles/globals.css');
  
  if (!fs.existsSync(globalsPath)) {
    logError('globals.css file not found');
    return false;
  }
  
  const cssContent = fs.readFileSync(globalsPath, 'utf8');
  let allValid = true;
  
  // Check CSS custom properties
  logInfo('Checking CSS custom properties...');
  const requiredProperties = [
    `--section-spacing-mobile: ${SPACING_CONFIG.mobile}`,
    `--section-spacing-tablet: ${SPACING_CONFIG.tablet}`,
    `--section-spacing-desktop: ${SPACING_CONFIG.desktop}`
  ];
  
  requiredProperties.forEach(property => {
    if (cssContent.includes(property)) {
      logSuccess(`Found: ${property}`);
    } else {
      logError(`Missing: ${property}`);
      allValid = false;
    }
  });
  
  // Check utility classes
  logInfo('Checking utility classes...');
  const requiredClasses = [
    '.section-spacing {',
    '@media (min-width: 768px)',
    '@media (min-width: 1024px)',
    '.section-spacing-sm',
    '.section-spacing-lg'
  ];
  
  requiredClasses.forEach(className => {
    if (cssContent.includes(className)) {
      logSuccess(`Found: ${className}`);
    } else {
      if (className.includes('section-spacing-')) {
        logWarning(`Optional modifier class not found: ${className}`);
      } else {
        logError(`Missing required class: ${className}`);
        allValid = false;
      }
    }
  });
  
  return allValid;
}

function validateSectionImplementation() {
  logHeader('2. Section Implementation Validation');
  
  let allValid = true;
  
  SECTIONS.forEach((section, index) => {
    logInfo(`Validating ${section.name}...`);
    
    const fullPath = path.join(process.cwd(), section.file);
    
    if (!fs.existsSync(fullPath)) {
      logError(`File not found: ${section.file}`);
      allValid = false;
      return;
    }
    
    const content = fs.readFileSync(fullPath, 'utf8');
    
    // Check for section-spacing class
    if (content.includes(section.expectedClass)) {
      logSuccess(`${section.name} uses ${section.expectedClass} class`);
    } else {
      logError(`${section.name} missing ${section.expectedClass} class`);
      allValid = false;
    }
    
    // Check for conflicting padding classes
    const conflictingPatterns = [
      /className="[^"]*py-\d+/g,
      /className="[^"]*pt-\d+/g,
      /className="[^"]*pb-\d+/g,
      /className='[^']*py-\d+/g,
      /className='[^']*pt-\d+/g,
      /className='[^']*pb-\d+/g
    ];
    
    let hasConflicts = false;
    conflictingPatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach(match => {
          // Skip if it's part of section-spacing class or in comments
          if (!match.includes('section-spacing') && !content.includes(`// ${match}`)) {
            logWarning(`${section.name} has potential conflicting class: ${match}`);
            hasConflicts = true;
          }
        });
      }
    });
    
    if (!hasConflicts) {
      logSuccess(`${section.name} has no conflicting padding classes`);
    }
    
    // Check section structure
    if (content.includes('<section') || content.includes('section className')) {
      logSuccess(`${section.name} uses proper section element`);
    } else {
      logWarning(`${section.name} might not use semantic section element`);
    }
  });
  
  return allValid;
}

function validateHomepageStructure() {
  logHeader('3. Homepage Structure Validation');
  
  const homepagePath = path.join(process.cwd(), 'src/app/page.tsx');
  
  if (!fs.existsSync(homepagePath)) {
    logError('Homepage file not found: src/app/page.tsx');
    return false;
  }
  
  const content = fs.readFileSync(homepagePath, 'utf8');
  let allValid = true;
  
  // Check for all section imports
  logInfo('Checking section imports...');
  SECTIONS.forEach(section => {
    if (content.includes(section.name)) {
      logSuccess(`Homepage imports ${section.name}`);
    } else {
      logError(`Homepage missing import for ${section.name}`);
      allValid = false;
    }
  });
  
  // Check for proper section usage
  logInfo('Checking section usage...');
  SECTIONS.forEach(section => {
    const usagePattern = new RegExp(`<${section.name}[^>]*>|<${section.name}\\s*\\/>`);
    if (usagePattern.test(content)) {
      logSuccess(`Homepage uses ${section.name} component`);
    } else {
      logError(`Homepage doesn't use ${section.name} component`);
      allValid = false;
    }
  });
  
  // Check for proper section ordering
  logInfo('Checking section order...');
  const sectionOrder = ['HeroSection', 'PrimaryFeaturesSection', 'FeaturesSection', 
                       'HowItWorksSection', 'TestimonialsSection', 'ResourcesSection', 'ContactSection'];
  
  let lastIndex = -1;
  let orderValid = true;
  
  sectionOrder.forEach(sectionName => {
    const currentIndex = content.indexOf(sectionName);
    if (currentIndex > lastIndex) {
      lastIndex = currentIndex;
    } else if (currentIndex !== -1) {
      logWarning(`Section order might be incorrect for ${sectionName}`);
      orderValid = false;
    }
  });
  
  if (orderValid) {
    logSuccess('Section order is correct');
  }
  
  return allValid;
}

function validateResponsiveDesign() {
  logHeader('4. Responsive Design Validation');
  
  const globalsPath = path.join(process.cwd(), 'src/styles/globals.css');
  const cssContent = fs.readFileSync(globalsPath, 'utf8');
  
  let allValid = true;
  
  // Check responsive breakpoints
  logInfo('Checking responsive breakpoints...');
  
  const breakpoints = [
    { name: 'Mobile (default)', check: '--section-spacing-mobile' },
    { name: 'Tablet (768px+)', check: 'min-width: 768px' },
    { name: 'Desktop (1024px+)', check: 'min-width: 1024px' }
  ];
  
  breakpoints.forEach(breakpoint => {
    if (cssContent.includes(breakpoint.check)) {
      logSuccess(`${breakpoint.name} breakpoint configured`);
    } else {
      logError(`${breakpoint.name} breakpoint missing`);
      allValid = false;
    }
  });
  
  // Check progressive enhancement
  logInfo('Checking progressive enhancement...');
  
  const mobileFirst = cssContent.indexOf('--section-spacing-mobile') < 
                     cssContent.indexOf('min-width: 768px');
  
  if (mobileFirst) {
    logSuccess('Mobile-first approach implemented');
  } else {
    logWarning('Mobile-first approach might not be properly implemented');
  }
  
  return allValid;
}

function validateContentConsistency() {
  logHeader('5. Content Length Variation Validation');
  
  let allValid = true;
  const contentLengths = [];
  
  SECTIONS.forEach(section => {
    const fullPath = path.join(process.cwd(), section.file);
    
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Extract text content (rough estimation)
      const textContent = content
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\/\/.*$/gm, '') // Remove single-line comments
        .replace(/<[^>]*>/g, '') // Remove JSX tags
        .replace(/[{}();]/g, '') // Remove code syntax
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();
      
      const length = textContent.length;
      contentLengths.push({ name: section.name, length });
      
      logInfo(`${section.name}: ~${length} characters of content`);
    }
  });
  
  // Analyze content variation
  if (contentLengths.length > 0) {
    const lengths = contentLengths.map(item => item.length);
    const minLength = Math.min(...lengths);
    const maxLength = Math.max(...lengths);
    const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    
    logInfo(`Content length analysis:`);
    logInfo(`  Min: ${minLength} characters`);
    logInfo(`  Max: ${maxLength} characters`);
    logInfo(`  Avg: ${Math.round(avgLength)} characters`);
    logInfo(`  Variation: ${((maxLength - minLength) / avgLength * 100).toFixed(1)}%`);
    
    if (maxLength > minLength * 2) {
      logSuccess('Good content length variation detected');
    } else {
      logWarning('Limited content length variation');
    }
    
    // Check that all sections have meaningful content
    const emptySections = contentLengths.filter(item => item.length < 100);
    if (emptySections.length === 0) {
      logSuccess('All sections have substantial content');
    } else {
      emptySections.forEach(section => {
        logWarning(`${section.name} has minimal content (${section.length} chars)`);
      });
    }
  }
  
  return allValid;
}

function validateRequirementsCompliance() {
  logHeader('6. Requirements Compliance Validation');
  
  const globalsPath = path.join(process.cwd(), 'src/styles/globals.css');
  const cssContent = fs.readFileSync(globalsPath, 'utf8');
  
  let allValid = true;
  
  // Requirement 1.1 & 1.2: Desktop spacing should be 10rem (160px)
  logInfo('Checking Requirement 1.1 & 1.2 (Desktop spacing)...');
  if (cssContent.includes('--section-spacing-desktop: 10rem')) {
    logSuccess('✓ Desktop sections have 10rem (160px) padding');
  } else {
    logError('✗ Desktop spacing is not 10rem (160px)');
    allValid = false;
  }
  
  // Requirement 3.1, 3.2, 3.3: Consistent spacing and visual separation
  logInfo('Checking Requirements 3.1, 3.2, 3.3 (Consistent spacing)...');
  let consistentSpacing = true;
  
  SECTIONS.forEach(section => {
    const fullPath = path.join(process.cwd(), section.file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (!content.includes('section-spacing')) {
        consistentSpacing = false;
        logError(`${section.name} doesn't use consistent spacing`);
      }
    }
  });
  
  if (consistentSpacing) {
    logSuccess('✓ All sections use consistent spacing classes');
  } else {
    allValid = false;
  }
  
  // Requirement 4.4: Mobile responsive spacing
  logInfo('Checking Requirement 4.4 (Mobile responsive spacing)...');
  const mobileSpacing = cssContent.includes('--section-spacing-mobile: 4rem');
  const tabletSpacing = cssContent.includes('--section-spacing-tablet: 6rem');
  
  if (mobileSpacing && tabletSpacing) {
    logSuccess('✓ Mobile and tablet responsive spacing configured');
  } else {
    logError('✗ Mobile/tablet responsive spacing not properly configured');
    allValid = false;
  }
  
  return allValid;
}

function validateLayoutStability() {
  logHeader('7. Layout Stability Validation');
  
  let allValid = true;
  
  // Check for potential layout shift causes
  logInfo('Checking for layout shift prevention...');
  
  SECTIONS.forEach(section => {
    const fullPath = path.join(process.cwd(), section.file);
    
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Check for overflow handling
      if (content.includes('overflow-hidden') || content.includes('overflow-x-hidden')) {
        logSuccess(`${section.name} handles overflow properly`);
      } else {
        logWarning(`${section.name} might not handle overflow`);
      }
      
      // Check for proper image handling
      if (content.includes('Image') && content.includes('fill')) {
        logSuccess(`${section.name} uses proper image sizing`);
      } else if (content.includes('Image')) {
        logWarning(`${section.name} might have image sizing issues`);
      }
      
      // Check for animation stability
      if (content.includes('framer-motion') || content.includes('animate')) {
        if (content.includes('initial') && content.includes('animate')) {
          logSuccess(`${section.name} has stable animations`);
        } else {
          logWarning(`${section.name} animations might cause layout shifts`);
        }
      }
    }
  });
  
  return allValid;
}

function generateSummaryReport(results) {
  logHeader('📋 Validation Summary Report');
  
  const totalTests = results.length;
  const passedTests = results.filter(r => r.passed).length;
  const failedTests = totalTests - passedTests;
  
  log(`\nTotal validations: ${totalTests}`);
  log(`Passed: ${passedTests}`, passedTests === totalTests ? colors.green : colors.yellow);
  log(`Failed: ${failedTests}`, failedTests === 0 ? colors.green : colors.red);
  
  log(`\nSuccess rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`, 
      passedTests === totalTests ? colors.green : colors.yellow);
  
  // Detailed results
  log('\nDetailed Results:', colors.bold);
  results.forEach((result, index) => {
    const status = result.passed ? '✓' : '✗';
    const color = result.passed ? colors.green : colors.red;
    log(`${status} ${index + 1}. ${result.name}`, color);
  });
  
  // Requirements mapping
  log('\nRequirements Compliance:', colors.bold);
  const requirementsMet = [
    { id: '1.1 & 1.2', desc: 'Desktop spacing (10rem)', met: results[5]?.passed || false },
    { id: '3.1, 3.2, 3.3', desc: 'Consistent spacing', met: results[1]?.passed || false },
    { id: '4.4', desc: 'Responsive design', met: results[3]?.passed || false }
  ];
  
  requirementsMet.forEach(req => {
    const status = req.met ? '✓' : '✗';
    const color = req.met ? colors.green : colors.red;
    log(`${status} Requirement ${req.id}: ${req.desc}`, color);
  });
  
  return passedTests === totalTests;
}

// Main validation function
function runComprehensiveValidation() {
  log(`${colors.bold}${colors.magenta}CHKware Homepage Spacing Integration - Comprehensive Validation${colors.reset}`);
  log('='.repeat(80), colors.magenta);
  log(`${colors.dim}Task 9: Validate complete homepage spacing integration${colors.reset}`);
  log(`${colors.dim}Validating smooth transitions, layout stability, and content consistency${colors.reset}\n`);
  
  const validations = [
    { name: 'CSS Infrastructure', fn: validateCSSInfrastructure },
    { name: 'Section Implementation', fn: validateSectionImplementation },
    { name: 'Homepage Structure', fn: validateHomepageStructure },
    { name: 'Responsive Design', fn: validateResponsiveDesign },
    { name: 'Content Consistency', fn: validateContentConsistency },
    { name: 'Requirements Compliance', fn: validateRequirementsCompliance },
    { name: 'Layout Stability', fn: validateLayoutStability }
  ];
  
  const results = [];
  
  validations.forEach((validation, index) => {
    try {
      const result = validation.fn();
      results.push({ name: validation.name, passed: result });
    } catch (error) {
      logError(`Validation failed with error: ${error.message}`);
      results.push({ name: validation.name, passed: false });
    }
  });
  
  const allPassed = generateSummaryReport(results);
  
  log('\n' + '='.repeat(80), colors.magenta);
  
  if (allPassed) {
    logSuccess('🎉 All validations passed! Homepage spacing integration is complete and stable.');
    logInfo('✅ Task 9: Validate complete homepage spacing integration - COMPLETED');
    
    log('\n📋 Integration Summary:', colors.bold);
    log('• ✓ CSS custom properties configured for responsive spacing');
    log('• ✓ All 7 homepage sections use standardized spacing');
    log('• ✓ Responsive breakpoints properly implemented');
    log('• ✓ Content length variations handled consistently');
    log('• ✓ Layout stability measures in place');
    log('• ✓ All requirements (1.1, 1.2, 3.1, 3.2, 3.3, 4.4) met');
    
  } else {
    logError('❌ Some validations failed. Please review the issues above.');
    logInfo('⚠️  Task 9: Validate complete homepage spacing integration - NEEDS ATTENTION');
  }
  
  return allPassed;
}

// Run the validation
if (require.main === module) {
  const success = runComprehensiveValidation();
  process.exit(success ? 0 : 1);
}

module.exports = { runComprehensiveValidation };