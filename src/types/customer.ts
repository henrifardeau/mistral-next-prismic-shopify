import { AddressPayload } from '@/lib/shopify/schemas';

export type Customer = GuestCustomer | SignCustomer;

type GuestCustomer = {
  authenticated: false;
};

export type CustomerAddress = {
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
  defaultAddress?: CustomerAddress | null;
  addresses: CustomerAddress[];
};

export type CustomerAction = {
  type: 'CREATE_ADDRESS';
  payload: AddressPayload;
};
