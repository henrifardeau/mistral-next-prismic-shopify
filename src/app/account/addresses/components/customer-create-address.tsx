'use client';

import { useState } from 'react';

import { createCustomerAddress } from '@/api/actions';
import { AddressPayload } from '@/api/schemas';
import { useCustomer } from '@/hooks/use-customer';

import { CustomerAddressDialog } from './customer-address-dialog';

export function CustomerCreateAddress() {
  const { optimisticCreateCustomerAddress } = useCustomer();

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
