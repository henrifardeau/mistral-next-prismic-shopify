'use client';

import { X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useAccountDrawer } from '@/hooks/use-account-drawer';
import { createCustomer, getCustomerAccessToken } from '@/lib/shopify/actions';
import {
  RecoverPayload,
  recoverSchema,
  SignInPayload,
  signInSchema,
  SignUpPayload,
  signUpSchema,
} from '@/lib/shopify/schemas';
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

export function AccountDrawer() {
  const cartOpen = useAccountDrawer((state) => state.accountOpen);
  const setAccountOpen = useAccountDrawer((state) => state.setAccountOpen);

  const [flow, setFlow] = useState<'signIn' | 'signUp' | 'recover'>('signIn');

  const beforeClose = useCallback(() => {
    setAccountOpen(false);
    setFlow('signIn');
  }, [setAccountOpen, setFlow]);

  return (
    <Drawer open={cartOpen} onOpenChange={beforeClose}>
      <DrawerContent className="w-full max-w-96">
        {flow === 'signIn' && (
          <SignInContent
            setSignUpFlow={() => setFlow('signUp')}
            setRecoverFlow={() => setFlow('recover')}
            closeAccount={beforeClose}
          />
        )}
        {flow === 'signUp' && (
          <SignUpContent
            setSignInFlow={() => setFlow('signIn')}
            closeAccount={beforeClose}
          />
        )}
        {flow === 'recover' && (
          <RecoverContent
            setSignInFlow={() => setFlow('signIn')}
            closeAccount={beforeClose}
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
  const form = useForm<SignInPayload>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInPayload) => {
    try {
      await getCustomerAccessToken(data);

      closeAccount();
      toast('Sign in success.');
    } catch (err) {
      console.error(err);
    }
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
  const form = useForm<SignUpPayload>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignUpPayload) => {
    try {
      await createCustomer(data);

      closeAccount();
      toast('Account created.');
    } catch (err) {
      console.error(err);
    }
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
                      disabled={form.formState.isSubmitting}
                      className="disabled:pointer-events-none disabled:opacity-75"
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
                      disabled={form.formState.isSubmitting}
                      className="disabled:pointer-events-none disabled:opacity-75"
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
                      disabled={form.formState.isSubmitting}
                      className="disabled:pointer-events-none disabled:opacity-75"
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
                      disabled={form.formState.isSubmitting}
                      className="disabled:pointer-events-none disabled:opacity-75"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full bg-black py-2 text-white transition-colors hover:bg-black/75 disabled:pointer-events-none disabled:opacity-75"
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
  const form = useForm<RecoverPayload>({
    resolver: zodResolver(recoverSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: RecoverPayload) => {
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
