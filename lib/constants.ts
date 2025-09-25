export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
}

export interface FilterState {
  type: 'all' | 'income' | 'expense';
  category: string;
  period: 'current-month' | 'last-month' | 'custom';
  customStart?: string;
  customEnd?: string;
}

export const CATEGORIES: Category[] = [
  // Income categories
  { id: 'salary', name: 'Salary', type: 'income', color: '#22c55e' },
  { id: 'freelance', name: 'Freelance', type: 'income', color: '#3b82f6' },
  { id: 'investment', name: 'Investment', type: 'income', color: '#8b5cf6' },
  { id: 'business', name: 'Business', type: 'income', color: '#f59e0b' },
  { id: 'other-income', name: 'Other Income', type: 'income', color: '#6b7280' },

  // Expense categories
  { id: 'food', name: 'Food & Dining', type: 'expense', color: '#ef4444' },
  { id: 'shopping', name: 'Shopping', type: 'expense', color: '#f97316' },
  { id: 'transport', name: 'Transportation', type: 'expense', color: '#eab308' },
  { id: 'utilities', name: 'Utilities', type: 'expense', color: '#84cc16' },
  { id: 'entertainment', name: 'Entertainment', type: 'expense', color: '#06b6d4' },
  { id: 'healthcare', name: 'Healthcare', type: 'expense', color: '#0ea5e9' },
  { id: 'education', name: 'Education', type: 'expense', color: '#6366f1' },
  { id: 'housing', name: 'Housing', type: 'expense', color: '#8b5cf6' },
  { id: 'savings', name: 'Savings', type: 'expense', color: '#a855f7' },
  { id: 'other-expense', name: 'Other Expenses', type: 'expense', color: '#6b7280' },
];

export const DEFAULT_FILTER: FilterState = {
  type: 'all',
  category: 'all',
  period: 'current-month',
};

export const FORMATTERS = {
  currency: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),

  date: new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }),

  monthYear: new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
  }),
};