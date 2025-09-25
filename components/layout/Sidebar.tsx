'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, TrendingUp, Plus, Settings, ChevronLeft, ChevronRight, Wallet, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/' },
    { icon: Plus, label: 'Add Transaction', href: '/add' },
    { icon: TrendingUp, label: 'Reports', href: '/reports' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <div 
      className={cn(
        'border-r border-border transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64',
        className
      )}
      style={{ backgroundColor: '#0D1617' }}
    >
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Wallet className="h-6 w-6 text-white" />
              <span className="font-semibold text-lg text-white">Finance</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto text-white hover:bg-white/10"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className={cn(
              'w-full justify-start text-white hover:bg-white/10',
              isCollapsed && 'justify-center px-2'
            )}
            title={isCollapsed ? item.label : undefined}
          >
            <item.icon className={cn('h-4 w-4', !isCollapsed && 'mr-3')} />
            {!isCollapsed && item.label}
          </Button>
        ))}
      </nav>

      {/* Quick Stats Section
      <div className="p-4 border-t border-border">
        <div className="space-y-3">
          {!isCollapsed && (
            <div className="text-xs font-medium text-gray-400 mb-2">Quick Stats</div>
          )}
          <div className="flex items-center gap-2 text-xs">
            <TrendingUp className="h-3 w-3 text-green-400" />
            {!isCollapsed && <span className="text-gray-400">Income</span>}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <TrendingDown className="h-3 w-3 text-red-400" />
            {!isCollapsed && <span className="text-gray-400">Expenses</span>}
          </div>
        </div>
      </div> */}
    </div>
  );
}