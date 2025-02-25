'use client';

import { useState } from 'react';

import { useCustomerStore } from '@/hooks/use-customer-store';
import { createCustomerAddress } from '@/lib/shopify/actions';
import { AddressPayload } from '@/lib/shopify/schemas';

import { CustomerAddressDialog } from './customer-address-dialog';

export function CustomerCreateAddress() {
  const { optimisticCreateCustomerAddress } = useCustomerStore();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setDialogOpen(true)}
        className="min-h-80 border p-8 uppercase"
      >
        Add new address
      </button>
      <CustomerAddressDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        submitAction={async (data: AddressPayload) => {
          optimisticCreateCustomerAddress(data);
          await createCustomerAddress(data);
        }}
      />
    </>
  );
}
