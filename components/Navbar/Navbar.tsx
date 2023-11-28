import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import { LoginButton } from './LoginButton';

const Navbar = async () => {
  return (
    <nav className='sticky top-0 z-50 h-[70px] w-full border-b border-natural-5 bg-white dark:border-darkbg-3 dark:bg-darkbg-1'>
      <DesktopNav />

      <MobileNav>
        <LoginButton />
      </MobileNav>
    </nav>
  );
};

export default Navbar;
