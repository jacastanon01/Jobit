'use client';

import React, { useEffect } from 'react';

import { BackButton } from '..';
import { useSearchParams } from 'next/navigation';

const DetailsCard = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams.get('search')) {
      window.scrollTo({ top: 150, left: 0, behavior: 'smooth' });
    }
  }, [searchParams]);
  return (
    <div className='mt-8 w-full max-w-4xl'>
      <BackButton />
      {children}
    </div>
  );
};

export default DetailsCard;
