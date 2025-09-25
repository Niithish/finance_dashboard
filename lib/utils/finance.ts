import { startOfMonth, endOfMonth, parseISO, isWithinInterval, subMonths } from 'date-fns';
import type { Transaction, FinancialSummary, CategoryBreakdown, MonthlyData, FilterState } from '@/lib/types';
import { CATEGORIES, FORMATTERS } from '@/lib/constants';


export function calculateFinancialSummary(transactions: Transaction[], filter: FilterState): FinancialSummary {
  const now = new Date();
  let startDate: Date;
  let endDate: Date;

  switch (filter.period) {
    case 'current-month':
      startDate = startOfMonth(now);
      endDate = endOfMonth(now);
      break;
    case 'last-month':
      const startOfThisMonth = startOfMonth(now);
      const startOfPrevMonth = subMonths(startOfThisMonth, 1);
      startDate = startOfPrevMonth;
      endDate = endOfMonth(startOfPrevMonth);
      break;
    case 'custom':
      startDate = filter.customStart ? parseISO(filter.customStart) : startOfMonth(now);
      endDate = filter.customEnd ? parseISO(filter.customEnd) : endOfMonth(now);
      break;
    default:
      startDate = startOfMonth(now);
      endDate = endOfMonth(now);
  }

  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = parseISO(transaction.date);
    const dateInRange = isWithinInterval(transactionDate, { start: startDate, end: endDate });
    const typeMatch = filter.type === 'all' || transaction.type === filter.type;
    const categoryMatch = filter.category === 'all' || transaction.category === filter.category;

    return dateInRange && typeMatch && categoryMatch;
  });

  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  return {
    totalBalance,
    totalIncome,
    totalExpenses,
    period: {
      start: startDate,
      end: endDate,
    },
  };
}

export function calculateCategoryBreakdown(transactions: Transaction[], filter: FilterState): CategoryBreakdown[] {
  const now = new Date();
  let startDate: Date;
  let endDate: Date;

  switch (filter.period) {
    case 'current-month':
      startDate = startOfMonth(now);
      endDate = endOfMonth(now);
      break;
    case 'last-month':
      const startOfThisMonth = startOfMonth(now);
      const startOfPrevMonth = subMonths(startOfThisMonth, 1);
      startDate = startOfPrevMonth;
      endDate = endOfMonth(startOfPrevMonth);
      break;
    case 'custom':
      startDate = filter.customStart ? parseISO(filter.customStart) : startOfMonth(now);
      endDate = filter.customEnd ? parseISO(filter.customEnd) : endOfMonth(now);
      break;
    default:
      startDate = startOfMonth(now);
      endDate = endOfMonth(now);
  }

  const expenseTransactions = transactions.filter(transaction => {
    const transactionDate = parseISO(transaction.date);
    const dateInRange = isWithinInterval(transactionDate, { start: startDate, end: endDate });
    const typeMatch = filter.type === 'all' || transaction.type === filter.type;
    const categoryMatch = filter.category === 'all' || transaction.category === filter.category;

    return dateInRange && typeMatch && categoryMatch && transaction.type === 'expense';
  });

  const categoryTotals = expenseTransactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  const totalExpenses = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0);

  return Object.entries(categoryTotals).map(([category, amount]) => {
    const categoryInfo = CATEGORIES.find(c => c.id === category);
    return {
      category: categoryInfo?.name || category,
      amount,
      percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
      color: categoryInfo?.color || '#6b7280',
    };
  });
}

export function calculateMonthlyData(transactions: Transaction[]): MonthlyData[] {
  const monthlyTotals = transactions.reduce((acc, transaction) => {
    const date = parseISO(transaction.date);
    const monthKey = FORMATTERS.monthYear.format(date);

    if (!acc[monthKey]) {
      acc[monthKey] = { income: 0, expenses: 0 };
    }

    if (transaction.type === 'income') {
      acc[monthKey].income += transaction.amount;
    } else {
      acc[monthKey].expenses += transaction.amount;
    }

    return acc;
  }, {} as Record<string, { income: number; expenses: number }>);

  return Object.entries(monthlyTotals)
    .map(([month, data]) => ({
      month,
      income: data.income,
      expenses: data.expenses,
    }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
    .slice(-12); // Last 12 months
}

export function validateTransactionForm(data: Partial<Transaction>) {
  const errors: Record<string, string> = {};

  if (!data.description?.trim()) {
    errors.description = 'Description is required';
  }

  if (!data.amount || data.amount <= 0) {
    errors.amount = 'Amount must be greater than 0';
  }

  if (!data.category) {
    errors.category = 'Category is required';
  }

  if (!data.date) {
    errors.date = 'Date is required';
  }

  return errors;
}

export function formatCurrency(amount: number): string {
  return FORMATTERS.currency.format(amount);
}

export function formatDate(dateString: string): string {
  return FORMATTERS.date.format(new Date(dateString));
}