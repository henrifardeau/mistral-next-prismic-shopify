export type CartAction =
  | {
      type: 'ADD';
      payload: CartAddPayload;
    }
  | {
      type: 'INCREMENT';
      payload: CartLinePayload;
    }
  | {
      type: 'DECREMENT';
      payload: CartLinePayload;
    }
  | {
      type: 'UPDATE';
      payload: CartUpdatePayload;
    }
  | {
      type: 'REMOVE';
      payload: CartLinePayload;
    };

export type CartLinePayload = {
  lineId: string;
};

export type CartAddPayload = {
  quantity?: number;
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

export type CartUpdatePayload = {
  lineId: string;
  quantity: number;
};
