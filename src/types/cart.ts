export type Cart = {
  id?: string;
  checkoutUrl: string;
  state: 'idle' | 'loading';
  lines: CartLine[];
};

export type CartLine = {
  id: string;
  quantity: number;
  availableForSale: boolean;
  product: {
    handle: string;
    title: string;
  };
  variant: {
    id: string;
    title: string;
    compareAtPrice?: {
      amount: string;
      currencyCode: string;
    } | null;
    price: {
      amount: string;
      currencyCode: string;
    };
  };
};
