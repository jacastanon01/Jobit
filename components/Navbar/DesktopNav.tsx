import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';

import Logo from '../Logo';
import NavLink from './NavLink';
import { mainMenu } from '@/constants/menu';
import { MenuLinkType } from '@/types';
import ThemeSwitch from './ThemeSwitch';
import { LoginButton } from './LoginButton';

const DesktopNav = () => {
  return (
    <div className='main-container hidden h-[70px] items-center justify-between md:flex'>
      <Link href='/'>
        <Logo />
      </Link>

      <ul className='flex gap-[30px]'>
        {mainMenu.map((menuLink: MenuLinkType) => {
          return <NavLink key={uuidv4()} menuLink={menuLink} />;
        })}
      </ul>
      <div className='flex items-center gap-8'>
        <ThemeSwitch />
        <LoginButton />
      </div>
    </div>
  );
};

export default DesktopNav;
