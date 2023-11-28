'use client';
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useState } from 'react';
import Autocomplete from 'react-google-autocomplete';

import { addOrReplaceJobSearchParams } from '@/lib/utils';

const SearchBar = () => {
  const router = useRouter();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [employmentType, setEmploymentType] = useState(
    searchParams.get('employment_types')?.split(',')[0] || '',
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleLocationChange = (location: string) => {
    setLocation(location);
  };

  const handleEmploymentTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setEmploymentType(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addOrReplaceJobSearchParams(
      [
        { search },
        { query: `${search} ${location}` },
        { location },
        { employement_types: employmentType },
      ],
      router,
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex w-full shrink-0 flex-col  gap-y-4 rounded-[20px] bg-base-white p-4 shadow-searchbar dark:bg-darkbg-2 md:h-20 md:flex-row md:items-center'
    >
      <div className='flex h-20 w-full items-center gap-x-[13px] border-b border-natural-2 px-[20px] dark:border-natural-8 md:w-auto md:border-b-0 md:border-r md:pl-5 lg:w-1/3 lg:pr-[99px]'>
        <Image
          src='/assets/icons/search.svg'
          width={28}
          height={28}
          alt='search icon'
        />
        <div className='inline-block h-20'>
          <div className='invisible h-0 ' aria-hidden='true'>
            Job Title, Company, or Keywords
          </div>
          <input
            type='text'
            className='h-full w-full bg-transparent text-natural-6 outline-none'
            placeholder='Job Title, Company, or Keywords'
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className='flex h-full items-center gap-x-[13px] border-b border-natural-2 px-[20px] py-5  dark:border-natural-8 md:h-20 md:w-auto md:border-b-0 md:border-r lg:w-1/3 lg:px-[20px]'>
        <Image
          src='/assets/icons/pin.svg'
          width={28}
          height={28}
          alt='search icon'
        />
        <div className='block w-full'>
          <div className='invisible h-0 ' aria-hidden='true'>
            Select Location
          </div>
          <Autocomplete
            apiKey={process.env.NEXT_PUBLIC_GoogleMapsAPIKey}
            className='inline w-full bg-transparent text-natural-6 outline-none'
            placeholder='Choose a location'
            onPlaceSelected={(place: any) => {
              handleLocationChange(place?.formatted_address || '');
            }}
            defaultValue={location}
            inputAutocompleteValue={location}
          />
        </div>
      </div>
      <div className='flex h-full items-center gap-x-[13px] border-b  border-natural-2 px-[20px]  py-5 dark:border-natural-8  md:w-auto  md:border-b-0 lg:w-1/6 '>
        <Image
          src='/assets/icons/briefcase.svg'
          width={28}
          height={28}
          alt='search icon'
        />
        <div className='inline-block text-natural-6'>
          <div className='invisible h-0 ' aria-hidden='true'>
            Job Type
          </div>
          <select
            name='employment-type'
            className='cursor-pointer bg-transparent outline-none'
            id='employment-type'
            value={employmentType}
            onChange={handleEmploymentTypeChange}
          >
            <option className='cursor-pointer' value=''>
              Job Type
            </option>
            <option className='cursor-pointer' value='FULLTIME'>
              Full-time
            </option>
            <option className='cursor-pointer' value='PARTTIME'>
              Part-time
            </option>
            <option className='cursor-pointer' value='CONTRACTOR'>
              Contractor
            </option>
            <option className='cursor-pointer' value='INTERN'>
              Intern
            </option>
          </select>
        </div>
      </div>
      <div className='md:ml-5 md:w-auto lg:ml-auto lg:w-1/6 lg:max-w-[105px]'>
        <button
          type='submit'
          className='w-full whitespace-nowrap rounded-[10px] bg-primary px-[20px] py-3 text-white '
        >
          Find Jobs
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
