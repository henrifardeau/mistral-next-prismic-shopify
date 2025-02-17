export const DEFAULT_SORTING = {
  name: 'Relevance',
  slug: 'default',
  sortKey: 'COLLECTION_DEFAULT',
  sortReverse: false,
};

export const SORTING: {
  name: string;
  slug: string;
  sortKey: string;
  sortReverse: boolean;
}[] = [
  DEFAULT_SORTING,
  {
    name: 'Trending',
    slug: 'trending-desc',
    sortKey: 'BEST_SELLING',
    sortReverse: false,
  },
  {
    name: 'Latest arrivals',
    slug: 'latest-desc',
    sortKey: 'CREATED',
    sortReverse: true,
  },
  {
    name: 'Price: Low to high',
    slug: 'price-asc',
    sortKey: 'PRICE',
    sortReverse: false,
  },
  {
    name: 'Price: High to low',
    slug: 'price-desc',
    sortKey: 'PRICE',
    sortReverse: true,
  },
];
