export type AddToCartLine = {
  merchandiseId: string;
  quantity?: number;
};

export type UpdateToCartLine = {
  lineId: string;
  quantity?: number;
};

export type RemoveToCartLine = {
  lineId: string;
};

export interface RawCart extends Omit<Cart, 'lines'> {
  lines: { edges: { node: CartLine }[] };
}

export type Cart = {
  id?: string;
  checkoutUrl: string;
  lines: CartLine[];
};

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
    };
  };
};
