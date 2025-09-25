'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils/finance';
import type { MonthlyData } from '@/lib/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IncomeVsExpensesChartProps {
  data: MonthlyData[];
}

export function IncomeVsExpensesChart({ data }: IncomeVsExpensesChartProps) {
  const chartData = {
    labels: data.map(d => d.month),
    datasets: [
      {
        label: 'Income',
        data: data.map(d => d.income),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: data.map(d => d.expenses),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Income vs Expenses',
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: { dataset: { label: string }; parsed: { y: number } }) {
            return `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: number) {
            return formatCurrency(value);
          }
        }
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Monthly Income vs Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <Bar data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}