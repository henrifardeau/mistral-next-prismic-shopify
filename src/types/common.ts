export type Params<T> = Promise<T>;

export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export type CompareAtPrice = Price | null;

export type Price = {
  amount: string;
  currencyCode: string;
};
