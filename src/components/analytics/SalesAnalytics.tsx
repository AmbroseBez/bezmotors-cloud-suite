
import React from 'react';
import { Chart } from '@/components/dashboard/Chart';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type SalesAnalyticsProps = {
  dateRange: string;
};

// Mock data for monthly sales
const monthlySalesData = [
  { name: 'Jan', sales: 42, target: 40 },
  { name: 'Feb', sales: 38, target: 40 },
  { name: 'Mar', sales: 45, target: 42 },
  { name: 'Apr', sales: 52, target: 45 },
  { name: 'May', sales: 48, target: 47 },
  { name: 'Jun', sales: 58, target: 50 },
  { name: 'Jul', sales: 62, target: 55 },
  { name: 'Aug', sales: 55, target: 55 },
  { name: 'Sep', sales: 64, target: 58 },
  { name: 'Oct', sales: 68, target: 60 },
  { name: 'Nov', sales: 72, target: 65 },
  { name: 'Dec', sales: 78, target: 70 },
];

// Mock data for sales breakdown
const salesBreakdownData = [
  { name: 'Direct Sales', value: 65 },
  { name: 'Online Leads', value: 25 },
  { name: 'Referrals', value: 10 },
];

// Mock data for salespeople performance
const salespeopleData = [
  { name: 'Sarah Johnson', sales: 42, targetCompletion: 95 },
  { name: 'Michael Chen', sales: 38, targetCompletion: 86 },
  { name: 'David Smith', sales: 35, targetCompletion: 78 },
  { name: 'Jessica Patel', sales: 32, targetCompletion: 72 },
  { name: 'Robert Kim', sales: 28, targetCompletion: 64 },
];

export function SalesAnalytics({ dateRange }: SalesAnalyticsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="neo-card p-6 col-span-1 lg:col-span-2">
        <h3 className="font-medium text-lg mb-4">Monthly Sales Performance</h3>
        <div className="h-[300px]">
          <Chart 
            title="" 
            data={monthlySalesData} 
            type="line"
            dataKey="sales"
            xAxisDataKey="name"
          />
        </div>
      </div>
      
      <div className="neo-card p-6">
        <h3 className="font-medium text-lg mb-4">Sales by Channel</h3>
        <div className="h-[300px]">
          <Chart 
            title="" 
            data={salesBreakdownData} 
            type="bar"
            dataKey="value"
            xAxisDataKey="name"
          />
        </div>
      </div>
      
      <div className="neo-card p-6">
        <h3 className="font-medium text-lg mb-4">Top Sales Staff</h3>
        <div className="space-y-4">
          {salespeopleData.map((person) => (
            <Card key={person.name} className="p-4">
              <CardContent className="p-0">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{person.name}</span>
                  <span className="text-sm text-muted-foreground">{person.sales} vehicles</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Target Completion</span>
                    <span className="font-medium">{person.targetCompletion}%</span>
                  </div>
                  <Progress value={person.targetCompletion} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
