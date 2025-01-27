import { NextRequest } from 'next/server';

import { prismic } from '@/lib/prismic';
import { redirectToPreviewURL } from '@prismicio/next';

export async function GET(request: NextRequest) {
  return await redirectToPreviewURL({ client: prismic, request });
}
