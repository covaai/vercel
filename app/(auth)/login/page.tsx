'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from '@/components/toast';
import Image from 'next/image';

import { AuthForm } from '@/components/auth-form';
import { SubmitButton } from '@/components/submit-button';

import { login, type LoginActionState } from '../actions';

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [state, formAction] = useActionState<LoginActionState, FormData>(
    login,
    {
      status: 'idle',
    },
  );

  useEffect(() => {
    if (state.status === 'failed') {
      toast({
        type: 'error',
        description: 'Invalid credentials!',
      });
    } else if (state.status === 'invalid_data') {
      toast({
        type: 'error',
        description: 'Failed validating your submission!',
      });
    } else if (state.status === 'success') {
      setIsSuccessful(true);
      router.refresh();
    }
  }, [state.status]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get('email') as string);
    formAction(formData);
  };

  const examplePrompts = [
    {
      id: 'nextjs',
      text: 'What are the advantages\nof using Next.js?',
    },
    {
      id: 'dijkstra',
      text: "Write code to\ndemonstrate djikstra's algorithm",
    },
    {
      id: 'silicon',
      text: 'Help me write an essay\nabout silicon valley',
    },
    {
      id: 'weather',
      text: 'What is the weather\nin San Francisco?',
    },
  ];

  return (
    <div className="flex h-dvh w-screen items-start pt-12 md:pt-0 md:items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl flex flex-col gap-12">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <Image
            src="/images/covalogo.png"
            alt="Cova Logo"
            width={136}
            height={136}
            className="rounded-md mb-4"
          />
          <h3 className="text-xl font-semibold dark:text-zinc-50">Sign In</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Use your email and password to sign in
          </p>
        </div>
        <AuthForm action={handleSubmit} defaultEmail={email}>
          <SubmitButton isSuccessful={isSuccessful}>Sign in</SubmitButton>
          <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
            {"Don't have an account? "}
            <Link
              href="/register"
              className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
            >
              Sign up
            </Link>
            {' for free.'}
          </p>
        </AuthForm>
        <div className="px-4 sm:px-16">
          <h4 className="text-sm font-semibold text-gray-500 dark:text-zinc-400 mb-4">
            Example Prompts
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {examplePrompts.map((prompt) => (
              <div
                key={prompt.id}
                className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors cursor-pointer"
              >
                <p className="text-sm text-gray-600 dark:text-zinc-400 whitespace-pre-line">
                  {prompt.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
