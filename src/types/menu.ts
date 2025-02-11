import { Content, GroupField } from '@prismicio/client';

import { Simplify } from '../../prismicio-types';

export type PrimaryLinks = GroupField<
  Simplify<Content.MenuDocumentDataPrimaryLinksItem>
>;

export type SecondaryLinks = {
  [parentId: string]: Simplify<Content.MenuDocumentDataSecondaryLinksItem>[];
};
