
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Package, Filter, Search, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatCard } from '@/components/dashboard/StatCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { AddPartDialog } from '@/components/parts/AddPartDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Generic vehicle data
const vehicles = [
  { id: 'VIN-12345', title: '2022 Tesla Model 3' },
  { id: 'VIN-67890', title: '2023 BMW X5' },
  { id: 'VIN-54321', title: '2021 Ford F-150' },
];

// Mock data for parts
const partData = [
  { 
    id: 'P-1001', 
    name: 'Oil Filter', 
    partNumber: 'OF-12345', 
    category: 'Engine', 
    price: 12.99, 
    quantity: 45, 
    vehicleId: null,
    location: 'Shelf A3' 
  },
  { 
    id: 'P-1002', 
    name: 'Air Filter', 
    partNumber: 'AF-67890', 
    category: 'Engine', 
    price: 15.99, 
    quantity: 32, 
    vehicleId: null,
    location: 'Shelf B2' 
  },
  { 
    id: 'P-1003', 
    name: 'Brake Pads', 
    partNumber: 'BP-24680', 
    category: 'Brakes', 
    price: 45.50, 
    quantity: 18, 
    vehicleId: 'VIN-12345',
    location: 'Shelf C4' 
  },
  { 
    id: 'P-1004', 
    name: 'Spark Plugs (Set of 4)', 
    partNumber: 'SP-13579', 
    category: 'Engine', 
    price: 28.75, 
    quantity: 23, 
    vehicleId: 'VIN-67890',
    location: 'Shelf A5' 
  },
  { 
    id: 'P-1005', 
    name: 'Cabin Air Filter', 
    partNumber: 'CAF-35791', 
    category: 'Interior', 
    price: 18.25, 
    quantity: 27, 
    vehicleId: null,
    location: 'Shelf B1' 
  },
  { 
    id: 'P-1006', 
    name: 'Wiper Blades', 
    partNumber: 'WB-24682', 
    category: 'Body', 
    price: 22.99, 
    quantity: 36, 
    vehicleId: 'VIN-54321',
    location: 'Shelf D3' 
  },
];

const Parts = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter parts based on search query, selected vehicle, and active tab
  const filteredParts = partData.filter(part => {
    // Filter by search query
    const matchesSearch = 
      part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by selected vehicle
    const matchesVehicle = selectedVehicle ? part.vehicleId === selectedVehicle : true;
    
    // Filter by tab
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'assigned' && part.vehicleId) || 
      (activeTab === 'unassigned' && !part.vehicleId);
    
    return matchesSearch && matchesVehicle && matchesTab;
  });
  
  const getVehicleName = (vehicleId: string | null) => {
    if (!vehicleId) return 'Not Assigned';
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle ? vehicle.title : 'Unknown Vehicle';
  };
  
  return (
    <div className="flex min-h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 ml-16 md:ml-64 transition-all duration-300 overflow-y-auto">
        <div className="flex flex-col gap-4 md:gap-6 max-w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">Parts Inventory</h1>
            <AddPartDialog />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <StatCard 
              title="Total Parts" 
              value="1,254" 
              icon={<Package size={24} className="text-primary" />}
              change={{ value: 42, isPositive: true }}
            />
            <StatCard 
              title="Assigned Parts" 
              value="542" 
              icon={<Car size={24} className="text-primary" />}
            />
            <StatCard 
              title="Low Stock Items" 
              value="38" 
              icon={<Package size={24} className="text-primary" />}
              change={{ value: 5, isPositive: false }}
            />
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  className="pl-10 w-full" 
                  placeholder="Search parts..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="w-full md:w-64">
                <Select 
                  value={selectedVehicle || ''} 
                  onValueChange={(value) => setSelectedVehicle(value || null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Vehicles</SelectItem>
                    {vehicles.map(vehicle => (
                      <SelectItem key={vehicle.id} value={vehicle.id}>
                        {vehicle.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button variant="outline" size={isMobile ? "sm" : "default"} className="gap-2 w-full md:w-auto">
                <Filter size={16} />
                More Filters
              </Button>
            </div>
            
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Parts</TabsTrigger>
                <TabsTrigger value="assigned">Assigned to Vehicles</TabsTrigger>
                <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                {renderPartsTable()}
              </TabsContent>
              
              <TabsContent value="assigned" className="mt-0">
                {renderPartsTable()}
              </TabsContent>
              
              <TabsContent value="unassigned" className="mt-0">
                {renderPartsTable()}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
  
  function renderPartsTable() {
    return filteredParts.length > 0 ? (
      <div className="bg-card rounded-lg border w-full overflow-x-auto">
        <div className="min-w-full">
          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Part Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Assigned Vehicle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-background divide-y divide-border">
              {filteredParts.map((part) => (
                <tr key={part.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{part.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{part.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{part.partNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{part.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">R{part.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{part.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {part.vehicleId ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {getVehicleName(part.vehicleId)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Not Assigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{part.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ) : (
      <div className="bg-card rounded-lg p-4 border w-full text-center py-12">
        <h3 className="text-xl font-medium mb-2">No Parts Found</h3>
        <p className="text-muted-foreground">
          {searchQuery || selectedVehicle ? 
            "No parts match your search criteria. Try adjusting your filters." :
            "No parts are currently in the inventory. Add some parts to get started."
          }
        </p>
      </div>
    );
  }
};

export default Parts;
