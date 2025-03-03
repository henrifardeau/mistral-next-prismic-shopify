import { useContext } from 'react';

import { CustomerContext } from './customer-context';

export * from './customer-provider';

export function useCustomerStore() {
  const context = useContext(CustomerContext);

  if (context === undefined) {
    throw new Error(
      'useCustomerStore must be used within a CustomerStoreProvider',
    );
  }

  return context;
}
