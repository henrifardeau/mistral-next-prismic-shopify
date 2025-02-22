import { DEFAULT_SORTING } from '@/constants/collection';

import {
  AddCartLinesMutation,
  CreateCartMutation,
  CreateCustomerAddressMutation,
  CreateCustomerMutation,
  CreateCustomerTokenMutation,
  CustomerAccessTokenCreateInput,
  CustomerCreateInput,
  GetCartQuery,
  GetCollectionByHandleQuery,
  GetCustomerQuery,
  GetProductByHandleQuery,
  MailingAddressInput,
  RemoveCartLinesMutation,
  RemoveCustomerAddressMutation,
  UpdateCartBuyerIdentityMutation,
  UpdateCartLinesMutation,
  UpdateCustomerAddressMutation,
  UpdateDefaultCustomerAddressMutation,
} from './gql/graphql';
import {
  addCartLinesMutation,
  createCartMutation,
  createCustomerAddressMutation,
  createCustomerMutation,
  createCustomerTokenMutation,
  removeCartLinesMutation,
  removeCustomerAddressMutation,
  updateCartBuyerIdentityMutation,
  updateCartLinesMutation,
  updateCustomerAddressMutation,
  updateDefaultCustomerAddressMutation,
} from './mutations';
import {
  getCartQuery,
  getCollectionByHandleQuery,
  getCustomerQuery,
  getProductByHandleQuery,
} from './queries';
import { Shopify } from './Shopify';
import {
  AddCartLine,
  CollectionSortKeys,
  RemoveCartLine,
  UpdateCartLine,
} from './types';

export class ShopifyInstance extends Shopify {
  public async getCustomer(
    customerAccessToken: string,
    next?: NextFetchRequestConfig,
    cache?: RequestCache,
  ): Promise<GetCustomerQuery> {
    return this.client(next, cache).request(getCustomerQuery, {
      customerAccessToken,
    });
  }

  public async createCustomer(
    input: CustomerCreateInput,
  ): Promise<CreateCustomerMutation> {
    return this.client().request(createCustomerMutation, { input });
  }

  public async createCustomerToken(
    input: CustomerAccessTokenCreateInput,
  ): Promise<CreateCustomerTokenMutation> {
    return this.client().request(createCustomerTokenMutation, { input });
  }

  public async createCustomerAddress(
    customerAccessToken: string,
    address: MailingAddressInput,
  ): Promise<CreateCustomerAddressMutation> {
    return this.client().request(createCustomerAddressMutation, {
      customerAccessToken,
      address,
    });
  }

  public async updateCustomerAddress(
    customerAccessToken: string,
    addressId: string,
    address: MailingAddressInput,
  ): Promise<UpdateCustomerAddressMutation> {
    return this.client().request(updateCustomerAddressMutation, {
      customerAccessToken,
      addressId,
      address,
    });
  }

  public async updateDefaultCustomerAddress(
    customerAccessToken: string,
    addressId: string,
  ): Promise<UpdateDefaultCustomerAddressMutation> {
    return this.client().request(updateDefaultCustomerAddressMutation, {
      customerAccessToken,
      addressId,
    });
  }

  public async removeCustomerAddress(
    customerAccessToken: string,
    addressId: string,
  ): Promise<RemoveCustomerAddressMutation> {
    return this.client().request(removeCustomerAddressMutation, {
      customerAccessToken,
      addressId,
    });
  }

  public async getCart(
    cartId: string,
    next?: NextFetchRequestConfig,
    cache?: RequestCache,
  ): Promise<GetCartQuery> {
    const id = this.addPrefix('cart', cartId);

    return this.client(next, cache).request(getCartQuery, { id });
  }

  public async createCart(
    cartLines: AddCartLine[],
    customerAccessToken?: string,
  ): Promise<CreateCartMutation> {
    const lines = cartLines.map((line) => ({
      quantity: line.quantity ?? 1,
      merchandiseId: this.addPrefix('variant', line.variantId),
    }));

    return this.client().request(createCartMutation, {
      input: {
        lines,
        buyerIdentity: {
          customerAccessToken,
        },
      },
    });
  }

  public async addCartLines(
    cartId: string,
    cartLines: AddCartLine[],
  ): Promise<AddCartLinesMutation> {
    const lines = cartLines.map((line) => ({
      quantity: line.quantity ?? 1,
      merchandiseId: this.addPrefix('variant', line.variantId),
    }));

    return this.client().request(addCartLinesMutation, { cartId, lines });
  }

  public async updateCartLines(
    cartId: string,
    cartLines: UpdateCartLine[],
  ): Promise<UpdateCartLinesMutation> {
    const lines = cartLines.map((line) => ({
      quantity: line.quantity ?? 1,
      id: this.addPrefix('line', line.lineId),
    }));

    return this.client().request(updateCartLinesMutation, { cartId, lines });
  }

  public async removeCartLines(
    cartId: string,
    cartLineIds: RemoveCartLine[],
  ): Promise<RemoveCartLinesMutation> {
    const lineIds = cartLineIds.reduce((acc, cur) => {
      const prefixedCur = this.addPrefix('line', cur.lineId);

      return acc.includes(prefixedCur) ? acc : [...acc, prefixedCur];
    }, [] as string[]);

    return this.client().request(removeCartLinesMutation, { cartId, lineIds });
  }

  public async updateCartCustomer(
    cartId: string,
    customerAccessToken: string,
  ): Promise<UpdateCartBuyerIdentityMutation> {
    return this.client().request(updateCartBuyerIdentityMutation, {
      cartId,
      buyerIdentity: {
        customerAccessToken,
      },
    });
  }

  public async getCollectionByHandle(
    handle: string,
    sort?: {
      key?: string;
      reverse?: boolean;
    },
    next?: NextFetchRequestConfig,
    cache?: RequestCache,
  ): Promise<GetCollectionByHandleQuery> {
    return this.client(next, cache).request(getCollectionByHandleQuery, {
      handle,
      first: 20,
      sortKey: (sort?.key ?? DEFAULT_SORTING.sortKey) as CollectionSortKeys,
      sortReverse: sort?.reverse ?? DEFAULT_SORTING.sortReverse,
    });
  }

  public async getProductByHandle(
    handle: string,
    next?: NextFetchRequestConfig,
    cache?: RequestCache,
  ): Promise<GetProductByHandleQuery> {
    return this.client(next, cache).request(getProductByHandleQuery, {
      handle,
    });
  }
}
