'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';

interface Props extends React.ComponentPropsWithoutRef<typeof Link> {
  className?: string;
}

export const NavLink = ({ href, className, ...props }: Props) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      data-active={pathname === href}
      className={cn(className)}
      {...props}
    />
  );
};
