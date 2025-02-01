import {} from '@/types/cart';

import {
  addCartLineMutation,
  createCartMutation,
  removeCartLineMutation,
  updateCartLineMutation,
} from './mutations';
import {
  getCartQuery,
  longProductByHandleQuery,
  shortProductByHandleQuery,
} from './queries';
import { Shopify } from './Shopify';
import { AddCartLine, RemoveCartLine, UpdateCartLine } from './types';

export class ShopifyInstance extends Shopify {
  public async createCart(cartLines: AddCartLine[]) {
    const lines = cartLines.map((line) => ({
      quantity: line.quantity ?? 1,
      merchandiseId: this.addPrefix('variant', line.variantId),
    }));

    return this.client().request(createCartMutation, { input: { lines } });
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

    return this.client().request(updateCartLineMutation, {
      cartId,
      lines,
    });
  }

  public async removeCartLines(cartId: string, cartLineIds: RemoveCartLine[]) {
    const lineIds = cartLineIds.reduce((acc, cur) => {
      const prefixedCur = this.addPrefix('line', cur.lineId);

      return acc.includes(prefixedCur) ? acc : [...acc, prefixedCur];
    }, [] as string[]);

    return this.client().request(removeCartLineMutation, {
      cartId,
      lineIds,
    });
  }

  public async getCart(
    cartId: string,
    next?: NextFetchRequestConfig,
    cache?: RequestCache,
  ) {
    const id = this.addPrefix('cart', cartId);

    return this.client(next, cache).request(getCartQuery, { id });
  }

  public async getShortProductByHandle(
    handle: string,
    next?: NextFetchRequestConfig,
    cache?: RequestCache,
  ) {
    return this.client(next, cache).request(shortProductByHandleQuery, {
      handle,
    });
  }

  public async getLongProductByHandle(
    handle: string,
    next?: NextFetchRequestConfig,
    cache?: RequestCache,
  ) {
    return this.client(next, cache).request(longProductByHandleQuery, {
      handle,
    });
  }
}
