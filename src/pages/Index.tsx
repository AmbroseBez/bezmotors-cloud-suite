
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatCard } from '@/components/dashboard/StatCard';
import { Chart } from '@/components/dashboard/Chart';
import { DollarSign, TrendingUp, Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

// Reset mock data with generic placeholders
const salesData = [
  { name: 'Jan', sales: 30 },
  { name: 'Feb', sales: 45 },
  { name: 'Mar', sales: 52 },
  { name: 'Apr', sales: 48 },
  { name: 'May', sales: 61 },
  { name: 'Jun', sales: 65 },
];

// Add advertising cost data
const advertisingData = [
  { name: 'Online', cost: 2500 },
  { name: 'Social Media', cost: 1800 },
  { name: 'Print', cost: 950 },
  { name: 'TV/Radio', cost: 3200 },
  { name: 'Events', cost: 1200 },
];

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen bg-background overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 p-4 md:p-6 ml-16 md:ml-64 transition-all duration-300 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back to BezMegaMotors Management System</p>
          </div>
          
          <div className="flex w-full md:w-auto items-center gap-4">
            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search..." 
                className="pl-9 w-full md:w-64"
              />
            </div>
            
            <Button size="icon" variant="outline">
              <Bell size={18} />
            </Button>
          </div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
          <StatCard 
            title="Monthly Revenue" 
            value="R258,430"
            icon={<DollarSign size={24} className="text-primary" />}
            change={{ value: 8.5, isPositive: true }}
            className="animate-slide-in [animation-delay:200ms]"
          />
          <StatCard 
            title="Ad Spend" 
            value="R9,650"
            icon={<TrendingUp size={24} className="text-primary" />}
            change={{ value: 3, isPositive: false }}
            className="animate-slide-in [animation-delay:400ms]"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
          <div>
            <Chart 
              title="Monthly Sales Performance" 
              data={salesData} 
              type="line"
              dataKey="sales"
            />
          </div>
          <div>
            <Chart 
              title="Advertising Costs" 
              data={advertisingData} 
              type="bar"
              dataKey="cost"
              xAxisDataKey="name"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
