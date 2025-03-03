import type { Metadata } from 'next';

import '@/styles/globals.css';

import { PropsWithChildren } from 'react';

import { getCart, getCustomer } from '@/api/actions';
import { CartDrawer } from '@/components/cart';
import { AccountDrawer } from '@/components/customer';
import { Footer, Main, Navigation } from '@/components/layout';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/hooks/use-cart';
import { CustomerProvider } from '@/hooks/use-customer';
import { prismic, repositoryName } from '@/lib/prismic';
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
  const customerPromise = getCustomer();
  const cartPromise = getCart();

  return (
    <html lang="fr">
      <body>
        <CustomerProvider customerPromise={customerPromise}>
          <CartProvider cartPromise={cartPromise}>
            <Navigation />
            <Main>{children}</Main>
            <Footer />
            <Toaster />
            <CartDrawer />
            <AccountDrawer />
          </CartProvider>
        </CustomerProvider>

        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
