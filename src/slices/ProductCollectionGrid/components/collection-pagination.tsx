'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function CollectionPagination({
  cursor,
  hasNext,
}: {
  cursor?: string | null;
  hasNext: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const goNext = () => {
    if (!cursor) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    params.set('page', cursor);
    router.push(`${pathname}?${params.toString()}`);
  };

  if (!cursor || !hasNext) {
    return <div>No more products</div>;
  }

  return (
    <div className="col-span-full flex items-center justify-center space-x-2 pt-12">
      <button
        onClick={goNext}
        className="rounded-full bg-black px-4 py-2 text-white"
      >
        Next
      </button>
    </div>
  );
}
