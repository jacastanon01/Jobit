import React from 'react';
import { SalariesChart } from './SalariesChart';
import { DarkSalariesChart } from './DarkSalariesChart';
import { jsearchFetch } from '@/lib/utils';
import { jsearchapi } from '@/constants/jsearchapi';
import { JobSalaryEntryType } from '@/types';

const ChartCard = async ({ searchParams }: { searchParams: any }) => {
  const queryString = new URLSearchParams(searchParams).toString();
  const response = await jsearchFetch(
    `${jsearchapi.estimatedSalaries}?${queryString}`,
  );
  const estimatedSalaries: JobSalaryEntryType[] = await response?.data;

  if (!queryString)
    return (
      <>
        <div className='flex flex-col gap-3 rounded-[10px] bg-base-white p-6 shadow-lg shadow-natural-2 dark:bg-darkbg-2 dark:shadow-none'>
          <h3 className='mb-[10px] text-base font-bold leading-8 text-base-black dark:text-base-white sm:text-[22px]'>
            Please use the search to find data about different job salaries
            around the globe 🔎 📊 🌍
          </h3>
          <p className='dark:text-natural-6'>
            We pull data from various places on the internet to give you an idea
            of the minimum salary, median salary and maximum salary for a
            particular job title in a particular location.
          </p>
          <div className='my-3 text-2xl dark:text-base-white'>
            {'<<<'} Try it now, it&apos;s 100% free
          </div>
        </div>
      </>
    );

  if (queryString && !estimatedSalaries?.length)
    return (
      <>
        <div className='rounded-[10px] bg-base-white p-6 shadow-lg shadow-natural-2 dark:bg-darkbg-2 dark:shadow-none'>
          <h3 className='mb-[10px] text-base font-normal leading-8 text-base-black dark:text-base-white sm:text-[22px]'>
            <span className='font-bold'>Sorry 😭</span> there is no salary data
            for
            <span className='font-bold'> {searchParams.job_title} </span>in
            <span className='font-bold'> {searchParams.location}</span>
          </h3>
        </div>
      </>
    );

  return (
    estimatedSalaries &&
    estimatedSalaries.length > 0 && (
      <>
        <div className='rounded-[10px] bg-base-white p-6 shadow-lg shadow-natural-2 dark:bg-darkbg-2 dark:shadow-none'>
          <h3 className='mb-[10px] text-base font-normal leading-8 text-base-black dark:text-base-white sm:text-[22px]'>
            <span className='font-bold'>Estimated Salary</span> for
            <span className='font-bold'> {searchParams.job_title} </span>in
            <span className='font-bold'> {searchParams.location}</span>
          </h3>

          <section className='flex h-[250px] flex-col'>
            <div className='dark:invisible dark:order-2'>
              <SalariesChart estimatedSalaries={estimatedSalaries} />
            </div>
            <div className='invisible dark:visible dark:order-1 '>
              <DarkSalariesChart estimatedSalaries={estimatedSalaries} />
            </div>
          </section>
        </div>
      </>
    )
  );
};

export default ChartCard;
