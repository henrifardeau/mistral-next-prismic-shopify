'use client';

import { PrismicCarousel } from '@/components/prismic-carousel';
import { useProduct } from '@/hooks/use-product';

export function ProductVariantImages() {
  const variant = useProduct((state) => state.currentVariant);

  return <PrismicCarousel images={variant.images} />;
}
