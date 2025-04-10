
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  BarChart3, Settings, 
  Home, Menu, X, DollarSign, Car
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  to: string;
  isActive: boolean;
  onClick: () => void;
};

const NavItem = ({ icon: Icon, label, to, isActive, onClick }: NavItemProps) => (
  <Link to={to} className="w-full" onClick={onClick}>
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
  const [collapsed, setCollapsed] = React.useState(true);
  const location = useLocation();
  
  const toggleSidebar = () => setCollapsed(!collapsed);
  
  const handleNavigation = () => {
    if (!collapsed) {
      setCollapsed(true);
    }
  };
  
  const navItems = [
    { icon: Home, label: 'Dashboard', to: '/' },
    { icon: Car, label: 'Inventory', to: '/inventory' },
    { icon: DollarSign, label: 'Advertising', to: '/advertising' },
    { icon: BarChart3, label: 'Reports', to: '/reports' },
  ];
  
  return (
    <div className={cn(
      "bg-card h-screen border-r fixed left-0 top-0 z-30 transition-all duration-300 ease-in-out flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <DollarSign size={24} className="text-primary" />
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
              onClick={handleNavigation}
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
          onClick={handleNavigation}
        />
      </div>
    </div>
  );
}
