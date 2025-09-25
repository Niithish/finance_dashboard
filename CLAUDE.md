# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.5.4 personal finance dashboard application using the App Router with:
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** with OKLCH color space and comprehensive theming
- **shadcn/ui** component library with "new-york" style and Lucide icons
- **React 19.1.0** with modern hooks and patterns
- **Chart.js 4.5.0** for data visualization
- **LocalStorage** for data persistence (no backend)

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
- `components/` - React components organized by feature
  - `ui/` - shadcn/ui components
  - `layout/` - Layout components (AppSidebar)
  - `dashboard/` - Dashboard components (summary cards)
  - `transactions/` - Transaction management components
  - `charts/` - Chart visualization components
  - `filters/` - Filter and search components
- `lib/` - Utility functions and type definitions
- `hooks/` - Custom React hooks
- `public/` - Static assets

### Path Aliases
- `@/*` maps to project root
- `@/components/*` maps to `components/*`
- `@/lib/*` maps to `lib/*`
- `@/hooks/*` maps to `hooks/*`

## Key Technical Components

### Data Architecture
- **Transaction Model**: TypeScript interface with id, description, amount, type, category, date, and timestamps
- **LocalStorage Hook**: Custom `useLocalStorage` hook for data persistence
- **Categories**: Predefined income and expense categories with color coding
- **Financial Calculations**: Utility functions for summary calculations and data aggregation

### Component Architecture
- **Compact Design Pattern**: All components optimized for high information density
- **Responsive Layout**: Sidebar navigation with collapsible design
- **Chart Integration**: Chart.js components with responsive sizing
- **Form Handling**: Transaction forms with validation and error handling

### State Management
- **Local State**: React hooks for component state
- **Data Persistence**: localStorage for transaction data
- **Filter State**: Complex filtering by type, category, and time period
- **Derived State**: useMemo for optimized calculations and filtering

## Styling System

The project uses Tailwind CSS v4 with:
- **OKLCH Color Space**: Modern color system with improved accessibility
- **Custom CSS Variables**: Comprehensive theming system in `app/globals.css`
- **Dark/Light Theme**: Complete theme support with proper color mappings
- **shadcn/ui Integration**: Design tokens and component styling
- **Responsive Design**: Mobile-first approach with breakpoints

## Key Configuration

### TypeScript
- Target ES2017 with strict mode enabled
- Path aliases configured for clean imports
- Next.js plugin for App Router support

### Tailwind CSS v4
- Modern CSS-in-JS approach with `@theme inline`
- Custom color variables for theming
- Base styles with border and ring utilities
- Integration with shadcn/ui design system

### shadcn/ui
- "new-york" style with Lucide React icons
- RSC (React Server Components) enabled
- Custom component aliases and utilities

## Data Models

### Transaction Interface
```typescript
interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}
```

### Categories
- **Income**: Salary, Freelance, Investment, Business, Other Income
- **Expenses**: Food, Shopping, Transport, Utilities, Entertainment, Healthcare, Education, Housing, Savings, Other

## Development Notes

- **No Testing Framework**: Currently no testing configured (opportunity to add Jest/Vitest)
- **Client-Side Only**: All data stored in localStorage, no backend API
- **Turbopack Enabled**: Faster development and builds with Next.js 15.5.4
- **Chart Dependencies**: Chart.js 4.5.0 with react-chartjs-2 for visualizations
- **Date Handling**: date-fns library for date operations and formatting
- **Font Optimization**: Geist font family via `next/font`