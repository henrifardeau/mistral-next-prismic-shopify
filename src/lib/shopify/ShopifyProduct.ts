import { GraphQLClient } from 'graphql-request';

import { GetProductByHandleQuery } from './gql/graphql';
import { getProductByHandleQuery } from './queries';

export class ShopifyProduct {
  constructor(
    private readonly storefrontURL: string,
    private readonly storefrontToken: string,
  ) {}

  public async getByHandle(
    handle: string,
    next?: NextFetchRequestConfig,
    cache?: RequestCache,
  ): Promise<GetProductByHandleQuery> {
    return this.customClient(next, cache).request(getProductByHandleQuery, {
      handle,
    });
  }

  private customClient(
    next?: NextFetchRequestConfig,
    cache?: RequestCache,
  ): GraphQLClient {
    return new GraphQLClient(this.storefrontURL, {
      headers: {
        'x-shopify-storefront-access-token': this.storefrontToken,
      },
      cache,
      next,
    });
  }
}
