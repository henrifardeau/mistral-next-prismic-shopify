import { Content } from '@prismicio/client';

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
        return <components.products key={index} data={item} />;
      }
      case 'collections': {
        return <components.collections key={index} data={item} />;
      }
    }
  });
}
