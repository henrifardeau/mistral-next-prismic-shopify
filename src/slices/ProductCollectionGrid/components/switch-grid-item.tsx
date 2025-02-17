import { Product } from '@/types/product';
import { Content } from '@prismicio/client';

interface SwitchGridItemProps {
  products: Product[];
  documents: Content.ProductsDocument[];
  components: {
    products: React.FC<{
      document: Content.ProductsDocument;
      product: Product;
    }>;
  };
}

export function SwitchGridItem({
  products,
  documents,
  components,
}: SwitchGridItemProps) {
  return documents.map((document) => {
    switch (document.type) {
      case 'products': {
        const product = products.find((p) => p.handle === document.uid);
        if (!product) {
          console.error(`Cannot find product ${document.uid}`);
          return null;
        }

        return (
          <components.products
            key={product.id}
            document={document}
            product={product}
          />
        );
      }
    }
  });
}
