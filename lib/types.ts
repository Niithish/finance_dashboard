import type { Category } from './constants';

export interface FilterState {
  type: 'all' | 'income' | 'expense';
  category: string;
  period: 'current-month' | 'last-month' | 'custom';
  customStart?: string;
  customEnd?: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface FinancialSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  period: {
    start: Date;
    end: Date;
  };
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
}

export interface FormErrors {
  description?: string;
  amount?: string;
  category?: string;
  date?: string;
}