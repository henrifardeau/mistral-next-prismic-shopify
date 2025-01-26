import { productsQuery } from './queries';
import { Shopify } from './Shopify';

export class ShopifyInstance extends Shopify {
  public async getProducts(
    next?: NextFetchRequestConfig,
    cache?: RequestCache,
  ) {
    return this.client(next, cache).request(productsQuery);
  }
}
