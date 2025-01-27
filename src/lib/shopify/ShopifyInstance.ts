import { longProductByIdQuery, shortProductByIdQuery } from './queries';
import { Shopify } from './Shopify';

const PREFIXES = {
  collection: 'gid://shopify/Collection/',
  product: 'gid://shopify/Product/',
};

export class ShopifyInstance extends Shopify {
  public async getShortProductById(
    productId: string,
    next?: NextFetchRequestConfig,
    cache?: RequestCache,
  ) {
    return this.client(next, cache).request(shortProductByIdQuery, {
      id: productId.startsWith(PREFIXES.product)
        ? productId
        : PREFIXES.product + productId,
    });
  }

  public async getLongProductById(
    productId: string,
    next?: NextFetchRequestConfig,
    cache?: RequestCache,
  ) {
    return this.client(next, cache).request(longProductByIdQuery, {
      id: productId.startsWith(PREFIXES.product)
        ? productId
        : PREFIXES.product + productId,
    });
  }
}
