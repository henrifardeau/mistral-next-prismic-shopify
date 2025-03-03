import { FormEvent, useTransition } from 'react';

import { useCustomerStore } from '@/hooks/use-customer-store';
import { removeCustomerAddress } from '@/api/actions';
import { CustomerAddress } from '@/types/customer';

export function CustomerRemoveAddress({
  address,
}: {
  address: CustomerAddress;
}) {
  const [, startRemove] = useTransition();
  const { optimisticRemoveCustomerAddress } = useCustomerStore();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startRemove(async () => {
      optimisticRemoveCustomerAddress({ id: address.id });
      await removeCustomerAddress(address.id);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button className="w-full border p-2 uppercase">Remove</button>
    </form>
  );
}
