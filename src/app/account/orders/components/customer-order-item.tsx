'use client';

import { useState } from 'react';

import { CustomerOrder } from '@/types/customer';

import { CustomerOrderDialog } from './customer-order-dialog';

export function CustomerOrderItem({ order }: { order: CustomerOrder }) {
  const [open, setOpen] = useState(false);

  return (
    <li className="flex min-h-80 flex-col justify-between space-y-4 border p-8">
      <div>
        <h4>{order.name}</h4>
        <div className="flex flex-col">
          <span>{order.financialStatus}</span>
          <span>{order.fulfillmentStatus}</span>
          <span>{order.processedAt}</span>
        </div>
      </div>
      <button
        onClick={() => setOpen(true)}
        className="w-full border p-2 uppercase"
      >
        View
      </button>
      <CustomerOrderDialog open={open} order={order} onOpenChange={setOpen} />
    </li>
  );
}
