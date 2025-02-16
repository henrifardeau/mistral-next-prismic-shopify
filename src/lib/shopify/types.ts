import {
  CreateCartMutation,
  GetCartQuery,
  ProductByHandleQuery,
} from './gql/graphql';

export type RawCart = GetCartQuery | CreateCartMutation['cartCreate'];

export type RawProduct = ProductByHandleQuery;

export type CustomerSession = {
  authenticated: boolean;
  accessToken: string;
};

export type CartSession = {
  cartId: string;
  cartCheckoutUrl: string;
};

export type AddCartLine = {
  variantId: string;
  quantity?: number;
};

export type UpdateCartLine = {
  lineId: string;
  quantity?: number;
};

export type RemoveCartLine = {
  lineId: string;
};
