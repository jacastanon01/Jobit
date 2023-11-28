'use client';

import { usePathname } from 'next/navigation';

import Link from 'next/link';

import {
  PiAddressBookDuotone,
  PiBagSimpleDuotone,
  PiBracketsCurlyDuotone,
  PiGraduationCapDuotone,
} from 'react-icons/pi';

const navElements: {
  name: string;
  path: string;
  icon: any;
}[] = [
  {
    name: 'Main Information',
    path: '/profile',
    icon: <PiAddressBookDuotone />,
  },
  {
    name: 'Education',
    path: '/profile/education',
    icon: <PiGraduationCapDuotone />,
  },
  {
    name: 'Experiences',
    path: '/profile/experiences',
    icon: <PiBagSimpleDuotone />,
  },
  {
    name: 'Projects',
    path: '/profile/projects',
    icon: <PiBracketsCurlyDuotone />,
  },
];

const ProfileNav = () => {
  const pathname = usePathname();
  return (
    <nav className='flex flex-wrap justify-start gap-3 md:flex-col'>
      {navElements.map((element) => {
        return (
          <Link
            className={`${
              pathname === element.path &&
              'border !border-primary bg-primary/10 shadow-md shadow-primary/30 dark:bg-primary/20 dark:text-white '
            } grow rounded-lg border px-3 py-2 text-lg font-semibold text-gray-700 transition-all hover:border hover:border-primary hover:bg-primary/10 hover:shadow-md hover:shadow-primary/30  dark:border-natural-8/40 dark:text-natural-6 dark:hover:border-primary dark:hover:bg-primary/20 dark:hover:text-white `}
            key={element.name}
            href={element.path}
          >
            <div className='flex w-full items-center justify-start gap-2.5'>
              {element.icon}
              {element.name}
            </div>
          </Link>
        );
      })}
    </nav>
  );
};

export default ProfileNav;
