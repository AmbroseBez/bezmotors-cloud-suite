
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
import { AddDealForm } from './AddDealForm';
import { useIsMobile } from '@/hooks/use-mobile';

type AddDealDialogProps = {
  onDealAdded?: () => void;
};

export function AddDealDialog({ onDealAdded }: AddDealDialogProps) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();
  
  const handleSuccess = () => {
    setOpen(false);
    if (onDealAdded) onDealAdded();
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={isMobile ? "sm" : "default"} className="gap-2">
          <Plus size={16} />
          New Deal
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Deal</DialogTitle>
          <DialogDescription>
            Create a new sales deal. Fill out all the required information.
          </DialogDescription>
        </DialogHeader>
        <AddDealForm onSuccess={handleSuccess} onCancel={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
