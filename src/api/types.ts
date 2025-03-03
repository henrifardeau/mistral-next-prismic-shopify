import {
  CustomerQuery,
  CartQuery,
  CreateCartMutation,
  CollectionQuery,
  ProductQuery,
} from './gql/graphql';

export type RawCustomer = CustomerQuery;

export type RawCart = CartQuery | CreateCartMutation['cartCreate'];

export type RawCollectionProducts = CollectionQuery;

export type RawProduct = ProductQuery;
