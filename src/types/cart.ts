export type CartAction =
  | {
      type: 'UPDATE';
    }
  | {
      type: 'REMOVE';
    }
  | {
      type: 'ADD';
    };

export type AddToCartLine = {
  merchandiseId: string;
  quantity?: number;
};

export type UpdateToCartLine = {
  lineId: string;
  merchandiseId: string;
  quantity?: number;
};

export type RemoveToCartLine = {
  lineId: string;
};

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
  };
};
