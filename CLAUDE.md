# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.5.4 personal dashboard application using the App Router with:
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** with OKLCH color space and comprehensive theming
- **shadcn/ui** component library (configured, components not yet added)
- **React 19.1.0** with modern hooks and patterns
- **pnpm** package manager

## Development Commands

```bash
# Development server with Turbopack
pnpm run dev

# Production build with Turbopack
pnpm run build

# Production server
pnpm run start

# ESLint
pnpm run lint
```

## Project Architecture

### Directory Structure
- `app/` - Next.js App Router pages and layouts
- `lib/` - Utility functions (currently has `utils.ts` for Tailwind class merging)
- `components/` - React components (shadcn/ui components will go here)
- `public/` - Static assets

### Path Aliases
- `@/*` maps to project root
- `@/components/*` maps to `components/*`
- `@/lib/*` maps to `lib/*`
- `@/hooks/*` maps to `hooks/*` (not yet created)

### Key Configuration
- **TypeScript**: Target ES2017, strict mode, Next.js plugin
- **ESLint**: Next.js core web vitals rules, TypeScript support
- **Tailwind v4**: Modern CSS-in-JS approach with custom theme variables
- **shadcn/ui**: "new-york" style, Lucide React icons, RSC enabled

## Styling System

The project uses Tailwind CSS v4 with:
- Custom CSS variables for theming in `app/globals.css`
- OKLCH color space for better accessibility
- Complete dark/light theme support
- shadcn/ui compatible design tokens
- Base styles with border and ring utilities

## Development Notes

- **No testing framework** currently configured (opportunity to add Jest/Vitest)
- **shadcn/ui components** are configured but not yet installed
- **Turbopack** enabled for faster development and builds
- **Deployment ready** for Vercel with standard Next.js setup
- **Font optimization** using Geist font family via `next/font`

## Current State

- Fresh Next.js project with starter template
- Comprehensive styling system in place
- Ready for building dashboard components
- No custom business logic implemented yet