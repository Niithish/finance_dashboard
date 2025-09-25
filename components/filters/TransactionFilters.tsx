'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CATEGORIES, DEFAULT_FILTER } from '@/lib/constants';
import type { FilterState } from '@/lib/types';

interface TransactionFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function TransactionFilters({ filters, onFiltersChange }: TransactionFiltersProps) {
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
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Filters</CardTitle>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Reset Filters
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={filters.type} onValueChange={(value) => updateFilter('type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="period">Period</Label>
            <Select value={filters.period} onValueChange={(value) => updateFilter('period', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-month">Current Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Quick Actions</Label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
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
                onClick={() => {
                  const today = new Date();
                  const startOfYear = new Date(today.getFullYear(), 0, 1);

                  updateFilter('period', 'custom');
                  updateFilter('customStart', startOfYear.toISOString().split('T')[0]);
                  updateFilter('customEnd', today.toISOString().split('T')[0]);
                  setShowCustomDates(true);
                }}
              >
                Year to Date
              </Button>
            </div>
          </div>
        </div>

        {showCustomDates && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t">
            <div className="space-y-2">
              <Label htmlFor="customStart">Start Date</Label>
              <Input
                id="customStart"
                type="date"
                value={filters.customStart || ''}
                onChange={(e) => updateFilter('customStart', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customEnd">End Date</Label>
              <Input
                id="customEnd"
                type="date"
                value={filters.customEnd || ''}
                onChange={(e) => updateFilter('customEnd', e.target.value)}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}