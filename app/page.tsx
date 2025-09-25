'use client';

import { useState, useMemo } from 'react';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { TransactionList } from '@/components/transactions/TransactionList';
import { IncomeVsExpensesChart } from '@/components/charts/IncomeVsExpensesChart';
import { ExpenseBreakdownChart } from '@/components/charts/ExpenseBreakdownChart';
import { TransactionFilters } from '@/components/filters/TransactionFilters';
import { useTransactions } from '@/hooks/useLocalStorage';
import { calculateFinancialSummary, calculateCategoryBreakdown, calculateMonthlyData } from '@/lib/utils/finance';
import { DEFAULT_FILTER } from '@/lib/constants';
import { FilterState } from '@/lib/types';

export default function Home() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTER);

  const summary = useMemo(() => {
    return calculateFinancialSummary(transactions, filters);
  }, [transactions, filters]);

  const categoryBreakdown = useMemo(() => {
    return calculateCategoryBreakdown(transactions, filters);
  }, [transactions, filters]);

  const monthlyData = useMemo(() => {
    return calculateMonthlyData(transactions);
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    const now = new Date();
    let startDate: Date;
    let endDate: Date;

    switch (filters.period) {
      case 'current-month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case 'last-month':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case 'custom':
        startDate = filters.customStart ? new Date(filters.customStart) : new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = filters.customEnd ? new Date(filters.customEnd) : new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    }

    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      const dateInRange = transactionDate >= startDate && transactionDate <= endDate;
      const typeMatch = filters.type === 'all' || transaction.type === filters.type;
      const categoryMatch = filters.category === 'all' || transaction.category === filters.category;

      return dateInRange && typeMatch && categoryMatch;
    });
  }, [transactions, filters]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Personal Finance Dashboard</h1>
          <p className="text-muted-foreground">
            Track your income and expenses, visualize your spending patterns, and manage your budget effectively.
          </p>
        </div>

        <div className="space-y-8">
          <SummaryCards summary={summary} />

          <TransactionFilters
            filters={filters}
            onFiltersChange={setFilters}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <IncomeVsExpensesChart data={monthlyData} />
            <ExpenseBreakdownChart data={categoryBreakdown} />
          </div>

          <TransactionList
            transactions={filteredTransactions}
            onUpdateTransaction={updateTransaction}
            onDeleteTransaction={deleteTransaction}
            onAddTransaction={addTransaction}
          />
        </div>
      </div>
    </div>
  );
}