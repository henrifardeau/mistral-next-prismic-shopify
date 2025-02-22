import { AddressPayload } from '@/lib/shopify/schemas';

export type Customer = GuestCustomer | SignCustomer;

type GuestCustomer = {
  authenticated: false;
};

export type CustomerAddress = {
  id: string;
  default: boolean;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  company?: string | null;
  country?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  province?: string | null;
  zip?: string | null;
};

type SignCustomer = {
  authenticated: true;
  accessToken: string;
  id: string;
  acceptsMarketing: boolean;
  firstName?: string | null;
  lastName?: string | null;
  displayName: string;
  email?: string | null;
  phone?: string | null;
  createdAt: string;
  updatedAt: string;
  defaultAddress?: { id: string } | null;
  addresses: CustomerAddress[];
};

export type CustomerAction =
  | {
      type: 'CREATE_ADDRESS';
      payload: AddressPayload;
    }
  | {
      type: 'UPDATE_ADDRESS';
      payload: AddressUpdatePayload;
    }
  | {
      type: 'REMOVE_ADDRESS';
      payload: AddressIdPayload;
    }
  | {
      type: 'UPDATE_DEFAULT_ADDRESS';
      payload: AddressIdPayload;
    };

export type AddressIdPayload = {
  id: string;
};

export interface AddressUpdatePayload extends AddressIdPayload {
  address: AddressPayload;
}
