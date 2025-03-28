
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AddAdvertisingForm } from './AddAdvertisingForm';
import { useIsMobile } from '@/hooks/use-mobile';

type AddAdvertisingDialogProps = {
  onAdded?: () => void;
};

export function AddAdvertisingDialog({ onAdded }: AddAdvertisingDialogProps) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();
  
  const handleSuccess = () => {
    setOpen(false);
    if (onAdded) onAdded();
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={isMobile ? "sm" : "default"} className="gap-2">
          <Plus size={16} />
          New Campaign
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Advertising Campaign</DialogTitle>
          <DialogDescription>
            Create a new advertising campaign. Fill out all the required information.
          </DialogDescription>
        </DialogHeader>
        <AddAdvertisingForm onSuccess={handleSuccess} onCancel={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
