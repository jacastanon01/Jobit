import Link from 'next/link';
import Logo from '../Logo';

const BuiltWithJobit = () => {
  return (
    <div className='fixed bottom-2 left-2 text-xs opacity-50  transition-all hover:opacity-100'>
      <Link href='/'>
        Built with
        <Logo />
      </Link>
    </div>
  );
};

export default BuiltWithJobit;
