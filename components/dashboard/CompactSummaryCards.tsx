'use client';

import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/finance';
import type { FinancialSummary } from '@/lib/types';

interface CompactSummaryCardsProps {
  summary: FinancialSummary;
}

export function CompactSummaryCards({ summary }: CompactSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {/* Total Balance Card */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Balance</div>
              <div className={`text-lg font-semibold ${
                summary.totalBalance >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatCurrency(summary.totalBalance)}
              </div>
            </div>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      {/* Total Income Card */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Income</div>
              <div className="text-lg font-semibold text-green-600">
                {formatCurrency(summary.totalIncome)}
              </div>
            </div>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </div>
        </CardContent>
      </Card>

      {/* Total Expenses Card */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Expenses</div>
              <div className="text-lg font-semibold text-red-600">
                {formatCurrency(summary.totalExpenses)}
              </div>
            </div>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}