'use client';

import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import React, { ReactNode, useState } from 'react';

import ThemeSwitch from './ThemeSwitch';
import Logo from '../Logo';
import CloseIcon from './CloseIcon';
import { mainMenu } from '@/constants/menu';
import { MenuLinkType } from '@/types';
import NavLink from './NavLink';

const MobileNav = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return !isMenuOpen ? (
    // This is the default view
    <div className='main-container z-10 flex h-[70px] items-center justify-between md:hidden'>
      <button onClick={toggleMenu}>
        <Image
          src={'/assets/icons/hamburger.svg'}
          width={24}
          height={24}
          alt='hamburger menu icon'
        />
      </button>
      <div className='flex items-center gap-5'>
        <ThemeSwitch />
        {children}
      </div>
    </div>
  ) : (
    // This showup when the hamburger menu is clicked
    <div>
      <div className='main-container flex h-[70px] items-center justify-between sm:hidden'>
        <Logo />
        <button onClick={toggleMenu}>
          <CloseIcon />
        </button>
      </div>
      <div className='flex h-[calc(100vh-70px)] justify-end bg-black/30 sm:hidden'>
        <div className='flex h-full w-[262px] flex-col justify-center bg-white  dark:bg-base-black'>
          <ul className='mx-[13px] flex flex-col'>
            {mainMenu.map((menuLink: MenuLinkType) => {
              return (
                <NavLink
                  key={uuidv4()}
                  toggleMenu={toggleMenu}
                  menuLink={menuLink}
                />
              );
            })}
          </ul>
          <div className='mx-[29px] mt-9'>
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
