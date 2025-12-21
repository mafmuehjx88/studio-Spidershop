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
import { useToast } from '@/hooks/use-toast';
import { doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { useState } from 'react';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const formSchema = z.object({
  username: z
    .string()
    .min(8, { message: 'Username must be at least 8 characters long.' })
    .refine(
      (value) => {
        const letterCount = (value.match(/[a-zA-Z]/g) || []).length;
        const numberCount = (value.match(/[0-9]/g) || []).length;
        return letterCount >= 4 && numberCount >= 4;
      },
      {
        message: 'Username must contain at least 4 letters and 4 numbers.',
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Create the user
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      // Create user profile in Firestore
      const userDocRef = doc(firestore, 'users', user.uid);
      await setDocumentNonBlocking(
        userDocRef,
        {
          id: user.uid,
          username: values.username,
          email: values.email,
          balance: 0,
        },
        { merge: false } // Use merge:false to ensure it's a new doc
      );
      
      toast({
        title: 'Registration Successful',
        description: 'Your account has been created.',
      });

      router.push('/');

    } catch (error: any) {
      // Handle Firebase Auth errors (e.g., email-already-in-use)
      let description = "An unexpected error occurred.";
      if (error.code === 'auth/email-already-in-use') {
        description = 'This email is already registered. Please log in or use a different email.';
      } else if (error.message) {
        description = error.message;
      }

      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: description,
      });
    } finally {
        setIsSubmitting(false);
    }
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
