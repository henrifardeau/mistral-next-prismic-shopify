import { productByIdQuery } from './queries';
import { Shopify } from './Shopify';

const PREFIXES = {
  collection: 'gid://shopify/Collection/',
  product: 'gid://shopify/Product/',
};

export class ShopifyInstance extends Shopify {
  public async getProductById(
    productId: string,
    next?: NextFetchRequestConfig,
    cache?: RequestCache,
  ) {
    return this.client(next, cache).request(productByIdQuery, {
      id: productId.startsWith(PREFIXES.collection)
        ? productId
        : PREFIXES.product + productId,
    });
  }
}
