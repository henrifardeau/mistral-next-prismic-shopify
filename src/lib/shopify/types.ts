import {
  CreateCartMutation,
  GetCartQuery,
  ProductByHandleQuery,
} from './gql/graphql';

export type RawProduct = ProductByHandleQuery;

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

export type RawCart = GetCartQuery | CreateCartMutation['cartCreate'];
