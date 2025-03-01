import { Connection } from '@/types/gql';
import { ValveConfig } from '@/valve.config';

export type ShopifyGID = 'cart' | 'collection' | 'product' | 'variant' | 'line';
export class ShopifyHelpers {
  constructor(private readonly config: ValveConfig) {}

  public addPrefix(prefix: ShopifyGID, val: string): string {
    return val.startsWith(this.config.shopify.gid[prefix])
      ? val
      : this.config.shopify.gid[prefix] + val;
  }

  public removePrefix(prefix: ShopifyGID, val: string): string {
    return val.startsWith(this.config.shopify.gid[prefix])
      ? val.slice(this.config.shopify.gid[prefix].length)
      : val;
  }

  public removeEdgesAndNodes<T>(array: Connection<T>): T[] {
    return array.edges.map((edge) => edge?.node);
  }
}
