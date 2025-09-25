'use client';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils/finance';
import type { CategoryBreakdown } from '@/lib/types';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface ExpenseBreakdownChartProps {
  data: CategoryBreakdown[];
}

export function ExpenseBreakdownChart({ data }: ExpenseBreakdownChartProps) {
  const chartData = {
    labels: data.map(d => d.category),
    datasets: [
      {
        data: data.map(d => d.amount),
        backgroundColor: data.map(d => d.color),
        borderColor: data.map(d => d.color),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'Expense Breakdown by Category',
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: { label: string; parsed: number; raw: number }) {
            const percentage = context.parsed;
            const amount = context.raw;
            return `${context.label}: ${formatCurrency(amount)} (${percentage.toFixed(1)}%)`;
          }
        }
      }
    },
  };

  if (data.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Expense Breakdown by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center text-muted-foreground">
            No expense data available for the selected period
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Expense Breakdown by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <Pie data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}