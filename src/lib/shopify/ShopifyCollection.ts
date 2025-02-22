import { GraphQLClient } from 'graphql-request';

import { DEFAULT_SORTING } from '@/constants/collection';

import { GetCollectionByHandleQuery } from './gql/graphql';
import { getCollectionByHandleQuery } from './queries';
import { CollectionSortKeys } from './types';

export class ShopifyCollection {
  constructor(
    private readonly storefrontURL: string,
    private readonly storefrontToken: string,
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
