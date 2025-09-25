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

interface CompactExpenseBreakdownChartProps {
  data: CategoryBreakdown[];
}

export function CompactExpenseBreakdownChart({ data }: CompactExpenseBreakdownChartProps) {
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
          font: {
            size: 10,
          },
          padding: 8,
          generateLabels: function(chart: { data: { labels: string[]; datasets: { data: number[]; backgroundColor: string[] }[] } }) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const dataset = data.datasets[0];
                const value = dataset.data[i];
                const total = dataset.data.reduce((a: number, b: number) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);

                return {
                  text: `${label} (${percentage}%)`,
                  fillStyle: dataset.backgroundColor[i],
                  hidden: false,
                  index: i
                };
              });
            }
            return [];
          }
        },
      },
      title: {
        display: true,
        text: 'Expense Breakdown',
        font: {
          size: 12,
          weight: 'bold' as const,
        },
        padding: 8,
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
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Expense Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-48 flex items-center justify-center text-xs text-muted-foreground">
            No expense data
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-48">
          <Pie data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}