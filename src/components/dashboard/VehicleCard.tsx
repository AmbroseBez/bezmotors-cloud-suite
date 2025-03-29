
import React, { useState } from 'react';
import { Car, Calendar, Fuel, Tag, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type VehicleCardProps = {
  vehicle: {
    id: string;
    title: string;
    image: string;
    images?: string[];
    price: number;
    year: number;
    mileage: number;
    fuelType: string;
    status: 'In Stock' | 'Reserved' | 'Sold';
  };
  className?: string;
};

export function VehicleCard({ vehicle, className }: VehicleCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = vehicle.images || [vehicle.image];
  
  const statusColor = {
    'In Stock': 'bg-green-100 text-green-800',
    'Reserved': 'bg-amber-100 text-amber-800',
    'Sold': 'bg-blue-100 text-blue-800',
  }[vehicle.status];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={cn(
      "group hover-scale bg-card rounded-xl overflow-hidden border shadow-sm",
      className
    )}>
      <div className="aspect-[16/9] overflow-hidden relative">
        <img 
          src={images[currentImageIndex]} 
          alt={vehicle.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        
        {images.length > 1 && (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft size={18} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight size={18} />
            </Button>
            
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    idx === currentImageIndex ? "bg-white" : "bg-white/50"
                  )}
                />
              ))}
            </div>
          </>
        )}
        
        <Badge 
          className={cn(
            "absolute top-3 right-3", 
            statusColor
          )}
        >
          {vehicle.status}
        </Badge>
        
        {images.length > 1 && (
          <Badge 
            className="absolute bottom-3 left-3 bg-background/80 text-foreground flex items-center gap-1"
          >
            <ImageIcon size={12} />
            {currentImageIndex + 1}/{images.length}
          </Badge>
        )}
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
