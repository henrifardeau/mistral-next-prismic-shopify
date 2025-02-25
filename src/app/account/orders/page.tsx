'use client';

import { useCustomerStore } from '@/hooks/use-customer-store';

import { CustomerOrderItem } from './components';

export default function Page() {
  const { optimisticCustomer } = useCustomerStore();

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
