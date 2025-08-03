import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
  ogImage?: string;
  noindex?: boolean;
  nofollow?: boolean;
  structuredData?: any;
}

export interface StructuredDataSoftware {
  "@context": "https://schema.org";
  "@type": "SoftwareApplication";
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    "@type": "Offer";
    price: string;
    priceCurrency: string;
  };
  author: {
    "@type": "Organization";
    name: string;
    url: string;
  };
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: string;
    reviewCount: string;
  };
}

export interface StructuredDataOrganization {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  contactPoint: {
    "@type": "ContactPoint";
    telephone: string;
    contactType: string;
    email: string;
  };
  sameAs: string[];
}

// Default SEO configuration
export const defaultSEO: SEOConfig = {
  title: "CHKware - YAML Validation & Configuration Management Tools for DevOps",
  description: "Streamline your DevOps workflow with CHKware's powerful YAML validation and configuration management tools. Integrate seamlessly with CI/CD pipelines for error-free deployments.",
  keywords: [
    "YAML validation",
    "configuration management",
    "DevOps tools",
    "YAML linting",
    "CI/CD integration",
    "infrastructure as code",
    "configuration validation",
    "DevOps automation",
    "YAML parser",
    "code quality tools"
  ],
  canonicalUrl: "https://chkware.com",
  ogImage: "https://chkware.com/images/og-image.png"
};

// Generate structured data for software application
export function generateSoftwareStructuredData(): StructuredDataSoftware {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CHKware",
    description: "Professional YAML validation and configuration management tools designed for DevOps teams and developers",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cross-platform",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    author: {
      "@type": "Organization",
      name: "CHKware",
      url: "https://chkware.com"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150"
    }
  };
}

// Generate structured data for organization
export function generateOrganizationStructuredData(): StructuredDataOrganization {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CHKware",
    url: "https://chkware.com",
    logo: "https://chkware.com/images/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+880-1878-239734",
      contactType: "customer service",
      email: "info@chkware.com"
    },
    sameAs: [
      "https://twitter.com/chkware",
      "https://github.com/chkware",
      "https://linkedin.com/company/chkware"
    ]
  };
}

// Generate Next.js metadata object
export function generateMetadata(config: Partial<SEOConfig> = {}): Metadata {
  const seoConfig = { ...defaultSEO, ...config };
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chkware.com';
  
  return {
    metadataBase: new URL(baseUrl),
    title: seoConfig.title,
    description: seoConfig.description,
    keywords: seoConfig.keywords.join(', '),
    authors: [{ name: 'CHKware Team' }],
    creator: 'CHKware',
    publisher: 'CHKware',
    robots: {
      index: !seoConfig.noindex,
      follow: !seoConfig.nofollow,
      googleBot: {
        index: !seoConfig.noindex,
        follow: !seoConfig.nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: seoConfig.canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: seoConfig.canonicalUrl,
      title: seoConfig.title,
      description: seoConfig.description,
      siteName: 'CHKware',
      images: [
        {
          url: seoConfig.ogImage || 'https://chkware.com/images/og-image.png',
          width: 1200,
          height: 630,
          alt: 'CHKware - YAML Validation & Configuration Management Tools',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoConfig.title,
      description: seoConfig.description,
      site: '@chkware',
      creator: '@chkware',
      images: [seoConfig.ogImage || 'https://chkware.com/images/og-image.png'],
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
    },
    category: 'technology',
  };
}

// Generate JSON-LD structured data script
export function generateStructuredDataScript(data: any): string {
  return `<script type="application/ld+json">${JSON.stringify(data, null, 2)}</script>`;
}

// Validate SEO configuration
export function validateSEOConfig(config: SEOConfig): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Title validation
  if (!config.title || config.title.length < 30 || config.title.length > 60) {
    errors.push('Title should be between 30-60 characters');
  }
  
  // Description validation
  if (!config.description || config.description.length < 120 || config.description.length > 160) {
    errors.push('Description should be between 120-160 characters');
  }
  
  // Keywords validation
  if (!config.keywords || config.keywords.length < 5) {
    errors.push('At least 5 keywords are recommended');
  }
  
  // URL validation
  if (config.canonicalUrl && !config.canonicalUrl.startsWith('https://')) {
    errors.push('Canonical URL should use HTTPS');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Extract keywords from content
export function extractKeywords(content: string, targetKeywords: string[]): { keyword: string; count: number; density: number }[] {
  const words = content.toLowerCase().split(/\s+/);
  const totalWords = words.length;
  
  return targetKeywords.map(keyword => {
    const keywordLower = keyword.toLowerCase();
    const count = words.filter(word => word.includes(keywordLower)).length;
    const density = (count / totalWords) * 100;
    
    return {
      keyword,
      count,
      density: Math.round(density * 100) / 100
    };
  });
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(breadcrumbs: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}