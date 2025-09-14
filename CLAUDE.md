# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**SolarFlow Platform** - A Solar4All Hackathon entry for transparent solar energy billing in apartment buildings. Built for Dach für Dach's challenge to democratize clean energy access for tenants and landlords.

## Tech Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Build Tool**: Turbopack
- **UI Components**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode

## Development Commands

Run from `web/` directory:
```bash
npm run dev          # Development server (with Turbopack)
npm run build        # Production build (with Turbopack)
npm run start        # Start production server
npm run typecheck    # Type checking with tsc
npm run lint         # ESLint
```

## Architecture

### UI Component System
- **shadcn/ui** setup with "new-york" style and neutral base color
- Components located in `src/components/ui/`
- Utility function `cn()` in `src/lib/utils.ts` for className merging
- Path aliases configured: `@/` maps to `./src/`
- Theme provider wrapper in `src/components/theme-provider.tsx`

### Project Structure
```
web/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── layout.tsx    # Root layout with theme provider
│   │   ├── page.tsx      # Homepage
│   │   └── globals.css   # Global styles + Tailwind
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui components
│   │   └── theme-provider.tsx
│   └── lib/
│       └── utils.ts      # Utility functions (cn helper)
├── components.json       # shadcn/ui configuration
└── tsconfig.json        # TypeScript config with path aliases
```

### Key Dependencies
- **UI**: `@radix-ui/react-*`, `class-variance-authority`, `lucide-react`
- **Styling**: `tailwind-merge`, `clsx`
- **Theme**: `next-themes`
- **Fonts**: Geist Sans & Geist Mono from next/font/google

## Key Features (In Development)

### Landlord Dashboard
- Tenant energy consumption analytics
- Solar production monitoring
- Invoice generation system
- Building/tenant management

### Tenant Portal
- Personal energy consumption tracking
- Solar savings visualization
- Invoice viewing

## Additional Resources
- `docs/hackathonInfo/` - Hackathon datasets and requirements
- Smart meter data available in CSV format for testing