import { createClient } from '@/prismicio';
import { Client } from '@prismicio/client';

import { AllDocumentTypes } from '../../prismicio-types';

const globalForPrismic = global as unknown as {
  prismic: Client<AllDocumentTypes>;
};

export const prismic = globalForPrismic.prismic || createClient();

if (process.env.NODE_ENV !== 'production') globalForPrismic.prismic = prismic;
