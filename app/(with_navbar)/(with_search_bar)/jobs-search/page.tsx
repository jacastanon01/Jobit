import {
  FilterSidebar,
  Pagination,
  SearchResults,
  SearchResultsLoader,
  SortingRow,
} from '@/components/JobSearchPage';
import { Suspense } from 'react';

export default function JobSearch({ searchParams }: { searchParams: any }) {
  const searchParamString = new URLSearchParams(searchParams).toString();
  return (
    <main className='mt-[59px] flex gap-x-[79px]'>
      <FilterSidebar searchParams={searchParams} />
      <div className='w-full'>
        {/* Sorting Row */}
        <SortingRow />

        {/* Search Results */}
        <Suspense fallback={<SearchResultsLoader />} key={searchParamString}>
          <SearchResults searchParams={searchParams} />
        </Suspense>

        {/* Pagination */}
        <div className='mt-9 border-t border-natural-2 pt-5 dark:border-darkbg-3'>
          <Pagination />
        </div>
      </div>
    </main>
  );
}
