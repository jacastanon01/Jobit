'use client';
import { addOrReplaceJobSearchParams } from '@/lib/utils';

import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import Autocomplete from 'react-google-autocomplete';
import { ChangeEvent, FormEvent, useState } from 'react';

const SearchSalaries = () => {
  const router = useRouter();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('job_title') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [radius, setRadius] = useState(searchParams.get('radius') || '');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleLocationChange = (location: string) => {
    setLocation(location);
  };

  const handleRadius = (e: ChangeEvent<HTMLInputElement>) => {
    setRadius(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addOrReplaceJobSearchParams(
      [{ job_title: search }, { location }, { radius }],
      router,
      'estimated-salaries',
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex w-full shrink flex-col gap-y-4 md:items-center'
    >
      <div className='flex w-full items-center gap-x-[13px]'>
        <div className='flex w-full flex-col gap-2'>
          <div className='text-sm font-semibold leading-6 text-natural-6'>
            Job Title
          </div>
          <input
            required
            type='text'
            className='rounded-[10px] border border-natural-5/60 bg-natural-2 px-5 py-3 text-[13px] font-bold text-natural-8 outline-none dark:border-natural-8 dark:bg-darkbg-2 dark:text-white'
            placeholder='Job Title, Company, or Keywords'
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className='flex w-full flex-col gap-y-4 md:flex-row md:gap-x-8'>
        <div className='flex w-full items-center gap-x-[13px] md:w-1/2'>
          <div className='flex w-full flex-col gap-2'>
            <div className='text-sm font-semibold leading-6 text-natural-6'>
              Location
            </div>
            <Autocomplete
              required
              apiKey={process.env.NEXT_PUBLIC_GoogleMapsAPIKey}
              className='rounded-[10px] border border-natural-5/60 bg-natural-2 px-5 py-3 text-[13px] font-bold text-natural-8 outline-none dark:border-natural-8 dark:bg-darkbg-2 dark:text-white'
              placeholder='Choose a location'
              onPlaceSelected={(place: any) => {
                if (place?.formatted_address) {
                  handleLocationChange(place?.formatted_address);
                }
              }}
              onChange={(e: any) => {
                handleLocationChange(e.target.value);
              }}
              defaultValue={location}
              inputAutocompleteValue={location}
            />
          </div>
        </div>
        <div className='flex w-full items-center gap-x-[13px] md:w-1/2'>
          <div className='flex w-full flex-col gap-2'>
            <div className='text-sm font-semibold leading-6 text-natural-6'>
              Radius
            </div>
            <input
              required
              type='number'
              placeholder='100'
              max='100'
              min='0'
              name='radius'
              className='rounded-[10px] border border-natural-5/60 bg-natural-2 px-5 py-3 text-[13px] font-bold text-natural-8 outline-none dark:border-natural-8 dark:bg-darkbg-2 dark:text-white'
              id='radius'
              value={radius}
              onChange={handleRadius}
            />
          </div>
        </div>
      </div>
      <button type='submit'></button>
    </form>
  );
};

export default SearchSalaries;
