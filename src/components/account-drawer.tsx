'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAccountDrawer } from '@/hooks/use-account-drawer';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from './ui/drawer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const signUpSchema = signInSchema.extend({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

const recoverSchema = z.object({
  email: z.string().email(),
});

export function AccountDrawer() {
  const cartOpen = useAccountDrawer((state) => state.accountOpen);
  const setAccountOpen = useAccountDrawer((state) => state.setAccountOpen);
  const closeAccount = useAccountDrawer((state) => state.closeAccount);

  const [flow, setFlow] = useState<'signIn' | 'signUp' | 'recover'>('signIn');

  return (
    <Drawer open={cartOpen} onOpenChange={setAccountOpen}>
      <DrawerContent className="w-full max-w-96">
        {flow === 'signIn' && (
          <SignInContent
            setSignUpFlow={() => setFlow('signUp')}
            setRecoverFlow={() => setFlow('recover')}
            closeAccount={closeAccount}
          />
        )}
        {flow === 'signUp' && (
          <SignUpContent
            setSignInFlow={() => setFlow('signIn')}
            closeAccount={closeAccount}
          />
        )}
        {flow === 'recover' && (
          <RecoverContent
            setSignInFlow={() => setFlow('signIn')}
            closeAccount={closeAccount}
          />
        )}
      </DrawerContent>
    </Drawer>
  );
}

function SignInContent({
  setSignUpFlow,
  setRecoverFlow,
  closeAccount,
}: {
  setSignUpFlow: () => void;
  setRecoverFlow: () => void;
  closeAccount: () => void;
}) {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof signInSchema>) => {
    console.log({ data });
  };

  return (
    <>
      <DrawerHeader>
        <div className="flex items-center justify-between">
          <DrawerTitle>Sign in</DrawerTitle>
          <button onClick={closeAccount} className="rounded-full">
            <X className="size-4" />
            <span className="sr-only">Close account drawer</span>
          </button>
        </div>
      </DrawerHeader>

      <DrawerBody>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your email"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <button type="button" onClick={setRecoverFlow}>
                      Forgot password ?
                    </button>
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Your password"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="submit"
              className="w-full bg-black py-2 text-white transition-colors hover:bg-black/75"
            >
              Sign In
            </button>
          </form>
        </Form>
      </DrawerBody>

      <DrawerFooter>
        <button onClick={setSignUpFlow}>Create account</button>
      </DrawerFooter>
    </>
  );
}

function SignUpContent({
  setSignInFlow,
  closeAccount,
}: {
  setSignInFlow: () => void;
  closeAccount: () => void;
}) {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof signUpSchema>) => {
    console.log({ data });
  };

  return (
    <>
      <DrawerHeader>
        <div className="flex items-center justify-between">
          <DrawerTitle>Create your account</DrawerTitle>
          <button onClick={closeAccount} className="rounded-full">
            <X className="size-4" />
            <span className="sr-only">Close account drawer</span>
          </button>
        </div>
      </DrawerHeader>

      <DrawerBody>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your first name"
                      autoComplete="given-name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your last name"
                      autoComplete="family-name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your email"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Your password"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="submit"
              className="w-full bg-black py-2 text-white transition-colors hover:bg-black/75"
            >
              Create your account
            </button>
          </form>
        </Form>
      </DrawerBody>

      <DrawerFooter>
        <button onClick={setSignInFlow}>Signin</button>
      </DrawerFooter>
    </>
  );
}

function RecoverContent({
  setSignInFlow,
  closeAccount,
}: {
  setSignInFlow: () => void;
  closeAccount: () => void;
}) {
  const form = useForm<z.infer<typeof recoverSchema>>({
    resolver: zodResolver(recoverSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: z.infer<typeof recoverSchema>) => {
    console.log({ data });
  };

  return (
    <>
      <DrawerHeader>
        <div className="flex items-center justify-between">
          <DrawerTitle>Forgot your password?</DrawerTitle>
          <button onClick={closeAccount} className="rounded-full">
            <X className="size-4" />
            <span className="sr-only">Close account drawer</span>
          </button>
        </div>
      </DrawerHeader>

      <DrawerBody>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your email"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="submit"
              className="w-full bg-black py-2 text-white transition-colors hover:bg-black/75"
            >
              Send reset email
            </button>
          </form>
        </Form>
      </DrawerBody>

      <DrawerFooter>
        <button onClick={setSignInFlow}>Signin</button>
      </DrawerFooter>
    </>
  );
}
