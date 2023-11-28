'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { logout } from '@/lib/supabase/actions';
// import router from 'next/router';

export const UserAvatarNav = ({ profile }: { profile: any }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='outline-none'>
        <Avatar className='shadow-md shadow-primary outline-none ring-2 ring-primary'>
          <AvatarImage src={profile.image_url} />
          <AvatarFallback>
            {profile.full_name.substring(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='mt-2 w-56 dark:!border-natural-8/50 dark:!bg-darkbg-2'
        align='end'
      >
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>
              {profile.full_name}
            </p>
            <p className='text-xs leading-none text-natural-6'>
              {profile.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className='dark:bg-natural-8/50' />
        <DropdownMenuGroup>
          <Link href='/profile'>
            <DropdownMenuItem className='cursor-pointer hover:!bg-natural-4 dark:hover:!bg-darkbg-3'>
              Profile
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className='dark:bg-natural-8/50' />
        <DropdownMenuGroup>
          <button
            onClick={() => {
              router.push('/saved-jobs');
              router.refresh();
            }}
            className='w-full'
          >
            <DropdownMenuItem className='cursor-pointer hover:!bg-natural-4 dark:hover:!bg-darkbg-3'>
              Saved Jobs
            </DropdownMenuItem>
          </button>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className='dark:bg-natural-8/50' />
        <form action={logout}>
          <button type='submit' className='w-full'>
            <DropdownMenuItem className='cursor-pointer hover:!bg-natural-4 dark:hover:!bg-darkbg-3'>
              Logout
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
