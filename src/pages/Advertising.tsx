
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { DollarSign, Filter, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatCard } from '@/components/dashboard/StatCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card } from '@/components/ui/card';
import { Chart } from '@/components/dashboard/Chart';
import { AddAdvertisingDialog } from '@/components/advertising/AddAdvertisingDialog';

// Mock advertising data
const advertisingData = [
  { 
    id: 'AD-001', 
    channel: 'Facebook Ads', 
    campaign: 'Summer Sale', 
    startDate: '2023-06-01', 
    endDate: '2023-06-30', 
    budget: 1200, 
    spent: 1150, 
    status: 'Completed' 
  },
  { 
    id: 'AD-002', 
    channel: 'Google Ads', 
    campaign: 'New Models', 
    startDate: '2023-07-01', 
    endDate: '2023-07-31', 
    budget: 2500, 
    spent: 2100, 
    status: 'Completed' 
  },
  { 
    id: 'AD-003', 
    channel: 'Instagram', 
    campaign: 'Fall Promotion', 
    startDate: '2023-09-01', 
    endDate: '2023-09-30', 
    budget: 1800, 
    spent: 950, 
    status: 'Active' 
  },
  { 
    id: 'AD-004', 
    channel: 'Local Newspaper', 
    campaign: 'Weekend Special', 
    startDate: '2023-08-15', 
    endDate: '2023-08-17', 
    budget: 500, 
    spent: 500, 
    status: 'Completed' 
  },
  { 
    id: 'AD-005', 
    channel: 'Radio', 
    campaign: 'Holiday Sale', 
    startDate: '2023-11-20', 
    endDate: '2023-12-24', 
    budget: 3000, 
    spent: 1200, 
    status: 'Active' 
  },
];

// Chart data
const monthlyAdSpend = [
  { name: 'Jan', spend: 2100 },
  { name: 'Feb', spend: 1850 },
  { name: 'Mar', spend: 2300 },
  { name: 'Apr', spend: 1950 },
  { name: 'May', spend: 2650 },
  { name: 'Jun', spend: 3100 },
  { name: 'Jul', spend: 2850 },
  { name: 'Aug', spend: 2950 },
  { name: 'Sep', spend: 3250 },
  { name: 'Oct', spend: 3650 },
  { name: 'Nov', spend: 4050 },
  { name: 'Dec', spend: 3850 },
];

const channelDistribution = [
  { name: 'Social Media', value: 45 },
  { name: 'Search Ads', value: 30 },
  { name: 'Print', value: 10 },
  { name: 'TV/Radio', value: 12 },
  { name: 'Other', value: 3 },
];

const Advertising = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter ad campaigns based on search query
  const filteredAds = advertisingData.filter(ad => 
    ad.channel.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ad.campaign.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ad.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Paused':
        return 'bg-amber-100 text-amber-800';
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
            <h1 className="text-2xl md:text-3xl font-bold">Advertising</h1>
            <AddAdvertisingDialog />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <StatCard 
              title="Total Ad Spend" 
              value="R28,650" 
              icon={<DollarSign size={24} className="text-primary" />}
              change={{ value: 12, isPositive: true }}
            />
            <StatCard 
              title="Active Campaigns" 
              value="2" 
              icon={<DollarSign size={24} className="text-primary" />}
            />
            <StatCard 
              title="ROI" 
              value="324%" 
              icon={<DollarSign size={24} className="text-primary" />}
              change={{ value: 8, isPositive: true }}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div>
              <Chart 
                title="Monthly Ad Spend" 
                data={monthlyAdSpend} 
                type="bar"
                dataKey="spend"
              />
            </div>
            <div>
              <Chart 
                title="Ad Channel Distribution" 
                data={channelDistribution}
                type="pie" 
                dataKey="value"
                xAxisDataKey="name"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  className="pl-10 w-full" 
                  placeholder="Search campaigns..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size={isMobile ? "sm" : "default"} className="gap-2 w-full md:w-auto">
                <Filter size={16} />
                Filters
              </Button>
            </div>
            
            {filteredAds.length > 0 ? (
              <div className="bg-card rounded-lg border w-full overflow-x-auto">
                <div className="min-w-full">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Channel</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Campaign</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Period</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Budget</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Spent</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-background divide-y divide-border">
                      {filteredAds.map((ad) => (
                        <tr key={ad.id} className="hover:bg-muted/50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{ad.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{ad.channel}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{ad.campaign}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{ad.startDate} to {ad.endDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">R{ad.budget.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">R{ad.spent.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ad.status)}`}>
                              {ad.status}
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
                <h3 className="text-xl font-medium mb-2">No Campaigns Found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? 
                    "No campaigns match your search criteria. Try adjusting your filters." :
                    "No advertising campaigns are currently in the system. Add some campaigns to get started."
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

export default Advertising;
