'use client';

import { useState } from 'react';

import { UpdateCustomerPayload } from '@/api/schemas';
import { useCustomer } from '@/hooks/use-customer';

import { CustomerUpdateDialog } from './customer-update-dialog';
import { updateCustomer } from '@/api/actions';

export function CustomerUpdate() {
  const { optimisticCustomer, optimisticUpdateCustomer } = useCustomer();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  if (!optimisticCustomer.authenticated) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setDialogOpen(true)}
        className="flex items-center justify-center rounded-full border px-4 py-1 text-sm uppercase"
      >
        Update profile
      </button>
      <CustomerUpdateDialog
        open={dialogOpen}
        defaultValues={{
          firstName: optimisticCustomer?.firstName ?? '',
          lastName: optimisticCustomer?.lastName ?? '',
          phone: optimisticCustomer?.phone ?? '',
          acceptsMarketing: optimisticCustomer?.acceptsMarketing ?? false,
        }}
        onOpenChange={setDialogOpen}
        submitAction={async (data: UpdateCustomerPayload) => {
          optimisticUpdateCustomer(data);
          await updateCustomer(data);
        }}
      />
    </>
  );
}
