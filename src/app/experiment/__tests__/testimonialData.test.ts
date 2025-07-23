import { validateTestimonialData, sampleTestimonials, fallbackTestimonials } from '../testimonialData';
import { TestimonialData } from '../FocusedTestimonialSlider';

describe('testimonialData', () => {
  describe('validateTestimonialData', () => {
    it('returns valid testimonials unchanged', () => {
      const result = validateTestimonialData(sampleTestimonials);
      expect(result).toEqual(sampleTestimonials);
      expect(result).toHaveLength(sampleTestimonials.length);
    });

    it('filters out testimonials with missing required fields', () => {
      const invalidTestimonials: TestimonialData[] = [
        {
          id: '',
          quote: 'Valid quote',
          author: {
            name: 'John Doe',
            title: 'Developer',
            company: 'Tech Corp',
            avatar: '/avatar.jpg',
            companyLogo: '/logo.svg'
          }
        },
        {
          id: '2',
          quote: '',
          author: {
            name: 'Jane Smith',
            title: 'Manager',
            company: 'Another Corp',
            avatar: '/avatar2.jpg',
            companyLogo: '/logo2.svg'
          }
        },
        {
          id: '3',
          quote: 'Another valid quote',
          author: {
            name: '',
            title: 'Developer',
            company: 'Tech Corp',
            avatar: '/avatar3.jpg',
            companyLogo: '/logo3.svg'
          }
        }
      ];

      const result = validateTestimonialData(invalidTestimonials);
      expect(result).toHaveLength(0); // All should be filtered out
    });

    it('filters out testimonials with quotes that are too short', () => {
      const shortQuoteTestimonials: TestimonialData[] = [
        {
          id: '1',
          quote: 'Short', // Too short (< 10 characters)
          author: {
            name: 'John Doe',
            title: 'Developer',
            company: 'Tech Corp',
            avatar: '/avatar.jpg',
            companyLogo: '/logo.svg'
          }
        },
        {
          id: '2',
          quote: 'This is a valid length quote for testing purposes',
          author: {
            name: 'Jane Smith',
            title: 'Manager',
            company: 'Another Corp',
            avatar: '/avatar2.jpg',
            companyLogo: '/logo2.svg'
          }
        }
      ];

      const result = validateTestimonialData(shortQuoteTestimonials);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('2');
    });

    it('filters out testimonials with quotes that are too long', () => {
      const longQuote = 'A'.repeat(501); // Too long (> 500 characters)
      const longQuoteTestimonials: TestimonialData[] = [
        {
          id: '1',
          quote: longQuote,
          author: {
            name: 'John Doe',
            title: 'Developer',
            company: 'Tech Corp',
            avatar: '/avatar.jpg',
            companyLogo: '/logo.svg'
          }
        },
        {
          id: '2',
          quote: 'This is a valid length quote for testing purposes',
          author: {
            name: 'Jane Smith',
            title: 'Manager',
            company: 'Another Corp',
            avatar: '/avatar2.jpg',
            companyLogo: '/logo2.svg'
          }
        }
      ];

      const result = validateTestimonialData(longQuoteTestimonials);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('2');
    });

    it('handles empty array input', () => {
      const result = validateTestimonialData([]);
      expect(result).toEqual([]);
    });

    it('logs warnings for invalid testimonials', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      const invalidTestimonials: TestimonialData[] = [
        {
          id: '',
          quote: 'Valid quote',
          author: {
            name: 'John Doe',
            title: 'Developer',
            company: 'Tech Corp',
            avatar: '/avatar.jpg',
            companyLogo: '/logo.svg'
          }
        }
      ];

      validateTestimonialData(invalidTestimonials);
      
      expect(consoleSpy).toHaveBeenCalledWith('Invalid testimonial data:', invalidTestimonials[0]);
      
      consoleSpy.mockRestore();
    });
  });

  describe('sampleTestimonials', () => {
    it('contains valid testimonial data', () => {
      expect(sampleTestimonials).toBeDefined();
      expect(Array.isArray(sampleTestimonials)).toBe(true);
      expect(sampleTestimonials.length).toBeGreaterThan(0);

      sampleTestimonials.forEach(testimonial => {
        expect(testimonial.id).toBeTruthy();
        expect(testimonial.quote).toBeTruthy();
        expect(testimonial.author.name).toBeTruthy();
        expect(testimonial.quote.length).toBeGreaterThanOrEqual(10);
        expect(testimonial.quote.length).toBeLessThanOrEqual(500);
      });
    });

    it('has unique IDs for all testimonials', () => {
      const ids = sampleTestimonials.map(t => t.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('fallbackTestimonials', () => {
    it('contains testimonials for testing edge cases', () => {
      expect(fallbackTestimonials).toBeDefined();
      expect(Array.isArray(fallbackTestimonials)).toBe(true);
      expect(fallbackTestimonials.length).toBeGreaterThan(0);

      // Should include testimonials with empty/invalid image paths for testing
      const hasEmptyAvatar = fallbackTestimonials.some(t => !t.author.avatar);
      const hasEmptyLogo = fallbackTestimonials.some(t => !t.author.companyLogo);
      
      expect(hasEmptyAvatar || hasEmptyLogo).toBe(true);
    });
  });
});