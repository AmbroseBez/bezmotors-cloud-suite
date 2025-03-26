
import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
};

export function StatCard({ title, value, icon, change, className }: StatCardProps) {
  return (
    <div className={cn(
      "neo-card p-6 animate-scale-in",
      className
    )}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          
          {change && (
            <div className="flex items-center mt-2">
              {change.isPositive ? (
                <TrendingUp size={16} className="text-green-500 mr-1" />
              ) : (
                <TrendingDown size={16} className="text-red-500 mr-1" />
              )}
              <span className={cn(
                "text-sm font-medium",
                change.isPositive ? "text-green-500" : "text-red-500"
              )}>
                {change.isPositive ? "+" : ""}{change.value}%
              </span>
            </div>
          )}
        </div>
        
        <div className="bg-accent p-3 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
}
