
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatCard } from '@/components/dashboard/StatCard';
import { VehicleCard } from '@/components/dashboard/VehicleCard';
import { Chart } from '@/components/dashboard/Chart';
import { Car, DollarSign, Package, TrendingUp, Search, Bell, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

const inventoryData = [
  { name: 'SUV', count: 12 },
  { name: 'Sedan', count: 19 },
  { name: 'Truck', count: 8 },
  { name: 'Sport', count: 5 },
  { name: 'Luxury', count: 7 },
];

// Generic vehicle data without specific images
const vehicles = [
  {
    id: 'VIN-12345',
    title: '2022 Tesla Model 3',
    image: 'https://placehold.co/600x400/e4e4e7/71717a?text=Vehicle+Image',
    price: 42990,
    year: 2022,
    mileage: 12500,
    fuelType: 'Electric',
    status: 'In Stock' as const,
  },
  {
    id: 'VIN-67890',
    title: '2023 BMW X5',
    image: 'https://placehold.co/600x400/e4e4e7/71717a?text=Vehicle+Image',
    price: 65750,
    year: 2023,
    mileage: 8200,
    fuelType: 'Gasoline',
    status: 'Reserved' as const,
  },
  {
    id: 'VIN-54321',
    title: '2021 Ford F-150',
    image: 'https://placehold.co/600x400/e4e4e7/71717a?text=Vehicle+Image',
    price: 48500,
    year: 2021,
    mileage: 15800,
    fuelType: 'Diesel',
    status: 'Sold' as const,
  },
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
          <StatCard 
            title="Total Vehicles" 
            value="124"
            icon={<Car size={24} className="text-primary" />}
            change={{ value: 12, isPositive: true }}
            className="animate-slide-in [animation-delay:100ms]"
          />
          <StatCard 
            title="Monthly Revenue" 
            value="R258,430"
            icon={<DollarSign size={24} className="text-primary" />}
            change={{ value: 8.5, isPositive: true }}
            className="animate-slide-in [animation-delay:200ms]"
          />
          <StatCard 
            title="Parts Inventory" 
            value="1,245"
            icon={<Package size={24} className="text-primary" />}
            change={{ value: 5, isPositive: true }}
            className="animate-slide-in [animation-delay:300ms]"
          />
          <StatCard 
            title="Ad Spend" 
            value="R9,650"
            icon={<TrendingUp size={24} className="text-primary" />}
            change={{ value: 3, isPositive: false }}
            className="animate-slide-in [animation-delay:400ms]"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
          <div className="lg:col-span-2">
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
              dataKey="cost"
              xAxisDataKey="name"
            />
          </div>
        </div>
        
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <h2 className="text-xl md:text-2xl font-semibold">Recent Inventory</h2>
            <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" size="sm" className="flex-1 md:flex-initial">
                <Filter size={16} className="mr-2" />
                Filter
              </Button>
              <Button size="sm" className="flex-1 md:flex-initial">
                <Plus size={16} className="mr-2" />
                Add Vehicle
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-6 w-full overflow-x-auto">
              <TabsTrigger value="all">All Vehicles</TabsTrigger>
              <TabsTrigger value="in-stock">In Stock</TabsTrigger>
              <TabsTrigger value="reserved">Reserved</TabsTrigger>
              <TabsTrigger value="sold">Sold</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {vehicles.map((vehicle, index) => (
                  <VehicleCard 
                    key={vehicle.id} 
                    vehicle={vehicle}
                    className={`animate-fade-in [animation-delay:${index*100}ms]`}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="in-stock" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {vehicles
                  .filter(v => v.status === 'In Stock')
                  .map((vehicle, index) => (
                    <VehicleCard 
                      key={vehicle.id} 
                      vehicle={vehicle}
                      className={`animate-fade-in [animation-delay:${index*100}ms]`}
                    />
                  ))
                }
              </div>
            </TabsContent>
            
            <TabsContent value="reserved" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {vehicles
                  .filter(v => v.status === 'Reserved')
                  .map((vehicle, index) => (
                    <VehicleCard 
                      key={vehicle.id} 
                      vehicle={vehicle}
                      className={`animate-fade-in [animation-delay:${index*100}ms]`}
                    />
                  ))
                }
              </div>
            </TabsContent>
            
            <TabsContent value="sold" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {vehicles
                  .filter(v => v.status === 'Sold')
                  .map((vehicle, index) => (
                    <VehicleCard 
                      key={vehicle.id} 
                      vehicle={vehicle}
                      className={`animate-fade-in [animation-delay:${index*100}ms]`}
                    />
                  ))
                }
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
