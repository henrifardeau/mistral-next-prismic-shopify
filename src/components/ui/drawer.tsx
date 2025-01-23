'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/cn';
import * as DrawerPrimitive from '@radix-ui/react-dialog';

export const Drawer = DrawerPrimitive.Root;

export const DrawerTrigger = DrawerPrimitive.Trigger;

export const DrawerPortal = DrawerPrimitive.Portal;

export const DrawerClose = DrawerPrimitive.Close;

export const DrawerOverlay = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-50 bg-black/50', className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const drawerVariants = cva(
  'fixed inset-y-0  z-50 h-full max-w-[30rem] bg-white focus:outline-none',
  {
    variants: {
      side: {
        left: 'left-0',
        right: 'right-0',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
);

interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>,
    VariantProps<typeof drawerVariants> {}

export const DrawerContent = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Content>,
  DrawerContentProps
>(({ side, className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(drawerVariants({ side }), className)}
      {...props}
    >
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = DrawerPrimitive.Content.displayName;

export const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className,
    )}
    {...props}
  />
);
DrawerHeader.displayName = 'DrawerHeader';

export const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...props}
  />
);
DrawerFooter.displayName = 'DrawerFooter';

export const DrawerTitle = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className,
    )}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

export const DrawerDescription = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn('text-muted-foreground text-sm', className)}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;
