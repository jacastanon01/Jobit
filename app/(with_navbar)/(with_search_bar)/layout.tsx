import React from 'react';
import moment from 'moment';
import SearchBar from '@/components/SearchBar/SearchBar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='main-container pb-8 pt-[50px]'>
      <h1 className='mb-1 font-bold text-base-black dark:text-white sm:mb-3'>
        Let’s find your dream job
      </h1>
      <h2 className='mb-[30px] text-base font-medium leading-6 text-natural-6 sm:text-[20px] sm:leading-8'>
        {moment().format('dddd, DD MMM YYYY')}
      </h2>
      <SearchBar />
      {children}
    </div>
  );
}
