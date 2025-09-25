# Personal Finance Dashboard

A comprehensive personal finance dashboard built with Next.js, TypeScript, and shadcn/ui components. Track income, expenses, and visualize your financial data with interactive charts.

## Features

### Core Functionality
- **Dashboard Overview**: Current month/year financial summary with key metrics
- **Transaction Management**: Full CRUD operations for income and expense tracking
- **Data Visualization**: Interactive charts showing income vs expenses and expense breakdown
- **Data Persistence**: All data stored in localStorage for client-side persistence
- **Advanced Filtering**: Filter transactions by type, category, and time period

### UI/UX Features
- **Responsive Design**: Optimized for desktop and mobile devices
- **Compact Layout**: High information density with minimal whitespace
- **Sidebar Navigation**: Collapsible sidebar using shadcn/ui components
- **Modern Styling**: Built with Tailwind CSS v4 and shadcn/ui components
- **Interactive Charts**: Powered by Chart.js with responsive design

## Tech Stack

- **Framework**: Next.js 15.5.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with OKLCH color space
- **UI Components**: shadcn/ui with Radix UI primitives
- **Charts**: Chart.js 4.5.0 with react-chartjs-2
- **Date Handling**: date-fns for date operations
- **State Management**: React hooks with localStorage persistence
- **Icons**: Lucide React

## Project Structure

```
├── app/
│   └── page.tsx                    # Main dashboard page
├── components/
│   ├── layout/
│   │   └── AppSidebar.tsx         # shadcn/ui sidebar component
│   ├── dashboard/
│   │   └── CompactSummaryCards.tsx # Summary cards component
│   ├── transactions/
│   │   └── CompactTransactionList.tsx # Transaction table with pagination
│   ├── charts/
│   │   ├── CompactIncomeVsExpensesChart.tsx
│   │   └── CompactExpenseBreakdownChart.tsx
│   ├── filters/
│   │   └── CompactFilters.tsx     # Filter controls
│   └── ui/                        # shadcn/ui components
├── hooks/
│   └── useLocalStorage.ts         # Custom localStorage hook
├── lib/
│   ├── types.ts                   # TypeScript interfaces
│   ├── constants.ts               # Categories, colors, formatters
│   └── utils/
│       └── finance.ts             # Financial calculation functions
└── README.md
```

## Key Components

### AppSidebar
- **Location**: `components/layout/AppSidebar.tsx`
- **Description**: Collapsible sidebar navigation using shadcn/ui components
- **Features**: Navigation menu, quick stats, date display, expand/collapse toggle

### Compact Components
- **CompactSummaryCards**: Dense summary cards showing balance, income, expenses
- **CompactTransactionList**: Paginated transaction table (15 items per page)
- **CompactFilters**: Horizontal filter bar with quick actions
- **Compact Charts**: Optimized chart components with reduced dimensions

## Data Models

### Transaction Interface
```typescript
interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}
```

### Categories
- **Income**: Salary, Freelance, Investment, Other Income
- **Expenses**: Housing, Food, Transportation, Utilities, Entertainment, Healthcare, Other

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open browser**: Navigate to [http://localhost:3000](http://localhost:3000)

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Browser Compatibility

- Modern browsers with localStorage support
- Responsive design works on mobile and desktop
- Charts require Canvas API support

## Data Storage

All transaction data is stored in the browser's localStorage:
- **Persistence**: Data persists across browser sessions
- **No Backend**: Completely client-side application
- **Privacy**: No data is sent to external servers

## Future Enhancements

- [ ] Export/Import functionality for data backup
- [ ] Budget tracking and alerts
- [ ] Recurring transactions
- [ ] Multi-currency support
- [ ] Advanced reporting features

## License

This project is for educational and personal use only.