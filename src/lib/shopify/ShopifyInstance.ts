import { DEFAULT_SORTING } from '@/constants/collection';
import {
  addCartLineMutation,
  createCartMutation,
  createCustomerMutation,
  createCustomerTokenMutation,
  removeCartLineMutation,
  updateCartBuyerIdentityMutation,
  updateCartLineMutation,
} from './mutations';
import {
  collectionByHandleQuery,
  getCartQuery,
  getCustomerQuery,
  productByHandleQuery,
} from './queries';
import { Shopify } from './Shopify';
import {
  AddCartLine,
  CollectionSortKeys,
  RemoveCartLine,
  UpdateCartLine,
} from './types';
import { SignInPayload, SignUpPayload } from './schemas';

export class ShopifyInstance extends Shopify {
  public async getCustomer(
    customerAccessToken: string,
    next?: NextFetchRequestConfig,
    cache?: RequestCache,
  ) {
    return this.client(next, cache).request(getCustomerQuery, {
      customerAccessToken,
    });
  }

  public async createCustomer(input: SignUpPayload) {
    return this.client().request(createCustomerMutation, { input });
  }

  public async createCustomerToken(input: SignInPayload) {
    return this.client().request(createCustomerTokenMutation, { input });
  }

  public async getCart(
    cartId: string,
    next?: NextFetchRequestConfig,
    cache?: RequestCache,
  ) {
    const id = this.addPrefix('cart', cartId);

    return this.client(next, cache).request(getCartQuery, { id });
  }

  public async createCart(
    cartLines: AddCartLine[],
    customerAccessToken?: string,
  ) {
    const lines = cartLines.map((line) => ({
      quantity: line.quantity ?? 1,
      merchandiseId: this.addPrefix('variant', line.variantId),
    }));

    return this.client().request(createCartMutation, {
      input: {
        lines,
        buyerIdentity: {
          customerAccessToken,
        },
      },
    });
  }

  public async addCartLines(cartId: string, cartLines: AddCartLine[]) {
    const lines = cartLines.map((line) => ({
      quantity: line.quantity ?? 1,
      merchandiseId: this.addPrefix('variant', line.variantId),
    }));

    return this.client().request(addCartLineMutation, { cartId, lines });
  }

  public async updateCartLines(cartId: string, cartLines: UpdateCartLine[]) {
    const lines = cartLines.map((line) => ({
      quantity: line.quantity ?? 1,
      id: this.addPrefix('line', line.lineId),
    }));

    return this.client().request(updateCartLineMutation, { cartId, lines });
  }

  public async removeCartLines(cartId: string, cartLineIds: RemoveCartLine[]) {
    const lineIds = cartLineIds.reduce((acc, cur) => {
      const prefixedCur = this.addPrefix('line', cur.lineId);

      return acc.includes(prefixedCur) ? acc : [...acc, prefixedCur];
    }, [] as string[]);

    return this.client().request(removeCartLineMutation, { cartId, lineIds });
  }

  public async updateCartCustomer(cartId: string, customerAccessToken: string) {
    return this.client().request(updateCartBuyerIdentityMutation, {
      cartId,
      buyerIdentity: {
        customerAccessToken,
      },
    });
  }

  public async getCollectionByHandle(
    handle: string,
    sort?: {
      key?: string;
      reverse?: boolean;
    },
    next?: NextFetchRequestConfig,
    cache?: RequestCache,
  ) {
    return this.client(next, cache).request(collectionByHandleQuery, {
      handle,
      first: 20,
      sortKey: (sort?.key ?? DEFAULT_SORTING.sortKey) as CollectionSortKeys,
      sortReverse: sort?.reverse ?? DEFAULT_SORTING.sortReverse,
    });
  }

  public async getProductByHandle(
    handle: string,
    next?: NextFetchRequestConfig,
    cache?: RequestCache,
  ) {
    return this.client(next, cache).request(productByHandleQuery, { handle });
  }
}
