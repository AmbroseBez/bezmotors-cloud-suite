import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { TrendingUp, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatCard } from '@/components/dashboard/StatCard';
import { Chart } from '@/components/dashboard/Chart';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data for advertising spend
const adSpendData = [
  { name: 'Jan', spend: 2500 },
  { name: 'Feb', spend: 3200 },
  { name: 'Mar', spend: 2800 },
  { name: 'Apr', spend: 3500 },
  { name: 'May', spend: 3100 },
  { name: 'Jun', spend: 3800 },
];

// Mock data for ad platform performance
const adPlatformData = [
  { platform: 'Google Ads', amount: 4200 },
  { platform: 'Facebook Ads', amount: 3800 },
  { platform: 'Instagram Ads', amount: 2900 },
  { platform: 'Twitter Ads', amount: 1500 },
  { platform: 'LinkedIn Ads', amount: 2100 },
];

// Mock data for campaign performance
const campaignPerformanceData = [
  { campaign: 'Summer Sale', clicks: 1250, conversions: 320 },
  { campaign: 'Winter Promo', clicks: 980, conversions: 250 },
  { campaign: 'New Year Offer', clicks: 1520, conversions: 410 },
];

const Advertising = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="flex min-h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 ml-16 md:ml-64 transition-all duration-300 overflow-y-auto">
        <div className="flex flex-col gap-4 md:gap-6 max-w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">Advertising</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <StatCard 
              title="Total Ad Spend" 
              value="R24,500" 
              icon={<TrendingUp size={24} className="text-primary" />}
              change={{ value: 5, isPositive: true }}
            />
            <StatCard 
              title="Campaigns Launched" 
              value="18" 
              icon={<TrendingUp size={24} className="text-primary" />}
            />
            <StatCard 
              title="Avg. Conversion Rate" 
              value="14.7%" 
              icon={<TrendingUp size={24} className="text-primary" />}
              change={{ value: 1.2, isPositive: true }}
            />
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
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <Chart 
                title="Advertising Spend Over Time" 
                data={adSpendData} 
                type="line"
                dataKey="spend"
              />
              <Chart
                title="Ad Platform Breakdown"
                data={adPlatformData}
                type="bar"  
                dataKey="amount"
                xAxisDataKey="platform"
              />
            </div>
            
            <div className="bg-card rounded-lg p-4 border w-full overflow-x-auto">
              <div className="min-w-full">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Campaign</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Clicks</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Conversions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Conversion Rate</th>
                    </tr>
                  </thead>
                  <tbody className="bg-background divide-y divide-border">
                    {campaignPerformanceData.map((campaign) => (
                      <tr key={campaign.campaign} className="hover:bg-muted/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{campaign.campaign}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{campaign.clicks}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{campaign.conversions}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{(campaign.conversions / campaign.clicks * 100).toFixed(2)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertising;
