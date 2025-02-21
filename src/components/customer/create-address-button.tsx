'use client';

import { useCustomerStore } from '@/hooks/use-customer-store';
import { createCustomerAddress } from '@/lib/shopify/actions';
import { AddressPayload } from '@/lib/shopify/schemas';

import { AddressDialog } from './address-dialog';

export function CreateAddressButton() {
  const { optimisticCreateCustomerAddress } = useCustomerStore();

  return (
    <AddressDialog
      submitAction={async (data: AddressPayload) => {
        optimisticCreateCustomerAddress(data);
        await createCustomerAddress(data);
      }}
    />
  );
}
