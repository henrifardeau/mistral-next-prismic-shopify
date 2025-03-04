'use client';

import { PropsWithChildren, use, useCallback, useOptimistic } from 'react';

import { AddressPayload } from '@/api/schemas';
import {
  AddressIdPayload,
  AddressUpdatePayload,
  Customer,
  CustomerAction,
  CustomerUpdatePayload,
} from '@/types/customer';

import { CustomerContext } from './customer-context';

export function CustomerProvider({
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

  const optimisticUpdateCustomer = (payload: CustomerUpdatePayload) => {
    console.log({ payload });
    updateCustomerOptimistically({
      type: 'UPDATE_CUSTOMER',
      payload,
    });
  };

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
    <CustomerContext.Provider
      value={{
        optimisticCustomer,
        optimisticUpdateCustomer,
        optimisticCreateCustomerAddress,
        optimisticUpdateCustomerAddress,
        optimisticRemoveCustomerAddress,
        optimisticUpdateDefaultCustomerAddress,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

function customerReducer(state: Customer, action: CustomerAction): Customer {
  if (!state.authenticated) {
    return state;
  }

  switch (action.type) {
    case 'UPDATE_CUSTOMER': {
      return {
        ...state,
        ...action.payload,
      };
    }
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
