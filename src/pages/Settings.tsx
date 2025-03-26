
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Settings as SettingsIcon, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const Settings = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 pl-4 md:pl-[calc(16rem+24px)] overflow-x-hidden">
        <div className="flex flex-col gap-4 md:gap-6 max-w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
            <Button size={isMobile ? "sm" : "default"} className="gap-2 self-start md:self-auto">
              <Save size={16} />
              Save Changes
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your dealership information and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 md:py-12 text-muted-foreground">
                  <SettingsIcon size={isMobile ? 36 : 48} className="mx-auto mb-4 opacity-20" />
                  <h3 className="text-lg md:text-xl font-medium mb-2">Settings Controls Will Appear Here</h3>
                  <p>This is a placeholder for the settings form</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="w-full">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage users, roles and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 md:py-12 text-muted-foreground">
                  <SettingsIcon size={isMobile ? 36 : 48} className="mx-auto mb-4 opacity-20" />
                  <h3 className="text-lg md:text-xl font-medium mb-2">User Management Controls Will Appear Here</h3>
                  <p>This is a placeholder for the user management interface</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>Connect with third-party services and APIs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 md:py-12 text-muted-foreground">
                  <SettingsIcon size={isMobile ? 36 : 48} className="mx-auto mb-4 opacity-20" />
                  <h3 className="text-lg md:text-xl font-medium mb-2">Integration Controls Will Appear Here</h3>
                  <p>This is a placeholder for the integrations management interface</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
