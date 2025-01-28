import {
  AddToCartLine,
  RemoveToCartLine,
  UpdateToCartLine,
} from '@/types/cart';

import {
  addVariantToCartMutation,
  createCartMutation,
  removeVariantToCartMutation,
  updateVariantToCartMutation,
} from './mutations';
import {
  cartByIdQuery,
  longProductByIdQuery,
  shortProductByIdQuery,
} from './queries';
import { Shopify } from './Shopify';

const PREFIXES = Object.freeze({
  cart: 'gid://shopify/Cart/',
  collection: 'gid://shopify/Collection/',
  product: 'gid://shopify/Product/',
  variant: 'gid://shopify/ProductVariant/',
  line: 'gid://shopify/CartLine/',
});

export class ShopifyInstance extends Shopify {
  public async createCart(cartLines: AddToCartLine[]) {
    const lines = cartLines.map((line) => ({
      quantity: line.quantity ?? 1,
      merchandiseId: line.merchandiseId.startsWith(PREFIXES.variant)
        ? line.merchandiseId
        : PREFIXES.variant + line.merchandiseId,
    }));

    return this.client().request(createCartMutation, { input: { lines } });
  }

  public async addVariantToCart(cartId: string, cartLines: AddToCartLine[]) {
    const lines = cartLines.map((line) => ({
      quantity: line.quantity ?? 1,
      merchandiseId: line.merchandiseId.startsWith(PREFIXES.variant)
        ? line.merchandiseId
        : PREFIXES.variant + line.merchandiseId,
    }));

    return this.client().request(addVariantToCartMutation, { cartId, lines });
  }

  public async updateVariantToCart(
    cartId: string,
    cartLines: UpdateToCartLine[],
  ) {
    const lines = cartLines.map((line) => ({
      quantity: line.quantity ?? 1,
      id: line.lineId.startsWith(PREFIXES.line)
        ? line.lineId
        : PREFIXES.line + line.lineId,
    }));

    return this.client().request(updateVariantToCartMutation, {
      cartId,
      lines,
    });
  }

  public async removeVariantToCart(
    cartId: string,
    cartLineIds: RemoveToCartLine[],
  ) {
    const lineIds = cartLineIds.reduce((acc, cur) => {
      const prefixedCur = cur.lineId.startsWith(PREFIXES.line)
        ? cur.lineId
        : PREFIXES.line + cur.lineId;

      return acc.includes(prefixedCur) ? acc : [...acc, prefixedCur];
    }, [] as string[]);

    return this.client().request(removeVariantToCartMutation, {
      cartId,
      lineIds,
    });
  }

  public async getCart(
    cartId: string,
    next?: NextFetchRequestConfig,
    cache?: RequestCache,
  ) {
    const id = cartId.startsWith(PREFIXES.cart)
      ? cartId
      : PREFIXES.cart + cartId;

    return this.client(next, cache).request(cartByIdQuery, { id });
  }

  public async getShortProductById(
    productId: string,
    next?: NextFetchRequestConfig,
    cache?: RequestCache,
  ) {
    const id = productId.startsWith(PREFIXES.product)
      ? productId
      : PREFIXES.product + productId;

    return this.client(next, cache).request(shortProductByIdQuery, { id });
  }

  public async getLongProductById(
    productId: string,
    next?: NextFetchRequestConfig,
    cache?: RequestCache,
  ) {
    const id = productId.startsWith(PREFIXES.product)
      ? productId
      : PREFIXES.product + productId;

    return this.client(next, cache).request(longProductByIdQuery, { id });
  }
}
