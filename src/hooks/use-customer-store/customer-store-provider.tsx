'use client';

import {
  PropsWithChildren,
  use,
  useCallback,
  useMemo,
  useOptimistic,
} from 'react';

import { AddressPayload } from '@/lib/shopify/schemas';
import { Customer, CustomerAction } from '@/types/customer';

import { CustomerStoreContext } from './customer-store-context';

export function CustomerStoreProvider({
  children,
  customerPromise,
}: PropsWithChildren<{
  customerPromise: Promise<Customer>;
}>) {
  const initialCustomer = use(customerPromise);
  const [optimisticCustomer, updateOptimisticCustomer] = useOptimistic(
    initialCustomer,
    customerReducer,
  );

  const createAddress = useCallback(
    (payload: AddressPayload) => {
      updateOptimisticCustomer({
        type: 'CREATE_ADDRESS',
        payload,
      });
    },
    [updateOptimisticCustomer],
  );

  const value = useMemo(() => {
    return {
      optimisticCustomer,
      createAddress,
    };
  }, [optimisticCustomer, createAddress]);

  return (
    <CustomerStoreContext.Provider value={value}>
      {children}
    </CustomerStoreContext.Provider>
  );
}

function customerReducer(state: Customer, action: CustomerAction): Customer {
  const currentState = state;

  if (!currentState.authenticated) {
    return currentState;
  }

  switch (action.type) {
    case 'CREATE_ADDRESS': {
      return {
        ...currentState,
      };
    }
    default: {
      return currentState;
    }
  }
}
