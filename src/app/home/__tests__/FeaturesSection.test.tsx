import { render, screen } from '@testing-library/react';
import { FeaturesSection } from '../FeaturesSection';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock the AnimatedBackground component
jest.mock('@/components/ui/AnimatedBackground', () => ({
  AnimatedBackground: ({ variant, showSlateTexture }: any) => (
    <div data-testid="animated-background" data-variant={variant} data-slate-texture={showSlateTexture} />
  ),
}));

describe('FeaturesSection', () => {
  it('renders with section-spacing class for standardized spacing', () => {
    render(<FeaturesSection />);
    
    const section = screen.getByRole('region', { hidden: true }) || document.querySelector('section');
    expect(section).toHaveClass('section-spacing');
  });

  it('renders the main heading with gradient text', () => {
    render(<FeaturesSection />);
    
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Powerful & Low-Code API Testing');
  });

  it('renders all feature cards', () => {
    render(<FeaturesSection />);
    
    // Check for key feature titles
    expect(screen.getByText('Scriptable HTTP Client')).toBeInTheDocument();
    expect(screen.getByText('YAML-Driven Testing')).toBeInTheDocument();
    expect(screen.getByText('Automate Workflows')).toBeInTheDocument();
    expect(screen.getByText('API Response Validation')).toBeInTheDocument();
    expect(screen.getByText('Environment Management')).toBeInTheDocument();
    expect(screen.getByText('CI/CD Integration')).toBeInTheDocument();
  });

  it('has proper background elements for visual hierarchy', () => {
    render(<FeaturesSection />);
    
    const animatedBackground = screen.getByTestId('animated-background');
    expect(animatedBackground).toHaveAttribute('data-variant', 'subtle');
    expect(animatedBackground).toHaveAttribute('data-slate-texture', 'true');
  });

  it('maintains responsive grid layout', () => {
    render(<FeaturesSection />);
    
    const gridContainer = document.querySelector('.grid');
    expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
  });
});