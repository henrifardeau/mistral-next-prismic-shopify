import { GraphQLClient } from 'graphql-request';
import { SessionOptions } from 'iron-session';

import {
  AddCartLinesMutation,
  CreateCartMutation,
  GetCartQuery,
  RemoveCartLinesMutation,
  UpdateCartBuyerIdentityMutation,
  UpdateCartLinesMutation,
} from './gql/graphql';
import {
  addCartLinesMutation,
  createCartMutation,
  removeCartLinesMutation,
  updateCartBuyerIdentityMutation,
  updateCartLinesMutation,
} from './mutations';
import { getCartQuery } from './queries';
import { ShopifyHelpers } from './ShopifyHelpers';
import { AddCartLine, RawCart, RemoveCartLine, UpdateCartLine } from './types';
import { Cart } from '@/types/cart';

export class ShopifyCart {
  constructor(
    private readonly client: GraphQLClient,
    private readonly storefrontURL: string,
    private readonly storefrontToken: string,
    private readonly cookiePassword: string,
    private readonly helpers: ShopifyHelpers,
  ) {}

  public get sessionOptions(): SessionOptions {
    return {
      password: this.cookiePassword,
      cookieName: '_psp_cart',
      cookieOptions: {
        maxAge: 7 * 24 * 60 * 60, // 7 days,
        httpOnly: true,
        secure: true,
        sameSite: 'strict' as const,
      },
    };
  }

  public async get(
    cartId: string,
    next?: NextFetchRequestConfig,
    cache?: RequestCache,
  ): Promise<GetCartQuery> {
    const id = this.helpers.addPrefix('cart', cartId);

    return this.customClient(next, cache).request(getCartQuery, { id });
  }

  public async create(
    cartLines: AddCartLine[],
    customerAccessToken?: string,
  ): Promise<CreateCartMutation> {
    const lines = cartLines.map((line) => ({
      quantity: line.quantity ?? 1,
      merchandiseId: this.helpers.addPrefix('variant', line.variantId),
    }));

    return this.client.request(createCartMutation, {
      input: {
        lines,
        buyerIdentity: {
          customerAccessToken,
        },
      },
    });
  }

  public async addLines(
    cartId: string,
    cartLines: AddCartLine[],
  ): Promise<AddCartLinesMutation> {
    const lines = cartLines.map((line) => ({
      quantity: line.quantity ?? 1,
      merchandiseId: this.helpers.addPrefix('variant', line.variantId),
    }));

    return this.client.request(addCartLinesMutation, { cartId, lines });
  }

  public async updateLines(
    cartId: string,
    cartLines: UpdateCartLine[],
  ): Promise<UpdateCartLinesMutation> {
    const lines = cartLines.map((line) => ({
      quantity: line.quantity ?? 1,
      id: this.helpers.addPrefix('line', line.lineId),
    }));

    return this.client.request(updateCartLinesMutation, { cartId, lines });
  }

  public async removeLines(
    cartId: string,
    cartLineIds: RemoveCartLine[],
  ): Promise<RemoveCartLinesMutation> {
    const lineIds = cartLineIds.reduce((acc, cur) => {
      const prefixedCur = this.helpers.addPrefix('line', cur.lineId);

      return acc.includes(prefixedCur) ? acc : [...acc, prefixedCur];
    }, [] as string[]);

    return this.client.request(removeCartLinesMutation, { cartId, lineIds });
  }

  public async updateCustomer(
    cartId: string,
    customerAccessToken: string,
  ): Promise<UpdateCartBuyerIdentityMutation> {
    return this.client.request(updateCartBuyerIdentityMutation, {
      cartId,
      buyerIdentity: {
        customerAccessToken,
      },
    });
  }

  public reshape(rawCart: RawCart): Cart {
    if (!rawCart?.cart) {
      throw new Error('Reshap empty cart forbidden!');
    }

    return {
      id: rawCart.cart.id,
      checkoutUrl: rawCart.cart.checkoutUrl,
      state: 'idle',
      lines: this.helpers
        .removeEdgesAndNodes(rawCart.cart.lines)
        .map((line) => ({
          id: line.id,
          quantity: line.quantity,
          availableForSale: line.merchandise.availableForSale,
          product: {
            handle: line.merchandise.product.handle,
            title: line.merchandise.product.title,
          },
          variant: {
            id: line.merchandise.id,
            title: line.merchandise.title,
            compareAtPrice: line.merchandise.compareAtPrice,
            price: line.merchandise.price,
            image: {
              src: line.merchandise.image?.url,
              alt: line.merchandise.image?.altText,
            },
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
