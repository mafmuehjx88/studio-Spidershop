'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/firebase/provider';
import { initiateEmailSignUp } from '@/firebase/non-blocking-login';
import { useToast } from '@/hooks/use-toast';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { useFirestore, useUser } from '@/firebase';
import { useEffect, useState } from 'react';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters.' })
    .refine(
      (value) => {
        const letterCount = (value.match(/[a-zA-Z]/g) || []).length;
        const numberCount = (value.match(/[0-9]/g) || []).length;
        return letterCount === 4 && numberCount === 4 && value.length === 8;
      },
      {
        message: 'Username must contain exactly 4 letters and 4 numbers.',
      }
    ),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});

export function RegisterForm() {
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (user) {
      const userDocRef = doc(firestore, 'users', user.uid);
      const { username, email } = form.getValues();
      setDocumentNonBlocking(
        userDocRef,
        {
          id: user.uid,
          username,
          email,
        },
        { merge: true }
      );
      router.push('/');
    }
  }, [user, firestore, form, router]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Check if username already exists
      const usersRef = collection(firestore, 'users');
      const q = query(usersRef, where('username', '==', values.username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast({
          variant: 'destructive',
          title: 'Registration Failed',
          description: 'Username already exists. Please choose another one.',
        });
        setIsSubmitting(false);
        return;
      }

      initiateEmailSignUp(auth, values.email, values.password);
      toast({
        title: 'Registration Successful',
        description: 'Your account has been created. Please log in.',
      });
      // The useEffect will handle user creation in firestore and redirection
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      });
      setIsSubmitting(false);
    }
    // Don't set isSubmitting to false here, as the useEffect will redirect
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your details to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
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
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
