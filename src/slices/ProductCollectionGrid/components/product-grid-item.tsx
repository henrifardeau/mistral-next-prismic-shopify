import Link from 'next/link';

import { Content } from '@prismicio/client';

export async function ProductGridItem({
  product,
}: {
  product: Content.ProductsDocument;
}) {
  return (
    <article className="flex h-[29rem] items-center justify-center border sm:min-w-[19rem] xl:h-[40rem]">
      <Link href={product.url!}>
        <h1>{product.data.title}</h1>
      </Link>
    </article>
  );
}
