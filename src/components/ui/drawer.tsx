'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { AnimatePresence, motion, Variants } from 'motion/react';
import * as React from 'react';

import { cn } from '@/lib/cn';
import * as DrawerPrimitive from '@radix-ui/react-dialog';

type OmitAsChild<T> = Omit<T, 'asChild'>;

const Drawer = (props: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <AnimatePresence>
    {props.open && <DrawerPrimitive.Root {...props} />}
  </AnimatePresence>
);
Drawer.displayName = DrawerPrimitive.Root.displayName;

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Overlay>,
  OmitAsChild<React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    asChild
    ref={ref}
    className={cn('fixed inset-0 z-50 bg-black', className)}
    {...props}
  >
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5, transition: { duration: 0.25 } }}
      exit={{ opacity: 0, transition: { delay: 0.125, duration: 0.25 } }}
    />
  </DrawerPrimitive.Overlay>
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const drawerVariants = cva(
  'fixed inset-y-0 z-50 flex h-full max-w-[30rem] flex-col bg-white focus:outline-hidden',
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

const drawerAnimations: Variants = {
  active: {
    x: '0',
    transition: {
      delay: 0.125,
      duration: 0.125,
      ease: [0.25, 0.0, 0.75, 0.25],
    },
  },
  inactive: (side: 'left' | 'right') => ({
    x: side === 'left' ? '-100%' : '100%',
    transition: {
      duration: 0.125,
      ease: [0.25, 0.75, 0.75, 1.0],
    },
  }),
};

interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>,
    VariantProps<typeof drawerVariants> {}

const DrawerContent = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Content>,
  OmitAsChild<DrawerContentProps>
>(({ side, className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      asChild
      ref={ref}
      className={cn(drawerVariants({ side }), className)}
      {...props}
    >
      <motion.div
        variants={drawerAnimations}
        custom={side}
        initial="inactive"
        animate="active"
        exit="inactive"
      >
        {children}
      </motion.div>
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = DrawerPrimitive.Content.displayName;

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('px-6 pt-6', className)} {...props} />
);
DrawerHeader.displayName = 'DrawerHeader';

const DrawerBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('scrollbar-none flex-1 overflow-y-scroll px-6', className)}
    {...props}
  />
);
DrawerBody.displayName = 'DrawerFooter';

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('px-6 pb-6', className)} {...props} />
);
DrawerFooter.displayName = 'DrawerFooter';

const DrawerTitle = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg leading-none font-semibold tracking-tight',
      className,
    )}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn('text-sm', className)}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
