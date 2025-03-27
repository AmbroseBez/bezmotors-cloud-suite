
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
import { AddPartForm } from './AddPartForm';
import { useIsMobile } from '@/hooks/use-mobile';

type AddPartDialogProps = {
  onPartAdded?: () => void;
};

export function AddPartDialog({ onPartAdded }: AddPartDialogProps) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();
  
  const handleSuccess = () => {
    setOpen(false);
    if (onPartAdded) onPartAdded();
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={isMobile ? "sm" : "default"} className="gap-2">
          <Plus size={16} />
          Add Part
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Part</DialogTitle>
          <DialogDescription>
            Add a new part to the inventory. Fill out all the required information.
          </DialogDescription>
        </DialogHeader>
        <AddPartForm onSuccess={handleSuccess} onCancel={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
