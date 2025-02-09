import Link from 'next/link';

import { Content } from '@prismicio/client';

export async function ProductGridItem({
  product,
}: {
  product: Content.ProductsDocument;
}) {
  return (
    <div className="flex aspect-square items-center justify-center bg-neutral-100">
      <Link href={product.url!}>
        <h1>{product.data.title}</h1>
      </Link>
    </div>
  );
}
