# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**SolarFlow Platform** - A Solar4All Hackathon entry for transparent solar energy billing in apartment buildings. Built for Dach für Dach's challenge to democratize clean energy access for tenants and landlords.

## Tech Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Language**: TypeScript 5
- **Database**: Prisma with SQLite (development)
- **Authentication**: NextAuth.js with Prisma adapter
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
npm run db:seed      # Seed database with sample data
```

## Architecture

### Database & Authentication
- **Prisma ORM** with SQLite for development
- Generated client in `src/generated/prisma/`
- **Role-based authentication**: LANDLORD vs TENANT users
- NextAuth.js with custom credentials provider for demo
- Middleware protection for role-based routes (`src/middleware.ts`)
- Session-based authentication with JWT strategy

### Route Protection & User Roles
- **Landlords**: Access `/dashboard/*` routes - building/tenant management, analytics, billing
- **Tenants**: Access `/tenant/*` routes - consumption tracking, bills, savings
- Middleware redirects users to appropriate dashboards based on role
- Demo authentication system (credentials provider)

### UI Component System
- **shadcn/ui** setup with "new-york" style and neutral base color
- Components located in `src/components/ui/`
- Utility function `cn()` in `src/lib/utils.ts` for className merging
- Path aliases configured: `@/` maps to `./src/`
- Theme provider wrapper in `src/components/theme-provider.tsx`
- Providers wrapper in `src/components/providers.tsx` for NextAuth session

### Project Structure
```
web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # NextAuth endpoints
│   │   │   ├── landlord/      # Landlord API endpoints
│   │   │   └── tenant/        # Tenant API endpoints
│   │   ├── auth/signin/       # Custom sign-in page
│   │   ├── dashboard/         # Landlord dashboard routes
│   │   │   ├── layout.tsx     # Dashboard layout with sidebar
│   │   │   ├── tenants/       # Tenant management
│   │   │   ├── buildings/     # Building management
│   │   │   ├── energy/        # Energy monitoring
│   │   │   ├── analytics/     # Analytics & reporting
│   │   │   ├── billing/       # Invoice generation
│   │   │   └── settings/      # Dashboard settings
│   │   ├── tenant/            # Tenant portal routes
│   │   │   ├── layout.tsx     # Tenant layout with sidebar
│   │   │   ├── portal/        # Main tenant dashboard
│   │   │   ├── apartment/     # Apartment details
│   │   │   ├── consumption/   # Energy consumption
│   │   │   ├── bills/         # View bills/invoices
│   │   │   ├── savings/       # Solar savings tracking
│   │   │   └── settings/      # Tenant settings
│   │   ├── layout.tsx         # Root layout with providers
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── dashboard/         # Dashboard-specific components
│   │   ├── sections/          # Landing page sections
│   │   ├── providers.tsx      # NextAuth SessionProvider
│   │   ├── theme-provider.tsx # Theme context
│   │   └── navbar.tsx         # Main navigation
│   ├── lib/
│   │   ├── auth.ts           # NextAuth configuration
│   │   ├── utils.ts          # Utility functions
│   │   └── sample-data.ts    # Mock data for development
│   ├── types/
│   │   ├── energy.ts         # Energy-related type definitions
│   │   └── next-auth.d.ts    # NextAuth type extensions
│   ├── hooks/                # Custom React hooks
│   ├── generated/prisma/     # Generated Prisma client
│   └── middleware.ts         # Next.js middleware for auth
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts              # Database seeding script
├── components.json           # shadcn/ui configuration
└── eslint.config.mjs        # ESLint configuration (flat config)
```

### Key Dependencies
- **Database**: `@prisma/client`, `prisma`
- **Auth**: `next-auth`, `@next-auth/prisma-adapter`
- **UI**: `@radix-ui/react-*`, `class-variance-authority`, `lucide-react`
- **Styling**: `tailwind-merge`, `clsx`
- **Theme**: `next-themes`
- **Validation**: `zod`
- **Fonts**: Geist Sans & Geist Mono from next/font/google

### Database Schema
Key models:
- **User**: Core user model with role (LANDLORD/TENANT)
- **Building**: Properties owned by landlords
- **Apartment**: Individual units within buildings, linked to tenants
- **Account/Session**: NextAuth.js authentication tables
- Each apartment has a `meterColumn` field linking to CSV data columns

## Key Features (In Development)

### Landlord Dashboard
- Multi-tenant building management
- Real-time energy consumption monitoring
- Solar production analytics with time-series charts
- Automated invoice generation and billing
- Tenant analytics and reporting
- Financial overview and revenue tracking

### Tenant Portal
- Personal energy consumption dashboard
- Solar savings visualization and tracking
- Monthly bill viewing and history
- Apartment-specific energy metrics
- Cost breakdown and transparency tools

## Additional Resources
- `docs/hackathonInfo/` - Hackathon datasets and requirements
- Smart meter data available in CSV format for testing
- Sample data generation available via `npm run db:seed`