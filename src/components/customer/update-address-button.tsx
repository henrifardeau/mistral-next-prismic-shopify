'use client';

import { AddressPayload } from '@/lib/shopify/schemas';

import { AddressDialog } from './address-dialog';

export function UpdateAddressButton() {
  return (
    <AddressDialog
      submitAction={async (data: AddressPayload) => {
        console.log({ data });
      }}
    />
  );
}
