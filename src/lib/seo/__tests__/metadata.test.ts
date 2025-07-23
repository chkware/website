import {
  generateMetadata,
  validateSEOConfig,
  extractKeywords,
  generateSoftwareStructuredData,
  generateOrganizationStructuredData,
  defaultSEO
} from '../metadata';

describe('SEO Metadata', () => {
  describe('generateMetadata', () => {
    it('should generate default metadata', () => {
      const metadata = generateMetadata();
      
      expect(metadata.title).toBe(defaultSEO.title);
      expect(metadata.description).toBe(defaultSEO.description);
      expect(metadata.keywords).toContain('YAML validation');
      expect(metadata.openGraph?.title).toBe(defaultSEO.title);
      expect(metadata.twitter?.card).toBe('summary_large_image');
    });

    it('should override default metadata with custom config', () => {
      const customConfig = {
        title: 'Custom Title',
        description: 'Custom description for testing purposes',
        keywords: ['custom', 'keywords']
      };
      
      const metadata = generateMetadata(customConfig);
      
      expect(metadata.title).toBe('Custom Title');
      expect(metadata.description).toBe('Custom description for testing purposes');
      expect(metadata.keywords).toBe('custom, keywords');
    });

    it('should include proper robots configuration', () => {
      const metadata = generateMetadata();
      
      expect(metadata.robots).toEqual({
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      });
    });
  });

  describe('validateSEOConfig', () => {
    it('should validate correct SEO config', () => {
      const validConfig = {
        title: 'Valid Title Between 30 and 60 Characters Long',
        description: 'This is a valid description that is between 120 and 160 characters long, providing enough detail for search engines.',
        keywords: ['keyword1', 'keyword2', 'keyword3', 'keyword4', 'keyword5'],
        canonicalUrl: 'https://example.com'
      };
      
      const result = validateSEOConfig(validConfig);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect title length issues', () => {
      const invalidConfig = {
        title: 'Short',
        description: 'This is a valid description that is between 120 and 160 characters long, providing enough detail for search engines.',
        keywords: ['keyword1', 'keyword2', 'keyword3', 'keyword4', 'keyword5'],
        canonicalUrl: 'https://example.com'
      };
      
      const result = validateSEOConfig(invalidConfig);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title should be between 30-60 characters');
    });

    it('should detect description length issues', () => {
      const invalidConfig = {
        title: 'Valid Title Between 30 and 60 Characters Long',
        description: 'Too short',
        keywords: ['keyword1', 'keyword2', 'keyword3', 'keyword4', 'keyword5'],
        canonicalUrl: 'https://example.com'
      };
      
      const result = validateSEOConfig(invalidConfig);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Description should be between 120-160 characters');
    });

    it('should detect insufficient keywords', () => {
      const invalidConfig = {
        title: 'Valid Title Between 30 and 60 Characters Long',
        description: 'This is a valid description that is between 120 and 160 characters long, providing enough detail for search engines.',
        keywords: ['keyword1', 'keyword2'],
        canonicalUrl: 'https://example.com'
      };
      
      const result = validateSEOConfig(invalidConfig);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('At least 5 keywords are recommended');
    });

    it('should detect non-HTTPS canonical URL', () => {
      const invalidConfig = {
        title: 'Valid Title Between 30 and 60 Characters Long',
        description: 'This is a valid description that is between 120 and 160 characters long, providing enough detail for search engines.',
        keywords: ['keyword1', 'keyword2', 'keyword3', 'keyword4', 'keyword5'],
        canonicalUrl: 'http://example.com'
      };
      
      const result = validateSEOConfig(invalidConfig);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Canonical URL should use HTTPS');
    });
  });

  describe('extractKeywords', () => {
    it('should extract and count keywords from content', () => {
      const content = 'YAML validation is important for configuration management. YAML files need proper validation.';
      const targetKeywords = ['YAML validation', 'configuration management', 'YAML files'];
      
      const result = extractKeywords(content, targetKeywords);
      
      expect(result).toHaveLength(3);
      expect(result[0].keyword).toBe('YAML validation');
      expect(result[0].count).toBe(1);
      expect(result[1].keyword).toBe('configuration management');
      expect(result[1].count).toBe(1);
    });

    it('should calculate keyword density correctly', () => {
      const content = 'test test test test test'; // 5 words
      const targetKeywords = ['test'];
      
      const result = extractKeywords(content, targetKeywords);
      
      expect(result[0].density).toBe(100); // 5/5 * 100 = 100%
    });
  });

  describe('generateSoftwareStructuredData', () => {
    it('should generate valid software application schema', () => {
      const structuredData = generateSoftwareStructuredData();
      
      expect(structuredData['@context']).toBe('https://schema.org');
      expect(structuredData['@type']).toBe('SoftwareApplication');
      expect(structuredData.name).toBe('CHKware');
      expect(structuredData.applicationCategory).toBe('DeveloperApplication');
      expect(structuredData.offers.price).toBe('0');
      expect(structuredData.author.name).toBe('CHKware');
    });
  });

  describe('generateOrganizationStructuredData', () => {
    it('should generate valid organization schema', () => {
      const structuredData = generateOrganizationStructuredData();
      
      expect(structuredData['@context']).toBe('https://schema.org');
      expect(structuredData['@type']).toBe('Organization');
      expect(structuredData.name).toBe('CHKware');
      expect(structuredData.url).toBe('https://chkware.com');
      expect(structuredData.contactPoint.telephone).toBe('+880-1878-239734');
      expect(structuredData.sameAs).toContain('https://twitter.com/chkware');
    });
  });
});