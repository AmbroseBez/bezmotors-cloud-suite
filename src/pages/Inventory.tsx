
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Car, Filter, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatCard } from '@/components/dashboard/StatCard';

const Inventory = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 pl-[calc(16rem+24px)]">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Vehicle Inventory</h1>
            <Button className="gap-2">
              <Plus size={16} />
              Add Vehicle
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input className="pl-10" placeholder="Search inventory..." />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter size={16} />
                Filters
              </Button>
            </div>
            
            <div className="bg-card rounded-lg p-4 border">
              <div className="text-center py-20 text-muted-foreground">
                <h3 className="text-xl font-medium mb-2">Inventory Data Will Appear Here</h3>
                <p>This is a placeholder for the inventory table or grid layout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
