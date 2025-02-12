'use client';

import { useMemo } from 'react';

import { PrismicCarousel } from '@/components/prismic-carousel';
import { useProduct } from '@/hooks/use-product';
import { FilledImageFieldImage } from '@prismicio/client';

export function ProductVariantImages({
  variantsImages,
  productImages,
}: {
  variantsImages: Record<string, FilledImageFieldImage[]>;
  productImages?: FilledImageFieldImage[];
}) {
  const variant = useProduct((state) => state.currentVariant);

  const images = useMemo(() => {
    return (variantsImages[variant.id] || []).concat(productImages || []);
  }, [variant.id, variantsImages, productImages]);

  return <PrismicCarousel images={images} />;
}
