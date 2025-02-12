import { Suspense } from 'react';

import { Content } from '@prismicio/client';

import { ProductGridItemSkeleton } from './product-grid-item-skeleton';

interface SwitchGridItemProps {
  items: (Content.ProductsDocument | Content.CollectionsDocument)[];
  components: {
    products: React.FC<{ data: Content.ProductsDocument }>;
    collections: React.FC<{ data: Content.CollectionsDocument }>;
  };
}

export function SwitchGridItem({ items, components }: SwitchGridItemProps) {
  return items.map((item, index) => {
    switch (item.type) {
      case 'products': {
        return (
          <Suspense fallback={<ProductGridItemSkeleton />}>
            <components.products key={index} data={item} />
          </Suspense>
        );
      }
      case 'collections': {
        return <components.collections key={index} data={item} />;
      }
    }
  });
}
