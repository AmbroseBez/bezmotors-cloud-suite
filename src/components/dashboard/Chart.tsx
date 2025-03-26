
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { cn } from '@/lib/utils';

type ChartProps = {
  title: string;
  data: any[];
  type?: 'bar' | 'line';
  className?: string;
  dataKey: string;
  xAxisDataKey?: string;
};

export function Chart({ title, data, type = 'bar', className, dataKey, xAxisDataKey = 'name' }: ChartProps) {
  return (
    <div className={cn(
      "neo-card p-6",
      className
    )}>
      <h3 className="font-medium text-lg mb-4">{title}</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'bar' ? (
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey={xAxisDataKey} 
                tick={{ fontSize: 12 }} 
                tickLine={false}
              />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: 'none', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  fontSize: '12px'
                }} 
              />
              <Bar 
                dataKey={dataKey} 
                fill="rgba(37, 99, 235, 0.8)" 
                radius={[4, 4, 0, 0]} 
                animationDuration={1500}
              />
            </BarChart>
          ) : (
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey={xAxisDataKey} 
                tick={{ fontSize: 12 }} 
                tickLine={false}
              />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: 'none', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  fontSize: '12px'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey={dataKey} 
                stroke="rgba(37, 99, 235, 0.8)" 
                strokeWidth={2} 
                dot={{ stroke: "rgba(37, 99, 235, 0.8)", strokeWidth: 2, r: 4 }}
                activeDot={{ stroke: "rgba(37, 99, 235, 0.8)", strokeWidth: 2, r: 6 }}
                animationDuration={1500}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
