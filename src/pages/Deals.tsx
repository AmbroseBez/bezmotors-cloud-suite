
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Clipboard, Filter, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatCard } from '@/components/dashboard/StatCard';

const Deals = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 pl-[calc(16rem+24px)]">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Deals & Contracts</h1>
            <Button className="gap-2">
              <Plus size={16} />
              New Deal
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard 
              title="Active Deals" 
              value="46" 
              icon={<Clipboard size={24} className="text-primary" />}
              change={{ value: 8, isPositive: true }}
            />
            <StatCard 
              title="Completed This Month" 
              value="32" 
              icon={<Clipboard size={24} className="text-primary" />}
            />
            <StatCard 
              title="Pending Approvals" 
              value="14" 
              icon={<Clipboard size={24} className="text-primary" />}
            />
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input className="pl-10" placeholder="Search deals..." />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter size={16} />
                Filters
              </Button>
            </div>
            
            <div className="bg-card rounded-lg p-4 border">
              <div className="text-center py-20 text-muted-foreground">
                <h3 className="text-xl font-medium mb-2">Deals Data Will Appear Here</h3>
                <p>This is a placeholder for the deals table or grid layout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deals;
