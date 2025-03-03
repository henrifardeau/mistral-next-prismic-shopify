import { FormEvent, useTransition } from 'react';

import { updateDefaultCustomerAddress } from '@/api/actions';
import { useCustomerStore } from '@/hooks/use-customer';
import { CustomerAddress } from '@/types/customer';

export function CustomerUpdateDefaultAddress({
  address,
}: {
  address: CustomerAddress;
}) {
  const [, startRemove] = useTransition();
  const { optimisticUpdateDefaultCustomerAddress } = useCustomerStore();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startRemove(async () => {
      optimisticUpdateDefaultCustomerAddress({ id: address.id });
      await updateDefaultCustomerAddress(address.id);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button className="w-full border p-2 uppercase">Set default</button>
    </form>
  );
}
