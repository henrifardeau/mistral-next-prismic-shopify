'use client';

import { useCustomer } from '@/hooks/use-customer';

import { CustomerOrderItem } from './components';

export default function Page() {
  const { optimisticCustomer } = useCustomer();

  if (!optimisticCustomer.authenticated) {
    return null;
  }

  return (
    <ul className="grid grid-cols-2 gap-16 lg:grid-cols-4">
      {optimisticCustomer.orders.map((order) => (
        <CustomerOrderItem key={order.id} order={order} />
      ))}
    </ul>
  );
}
