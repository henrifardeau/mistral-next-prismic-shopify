'use client';

import { createContext } from 'react';

import { AddressPayload } from '@/lib/shopify/schemas';
import { Customer } from '@/types/customer';

type CustomerStoreContextProps = {
  optimisticCustomer: Customer;
  optimisticCreateCustomerAddress: (payload: AddressPayload) => void;
};

export const CustomerStoreContext = createContext<CustomerStoreContextProps>({
  optimisticCustomer: {
    authenticated: false,
  },
  optimisticCreateCustomerAddress: () => {},
});
