import Link from 'next/link';
import { FaRegEdit } from 'react-icons/fa';

const EditProfileButton = () => {
  return (
    <Link
      href='/profile'
      className='fixed right-2 top-2 flex items-center gap-2 rounded-lg bg-natural-5 p-2 opacity-50 transition-all hover:opacity-100  dark:bg-darkbg-2 dark:text-natural-6'
    >
      Edit in Jobit
      <FaRegEdit />
    </Link>
  );
};

export default EditProfileButton;
