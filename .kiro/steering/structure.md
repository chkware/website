# Project Structure

## Root Directory
- **src/** - Main source code
- **public/** - Static assets and images
- **content/** - Content management (authors, blog posts)
- **docs/** - Project documentation
- **dist/** - Build output directory
- **.kiro/** - Kiro configuration and steering rules

## Source Organization (`src/`)

### Application Structure
- **app/** - Next.js App Router pages and layouts
  - **home/** - Homepage section components
  - **page.tsx** - Main homepage entry point
- **components/** - Reusable React components
  - **ui/** - Base UI components (Shadcn/ui)
  - **layout/** - Layout components (Navbar, Footer)
  - **demo/** - Demo and example components
  - **seo/** - SEO-related components
- **lib/** - Utility functions and configurations
- **styles/** - Global CSS and styling
- **data/** - Static data and configurations
- **images/** - Source images and assets
- **scripts/** - Build and utility scripts

### Component Architecture
- **UI Components**: Located in `src/components/ui/` following Shadcn/ui patterns
- **Layout Components**: Navigation, headers, footers in `src/components/layout/`
- **Page Sections**: Homepage sections in `src/app/home/`
- **Demo Components**: Interactive demos in `src/components/demo/`

### Content Management
- **content/authors.json** - Author profiles and metadata
- **content/blog/** - Blog posts and articles (MDX format)
- **public/images/** - Static images and media assets

## Naming Conventions
- **Components**: PascalCase (e.g., `HeroSection.tsx`)
- **Files**: kebab-case for utilities, PascalCase for components
- **Directories**: lowercase with hyphens
- **CSS Classes**: Tailwind utility classes

## Import Patterns
- Use `@/` alias for src imports
- Relative imports for same-directory files
- Group imports: external libraries, internal components, types

## File Extensions
- **TypeScript React**: `.tsx`
- **TypeScript**: `.ts`
- **Styles**: `.css`
- **Content**: `.mdx` for blog posts
- **Config**: `.js` or `.json`