import { GraphQLClient } from 'graphql-request';

import { GetProductByHandleQuery } from './gql/graphql';
import { getProductByHandleQuery } from './queries';
import { ShopifyHelpers } from './ShopifyHelpers';
import { RawProduct } from './types';
import { Product } from '@/types/product';

export class ShopifyProduct {
  constructor(
    private readonly storefrontURL: string,
    private readonly storefrontToken: string,
    private readonly helpers: ShopifyHelpers,
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

  public reshape(rawProduct: RawProduct): Product {
    if (!rawProduct.product) {
      throw new Error('Reshap empty product forbidden!');
    }

    return {
      id: rawProduct.product.id,
      handle: rawProduct.product.handle,
      title: rawProduct.product.title,
      options: rawProduct.product.options,
      variants: this.helpers
        .removeEdgesAndNodes(rawProduct.product.variants)
        .map((variant) => ({
          ...variant,
          image: {
            src: variant.image?.url,
            alt: variant.image?.altText,
          },
        })),
    };
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
