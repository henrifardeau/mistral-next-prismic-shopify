'use client';

import { useCustomerStore } from '@/hooks/use-customer-store';
import { AddressPayload } from '@/lib/shopify/schemas';

import { AddressDialog } from './address-dialog';

export function CreateAddressButton() {
  const { createAddress } = useCustomerStore();

  return (
    <AddressDialog
      submitAction={async (data: AddressPayload) => {
        createAddress(data);
        // await updateCartLines([{ lineId: line.id, quantity }]);
      }}
    />
  );
}
