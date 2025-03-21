import { CompareAtPrice, Price } from './common';

export type CartSession = {
  cartId: string;
};

export type Cart = {
  id?: string;
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
    compareAtPrice?: CompareAtPrice;
    price: Price;
    image: {
      src?: string;
      altText?: string;
    };
  };
};

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
    image: {
      src?: string;
      alt?: string;
    };
  };
};

export type CartUpdatePayload = {
  lineId: string;
  quantity: number;
};
