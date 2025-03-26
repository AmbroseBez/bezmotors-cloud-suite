
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Users, Filter, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatCard } from '@/components/dashboard/StatCard';
import { useIsMobile } from '@/hooks/use-mobile';

const Customers = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 pl-4 md:pl-[calc(16rem+24px)] overflow-x-hidden">
        <div className="flex flex-col gap-4 md:gap-6 max-w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">Customer Management</h1>
            <Button size={isMobile ? "sm" : "default"} className="gap-2 self-start md:self-auto">
              <Plus size={16} />
              Add Customer
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <StatCard 
              title="Total Customers" 
              value="312" 
              icon={<Users size={24} className="text-primary" />}
              change={{ value: 28, isPositive: true }}
            />
            <StatCard 
              title="Active Customers" 
              value="245" 
              icon={<Users size={24} className="text-primary" />}
            />
            <StatCard 
              title="New This Month" 
              value="42" 
              icon={<Users size={24} className="text-primary" />}
            />
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input className="pl-10 w-full" placeholder="Search customers..." />
              </div>
              <Button variant="outline" size={isMobile ? "sm" : "default"} className="gap-2 w-full md:w-auto">
                <Filter size={16} />
                Filters
              </Button>
            </div>
            
            <div className="bg-card rounded-lg p-4 border w-full overflow-x-auto">
              <div className="text-center py-12 md:py-20 text-muted-foreground">
                <h3 className="text-xl font-medium mb-2">Customer Data Will Appear Here</h3>
                <p>This is a placeholder for the customer table or grid layout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
