
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Car, Filter, Image, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatCard } from '@/components/dashboard/StatCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { AddVehicleDialog } from '@/components/inventory/AddVehicleDialog';
import { VehicleCard } from '@/components/dashboard/VehicleCard';

// Mock data
const vehicles = [
  {
    id: 'VIN-12345',
    title: '2022 Tesla Model 3',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    images: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
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
    images: [
      'https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    price: 48500,
    year: 2021,
    mileage: 15800,
    fuelType: 'Diesel',
    status: 'Sold' as const,
  },
];

const Inventory = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [showInventory, setShowInventory] = useState(true);
  
  // Filter vehicles based on search query
  const filteredVehicles = vehicles.filter(vehicle => 
    vehicle.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddVehicle = () => {
    setShowInventory(true);
  };
  
  return (
    <div className="flex min-h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 ml-16 md:ml-64 transition-all duration-300 overflow-y-auto">
        <div className="flex flex-col gap-4 md:gap-6 max-w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">Vehicle Inventory</h1>
            <AddVehicleDialog onVehicleAdded={handleAddVehicle} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <StatCard 
              title="Total Vehicles" 
              value="124" 
              icon={<Car size={24} className="text-primary" />}
              change={{ value: 12, isPositive: true }}
            />
            <StatCard 
              title="In Stock" 
              value="98" 
              icon={<Car size={24} className="text-primary" />}
            />
            <StatCard 
              title="On Order" 
              value="26" 
              icon={<Car size={24} className="text-primary" />}
            />
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  className="pl-10 w-full" 
                  placeholder="Search inventory..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size={isMobile ? "sm" : "default"} className="gap-2 w-full md:w-auto">
                <Filter size={16} />
                Filters
              </Button>
            </div>
            
            {showInventory ? (
              filteredVehicles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredVehicles.map((vehicle, index) => (
                    <VehicleCard 
                      key={vehicle.id} 
                      vehicle={vehicle}
                      className={`animate-fade-in [animation-delay:${index*100}ms]`}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-card rounded-lg p-4 border w-full text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No Vehicles Found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery ? 
                      "No vehicles match your search criteria. Try adjusting your filters." :
                      "No vehicles are currently in the inventory. Add some vehicles to get started."
                    }
                  </p>
                </div>
              )
            ) : (
              <div className="bg-card rounded-lg p-4 border w-full overflow-x-auto">
                <div className="text-center py-12 md:py-20 text-muted-foreground">
                  <h3 className="text-xl font-medium mb-2">Inventory Data Will Appear Here</h3>
                  <p>This is a placeholder for the inventory table or grid layout</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
