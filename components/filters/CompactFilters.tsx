'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CATEGORIES, DEFAULT_FILTER } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { FilterState } from '@/lib/types';

interface CompactFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  className?: string;
}

export function CompactFilters({ filters, onFiltersChange, className }: CompactFiltersProps) {
  const [showCustomDates, setShowCustomDates] = useState(filters.period === 'custom');

  const updateFilter = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };

    if (key === 'period') {
      setShowCustomDates(value === 'custom');
      if (value !== 'custom') {
        delete newFilters.customStart;
        delete newFilters.customEnd;
      }
    }

    onFiltersChange(newFilters);
  };

  const resetFilters = () => {
    onFiltersChange(DEFAULT_FILTER);
    setShowCustomDates(false);
  };

  const hasActiveFilters = filters !== DEFAULT_FILTER ||
    (filters.period === 'custom' && (filters.customStart || filters.customEnd));

  return (
    <div className={cn('bg-card border border-border rounded-lg p-3', className)}>
      <div className="flex flex-wrap items-center gap-3">
        {/* Type Filter */}
        <div className="flex items-center gap-2">
          <Label className="text-xs font-medium">Type:</Label>
          <Select value={filters.type} onValueChange={(value) => updateFilter('type', value)}>
            <SelectTrigger className="h-8 w-24 text-xs">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <Label className="text-xs font-medium">Category:</Label>
          <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
            <SelectTrigger className="h-8 w-32 text-xs">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {CATEGORIES.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Period Filter */}
        <div className="flex items-center gap-2">
          <Label className="text-xs font-medium">Period:</Label>
          <Select value={filters.period} onValueChange={(value) => updateFilter('period', value)}>
            <SelectTrigger className="h-8 w-32 text-xs">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-month">Current</SelectItem>
              <SelectItem value="last-month">Last</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => {
              const today = new Date();
              const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
              const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

              updateFilter('period', 'custom');
              updateFilter('customStart', lastMonth.toISOString().split('T')[0]);
              updateFilter('customEnd', lastMonthEnd.toISOString().split('T')[0]);
              setShowCustomDates(true);
            }}
          >
            Last Month
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => {
              const today = new Date();
              const startOfYear = new Date(today.getFullYear(), 0, 1);

              updateFilter('period', 'custom');
              updateFilter('customStart', startOfYear.toISOString().split('T')[0]);
              updateFilter('customEnd', today.toISOString().split('T')[0]);
              setShowCustomDates(true);
            }}
          >
            YTD
          </Button>
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={resetFilters}
          >
            Reset
          </Button>
        )}
      </div>

      {/* Custom Date Range */}
      {showCustomDates && (
        <div className="flex gap-3 mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <Label className="text-xs font-medium">Start:</Label>
            <Input
              type="date"
              value={filters.customStart || ''}
              onChange={(e) => updateFilter('customStart', e.target.value)}
              className="h-7 text-xs w-32"
            />
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-xs font-medium">End:</Label>
            <Input
              type="date"
              value={filters.customEnd || ''}
              onChange={(e) => updateFilter('customEnd', e.target.value)}
              className="h-7 text-xs w-32"
            />
          </div>
        </div>
      )}
    </div>
  );
}