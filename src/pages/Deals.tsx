
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Clipboard, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatCard } from '@/components/dashboard/StatCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { AddDealDialog } from '@/components/deals/AddDealDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

// Mock deal data
const dealData = [
  { 
    id: 'D-12345', 
    customer: 'John Smith', 
    vehicle: '2022 Tesla Model 3', 
    amount: 42990, 
    date: new Date(2023, 6, 15), 
    status: 'Completed' 
  },
  { 
    id: 'D-12346', 
    customer: 'Jane Doe', 
    vehicle: '2023 BMW X5', 
    amount: 65750, 
    date: new Date(2023, 7, 2), 
    status: 'Pending' 
  },
  { 
    id: 'D-12347', 
    customer: 'Robert Johnson', 
    vehicle: '2021 Ford F-150', 
    amount: 48500, 
    date: new Date(2023, 7, 10), 
    status: 'Processing' 
  },
];

const Deals = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter deals based on search query
  const filteredDeals = dealData.filter(deal => 
    deal.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deal.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deal.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-amber-100 text-amber-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="flex min-h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 ml-16 md:ml-64 transition-all duration-300 overflow-y-auto">
        <div className="flex flex-col gap-4 md:gap-6 max-w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">Deals & Contracts</h1>
            <AddDealDialog />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
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
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  className="pl-10 w-full" 
                  placeholder="Search deals..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size={isMobile ? "sm" : "default"} className="gap-2 w-full md:w-auto">
                <Filter size={16} />
                Filters
              </Button>
            </div>
            
            {filteredDeals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDeals.map((deal) => (
                  <Card key={deal.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{deal.id}</CardTitle>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(deal.status)}`}>
                          {deal.status}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Customer:</span>
                          <span className="text-sm font-medium">{deal.customer}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Vehicle:</span>
                          <span className="text-sm font-medium">{deal.vehicle}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Amount:</span>
                          <span className="text-sm font-medium">${deal.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Date:</span>
                          <span className="text-sm font-medium">{format(deal.date, 'PP')}</span>
                        </div>
                        <div className="pt-4 flex space-x-2">
                          <Button size="sm" className="flex-1">View Details</Button>
                          <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-card rounded-lg p-4 border w-full text-center py-12">
                <h3 className="text-xl font-medium mb-2">No Deals Found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? 
                    "No deals match your search criteria. Try adjusting your filters." :
                    "No deals are currently in the system. Create some deals to get started."
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deals;
