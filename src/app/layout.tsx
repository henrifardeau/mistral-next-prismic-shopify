import type { Metadata } from 'next';

import '@/styles/globals.css';

import { prismic } from '@/lib/prismic';
import { repositoryName } from '@/prismicio';
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <header>Head</header>
        <main>{children}</main>
        <footer>Foot</footer>
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
