'use client';

import { useState, useMemo } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { CompactSummaryCards } from '@/components/dashboard/CompactSummaryCards';
import { CompactTransactionList } from '@/components/transactions/CompactTransactionList';
import { CompactIncomeVsExpensesChart } from '@/components/charts/CompactIncomeVsExpensesChart';
import { CompactExpenseBreakdownChart } from '@/components/charts/CompactExpenseBreakdownChart';
import { CompactFilters } from '@/components/filters/CompactFilters';
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
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Finance Dashboard</h1>
              <p className="text-sm text-muted-foreground">Track income, expenses, and budget</p>
            </div>
            <div className="text-xs text-muted-foreground">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </div>
          </div>

          {/* Summary Cards */}
          <CompactSummaryCards summary={summary} />

          {/* Filters */}
          <CompactFilters
            filters={filters}
            onFiltersChange={setFilters}
          />

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <CompactIncomeVsExpensesChart data={monthlyData} />
            </div>
            <div>
              <CompactExpenseBreakdownChart data={categoryBreakdown} />
            </div>
          </div>

          {/* Transaction List */}
          <CompactTransactionList
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