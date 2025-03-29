
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

type VehicleAnalyticsProps = {
  dateRange: string;
};

// Mock data for vehicle costs
const vehicleCostData = [
  { name: 'SUV', avgCost: 420000, avgProfit: 68000, count: 45 },
  { name: 'Sedan', avgCost: 280000, avgProfit: 42000, count: 62 },
  { name: 'Hatchback', avgCost: 220000, avgProfit: 32000, count: 38 },
  { name: 'Truck', avgCost: 520000, avgProfit: 75000, count: 22 },
  { name: 'Luxury', avgCost: 780000, avgProfit: 120000, count: 18 },
];

// Mock data for days to sell by vehicle type
const daysToSellData = [
  { name: 'SUV', days: 28 },
  { name: 'Sedan', days: 35 },
  { name: 'Hatchback', days: 30 },
  { name: 'Truck', days: 42 },
  { name: 'Luxury', days: 25 },
];

// Mock data for popular models
const popularModels = [
  { model: 'Tesla Model 3', count: 28, avgDaysToSell: 18, avgProfit: 58000 },
  { model: 'Toyota RAV4', count: 24, avgDaysToSell: 22, avgProfit: 45000 },
  { model: 'Honda Civic', count: 22, avgDaysToSell: 25, avgProfit: 32000 },
  { model: 'Ford F-150', count: 20, avgDaysToSell: 32, avgProfit: 72000 },
  { model: 'BMW X5', count: 18, avgDaysToSell: 28, avgProfit: 95000 },
];

export function VehicleAnalytics({ dateRange }: VehicleAnalyticsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="neo-card p-6">
        <h3 className="font-medium text-lg mb-4">Vehicle Cost Analysis</h3>
        <div className="h-[300px]">
          <Chart 
            title="" 
            data={vehicleCostData} 
            type="bar"
            dataKey="avgCost"
            xAxisDataKey="name"
          />
        </div>
      </div>
      
      <div className="neo-card p-6">
        <h3 className="font-medium text-lg mb-4">Days to Sell by Type</h3>
        <div className="h-[300px]">
          <Chart 
            title="" 
            data={daysToSellData} 
            type="bar"
            dataKey="days"
            xAxisDataKey="name"
          />
        </div>
      </div>
      
      <div className="neo-card p-6 col-span-1 lg:col-span-2">
        <h3 className="font-medium text-lg mb-4">Most Popular Models</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model</TableHead>
                <TableHead className="text-right">Units Sold</TableHead>
                <TableHead className="text-right">Avg. Days to Sell</TableHead>
                <TableHead className="text-right">Avg. Profit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {popularModels.map((model) => (
                <TableRow key={model.model}>
                  <TableCell className="font-medium">{model.model}</TableCell>
                  <TableCell className="text-right">{model.count}</TableCell>
                  <TableCell className="text-right">{model.avgDaysToSell} days</TableCell>
                  <TableCell className="text-right">R{model.avgProfit.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
