import { PrismicCarousel } from '@/components/prismic-carousel';
import { FilledImageFieldImage } from '@prismicio/client';

export function ProductImages({ images }: { images: FilledImageFieldImage[] }) {
  return <PrismicCarousel images={images} />;
}
