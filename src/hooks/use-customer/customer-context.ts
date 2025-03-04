'use client';

import { createContext } from 'react';

import { AddressPayload } from '@/api/schemas';
import {
  AddressIdPayload,
  AddressUpdatePayload,
  Customer,
  CustomerUpdatePayload,
} from '@/types/customer';

type CustomerContextProps = {
  optimisticCustomer: Customer;
  optimisticUpdateCustomer: (payload: CustomerUpdatePayload) => void;
  optimisticCreateCustomerAddress: (payload: AddressPayload) => void;
  optimisticUpdateCustomerAddress: (payload: AddressUpdatePayload) => void;
  optimisticRemoveCustomerAddress: (payload: AddressIdPayload) => void;
  optimisticUpdateDefaultCustomerAddress: (payload: AddressIdPayload) => void;
};

export const CustomerContext = createContext<CustomerContextProps>({
  optimisticCustomer: {
    authenticated: false,
  },
  optimisticUpdateCustomer: () => {
    console.warn('Function not initialized');
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
