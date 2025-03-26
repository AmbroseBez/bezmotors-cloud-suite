
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatCard } from '@/components/dashboard/StatCard';
import { VehicleCard } from '@/components/dashboard/VehicleCard';
import { Chart } from '@/components/dashboard/Chart';
import { Car, DollarSign, Users, TrendingUp, Search, Bell, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data
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

const vehicles = [
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
  {
    id: 'VIN-54321',
    title: '2021 Ford F-150',
    image: 'https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 48500,
    year: 2021,
    mileage: 15800,
    fuelType: 'Diesel',
    status: 'Sold' as const,
  },
];

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back to BezMegaMotors Management System</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search..." 
                className="pl-9 w-64"
              />
            </div>
            
            <Button size="icon" variant="outline">
              <Bell size={18} />
            </Button>
          </div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Vehicles" 
            value="124"
            icon={<Car size={24} className="text-primary" />}
            change={{ value: 12, isPositive: true }}
            className="animate-slide-in [animation-delay:100ms]"
          />
          <StatCard 
            title="Monthly Revenue" 
            value="$258,430"
            icon={<DollarSign size={24} className="text-primary" />}
            change={{ value: 8.5, isPositive: true }}
            className="animate-slide-in [animation-delay:200ms]"
          />
          <StatCard 
            title="Active Customers" 
            value="87"
            icon={<Users size={24} className="text-primary" />}
            change={{ value: 5, isPositive: true }}
            className="animate-slide-in [animation-delay:300ms]"
          />
          <StatCard 
            title="Deals Closed" 
            value="17"
            icon={<TrendingUp size={24} className="text-primary" />}
            change={{ value: 3, isPositive: false }}
            className="animate-slide-in [animation-delay:400ms]"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
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
              title="Inventory by Type" 
              data={inventoryData} 
              dataKey="count"
              xAxisDataKey="name"
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Recent Inventory</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter size={16} className="mr-2" />
                Filter
              </Button>
              <Button size="sm">
                <Plus size={16} className="mr-2" />
                Add Vehicle
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Vehicles</TabsTrigger>
              <TabsTrigger value="in-stock">In Stock</TabsTrigger>
              <TabsTrigger value="reserved">Reserved</TabsTrigger>
              <TabsTrigger value="sold">Sold</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
