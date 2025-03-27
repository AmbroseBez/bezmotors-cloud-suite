
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Users, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatCard } from '@/components/dashboard/StatCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { AddCustomerDialog } from '@/components/customers/AddCustomerDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock customer data
const customerData = [
  { id: 1, name: 'John Smith', email: 'john@example.com', phone: '(123) 456-7890', status: 'Active' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com', phone: '(234) 567-8901', status: 'Active' },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com', phone: '(345) 678-9012', status: 'Inactive' },
];

const Customers = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter customers based on search query
  const filteredCustomers = customerData.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );
  
  return (
    <div className="flex min-h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 ml-16 md:ml-64 transition-all duration-300 overflow-y-auto">
        <div className="flex flex-col gap-4 md:gap-6 max-w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">Customer Management</h1>
            <AddCustomerDialog />
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
                <Input 
                  className="pl-10 w-full" 
                  placeholder="Search customers..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size={isMobile ? "sm" : "default"} className="gap-2 w-full md:w-auto">
                <Filter size={16} />
                Filters
              </Button>
            </div>
            
            {filteredCustomers.length > 0 ? (
              <div className="bg-card rounded-lg border w-full overflow-x-auto">
                <div className="min-w-full">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-background divide-y divide-border">
                      {filteredCustomers.map((customer) => (
                        <tr key={customer.id} className="hover:bg-muted/50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{customer.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{customer.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{customer.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{customer.phone}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {customer.status}
                            </span>
                          </td>
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
                <h3 className="text-xl font-medium mb-2">No Customers Found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? 
                    "No customers match your search criteria. Try adjusting your filters." :
                    "No customers are currently in the system. Add some customers to get started."
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

export default Customers;
