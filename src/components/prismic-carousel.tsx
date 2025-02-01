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
      <div className="grid gap-4">
        {images.map((image, index) => (
          <PrismicNextImage
            key={index}
            field={image}
            fallbackAlt=""
            className="h-[calc(100vh-3rem)] rounded-xl object-cover select-none"
          />
        ))}
      </div>
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
              className="h-[calc(100vh-3rem)] object-cover select-none"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
