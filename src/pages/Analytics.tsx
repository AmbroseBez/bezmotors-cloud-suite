
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { 
  BarChart, BarChart3, Calendar, Clock, 
  Filter, Search, TrendingUp, TriangleAlert, 
  DollarSign, Car, BadgeDollarSign 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Chart } from '@/components/dashboard/Chart';
import { StatCard } from '@/components/dashboard/StatCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { VehicleAnalytics } from '@/components/analytics/VehicleAnalytics';
import { SalesAnalytics } from '@/components/analytics/SalesAnalytics';
import { FinancialAnalytics } from '@/components/analytics/FinancialAnalytics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const Analytics = () => {
  const isMobile = useIsMobile();
  const [dateRange, setDateRange] = useState('last30days');
  
  return (
    <div className="flex min-h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 ml-16 md:ml-64 transition-all duration-300 overflow-y-auto">
        <div className="flex flex-col gap-6 max-w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">Analytics Dashboard</h1>
              <p className="text-muted-foreground">Comprehensive vehicle and sales performance data</p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Time Period</SelectLabel>
                    <SelectItem value="last7days">Last 7 Days</SelectItem>
                    <SelectItem value="last30days">Last 30 Days</SelectItem>
                    <SelectItem value="last90days">Last 90 Days</SelectItem>
                    <SelectItem value="lastYear">Last Year</SelectItem>
                    <SelectItem value="allTime">All Time</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size={isMobile ? "sm" : "default"} className="gap-2 whitespace-nowrap">
                <Filter size={16} />
                More Filters
              </Button>
            </div>
          </div>
          
          {/* KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Average Days to Sell" 
              value="32 days"
              icon={<Clock size={24} className="text-primary" />}
              change={{ value: 15, isPositive: true }}
            />
            <StatCard 
              title="Monthly Revenue" 
              value="R3.2M"
              icon={<DollarSign size={24} className="text-primary" />}
              change={{ value: 8.3, isPositive: true }}
            />
            <StatCard 
              title="Inventory Turnover" 
              value="4.8x"
              icon={<TrendingUp size={24} className="text-primary" />}
              change={{ value: 0.6, isPositive: true }}
            />
            <StatCard 
              title="Capital Invested" 
              value="R16.4M"
              icon={<BadgeDollarSign size={24} className="text-primary" />}
              change={{ value: 12, isPositive: false }}
            />
          </div>
          
          {/* Tabbed Analytics Sections */}
          <Tabs defaultValue="vehicles" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="vehicles">
                <Car size={16} className="mr-2" />
                Vehicle Analysis
              </TabsTrigger>
              <TabsTrigger value="sales">
                <BarChart size={16} className="mr-2" />
                Sales Performance
              </TabsTrigger>
              <TabsTrigger value="financial">
                <DollarSign size={16} className="mr-2" />
                Financial Metrics
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="vehicles" className="mt-4">
              <VehicleAnalytics dateRange={dateRange} />
            </TabsContent>
            
            <TabsContent value="sales" className="mt-4">
              <SalesAnalytics dateRange={dateRange} />
            </TabsContent>
            
            <TabsContent value="financial" className="mt-4">
              <FinancialAnalytics dateRange={dateRange} />
            </TabsContent>
          </Tabs>
          
          {/* Insights Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Key Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full text-green-700">
                      <TrendingUp size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Top Performers</h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        Luxury SUVs experienced a 24% increase in sales compared to last quarter.
                      </p>
                      <ul className="space-y-1 text-sm">
                        <li className="flex justify-between">
                          <span>BMW X5</span>
                          <span className="font-medium">42 units</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Range Rover Sport</span>
                          <span className="font-medium">38 units</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Tesla Model Y</span>
                          <span className="font-medium">35 units</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-100 p-2 rounded-full text-amber-700">
                      <TriangleAlert size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Attention Needed</h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        These vehicles have been in inventory for over 60 days.
                      </p>
                      <ul className="space-y-1 text-sm">
                        <li className="flex justify-between">
                          <span>2021 Audi A4 (VIN-3291)</span>
                          <span className="font-medium">78 days</span>
                        </li>
                        <li className="flex justify-between">
                          <span>2022 Ford F-150 (VIN-8854)</span>
                          <span className="font-medium">65 days</span>
                        </li>
                        <li className="flex justify-between">
                          <span>2020 Toyota Camry (VIN-4422)</span>
                          <span className="font-medium">62 days</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
