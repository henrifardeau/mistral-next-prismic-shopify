import {
  CollectionByHandleQuery,
  CreateCartMutation,
  GetCartQuery,
  GetCustomerQuery,
  ProductByHandleQuery,
  ProductCollectionSortKeys,
} from './gql/graphql';

export type RawCustomer = GetCustomerQuery;

export type RawCart = GetCartQuery | CreateCartMutation['cartCreate'];

export type RawCollectionProducts = CollectionByHandleQuery;

export type RawProduct = ProductByHandleQuery;

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
