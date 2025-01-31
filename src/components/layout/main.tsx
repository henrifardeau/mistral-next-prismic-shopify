import { PropsWithChildren } from 'react';

export function Main({ children }: PropsWithChildren) {
  return <main className="min-h-[calc(100vh-80px-384px)]">{children}</main>;
}
