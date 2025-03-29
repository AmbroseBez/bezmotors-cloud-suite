
import React from 'react';
import { Chart } from '@/components/dashboard/Chart';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { TrendingDown, TrendingUp } from 'lucide-react';

type FinancialAnalyticsProps = {
  dateRange: string;
};

// Mock data for revenue vs expense
const revenueExpenseData = [
  { name: 'Jan', revenue: 3250000, expenses: 2650000 },
  { name: 'Feb', revenue: 2980000, expenses: 2450000 },
  { name: 'Mar', revenue: 3420000, expenses: 2720000 },
  { name: 'Apr', revenue: 3680000, expenses: 2820000 },
  { name: 'May', revenue: 3520000, expenses: 2750000 },
  { name: 'Jun', revenue: 3950000, expenses: 3050000 },
];

// Mock data for capital allocation
const capitalData = [
  { category: 'Used Vehicle Inventory', amount: 9800000 },
  { category: 'New Vehicle Inventory', amount: 4200000 },
  { category: 'Facilities & Equipment', amount: 1600000 },
  { category: 'Marketing & Advertising', amount: 800000 },
];

// Mock data for turnover by category
const turnoverData = [
  { name: 'Luxury', turnover: 5.2 },
  { name: 'SUV', turnover: 4.8 },
  { name: 'Sedan', turnover: 4.5 },
  { name: 'Hatchback', turnover: 4.1 },
  { name: 'Truck', turnover: 3.2 },
];

// Financial metrics
const financialMetrics = [
  { metric: 'Gross Profit Margin', value: '18.5%', change: 2.1, isPositive: true },
  { metric: 'Average Cost per Vehicle', value: 'R425,000', change: 5.2, isPositive: false },
  { metric: 'Return on Investment', value: '24.2%', change: 3.5, isPositive: true },
  { metric: 'Inventory Carrying Cost', value: 'R482,000/month', change: 1.8, isPositive: false },
  { metric: 'Net Profit', value: 'R5.4M', change: 12.6, isPositive: true },
];

export function FinancialAnalytics({ dateRange }: FinancialAnalyticsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="neo-card p-6 col-span-1 lg:col-span-2">
        <h3 className="font-medium text-lg mb-4">Revenue vs. Expenses</h3>
        <div className="h-[300px]">
          <Chart 
            title="" 
            data={revenueExpenseData} 
            type="bar"
            dataKey="revenue"
            xAxisDataKey="name"
          />
        </div>
      </div>
      
      <div className="neo-card p-6">
        <h3 className="font-medium text-lg mb-4">Capital Allocation</h3>
        <div className="h-[300px]">
          <Chart 
            title="" 
            data={capitalData} 
            type="bar"
            dataKey="amount"
            xAxisDataKey="category"
          />
        </div>
      </div>
      
      <div className="neo-card p-6">
        <h3 className="font-medium text-lg mb-4">Inventory Turnover by Category</h3>
        <div className="h-[300px]">
          <Chart 
            title="" 
            data={turnoverData} 
            type="bar"
            dataKey="turnover"
            xAxisDataKey="name"
          />
        </div>
      </div>
      
      <div className="neo-card p-6 col-span-1 lg:col-span-2">
        <h3 className="font-medium text-lg mb-4">Key Financial Metrics</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead className="text-right">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {financialMetrics.map((item) => (
                <TableRow key={item.metric}>
                  <TableCell className="font-medium">{item.metric}</TableCell>
                  <TableCell className="text-right">{item.value}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {item.isPositive ? (
                        <TrendingUp size={16} className="text-green-500" />
                      ) : (
                        <TrendingDown size={16} className="text-red-500" />
                      )}
                      <span className={item.isPositive ? "text-green-500" : "text-red-500"}>
                        {item.isPositive ? "+" : ""}{item.change}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
