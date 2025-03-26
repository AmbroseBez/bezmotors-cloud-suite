
import React from 'react';
import { Car, Calendar, Fuel, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type VehicleCardProps = {
  vehicle: {
    id: string;
    title: string;
    image: string;
    price: number;
    year: number;
    mileage: number;
    fuelType: string;
    status: 'In Stock' | 'Reserved' | 'Sold';
  };
  className?: string;
};

export function VehicleCard({ vehicle, className }: VehicleCardProps) {
  const statusColor = {
    'In Stock': 'bg-green-100 text-green-800',
    'Reserved': 'bg-amber-100 text-amber-800',
    'Sold': 'bg-blue-100 text-blue-800',
  }[vehicle.status];

  return (
    <div className={cn(
      "group hover-scale bg-card rounded-xl overflow-hidden border shadow-sm",
      className
    )}>
      <div className="aspect-[16/9] overflow-hidden relative">
        <img 
          src={vehicle.image} 
          alt={vehicle.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <Badge 
          className={cn(
            "absolute top-3 right-3", 
            statusColor
          )}
        >
          {vehicle.status}
        </Badge>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-lg mb-2">{vehicle.title}</h3>
        
        <div className="flex justify-between mb-4">
          <p className="font-bold text-xl">${vehicle.price.toLocaleString()}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar size={16} />
            <span>{vehicle.year}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Car size={16} />
            <span>{vehicle.mileage.toLocaleString()} mi</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Fuel size={16} />
            <span>{vehicle.fuelType}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Tag size={16} />
            <span>ID: {vehicle.id}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">Details</Button>
          <Button size="sm" className="flex-1">Edit</Button>
        </div>
      </div>
    </div>
  );
}
