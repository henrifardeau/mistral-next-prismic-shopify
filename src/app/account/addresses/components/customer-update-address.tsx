import { useState } from 'react';

import { updateCustomerAddress } from '@/api/actions';
import { AddressPayload } from '@/api/schemas';
import { useCustomerStore } from '@/hooks/use-customer';
import { CustomerAddress } from '@/types/customer';

import { CustomerAddressDialog } from './customer-address-dialog';

export function CustomerUpdateAddress({
  address,
}: {
  address: CustomerAddress;
}) {
  const { optimisticUpdateCustomerAddress } = useCustomerStore();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setDialogOpen(true)}
        className="w-full border p-2 uppercase"
      >
        Edit
      </button>
      <CustomerAddressDialog
        open={dialogOpen}
        defaultValues={{
          address1: address?.address1 ?? '',
          address2: address?.address2 ?? '',
          city: address?.city ?? '',
          company: address?.company ?? '',
          country: address?.country ?? '',
          firstName: address?.firstName ?? '',
          lastName: address?.lastName ?? '',
          phone: address?.phone ?? '',
          province: address?.province ?? '',
          zip: address?.zip ?? '',
        }}
        onOpenChange={setDialogOpen}
        submitAction={async (data: AddressPayload) => {
          optimisticUpdateCustomerAddress({ id: address.id, address: data });
          await updateCustomerAddress(address.id, data);
        }}
      />
    </>
  );
}
