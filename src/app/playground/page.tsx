import { Metadata } from 'next';

import { prismic } from '@/lib/prismic';
import { components } from '@/slices';
import { asImageSrc, isFilled } from '@prismicio/client';
import { SliceZone } from '@prismicio/react';

export async function generateMetadata(): Promise<Metadata> {
  const page = await prismic.getSingle('homepage');

  return {
    title: page.data.title,
    description: page.data.meta_description,
    openGraph: {
      title: isFilled.keyText(page.data.meta_title)
        ? page.data.meta_title
        : undefined,
      description: isFilled.keyText(page.data.meta_description)
        ? page.data.meta_description
        : undefined,
      images: isFilled.image(page.data.meta_image)
        ? [asImageSrc(page.data.meta_image)]
        : undefined,
    },
  };
}

export default async function Page() {
  const page = await prismic.getSingle('homepage');

  return <SliceZone slices={page.data.slices} components={components} />;
}
