'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils/finance';
import type { FinancialSummary } from '@/lib/types';

interface SummaryCardsProps {
  summary: FinancialSummary;
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  const periodText = `${formatDate(summary.period.start.toISOString())} - ${formatDate(summary.period.end.toISOString())}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Balance Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${
            summary.totalBalance >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {formatCurrency(summary.totalBalance)}
          </div>
          <p className="text-xs text-muted-foreground">
            {periodText}
          </p>
        </CardContent>
      </Card>

      {/* Total Income Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(summary.totalIncome)}
          </div>
          <p className="text-xs text-muted-foreground">
            {periodText}
          </p>
        </CardContent>
      </Card>

      {/* Total Expenses Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <TrendingDown className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {formatCurrency(summary.totalExpenses)}
          </div>
          <p className="text-xs text-muted-foreground">
            {periodText}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}