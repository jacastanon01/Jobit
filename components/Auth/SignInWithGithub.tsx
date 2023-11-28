'use client';

import createSupabaseBrowserClient from '@/lib/supabase/browser';

import { FaGithub } from 'react-icons/fa';

export const SignInWithGithub = () => {
  const handleLogin = async () => {
    const supabase = createSupabaseBrowserClient();

    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };
  return (
    <button
      className='flex items-center gap-2 rounded-md bg-primary px-5 py-2 text-white transition-all hover:bg-primary/90'
      onClick={handleLogin}
    >
      <FaGithub />
      Sign-in with Github
    </button>
  );
};
