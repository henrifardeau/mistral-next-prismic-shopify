'use client';

import { useMemo } from 'react';

import { PrismicCarousel } from '@/components/prismic-carousel';
import { useProduct } from '@/hooks/use-product';
import { FilledImageFieldImage } from '@prismicio/client';

export function ProductVariantImages({
  imagesMap,
}: {
  imagesMap: Record<string, FilledImageFieldImage[]>;
}) {
  const variant = useProduct((state) => state.currentVariant);

  const images = useMemo(() => {
    return imagesMap[variant.id] || [];
  }, [variant.id, imagesMap]);

  return <PrismicCarousel images={images} />;
}
