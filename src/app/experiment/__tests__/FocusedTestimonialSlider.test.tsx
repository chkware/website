import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FocusedTestimonialSlider } from '../FocusedTestimonialSlider';
import { sampleTestimonials, fallbackTestimonials } from '../testimonialData';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

describe('FocusedTestimonialSlider', () => {
  const defaultProps = {
    testimonials: sampleTestimonials,
    autoAdvanceInterval: 1000, // Faster for testing
    showControls: true,
    showIndicators: true,
  };

  beforeEach(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('Basic Rendering', () => {
    it('renders testimonial slider with first testimonial active', () => {
      render(<FocusedTestimonialSlider {...defaultProps} />);
      
      expect(screen.getByText(sampleTestimonials[0].quote)).toBeInTheDocument();
      expect(screen.getByText(sampleTestimonials[0].author.name)).toBeInTheDocument();
      expect(screen.getByText(sampleTestimonials[0].author.title)).toBeInTheDocument();
    });

    it('renders navigation controls when showControls is true', () => {
      render(<FocusedTestimonialSlider {...defaultProps} />);
      
      expect(screen.getByLabelText('Previous testimonial')).toBeInTheDocument();
      expect(screen.getByLabelText('Next testimonial')).toBeInTheDocument();
    });

    it('renders slide indicators when showIndicators is true', () => {
      render(<FocusedTestimonialSlider {...defaultProps} />);
      
      const indicators = screen.getAllByRole('tab');
      expect(indicators).toHaveLength(sampleTestimonials.length);
    });

    it('hides controls when showControls is false', () => {
      render(<FocusedTestimonialSlider {...defaultProps} showControls={false} />);
      
      expect(screen.queryByLabelText('Previous testimonial')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Next testimonial')).not.toBeInTheDocument();
    });

    it('hides indicators when showIndicators is false', () => {
      render(<FocusedTestimonialSlider {...defaultProps} showIndicators={false} />);
      
      expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('advances to next slide when next button is clicked', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<FocusedTestimonialSlider {...defaultProps} />);
      
      const nextButton = screen.getByLabelText('Next testimonial');
      await user.click(nextButton);
      
      expect(screen.getByText(sampleTestimonials[1].quote)).toBeInTheDocument();
    });

    it('goes to previous slide when previous button is clicked', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<FocusedTestimonialSlider {...defaultProps} />);
      
      const prevButton = screen.getByLabelText('Previous testimonial');
      await user.click(prevButton);
      
      // Should wrap to last testimonial
      const lastTestimonial = sampleTestimonials[sampleTestimonials.length - 1];
      expect(screen.getByText(lastTestimonial.quote)).toBeInTheDocument();
    });

    it('jumps to specific slide when indicator is clicked', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<FocusedTestimonialSlider {...defaultProps} />);
      
      const indicators = screen.getAllByRole('tab');
      await user.click(indicators[2]); // Click third indicator
      
      expect(screen.getByText(sampleTestimonials[2].quote)).toBeInTheDocument();
    });
  });

  describe('Auto-advance', () => {
    it('automatically advances slides after interval', async () => {
      render(<FocusedTestimonialSlider {...defaultProps} />);
      
      // Initially shows first testimonial
      expect(screen.getByText(sampleTestimonials[0].quote)).toBeInTheDocument();
      
      // Advance time by interval
      jest.advanceTimersByTime(1000);
      
      await waitFor(() => {
        expect(screen.getByText(sampleTestimonials[1].quote)).toBeInTheDocument();
      });
    });

    it('pauses auto-advance on hover', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<FocusedTestimonialSlider {...defaultProps} />);
      
      const slider = screen.getByRole('region');
      await user.hover(slider);
      
      // Advance time - should not change slide
      jest.advanceTimersByTime(2000);
      
      expect(screen.getByText(sampleTestimonials[0].quote)).toBeInTheDocument();
    });

    it('resumes auto-advance when hover ends', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<FocusedTestimonialSlider {...defaultProps} />);
      
      const slider = screen.getByRole('region');
      await user.hover(slider);
      await user.unhover(slider);
      
      jest.advanceTimersByTime(1000);
      
      await waitFor(() => {
        expect(screen.getByText(sampleTestimonials[1].quote)).toBeInTheDocument();
      });
    });
  });

  describe('Keyboard Navigation', () => {
    it('advances slide on right arrow key', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<FocusedTestimonialSlider {...defaultProps} />);
      
      const slider = screen.getByRole('region');
      slider.focus();
      
      await user.keyboard('{ArrowRight}');
      
      expect(screen.getByText(sampleTestimonials[1].quote)).toBeInTheDocument();
    });

    it('goes to previous slide on left arrow key', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<FocusedTestimonialSlider {...defaultProps} />);
      
      const slider = screen.getByRole('region');
      slider.focus();
      
      await user.keyboard('{ArrowLeft}');
      
      const lastTestimonial = sampleTestimonials[sampleTestimonials.length - 1];
      expect(screen.getByText(lastTestimonial.quote)).toBeInTheDocument();
    });

    it('goes to first slide on Home key', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<FocusedTestimonialSlider {...defaultProps} />);
      
      const slider = screen.getByRole('region');
      slider.focus();
      
      // First go to another slide
      await user.keyboard('{ArrowRight}');
      expect(screen.getByText(sampleTestimonials[1].quote)).toBeInTheDocument();
      
      // Then press Home
      await user.keyboard('{Home}');
      expect(screen.getByText(sampleTestimonials[0].quote)).toBeInTheDocument();
    });

    it('goes to last slide on End key', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<FocusedTestimonialSlider {...defaultProps} />);
      
      const slider = screen.getByRole('region');
      slider.focus();
      
      await user.keyboard('{End}');
      
      const lastTestimonial = sampleTestimonials[sampleTestimonials.length - 1];
      expect(screen.getByText(lastTestimonial.quote)).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('renders empty state when no testimonials provided', () => {
      render(<FocusedTestimonialSlider {...defaultProps} testimonials={[]} />);
      
      expect(screen.getByText('No testimonials available')).toBeInTheDocument();
    });

    it('handles missing author information gracefully', () => {
      const testimonialWithMissingInfo = [{
        id: '1',
        quote: 'Great product!',
        author: {
          name: '',
          title: '',
          company: '',
          avatar: '',
          companyLogo: ''
        }
      }];
      
      render(<FocusedTestimonialSlider {...defaultProps} testimonials={testimonialWithMissingInfo} />);
      
      expect(screen.getByText('Great product!')).toBeInTheDocument();
      expect(screen.getByText('Anonymous')).toBeInTheDocument();
    });

    it('shows fallback initials when avatar fails to load', () => {
      render(<FocusedTestimonialSlider {...defaultProps} testimonials={fallbackTestimonials} />);
      
      // Should show initials for John Smith
      expect(screen.getByText('JS')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels and roles', () => {
      render(<FocusedTestimonialSlider {...defaultProps} />);
      
      expect(screen.getByRole('region')).toHaveAttribute('aria-label', 'Customer testimonials');
      expect(screen.getByRole('tablist')).toHaveAttribute('aria-label', 'Testimonial navigation');
      
      const indicators = screen.getAllByRole('tab');
      expect(indicators[0]).toHaveAttribute('aria-current', 'true');
    });

    it('announces slide changes to screen readers', () => {
      render(<FocusedTestimonialSlider {...defaultProps} />);
      
      const announcement = screen.getByText(/Showing testimonial 1 of/);
      expect(announcement).toHaveAttribute('aria-live', 'polite');
    });

    it('has proper focus management', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      render(<FocusedTestimonialSlider {...defaultProps} />);
      
      const slider = screen.getByRole('region');
      await user.tab();
      
      expect(slider).toHaveFocus();
    });
  });

  describe('Touch Gestures', () => {
    it('advances slide on left swipe', () => {
      render(<FocusedTestimonialSlider {...defaultProps} />);
      
      const slider = screen.getByRole('region');
      
      // Simulate left swipe (touch start at right, end at left)
      fireEvent.touchStart(slider, {
        targetTouches: [{ clientX: 200 }]
      });
      fireEvent.touchMove(slider, {
        targetTouches: [{ clientX: 100 }]
      });
      fireEvent.touchEnd(slider);
      
      expect(screen.getByText(sampleTestimonials[1].quote)).toBeInTheDocument();
    });

    it('goes to previous slide on right swipe', () => {
      render(<FocusedTestimonialSlider {...defaultProps} />);
      
      const slider = screen.getByRole('region');
      
      // Simulate right swipe (touch start at left, end at right)
      fireEvent.touchStart(slider, {
        targetTouches: [{ clientX: 100 }]
      });
      fireEvent.touchMove(slider, {
        targetTouches: [{ clientX: 200 }]
      });
      fireEvent.touchEnd(slider);
      
      const lastTestimonial = sampleTestimonials[sampleTestimonials.length - 1];
      expect(screen.getByText(lastTestimonial.quote)).toBeInTheDocument();
    });
  });
});