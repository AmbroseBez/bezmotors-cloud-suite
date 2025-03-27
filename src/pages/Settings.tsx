
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Users, UserPlus, ShieldCheck, Building, Laptop, RefreshCw, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { GeneralSettingsForm } from '@/components/settings/GeneralSettingsForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Settings = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 ml-16 md:ml-64 transition-all duration-300 overflow-y-auto">
        <div className="flex flex-col gap-4 md:gap-6 max-w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
          </div>
          
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Manage your dealership information and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <GeneralSettingsForm />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage users, roles and permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Users size={18} className="text-primary" />
                          Manage Users
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Add, edit, or remove users from your dealership management system.
                        </p>
                        <Button size="sm" className="w-full">
                          <Users size={16} className="mr-2" />
                          Manage Users
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <UserPlus size={18} className="text-primary" />
                          Add New User
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Add a new user to your dealership management system with specific permissions.
                        </p>
                        <Button size="sm" className="w-full">
                          <UserPlus size={16} className="mr-2" />
                          Add User
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <ShieldCheck size={18} className="text-primary" />
                        Role Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Create and manage roles with different permissions for your dealership staff.
                      </p>
                      <Button size="sm">
                        <ShieldCheck size={16} className="mr-2" />
                        Manage Roles
                      </Button>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="integrations">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Integrations</CardTitle>
                  <CardDescription>Connect with third-party services and APIs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Building size={18} className="text-primary" />
                          CRM Integration
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Connect your dealership with a customer relationship management system.
                        </p>
                        <Button size="sm" className="w-full">
                          <Building size={16} className="mr-2" />
                          Setup CRM
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Laptop size={18} className="text-primary" />
                          Website Sync
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Connect your inventory to your website and online listings.
                        </p>
                        <Button size="sm" className="w-full">
                          <Laptop size={16} className="mr-2" />
                          Configure Sync
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <RefreshCw size={18} className="text-primary" />
                        API Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Manage API keys and external service connections.
                      </p>
                      <Button size="sm">
                        <RefreshCw size={16} className="mr-2" />
                        Manage APIs
                      </Button>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
