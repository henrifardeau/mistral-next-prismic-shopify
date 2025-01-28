import type { Metadata } from 'next';

import '@/styles/globals.css';

import { CartButton } from '@/components/cart-button';
import { CartDrawer } from '@/components/cart-drawer';
import { CartStoreProvider } from '@/hooks/use-cart-store';
import { prismic, repositoryName } from '@/lib/prismic';
import { getCart } from '@/lib/shopify';
import { asImageSrc, isFilled } from '@prismicio/client';
import { PrismicPreview } from '@prismicio/next';
import { CartDrawerProvider } from '@/hooks/use-cart-drawer';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cartPromise = getCart();

  return (
    <html lang="fr">
      <body>
        <CartStoreProvider cartPromise={cartPromise}>
          <CartDrawerProvider>
            <header className="sticky top-0">
              <CartButton />
            </header>
            <main>{children}</main>
            <footer>Foot</footer>
            <CartDrawer />
          </CartDrawerProvider>
        </CartStoreProvider>
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
