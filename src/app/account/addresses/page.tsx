'use client';

import { useCustomer } from '@/hooks/use-customer';

import { CustomerAddressItem, CustomerCreateAddress } from './components';

export default function Page() {
  const { optimisticCustomer } = useCustomer();

  if (!optimisticCustomer.authenticated) {
    return null;
  }

  return (
    <ul className="grid grid-cols-2 gap-16 lg:grid-cols-4">
      <CustomerCreateAddress />
      {optimisticCustomer.addresses.map((address) => (
        <CustomerAddressItem key={address.id} address={address} />
      ))}
    </ul>
  );
}
