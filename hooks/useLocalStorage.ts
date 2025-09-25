'use client';

import { useState, useCallback } from 'react';
import type { Transaction } from '@/lib/types';

const STORAGE_KEY = 'personal-finance-transactions';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
}

export function useTransactions() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(STORAGE_KEY, []);

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTransactions(prev => [...prev, newTransaction]);
  }, [setTransactions]);

  const updateTransaction = useCallback((id: string, updates: Partial<Omit<Transaction, 'id' | 'createdAt'>>) => {
    setTransactions(prev => prev.map(transaction =>
      transaction.id === id
        ? { ...transaction, ...updates, updatedAt: new Date().toISOString() }
        : transaction
    ));
  }, [setTransactions]);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(transaction => transaction.id !== id));
  }, [setTransactions]);

  const clearTransactions = useCallback(() => {
    setTransactions([]);
  }, [setTransactions]);

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    clearTransactions,
  };
}