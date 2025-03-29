
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Images, X, Upload, Plus } from 'lucide-react';

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
  maxImages?: number;
}

export function ImageUpload({ 
  value = [], 
  onChange, 
  className, 
  maxImages = 5 
}: ImageUploadProps) {
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check if adding these files would exceed maxImages
    if (value.length + files.length > maxImages) {
      setError(`You can only upload a maximum of ${maxImages} images`);
      return;
    }

    // Process files
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) {
        setError('Please upload only image files');
        return;
      }

      // Convert to base64 for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onChange([...value, e.target.result.toString()]);
        }
      };
      reader.readAsDataURL(file);
    }
    
    // Clear the input value to allow selecting the same file again
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    const newImages = [...value];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-wrap gap-2">
        {value.map((image, index) => (
          <div 
            key={index} 
            className="relative group bg-background h-24 w-24 rounded-md overflow-hidden border"
          >
            <img 
              src={image} 
              alt={`Uploaded image ${index + 1}`} 
              className="h-full w-full object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeImage(index)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
        
        {value.length < maxImages && (
          <label 
            className="flex flex-col items-center justify-center h-24 w-24 rounded-md border border-dashed border-muted-foreground/50 bg-background hover:bg-accent/50 cursor-pointer transition-colors"
          >
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleFileChange}
              multiple
            />
            <Plus className="h-6 w-6 text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground">Add Image</span>
          </label>
        )}
      </div>
      
      {error && <p className="text-sm text-destructive">{error}</p>}
      
      <p className="text-xs text-muted-foreground">
        {value.length} of {maxImages} images uploaded. Click or drag images to upload.
      </p>
    </div>
  );
}
