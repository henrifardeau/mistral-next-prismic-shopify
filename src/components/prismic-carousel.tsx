import { FilledImageFieldImage } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';

import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

export function PrismicCarousel({
  images,
}: {
  images: FilledImageFieldImage[];
}) {
  if (images.length <= 1) {
    return (
      <PrismicNextImage
        field={images[0]}
        fallbackAlt=""
        className="h-full object-cover select-none"
      />
    );
  }

  return (
    <Carousel>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <PrismicNextImage
              field={image}
              fallbackAlt=""
              className="h-full object-cover select-none"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
