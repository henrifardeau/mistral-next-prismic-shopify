import {
  GetCollectionByHandleQuery,
  CreateCartMutation,
  GetCartQuery,
  GetCustomerQuery,
  GetProductByHandleQuery,
  ProductCollectionSortKeys,
} from './gql/graphql';

export type RawCustomer = GetCustomerQuery;

export type RawCart = GetCartQuery | CreateCartMutation['cartCreate'];

export type RawCollectionProducts = GetCollectionByHandleQuery;

export type RawProduct = GetProductByHandleQuery;

export type CollectionSortKeys = ProductCollectionSortKeys;

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
