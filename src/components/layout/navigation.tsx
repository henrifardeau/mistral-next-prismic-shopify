import { MenuDrawer } from '@/components/menu';
import { prismic } from '@/lib/prismic';
import { components } from '@/slices';
import { SecondaryLinks } from '@/types/menu';
import { Content } from '@prismicio/client';
import { SliceZone } from '@prismicio/react';

function groupLinks(menu: Content.MenuDocument) {
  return menu.data.primary_links.reduce((acc, cur) => {
    if (!cur.uid) {
      return acc;
    }

    const childs = menu.data.secondary_links.filter(
      (sl) => sl.parent_uid === cur.uid,
    );

    return {
      ...acc,
      [cur.uid]: childs,
    };
  }, {} as SecondaryLinks);
}

export async function Navigation() {
  const page = await prismic.getSingle('navigation');
  const menu = await prismic.getSingle('menu');

  return (
    <>
      <SliceZone slices={page.data.slices} components={components} />
      <MenuDrawer
        primaryLinks={menu.data.primary_links}
        secondaryLinks={groupLinks(menu)}
      />
    </>
  );
}
