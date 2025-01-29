import Link from 'next/link';

import { shopify } from '@/lib/shopify';
import { isFilled, KeyTextField } from '@prismicio/client';

export default async function ProductCard({
  title,
  shopifyHandle,
}: {
  title: KeyTextField;
  shopifyHandle?: KeyTextField;
}) {
  if (!isFilled.keyText(shopifyHandle)) {
    throw Error('Product is not linked with Shopify');
  }

  const shopifyProduct = await shopify.getShortProductByHandle(shopifyHandle);

  return (
    <Link href={`/products/${shopifyHandle}`}>
      <h1>{title}</h1>
      <pre className="hidden">
        {JSON.stringify({ shopifyProduct }, null, 2)}
      </pre>
    </Link>
  );
}
