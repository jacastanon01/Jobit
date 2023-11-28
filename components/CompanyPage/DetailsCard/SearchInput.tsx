'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useDebounce } from 'use-debounce';

import { addOrReplaceJobSearchParams } from '@/lib/utils';

const SearchInput = () => {
  const router = useRouter();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const pathname = usePathname();
  const [search, setSearch] = useState(searchParams.get('search') || undefined);
  const [searchValue] = useDebounce(search, 500);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addOrReplaceJobSearchParams(
      [{ search: searchValue || '' }],
      router,
      pathname,
    );
  }

  useEffect(() => {
    addOrReplaceJobSearchParams(
      [{ search: searchValue || '' }],
      router,
      pathname,
    );
  }, [searchValue, pathname, router]);

  return (
    <form
      onSubmit={handleSubmit}
      className='my-4 flex w-full shrink-0 items-center gap-4 rounded-[20px] bg-natural-3 p-4 dark:bg-darkbg-3 sm:max-w-md sm:p-3 md:flex-row md:items-center'
    >
      <div className='flex w-full items-center gap-2 sm:gap-x-[13px] md:pl-5'>
        <Image
          src='/assets/icons/search.svg'
          width={28}
          height={28}
          alt='search icon'
        />
        <div className='w-full'>
          <div className='invisible h-0' aria-hidden='true'>
            Job Title, Company, or Keywords
          </div>
          <input
            type='text'
            className='h-full w-full bg-inherit text-natural-6 outline-none max-sm:text-sm'
            placeholder='Search Job Title or Keyword'
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className='ml-auto w-1/3'>
        <button
          type='submit'
          className='w-full whitespace-nowrap rounded-[10px] bg-primary p-2 text-white'
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
