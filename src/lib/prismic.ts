import { env } from '@/env';
import { Client, ClientConfig, createClient } from '@prismicio/client';
import { CreateClientConfig, enableAutoPreviews } from '@prismicio/next';

import { AllDocumentTypes } from '../../prismicio-types';
import config from '../../slicemachine.config.json';

export const repositoryName = config.repositoryName;

const routes: ClientConfig['routes'] = [
  {
    type: 'homepage',
    path: '/',
  },
  {
    type: 'products',
    path: '/products/:uid',
  },
];

const prismicInstance = (config: CreateClientConfig = {}) => {
  const client = createClient(repositoryName, {
    routes,
    fetchOptions:
      env.NODE_ENV === 'production'
        ? { next: { tags: ['prismic'] }, cache: 'force-cache' }
        : { next: { revalidate: 5 } },
    ...config,
  });

  enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};

const globalForPrismic = global as unknown as {
  prismic: Client<AllDocumentTypes>;
};

export const prismic = globalForPrismic.prismic || prismicInstance();

if (env.NODE_ENV !== 'production') globalForPrismic.prismic = prismic;
