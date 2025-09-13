# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**SolarFlow Platform** - A Solar4All Hackathon entry for transparent solar energy billing in apartment buildings. Built for Dach für Dach's challenge to democratize clean energy access for tenants and landlords.

## Tech Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Build Tool**: Turbopack

## Development Commands

Run from `web/` directory:
```bash
npm run dev          # Development server
npm run build        # Production build
npm run typecheck    # Type checking
npm run lint         # ESLint
```

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

## Project Structure
- `web/` - Next.js application
- `docs/hackathonInfo/` - Hackathon datasets and requirements
- Smart meter data available in CSV format for testing