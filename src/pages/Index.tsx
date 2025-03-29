
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatCard } from '@/components/dashboard/StatCard';
import { Chart } from '@/components/dashboard/Chart';
import { DollarSign, TrendingUp, Search, Bell, Car, Clock, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
import { VehicleCard } from '@/components/dashboard/VehicleCard';

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

// Add vehicle performance data
const vehiclePerformanceData = [
  { name: 'SUV', avgSellTime: 28 },
  { name: 'Sedan', avgSellTime: 35 },
  { name: 'Luxury', avgSellTime: 25 },
  { name: 'Electric', avgSellTime: 21 },
  { name: 'Truck', avgSellTime: 42 },
];

// Sample vehicles data
const featuredVehicles = [
  {
    id: 'VIN-12345',
    title: '2022 Tesla Model 3',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    price: 42990,
    year: 2022,
    mileage: 12500,
    fuelType: 'Electric',
    status: 'In Stock' as const,
  },
  {
    id: 'VIN-67890',
    title: '2023 BMW X5',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 65750,
    year: 2023,
    mileage: 8200,
    fuelType: 'Gasoline',
    status: 'Reserved' as const,
  },
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
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-6">
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
          <StatCard 
            title="Vehicles in Stock" 
            value="124"
            icon={<Car size={24} className="text-primary" />}
            change={{ value: 5, isPositive: true }}
            className="animate-slide-in [animation-delay:600ms]"
          />
          <StatCard 
            title="Avg. Days to Sell" 
            value="32"
            icon={<Clock size={24} className="text-primary" />}
            change={{ value: 15, isPositive: true }}
            className="animate-slide-in [animation-delay:800ms]"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
          <div className="lg:col-span-1">
            <Chart 
              title="Monthly Sales Performance" 
              data={salesData} 
              type="line"
              dataKey="sales"
            />
          </div>
          <div className="lg:col-span-1">
            <Chart 
              title="Advertising Costs" 
              data={advertisingData} 
              type="bar"
              dataKey="cost"
              xAxisDataKey="name"
            />
          </div>
          <div className="lg:col-span-1">
            <Chart 
              title="Avg. Days to Sell by Type" 
              data={vehiclePerformanceData} 
              type="bar"
              dataKey="avgSellTime"
              xAxisDataKey="name"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Featured Vehicles</h2>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link to="/inventory" className="flex items-center gap-2">
                  <Car size={16} />
                  Inventory
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/analytics" className="flex items-center gap-2">
                  <BarChart3 size={16} />
                  Full Analytics
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {featuredVehicles.map((vehicle, index) => (
              <VehicleCard 
                key={vehicle.id} 
                vehicle={vehicle}
                className={`animate-fade-in [animation-delay:${index*100}ms]`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
