'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CATEGORIES } from '@/lib/constants';
import { validateTransactionForm } from '@/lib/utils/finance';
import type { Transaction, FormErrors } from '@/lib/types';

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  initialData?: Transaction;
  title: string;
}

export function TransactionForm({ onSubmit, onCancel, initialData, title }: TransactionFormProps) {
  const [formData, setFormData] = useState({
    description: initialData?.description || '',
    amount: initialData?.amount || '',
    type: initialData?.type || 'expense' as 'income' | 'expense',
    category: initialData?.category || '',
    date: initialData?.date || new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const filteredCategories = CATEGORIES.filter(cat => cat.type === formData.type);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const transactionData = {
      ...formData,
      amount: Number(formData.amount),
    };

    const validationErrors = validateTransactionForm(transactionData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(transactionData);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleTypeChange = (value: 'income' | 'expense') => {
    updateField('type', value);
    updateField('category', ''); // Reset category when type changes
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Enter description"
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={(e) => updateField('amount', e.target.value)}
              placeholder="0.00"
              className={errors.amount ? 'border-red-500' : ''}
            />
            {errors.amount && (
              <p className="text-sm text-red-500">{errors.amount}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={formData.type} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => updateField('category', value)}>
              <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {filteredCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => updateField('date', e.target.value)}
              className={errors.date ? 'border-red-500' : ''}
            />
            {errors.date && (
              <p className="text-sm text-red-500">{errors.date}</p>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {initialData ? 'Update' : 'Add'} Transaction
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}