'use client';

import { createContext } from 'react';

import { AddressPayload } from '@/lib/shopify/schemas';
import { Customer } from '@/types/customer';

type CustomerStoreContextProps = {
  optimisticCustomer: Customer;
  createAddress: (payload: AddressPayload) => void;
};

export const CustomerStoreContext = createContext<CustomerStoreContextProps>({
  optimisticCustomer: {
    authenticated: false,
  },
  createAddress: () => {},
});
