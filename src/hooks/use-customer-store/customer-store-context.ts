'use client';

import { createContext } from 'react';

import { Customer } from '@/types/customer';

type CustomerStoreContextProps = {
  optimisticCustomer: Customer;
};

export const CustomerStoreContext = createContext<CustomerStoreContextProps>({
  optimisticCustomer: {
    authenticated: false,
  },
});
