import { render, screen, fireEvent } from '@testing-library/react';
import { TestimonialsSection } from '../TestimonialsSection';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: React.ComponentProps<'button'>) => <button {...props}>{children}</button>,
    blockquote: ({ children, ...props }: React.ComponentProps<'blockquote'>) => <blockquote {...props}>{children}</blockquote>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: React.ComponentProps<'img'>) => <img src={src} alt={alt} {...props} />,
}));

describe('TestimonialsSection', () => {
  it('renders with section-spacing class', () => {
    const { container } = render(<TestimonialsSection />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('section-spacing');
  });

  it('renders testimonial content', () => {
    render(<TestimonialsSection />);
    
    // Check for section title
    expect(screen.getByText(/Trusted by Developers/)).toBeInTheDocument();
    expect(screen.getByText(/Worldwide/)).toBeInTheDocument();
    
    // Check for testimonial quote (first testimonial should be visible)
    expect(screen.getByText(/Manual testing was eating up our team's time/)).toBeInTheDocument();
    
    // Check for author information
    expect(screen.getByText('Emily Tran')).toBeInTheDocument();
    expect(screen.getByText(/QA Lead/)).toBeInTheDocument();
    expect(screen.getByText(/FinEdge Solutions/)).toBeInTheDocument();
  });

  it('has navigation buttons', () => {
    render(<TestimonialsSection />);
    
    // Check for previous and next buttons
    const prevButton = screen.getByLabelText('Previous testimonial');
    const nextButton = screen.getByLabelText('Next testimonial');
    
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('can navigate between testimonials', () => {
    render(<TestimonialsSection />);
    
    // Initially should show first testimonial
    expect(screen.getByText('Emily Tran')).toBeInTheDocument();
    
    // Click next button
    const nextButton = screen.getByLabelText('Next testimonial');
    fireEvent.click(nextButton);
    
    // Should now show second testimonial
    expect(screen.getByText('Priya Desai')).toBeInTheDocument();
    expect(screen.getByText(/Senior QA Engineer/)).toBeInTheDocument();
  });

  it('has proper background decorations', () => {
    const { container } = render(<TestimonialsSection />);
    
    // Check for background gradient elements
    const gradients = container.querySelectorAll('.absolute');
    expect(gradients.length).toBeGreaterThan(0);
  });

  it('has responsive design elements', () => {
    const { container } = render(<TestimonialsSection />);
    
    // Check for responsive classes in the main container
    const section = container.querySelector('section');
    expect(section).toHaveClass('section-spacing');
    expect(section).toHaveClass('relative');
    expect(section).toHaveClass('overflow-hidden');
  });

  it('displays star ratings', () => {
    render(<TestimonialsSection />);
    
    // Filter for star SVGs (they should have specific viewBox)
    const starSvgs = Array.from(document.querySelectorAll('svg[viewBox="0 0 20 20"]'));
    expect(starSvgs).toHaveLength(5);
  });
});