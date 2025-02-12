import Link from 'next/link';

import { Content } from '@prismicio/client';

export async function CollectionGridItem({
  item,
}: {
  item: Content.CollectionsDocument;
}) {
  return (
    <div className="flex h-[29rem] items-center justify-center border sm:min-w-[19rem] lg:col-span-2 xl:h-[40rem]">
      <Link href={`/collections/${item.uid}`}>
        <h1>{item.data.title}</h1>
      </Link>
    </div>
  );
}
