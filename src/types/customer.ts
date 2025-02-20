export type Customer = GuestCustomer | SignCustomer;

type GuestCustomer = {
  authenticated: false;
};

type SignCustomer = {
  authenticated: true;
  accessToken: string;
};
