import type { Metadata } from 'next';

import '@/styles/globals.css';

import { PropsWithChildren } from 'react';

import { CartDrawer } from '@/components/cart-drawer';
import { Footer, Main, Navigation } from '@/components/layout';
import { CartStoreProvider } from '@/hooks/use-cart-store';
import { prismic, repositoryName } from '@/lib/prismic';
import { getCart } from '@/lib/shopify/actions';
import { asImageSrc, isFilled } from '@prismicio/client';
import { PrismicPreview } from '@prismicio/next';

export async function generateMetadata(): Promise<Metadata> {
  const page = await prismic.getSingle('settings');

  return {
    title: isFilled.keyText(page.data.meta_title)
      ? page.data.meta_title
      : 'Mistral',
    description: isFilled.keyText(page.data.meta_description)
      ? page.data.meta_description
      : 'Mistral Storefront',
    openGraph: {
      title: isFilled.keyText(page.data.meta_title)
        ? page.data.meta_title
        : 'Mistral',
      description: isFilled.keyText(page.data.meta_description)
        ? page.data.meta_description
        : 'Mistral Storefront',
      images: isFilled.image(page.data.meta_image)
        ? [asImageSrc(page.data.meta_image)]
        : 'https://placehold.co/1200x628',
    },
  };
}

export default async function RootLayout({ children }: PropsWithChildren) {
  const cartPromise = getCart();

  return (
    <html lang="fr">
      <body>
        <CartStoreProvider cartPromise={cartPromise}>
          <Navigation />
          <Main>{children}</Main>
          <Footer />

          <CartDrawer />
        </CartStoreProvider>

        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
