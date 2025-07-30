# Technology Stack

## Framework & Runtime
- **Next.js 15.2.4** - React framework with App Router
- **React 19** - UI library with latest features
- **TypeScript 5** - Type-safe JavaScript development
- **Node.js** - Runtime environment

## Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Tailwind Animate** - Animation utilities
- **Radix UI** - Headless UI components
- **Shadcn/ui** - Component library (New York style)
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Tabler Icons** - Additional icon set

## Content & Data
- **MDX** - Markdown with JSX support
- **Gray Matter** - Front matter parsing
- **Next MDX Remote** - Remote MDX content
- **Zod** - Schema validation
- **Reading Time** - Content reading time calculation

## Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Rate Limiter Flexible** - API rate limiting
- **Resend** - Email service integration

## Common Commands

### Development
```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run clean        # Clean dist directory
```

### Project Structure
- Uses App Router architecture
- TypeScript strict mode enabled
- Path aliases configured (@/* maps to ./src/*)
- MDX support for content pages
- API routes enabled
- Image optimization disabled for static export compatibility

### Build Configuration
- Output directory: `dist/`
- Trailing slashes enabled
- Compression disabled
- Turbopack experimental features enabled
- MDX Rust parser enabled