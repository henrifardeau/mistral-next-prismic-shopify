'use client';

import { PrismicCarousel } from '@/components/prismic-carousel';
import { useProduct } from '@/hooks/use-product';

export function ProductImages() {
  const images = useProduct((state) => state.images);

  return <PrismicCarousel images={images} />;
}
