'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CustomerOrder } from '@/types/customer';

export function CustomerOrderDialog({
  open,
  order,
  onOpenChange,
}: {
  open: boolean;
  order: CustomerOrder;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh]">
        <DialogHeader className="hidden">
          <DialogTitle>Order #{order.id}</DialogTitle>
        </DialogHeader>
        <pre>{JSON.stringify(order, null, 2)}</pre>
      </DialogContent>
    </Dialog>
  );
}
