import ChartCard from '@/components/EstimatedSalariesPage/ChartCard';
import SearchSalaries from '@/components/EstimatedSalariesPage/SearchSalaries';

import { Skeleton } from '@/components/ui/skeleton';
import moment from 'moment';
import { Suspense } from 'react';

export default function EstimatedSalaries({
  searchParams,
}: {
  searchParams: any;
}) {
  const searchParamString = new URLSearchParams(searchParams).toString();
  return (
    <main className='main-container flex flex-col gap-x-[85px] overflow-hidden pb-8 pt-[50px] lg:flex-row'>
      <div className='mb-10 lg:w-1/2'>
        <h1 className='mb-1 font-bold text-base-black dark:text-white sm:mb-3'>
          Estimated Salaries
        </h1>
        <h2 className='mb-[30px] text-base font-medium leading-6 text-natural-6 sm:text-[20px] sm:leading-8'>
          {moment().format('dddd, DD MMM YYYY')}
        </h2>
        <SearchSalaries />
      </div>
      <div className='lg:w-1/2'>
        <Suspense
          fallback={
            <Skeleton className='h-[372px] w-full rounded-[10px] !bg-base-white shadow-lg shadow-natural-2 dark:!bg-darkbg-2 dark:shadow-none' />
          }
          key={searchParamString}
        >
          <ChartCard searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
