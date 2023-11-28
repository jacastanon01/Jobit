'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleBackClick() {
    if (searchParams.get('search')) {
      router.push('/');
    } else {
      router.back();
    }
  }

  return (
    <button
      onClick={handleBackClick}
      className='flex items-center rounded-md bg-natural-5 px-3 py-2 dark:bg-darkbg-3'
    >
      <Image
        src='/assets/icons/cheveron.svg'
        alt='back'
        height={5}
        width={15}
        className='rotate-90'
      />
      <p className='px-1 text-sm text-natural-7'>Back</p>
    </button>
  );
};

export default BackButton;
