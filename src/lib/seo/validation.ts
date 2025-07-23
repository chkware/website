/**
 * SEO validation utilities for testing and monitoring
 */

export interface SEOValidationResult {
  isValid: boolean;
  score: number;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

export interface PageSEOData {
  title: string;
  description: string;
  h1Tags: string[];
  h2Tags: string[];
  images: { src: string; alt: string }[];
  internalLinks: { href: string; text: string }[];
  externalLinks: { href: string; text: string }[];
  structuredData: any[];
  metaTags: { [key: string]: string };
}

// Validate page SEO comprehensively
export function validatePageSEO(pageData: PageSEOData): SEOValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];
  let score = 100;

  // Title validation
  if (!pageData.title) {
    errors.push('Missing page title');
    score -= 20;
  } else if (pageData.title.length < 30 || pageData.title.length > 60) {
    warnings.push(`Title length (${pageData.title.length}) should be 30-60 characters`);
    score -= 10;
  }

  // Description validation
  if (!pageData.description) {
    errors.push('Missing meta description');
    score -= 15;
  } else if (pageData.description.length < 120 || pageData.description.length > 160) {
    warnings.push(`Description length (${pageData.description.length}) should be 120-160 characters`);
    score -= 8;
  }

  // H1 validation
  if (pageData.h1Tags.length === 0) {
    errors.push('Missing H1 tag');
    score -= 15;
  } else if (pageData.h1Tags.length > 1) {
    warnings.push('Multiple H1 tags found - should have only one');
    score -= 5;
  }

  // H2 validation
  if (pageData.h2Tags.length === 0) {
    warnings.push('No H2 tags found - consider adding section headings');
    score -= 5;
  }

  // Image alt text validation
  const imagesWithoutAlt = pageData.images.filter(img => !img.alt || img.alt.trim() === '');
  if (imagesWithoutAlt.length > 0) {
    warnings.push(`${imagesWithoutAlt.length} images missing alt text`);
    score -= imagesWithoutAlt.length * 2;
  }

  // Internal linking validation
  if (pageData.internalLinks.length < 3) {
    suggestions.push('Consider adding more internal links to improve site navigation');
    score -= 3;
  }

  // Structured data validation
  if (pageData.structuredData.length === 0) {
    warnings.push('No structured data found');
    score -= 10;
  }

  // Meta tags validation
  const requiredMetaTags = ['viewport', 'robots'];
  requiredMetaTags.forEach(tag => {
    if (!pageData.metaTags[tag]) {
      warnings.push(`Missing ${tag} meta tag`);
      score -= 5;
    }
  });

  // Open Graph validation
  const ogTags = ['og:title', 'og:description', 'og:image', 'og:url'];
  const missingOgTags = ogTags.filter(tag => !pageData.metaTags[tag]);
  if (missingOgTags.length > 0) {
    warnings.push(`Missing Open Graph tags: ${missingOgTags.join(', ')}`);
    score -= missingOgTags.length * 3;
  }

  // Twitter Card validation
  if (!pageData.metaTags['twitter:card']) {
    warnings.push('Missing Twitter Card meta tag');
    score -= 5;
  }

  // Ensure score doesn't go below 0
  score = Math.max(0, score);

  return {
    isValid: errors.length === 0,
    score,
    errors,
    warnings,
    suggestions
  };
}

// Extract SEO data from DOM (for client-side validation)
export function extractPageSEOData(): PageSEOData {
  if (typeof document === 'undefined') {
    throw new Error('extractPageSEOData can only be called in browser environment');
  }

  const title = document.title;
  const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  
  const h1Tags = Array.from(document.querySelectorAll('h1')).map(el => el.textContent || '');
  const h2Tags = Array.from(document.querySelectorAll('h2')).map(el => el.textContent || '');
  
  const images = Array.from(document.querySelectorAll('img')).map(img => ({
    src: img.src,
    alt: img.alt
  }));
  
  const internalLinks = Array.from(document.querySelectorAll('a[href^="/"], a[href^="#"]')).map(link => ({
    href: (link as HTMLAnchorElement).href,
    text: link.textContent || ''
  }));
  
  const externalLinks = Array.from(document.querySelectorAll('a[href^="http"]:not([href*="chkware.com"])')).map(link => ({
    href: (link as HTMLAnchorElement).href,
    text: link.textContent || ''
  }));
  
  const structuredData = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(script => {
    try {
      return JSON.parse(script.textContent || '');
    } catch {
      return null;
    }
  }).filter(Boolean);
  
  const metaTags: { [key: string]: string } = {};
  document.querySelectorAll('meta').forEach(meta => {
    const name = meta.getAttribute('name') || meta.getAttribute('property');
    const content = meta.getAttribute('content');
    if (name && content) {
      metaTags[name] = content;
    }
  });

  return {
    title,
    description,
    h1Tags,
    h2Tags,
    images,
    internalLinks,
    externalLinks,
    structuredData,
    metaTags
  };
}

// Validate structured data against schema.org
export function validateStructuredData(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data['@context']) {
    errors.push('Missing @context property');
  } else if (data['@context'] !== 'https://schema.org') {
    errors.push('Invalid @context - should be https://schema.org');
  }
  
  if (!data['@type']) {
    errors.push('Missing @type property');
  }
  
  // Validate based on type
  if (data['@type'] === 'SoftwareApplication') {
    const requiredProps = ['name', 'description', 'applicationCategory'];
    requiredProps.forEach(prop => {
      if (!data[prop]) {
        errors.push(`Missing required property: ${prop}`);
      }
    });
  }
  
  if (data['@type'] === 'Organization') {
    const requiredProps = ['name', 'url'];
    requiredProps.forEach(prop => {
      if (!data[prop]) {
        errors.push(`Missing required property: ${prop}`);
      }
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Generate SEO report
export function generateSEOReport(pageData: PageSEOData): string {
  const validation = validatePageSEO(pageData);
  
  let report = `SEO Analysis Report\n`;
  report += `==================\n\n`;
  report += `Overall Score: ${validation.score}/100\n`;
  report += `Status: ${validation.isValid ? 'PASS' : 'NEEDS ATTENTION'}\n\n`;
  
  if (validation.errors.length > 0) {
    report += `ERRORS (${validation.errors.length}):\n`;
    validation.errors.forEach((error, index) => {
      report += `${index + 1}. ${error}\n`;
    });
    report += '\n';
  }
  
  if (validation.warnings.length > 0) {
    report += `WARNINGS (${validation.warnings.length}):\n`;
    validation.warnings.forEach((warning, index) => {
      report += `${index + 1}. ${warning}\n`;
    });
    report += '\n';
  }
  
  if (validation.suggestions.length > 0) {
    report += `SUGGESTIONS (${validation.suggestions.length}):\n`;
    validation.suggestions.forEach((suggestion, index) => {
      report += `${index + 1}. ${suggestion}\n`;
    });
    report += '\n';
  }
  
  report += `Technical Details:\n`;
  report += `- Title: "${pageData.title}" (${pageData.title.length} chars)\n`;
  report += `- Description: "${pageData.description}" (${pageData.description.length} chars)\n`;
  report += `- H1 tags: ${pageData.h1Tags.length}\n`;
  report += `- H2 tags: ${pageData.h2Tags.length}\n`;
  report += `- Images: ${pageData.images.length} (${pageData.images.filter(img => img.alt).length} with alt text)\n`;
  report += `- Internal links: ${pageData.internalLinks.length}\n`;
  report += `- External links: ${pageData.externalLinks.length}\n`;
  report += `- Structured data: ${pageData.structuredData.length} items\n`;
  
  return report;
}