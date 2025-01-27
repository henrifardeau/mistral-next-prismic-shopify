import Link from 'next/link';

import { shopify } from '@/lib/shopify';
import { isFilled, KeyTextField } from '@prismicio/client';

export default async function ProductCard({
  uid,
  title,
  shopifyId,
}: {
  uid: string;
  title: KeyTextField;
  shopifyId?: KeyTextField;
}) {
  if (!isFilled.keyText(shopifyId)) {
    throw Error('Product is not linked with Shopify');
  }

  const shopifyProduct = await shopify.getShortProductById('9624120394058');

  return (
    <Link href={`/products/${uid}`}>
      <h1>{title}</h1>
      <pre className="hidden">
        {JSON.stringify({ shopifyProduct }, null, 2)}
      </pre>
    </Link>
  );
}
