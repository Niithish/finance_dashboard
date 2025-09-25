'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Edit, Trash2, Plus } from 'lucide-react';
import { TransactionForm } from '@/components/forms/TransactionForm';
import { CATEGORIES } from '@/lib/constants';
import { formatDate, formatCurrency } from '@/lib/utils/finance';
import type { Transaction } from '@/lib/types';

interface TransactionListProps {
  transactions: Transaction[];
  onUpdateTransaction: (id: string, updates: Partial<Omit<Transaction, 'id' | 'createdAt'>>) => void;
  onDeleteTransaction: (id: string) => void;
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export function TransactionList({ transactions, onUpdateTransaction, onDeleteTransaction, onAddTransaction }: TransactionListProps) {
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null);

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleDelete = (transaction: Transaction) => {
    setTransactionToDelete(transaction);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (transactionToDelete) {
      onDeleteTransaction(transactionToDelete.id);
      setDeleteDialogOpen(false);
      setTransactionToDelete(null);
    }
  };

  const getCategoryInfo = (categoryId: string) => {
    return CATEGORIES.find(cat => cat.id === categoryId);
  };

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Transactions</CardTitle>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No transactions found. Add your first transaction to get started!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedTransactions.map((transaction) => {
                  const categoryInfo = getCategoryInfo(transaction.category);
                  return (
                    <TableRow key={transaction.id}>
                      <TableCell>{formatDate(transaction.date)}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: categoryInfo?.color || '#6b7280' }}
                          />
                          {categoryInfo?.name || transaction.category}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            transaction.type === 'income'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </TableCell>
                      <TableCell className={`text-right font-medium ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(transaction)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(transaction)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={!!editingTransaction} onOpenChange={() => setEditingTransaction(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Transaction</DialogTitle>
            </DialogHeader>
            {editingTransaction && (
              <TransactionForm
                initialData={editingTransaction}
                title="Edit Transaction"
                onSubmit={(updates) => {
                  onUpdateTransaction(editingTransaction.id, updates);
                  setEditingTransaction(null);
                }}
                onCancel={() => setEditingTransaction(null)}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Add Dialog */}
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Transaction</DialogTitle>
            </DialogHeader>
            <TransactionForm
              title="Add Transaction"
              onSubmit={(transaction) => {
                onAddTransaction(transaction);
                setShowAddForm(false);
              }}
              onCancel={() => setShowAddForm(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this transaction? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}