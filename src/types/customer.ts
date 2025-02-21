import { AddressPayload } from '@/lib/shopify/schemas';

export type Customer = GuestCustomer | SignCustomer;

type GuestCustomer = {
  authenticated: false;
};

export type CustomerAddress = {
  address1: string;
  address2: string;
  city: string;
  company: string;
  country: string;
  firstName: string;
  lastName: string;
  phone: string;
  province: string;
  zip: string;
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
  defaultAddress: CustomerAddress;
  addresses: CustomerAddress[];
};

export type CustomerAction = {
  type: 'CREATE_ADDRESS';
  payload: AddressPayload;
};
