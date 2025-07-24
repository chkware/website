import { render, screen } from '@testing-library/react';
import { ResourcesSection } from '../ResourcesSection';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

describe('ResourcesSection', () => {
  it('renders with standardized section spacing', () => {
    render(<ResourcesSection />);
    
    // Find the section element
    const section = screen.getByRole('region', { name: /resources/i }) || 
                   document.querySelector('section');
    
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('section-spacing');
  });

  it('renders all resource cards with proper content', () => {
    render(<ResourcesSection />);
    
    // Check for main heading
    expect(screen.getByText(/Resources & Documentation/i)).toBeInTheDocument();
    
    // Check for all resource cards
    expect(screen.getByText('Documentation')).toBeInTheDocument();
    expect(screen.getByText('Tutorials')).toBeInTheDocument();
    expect(screen.getByText('API Reference')).toBeInTheDocument();
    expect(screen.getByText('Community')).toBeInTheDocument();
    
    // Check for descriptions
    expect(screen.getByText(/Comprehensive guides for getting started/i)).toBeInTheDocument();
    expect(screen.getByText(/Step-by-step tutorials for building/i)).toBeInTheDocument();
    expect(screen.getByText(/Detailed reference for the CHKware API/i)).toBeInTheDocument();
    expect(screen.getByText(/Join our community forum/i)).toBeInTheDocument();
  });

  it('renders resource cards with proper links', () => {
    render(<ResourcesSection />);
    
    // Check for proper links
    const docLink = screen.getByRole('link', { name: /documentation/i });
    const tutorialLink = screen.getByRole('link', { name: /tutorials/i });
    const apiLink = screen.getByRole('link', { name: /api reference/i });
    const communityLink = screen.getByRole('link', { name: /community/i });
    
    expect(docLink).toHaveAttribute('href', '/docs');
    expect(tutorialLink).toHaveAttribute('href', '/tutorials');
    expect(apiLink).toHaveAttribute('href', '/api');
    expect(communityLink).toHaveAttribute('href', '/community');
  });

  it('has proper responsive grid layout', () => {
    render(<ResourcesSection />);
    
    // Find the grid container
    const gridContainer = document.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4');
  });

  it('maintains visual balance with consistent card structure', () => {
    render(<ResourcesSection />);
    
    // Check that all cards have consistent structure
    const cards = document.querySelectorAll('[class*="Card"]');
    expect(cards.length).toBe(4);
    
    // Each card should have an icon, title, description, and link
    const icons = document.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThanOrEqual(4); // At least 4 icons for the cards
    
    // Check for "Explore" links
    const exploreLinks = screen.getAllByText(/Explore/i);
    expect(exploreLinks).toHaveLength(4);
  });
});