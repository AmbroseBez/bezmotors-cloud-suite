
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
import { AddCustomerForm } from './AddCustomerForm';
import { useIsMobile } from '@/hooks/use-mobile';

type AddCustomerDialogProps = {
  onCustomerAdded?: () => void;
};

export function AddCustomerDialog({ onCustomerAdded }: AddCustomerDialogProps) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();
  
  const handleSuccess = () => {
    setOpen(false);
    if (onCustomerAdded) onCustomerAdded();
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={isMobile ? "sm" : "default"} className="gap-2">
          <Plus size={16} />
          Add Customer
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
          <DialogDescription>
            Add a new customer to the system. Fill out all the required information.
          </DialogDescription>
        </DialogHeader>
        <AddCustomerForm onSuccess={handleSuccess} onCancel={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
