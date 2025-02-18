'use client';

import { PropsWithChildren, use, useMemo, useOptimistic } from 'react';

import { Customer } from '@/types/customer';

import { CustomerStoreContext } from './customer-store-context';

export function CustomerStoreProvider({
  children,
  customerPromise,
}: PropsWithChildren<{
  customerPromise: Promise<Customer>;
}>) {
  const initialCustomer = use(customerPromise);
  const [optimisticCustomer] = useOptimistic(initialCustomer);

  const value = useMemo(() => {
    return {
      optimisticCustomer,
    };
  }, [optimisticCustomer]);

  return (
    <CustomerStoreContext.Provider value={value}>
      {children}
    </CustomerStoreContext.Provider>
  );
}
