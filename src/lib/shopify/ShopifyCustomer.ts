import { GraphQLClient } from 'graphql-request';
import { SessionOptions } from 'iron-session';

import { Customer } from '@/types/customer';

import {
  CreateCustomerAddressMutation,
  CreateCustomerMutation,
  CreateCustomerTokenMutation,
  CustomerAccessTokenCreateInput,
  CustomerCreateInput,
  GetCustomerQuery,
  MailingAddressInput,
  RemoveCustomerAddressMutation,
  UpdateCustomerAddressMutation,
  UpdateDefaultCustomerAddressMutation,
} from './gql/graphql';
import {
  createCustomerAddressMutation,
  createCustomerMutation,
  createCustomerTokenMutation,
  removeCustomerAddressMutation,
  updateCustomerAddressMutation,
  updateDefaultCustomerAddressMutation,
} from './mutations';
import { getCustomerQuery } from './queries';
import { ShopifyHelpers } from './ShopifyHelpers';
import { RawCustomer } from './types';
import { ValveConfig } from '@/valve.config';

export class ShopifyCustomer {
  constructor(
    private readonly config: ValveConfig,
    private readonly client: GraphQLClient,
    private readonly helpers: ShopifyHelpers,
  ) {}

  public get sessionOptions(): SessionOptions {
    return {
      password: this.config.customer.session.password,
      cookieName: this.config.customer.session.key,
      cookieOptions: {
        maxAge: this.config.customer.session.duration || 7 * 24 * 60 * 60, // 7 days,
        httpOnly: true,
        secure: true,
        sameSite: 'strict' as const,
      },
    };
  }

  public async get(
    customerAccessToken: string,
    next?: NextFetchRequestConfig,
    cache?: RequestCache,
  ): Promise<GetCustomerQuery> {
    return this.customClient(next, cache).request(getCustomerQuery, {
      customerAccessToken,
    });
  }

  public async create(
    input: CustomerCreateInput,
  ): Promise<CreateCustomerMutation> {
    return this.client.request(createCustomerMutation, { input });
  }

  public async createToken(
    input: CustomerAccessTokenCreateInput,
  ): Promise<CreateCustomerTokenMutation> {
    return this.client.request(createCustomerTokenMutation, { input });
  }

  public async createAddress(
    customerAccessToken: string,
    address: MailingAddressInput,
  ): Promise<CreateCustomerAddressMutation> {
    return this.client.request(createCustomerAddressMutation, {
      customerAccessToken,
      address,
    });
  }

  public async updateAddress(
    customerAccessToken: string,
    addressId: string,
    address: MailingAddressInput,
  ): Promise<UpdateCustomerAddressMutation> {
    return this.client.request(updateCustomerAddressMutation, {
      customerAccessToken,
      addressId,
      address,
    });
  }

  public async updateDefaultAddress(
    customerAccessToken: string,
    addressId: string,
  ): Promise<UpdateDefaultCustomerAddressMutation> {
    return this.client.request(updateDefaultCustomerAddressMutation, {
      customerAccessToken,
      addressId,
    });
  }

  public async removeAddress(
    customerAccessToken: string,
    addressId: string,
  ): Promise<RemoveCustomerAddressMutation> {
    return this.client.request(removeCustomerAddressMutation, {
      customerAccessToken,
      addressId,
    });
  }

  public reshape(rawCustomer: RawCustomer, accessToken?: string): Customer {
    if (!rawCustomer.customer || !accessToken) {
      return {
        authenticated: false,
      };
    }

    return {
      authenticated: true,
      accessToken,
      ...rawCustomer.customer,
      addresses: this.helpers
        .removeEdgesAndNodes(rawCustomer.customer.addresses)
        .map((address) => ({
          ...address,
          default: rawCustomer.customer?.defaultAddress?.id === address.id,
        })),
      orders: this.helpers
        .removeEdgesAndNodes(rawCustomer.customer.orders)
        .map((order) => ({ ...order })),
    };
  }

  private customClient(
    next?: NextFetchRequestConfig,
    cache?: RequestCache,
  ): GraphQLClient {
    return new GraphQLClient(this.config.shopify.endpoint, {
      headers: {
        'x-shopify-storefront-access-token':
          this.config.shopify.storefrontToken,
      },
      cache,
      next,
    });
  }
}
