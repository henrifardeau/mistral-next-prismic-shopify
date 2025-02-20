export type Customer = GuestCustomer | SignCustomer;

type GuestCustomer = {
  authenticated: false;
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
};
