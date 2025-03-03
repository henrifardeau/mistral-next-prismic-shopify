'use client';

import { PropsWithChildren, use, useCallback, useOptimistic } from 'react';

import { AddressPayload } from '@/api/schemas';
import {
  AddressIdPayload,
  AddressUpdatePayload,
  Customer,
  CustomerAction,
} from '@/types/customer';

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

  const updateCustomerOptimistically = useCallback(
    (action: CustomerAction) => {
      updateOptimisticCustomer(action);
    },
    [updateOptimisticCustomer],
  );

  const optimisticCreateCustomerAddress = (payload: AddressPayload) => {
    updateCustomerOptimistically({
      type: 'CREATE_ADDRESS',
      payload,
    });
  };

  const optimisticUpdateCustomerAddress = (payload: AddressUpdatePayload) => {
    updateCustomerOptimistically({
      type: 'UPDATE_ADDRESS',
      payload,
    });
  };

  const optimisticRemoveCustomerAddress = (payload: AddressIdPayload) => {
    updateCustomerOptimistically({
      type: 'REMOVE_ADDRESS',
      payload,
    });
  };

  const optimisticUpdateDefaultCustomerAddress = (
    payload: AddressIdPayload,
  ) => {
    updateCustomerOptimistically({
      type: 'UPDATE_DEFAULT_ADDRESS',
      payload,
    });
  };

  return (
    <CustomerStoreContext.Provider
      value={{
        optimisticCustomer,
        optimisticCreateCustomerAddress,
        optimisticUpdateCustomerAddress,
        optimisticRemoveCustomerAddress,
        optimisticUpdateDefaultCustomerAddress,
      }}
    >
      {children}
    </CustomerStoreContext.Provider>
  );
}

function customerReducer(state: Customer, action: CustomerAction): Customer {
  if (!state.authenticated) {
    return state;
  }

  switch (action.type) {
    case 'CREATE_ADDRESS': {
      return {
        ...state,
        addresses: [
          ...state.addresses,
          {
            id: String(Math.random()),
            default: state.addresses.length <= 0,
            ...action.payload,
          },
        ],
      };
    }
    case 'UPDATE_ADDRESS': {
      const index = state.addresses.findIndex(
        (address) => address.id === action.payload.id,
      );
      if (index === -1) {
        return state;
      }

      const updatedAddresses = [...state.addresses];
      updatedAddresses[index] = {
        ...updatedAddresses[index],
        ...action.payload.address,
      };

      return {
        ...state,
        addresses: updatedAddresses,
      };
    }
    case 'UPDATE_DEFAULT_ADDRESS': {
      return {
        ...state,
        addresses: state.addresses.map((address) => ({
          ...address,
          default: action.payload.id === address.id,
        })),
      };
    }
    case 'REMOVE_ADDRESS': {
      return {
        ...state,
        addresses: state.addresses.filter(
          (address) => address.id !== action.payload.id,
        ),
      };
    }
    default: {
      return state;
    }
  }
}
