'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { MenuLinkType } from '@/types';

type ToggleMenuType = () => void;

const NavLink = ({
  menuLink,
  toggleMenu,
}: {
  menuLink: MenuLinkType;
  toggleMenu?: ToggleMenuType;
}) => {
  const pathname = usePathname();
  return (
    <>
      {/* Desktop version */}
      <Link
        className={`${
          pathname === menuLink.route &&
          'border-b border-primary font-bold text-primary'
        } ${
          pathname !== menuLink.route && 'hover:customBold'
        }  hidden py-[23px] text-natural-6 transition-all hover:border-b hover:border-primary hover:text-primary sm:block`}
        href={menuLink.route}
      >
        {menuLink.label}
      </Link>

      {/* Mobile version */}
      <Link
        onClick={toggleMenu}
        className={`${
          pathname === menuLink.route &&
          'rounded-md bg-natural-1 font-bold text-primary dark:bg-darkbg-3'
        } rounded-md px-4 py-3 text-natural-6 transition-all  hover:bg-natural-1 hover:font-bold hover:text-primary dark:hover:dark:bg-darkbg-3 sm:hidden`}
        href={menuLink.route}
      >
        {menuLink.label}
      </Link>
    </>
  );
};

export default NavLink;
