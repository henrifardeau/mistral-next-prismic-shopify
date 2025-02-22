import { PREFIXES } from '@/constants/gid';
import { Cart } from '@/types/cart';
import { Customer } from '@/types/customer';
import { Connection } from '@/types/gql';
import { Product } from '@/types/product';

import {
  RawCart,
  RawCollectionProducts,
  RawCustomer,
  RawProduct,
} from './types';

export class ShopifyHelpers {
  private removeEdgesAndNodes<T>(array: Connection<T>): T[] {
    return array.edges.map((edge) => edge?.node);
  }

  public createStorefrontUrl(domain: string, apiVersion: string) {
    return domain.startsWith('https://')
      ? domain + `/api/${apiVersion}/graphql`
      : 'https://' + domain + `/api/${apiVersion}/graphql`;
  }

  public addPrefix(prefix: keyof typeof PREFIXES, val: string): string {
    return val.startsWith(PREFIXES[prefix]) ? val : PREFIXES[prefix] + val;
  }

  public removePrefix(prefix: keyof typeof PREFIXES, val: string): string {
    return val.startsWith(PREFIXES[prefix])
      ? val.slice(PREFIXES[prefix].length)
      : val;
  }

  public reshapeCustomer(
    rawCustomer: RawCustomer,
    accessToken?: string,
  ): Customer {
    if (!rawCustomer.customer || !accessToken) {
      return {
        authenticated: false,
      };
    }

    return {
      authenticated: true,
      accessToken,
      ...rawCustomer.customer,
      addresses: this.removeEdgesAndNodes(rawCustomer.customer.addresses).map(
        (address) => ({
          ...address,
          default: rawCustomer.customer?.defaultAddress?.id === address.id,
        }),
      ),
    };
  }

  public reshapeCart(rawCart: RawCart): Cart {
    if (!rawCart?.cart) {
      throw new Error('Reshap empty cart forbidden!');
    }

    return {
      id: rawCart.cart.id,
      checkoutUrl: rawCart.cart.checkoutUrl,
      state: 'idle',
      lines: this.removeEdgesAndNodes(rawCart.cart.lines).map((line) => ({
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

  public reshapeCollectionProducts(
    rawProducts: RawCollectionProducts,
  ): Product[] {
    if (!rawProducts.collection?.products) {
      throw new Error('Reshap empty products forbidden!');
    }

    return this.removeEdgesAndNodes(rawProducts.collection.products).map(
      (product) => this.reshapeProduct({ product }),
    );
  }

  public reshapeProduct(rawProduct: RawProduct): Product {
    if (!rawProduct.product) {
      throw new Error('Reshap empty product forbidden!');
    }

    return {
      id: rawProduct.product.id,
      handle: rawProduct.product.handle,
      title: rawProduct.product.title,
      options: rawProduct.product.options,
      variants: this.removeEdgesAndNodes(rawProduct.product.variants).map(
        (variant) => ({
          ...variant,
          image: {
            src: variant.image?.url,
            alt: variant.image?.altText,
          },
        }),
      ),
    };
  }
}
