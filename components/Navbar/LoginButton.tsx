import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

import { UserAvatarNav } from './UserAvatarNav';
import { getProfile } from '@/lib/supabase/actions';

export const LoginButton = async () => {
  const profile = await getProfile();
  return profile ? (
    <UserAvatarNav profile={profile} />
  ) : (
    <Link
      className='flex items-center gap-2 rounded-md bg-primary px-5 py-2 text-white transition-all hover:bg-primary/90'
      href={'/auth/login'}
    >
      <FaGithub />
      Login
    </Link>
  );
};
