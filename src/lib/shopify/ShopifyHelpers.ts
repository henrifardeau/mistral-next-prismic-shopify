import { PREFIXES } from '@/constants/gid';
import { Connection } from '@/types/gql';

export class ShopifyHelpers {
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

  public removeEdgesAndNodes<T>(array: Connection<T>): T[] {
    return array.edges.map((edge) => edge?.node);
  }
}
