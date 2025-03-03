'use client';

import { createContext } from 'react';

import { AddressPayload } from '@/api/schemas';
import {
  AddressIdPayload,
  AddressUpdatePayload,
  Customer,
} from '@/types/customer';

type CustomerStoreContextProps = {
  optimisticCustomer: Customer;
  optimisticCreateCustomerAddress: (payload: AddressPayload) => void;
  optimisticUpdateCustomerAddress: (payload: AddressUpdatePayload) => void;
  optimisticRemoveCustomerAddress: (payload: AddressIdPayload) => void;
  optimisticUpdateDefaultCustomerAddress: (payload: AddressIdPayload) => void;
};

export const CustomerStoreContext = createContext<CustomerStoreContextProps>({
  optimisticCustomer: {
    authenticated: false,
  },
  optimisticCreateCustomerAddress: () => {
    console.warn('Function not initialized');
  },
  optimisticUpdateCustomerAddress: () => {
    console.warn('Function not initialized');
  },
  optimisticRemoveCustomerAddress: () => {
    console.warn('Function not initialized');
  },
  optimisticUpdateDefaultCustomerAddress: () => {
    console.warn('Function not initialized');
  },
});
