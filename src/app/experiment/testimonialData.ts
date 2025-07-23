import { TestimonialData } from "./FocusedTestimonialSlider";

export const sampleTestimonials: TestimonialData[] = [
  {
    id: "1",
    quote: "Platform Labs' ability to simplify complex AI workflows was a game changer. We now deploy new features faster, with confidence and traceability.",
    author: {
      name: "Jonas Klein",
      title: "Growth Hacker",
      company: "Brava",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      companyLogo: "https://via.placeholder.com/120x40/4F46E5/FFFFFF?text=Brava"
    }
  },
  {
    id: "2", 
    quote: "The validation engine caught critical issues that would have cost us thousands in production. CHKware pays for itself within the first month of use.",
    author: {
      name: "Marcus Rodriguez",
      title: "Lead Developer",
      company: "CloudScale Solutions",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      companyLogo: "https://via.placeholder.com/120x40/059669/FFFFFF?text=CloudScale"
    }
  },
  {
    id: "3",
    quote: "Finally, a tool that understands modern development workflows. The YAML configuration is intuitive and the CI/CD integration is seamless.",
    author: {
      name: "Emily Watson",
      title: "Engineering Manager",
      company: "DataStream Corp",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9e0e4b0?w=400&h=400&fit=crop&crop=face", 
      companyLogo: "https://via.placeholder.com/120x40/DC2626/FFFFFF?text=DataStream"
    }
  },
  {
    id: "4",
    quote: "CHKware eliminated our testing bottlenecks overnight. The automated validation gives us confidence to ship faster while maintaining quality standards.",
    author: {
      name: "David Kim",
      title: "CTO",
      company: "InnovateLabs",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=400&h=400&fit=crop&crop=face",
      companyLogo: "https://via.placeholder.com/120x40/7C3AED/FFFFFF?text=InnovateLabs"
    }
  },
  {
    id: "5",
    quote: "The best investment we've made for our development process. CHKware's intelligent validation catches edge cases we never thought to test manually.",
    author: {
      name: "Lisa Thompson",
      title: "Senior Software Architect", 
      company: "NextGen Systems",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      companyLogo: "https://via.placeholder.com/120x40/EA580C/FFFFFF?text=NextGen"
    }
  }
];

// Fallback testimonials with placeholder data for testing
export const fallbackTestimonials: TestimonialData[] = [
  {
    id: "fallback-1",
    quote: "This tool has revolutionized our development process. The automation capabilities are outstanding and save us hours every day.",
    author: {
      name: "John Smith",
      title: "Senior Developer",
      company: "Tech Solutions Inc.",
      avatar: "", // Empty to test fallback
      companyLogo: "" // Empty to test fallback
    }
  },
  {
    id: "fallback-2", 
    quote: "Incredible value for money. The validation features caught bugs that would have been expensive to fix in production.",
    author: {
      name: "Jane Doe",
      title: "Engineering Lead",
      company: "Innovation Corp",
      avatar: "/images/testimonials/placeholder.jpg", // Will fail to load
      companyLogo: "/images/companies/placeholder.svg" // Will fail to load
    }
  }
];

// Validation function to ensure testimonial data integrity
export function validateTestimonialData(testimonials: TestimonialData[]): TestimonialData[] {
  return testimonials.filter(testimonial => {
    // Ensure required fields exist
    if (!testimonial.id || !testimonial.quote || !testimonial.author?.name) {
      console.warn('Invalid testimonial data:', testimonial);
      return false;
    }
    
    // Ensure quote is not too short or too long
    if (testimonial.quote.length < 10 || testimonial.quote.length > 500) {
      console.warn('Testimonial quote length invalid:', testimonial.quote.length);
      return false;
    }
    
    return true;
  });
}