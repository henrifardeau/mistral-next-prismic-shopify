import { useContext } from 'react';

import { CustomerStoreContext } from './customer-store-context';

export * from './customer-store-provider';

export function useCustomerStore() {
  const context = useContext(CustomerStoreContext);

  if (context === undefined) {
    throw new Error(
      'useCustomerStore must be used within a CustomerStoreProvider',
    );
  }

  return context;
}
