
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const advertisingSchema = z.object({
  channel: z.string().min(1, { message: "Channel is required." }),
  campaign: z.string().min(2, { message: "Campaign name is required." }),
  startDate: z.string().min(1, { message: "Start date is required." }),
  endDate: z.string().min(1, { message: "End date is required." }),
  budget: z.coerce.number().positive({ message: "Budget must be positive." }),
  target: z.string().optional(),
  description: z.string().optional(),
});

type AdvertisingFormValues = z.infer<typeof advertisingSchema>;

type AddAdvertisingFormProps = {
  onSuccess?: () => void;
  onCancel?: () => void;
};

export function AddAdvertisingForm({ onSuccess, onCancel }: AddAdvertisingFormProps) {
  const { toast } = useToast();
  
  const form = useForm<AdvertisingFormValues>({
    resolver: zodResolver(advertisingSchema),
    defaultValues: {
      channel: '',
      campaign: '',
      startDate: '',
      endDate: '',
      budget: undefined,
      target: '',
      description: '',
    },
  });

  function onSubmit(data: AdvertisingFormValues) {
    console.log('Advertising campaign submitted:', data);
    
    toast({
      title: "Campaign Created",
      description: `${data.campaign} has been added.`,
    });
    
    if (onSuccess) onSuccess();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="campaign"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campaign Name</FormLabel>
              <FormControl>
                <Input placeholder="Summer Sale 2023" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="channel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Advertising Channel</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select channel" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="Google">Google Ads</SelectItem>
                  <SelectItem value="Twitter">Twitter</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  <SelectItem value="YouTube">YouTube</SelectItem>
                  <SelectItem value="Radio">Radio</SelectItem>
                  <SelectItem value="TV">Television</SelectItem>
                  <SelectItem value="Print">Print</SelectItem>
                  <SelectItem value="Billboard">Billboard</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget (R)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="target"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Audience</FormLabel>
              <FormControl>
                <Input placeholder="Adults 25-45, interested in luxury vehicles" {...field} />
              </FormControl>
              <FormDescription>
                Describe who this campaign is targeting
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campaign Description</FormLabel>
              <FormControl>
                <Textarea rows={3} placeholder="Campaign details and objectives..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex gap-4 justify-end">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          )}
          <Button type="submit">Create Campaign</Button>
        </div>
      </form>
    </Form>
  );
}
