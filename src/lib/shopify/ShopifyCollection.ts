import { GraphQLClient } from 'graphql-request';

import { DEFAULT_SORTING } from '@/constants/collection';

import { GetCollectionByHandleQuery } from './gql/graphql';
import { getCollectionByHandleQuery } from './queries';
import { ShopifyHelpers } from './ShopifyHelpers';
import { CollectionSortKeys, RawCollectionProducts } from './types';
import { Product } from '@/types/product';
import { ShopifyProduct } from './ShopifyProduct';

export class ShopifyCollection {
  constructor(
    private readonly storefrontURL: string,
    private readonly storefrontToken: string,
    private readonly product: ShopifyProduct,
    private readonly helpers: ShopifyHelpers,
  ) {}

  public async getByHandle(
    handle: string,
    sort?: {
      key?: string;
      reverse?: boolean;
    },
    next?: NextFetchRequestConfig,
    cache?: RequestCache,
  ): Promise<GetCollectionByHandleQuery> {
    return this.customClient(next, cache).request(getCollectionByHandleQuery, {
      handle,
      first: 20,
      sortKey: (sort?.key ?? DEFAULT_SORTING.sortKey) as CollectionSortKeys,
      sortReverse: sort?.reverse ?? DEFAULT_SORTING.sortReverse,
    });
  }

  public reshape(rawProducts: RawCollectionProducts): Product[] {
    if (!rawProducts.collection?.products) {
      throw new Error('Reshap empty products forbidden!');
    }

    return this.helpers
      .removeEdgesAndNodes(rawProducts.collection.products)
      .map((product) => this.product.reshape({ product }));
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
