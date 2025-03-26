
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Car, BarChart3, Clipboard, Users, Settings, 
  Package, TrendingUp, Calendar, Home, Menu, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  to: string;
  isActive: boolean;
};

const NavItem = ({ icon: Icon, label, to, isActive }: NavItemProps) => (
  <Link to={to} className="w-full">
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 px-3 py-6 mb-1 rounded-lg transition-all duration-200 font-normal",
        isActive 
          ? "bg-accent/50 text-primary font-medium" 
          : "hover:bg-accent/30 text-muted-foreground"
      )}
    >
      <Icon size={20} className={cn(isActive ? "opacity-100" : "opacity-70")} />
      <span>{label}</span>
    </Button>
  </Link>
);

export function Sidebar() {
  const [collapsed, setCollapsed] = React.useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => setCollapsed(!collapsed);
  
  const navItems = [
    { icon: Home, label: 'Dashboard', to: '/' },
    { icon: Car, label: 'Inventory', to: '/inventory' },
    { icon: Users, label: 'Customers', to: '/customers' },
    { icon: Clipboard, label: 'Deals', to: '/deals' },
    { icon: Package, label: 'Parts', to: '/parts' },
    { icon: Calendar, label: 'Schedule', to: '/schedule' },
    { icon: BarChart3, label: 'Reports', to: '/reports' },
    { icon: TrendingUp, label: 'Analytics', to: '/analytics' },
  ];
  
  return (
    <div className={cn(
      "bg-card h-screen border-r fixed left-0 top-0 z-30 transition-all duration-300 ease-in-out flex flex-col",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Car size={24} className="text-primary" />
            <h1 className="font-semibold text-lg">BezMegaMotors</h1>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className={cn(
            "hover:bg-accent/50 transition-all", 
            collapsed ? "mx-auto" : ""
          )}
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              icon={item.icon}
              label={collapsed ? "" : item.label}
              to={item.to}
              isActive={location.pathname === item.to}
            />
          ))}
        </nav>
      </div>
      
      <div className="p-3 border-t">
        <NavItem
          icon={Settings}
          label={collapsed ? "" : "Settings"}
          to="/settings"
          isActive={location.pathname === '/settings'}
        />
      </div>
    </div>
  );
}
