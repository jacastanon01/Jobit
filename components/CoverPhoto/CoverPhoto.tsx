import React from 'react';
import Image from 'next/image';
import EmployerLogo from '../JobSearchPage/SearchResultCard/EmployerLogo';

const CoverPhoto = ({ employerLogo }: { employerLogo?: string | null }) => {
  return (
    <section>
      <div className='relative h-48 w-full'>
        <Image
          quality={100}
          priority
          src='/assets/cover-background.jpg'
          alt='background'
          className='rounded-t-xl object-cover object-left'
          fill
        />
      </div>

      <div className='z-10 mx-4 mt-[-18px] flex h-[64px] w-[64px] items-center justify-center rounded-lg border-2 border-white bg-white/70 p-4 backdrop-blur-md dark:border-darkbg-2'>
        <div className='absolute h-12 w-12 overflow-hidden rounded-lg'>
          <EmployerLogo employerLogo={employerLogo} />
        </div>
      </div>
    </section>
  );
};

export default CoverPhoto;
