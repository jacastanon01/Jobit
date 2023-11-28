'use client';

import { useEffect, useState } from 'react';
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

import { addOrReplaceJobSearchParams } from '@/lib/utils';
import Arrow from './Arrow';
import PaginationButton from './PaginationButton';
import Dots from './Dots';

const Pagination = ({
  numPages = 10,
}: {
  numPages?: number | null | undefined;
}) => {
  const router = useRouter();
  const totalPages = numPages || 10; // Could be modified later if we want to implement dynamic pagination
  const searchParams: ReadonlyURLSearchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(
    (Number(searchParams.get('page')) &&
      (Number(searchParams.get('page')) > totalPages
        ? 10
        : Number(searchParams.get('page')))) ||
      1,
  );

  useEffect(() => {
    if (currentPage > totalPages) return;
    addOrReplaceJobSearchParams([{ page: currentPage.toString() }], router);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [currentPage, totalPages, router]);

  const handlePaginationClick = (page: number) => {
    page > totalPages ? setCurrentPage(totalPages) : setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage >= totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage <= 1) return;
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className='flex justify-between'>
      <button
        onClick={handlePreviousPage}
        className={`${
          currentPage <= 1 && 'invisible'
        } flex items-center gap-2 rounded-lg border border-natural-4 bg-base-white px-[14px] py-2 font-bold text-natural-8 shadow-xs transition-all hover:bg-[#FCFCFC] hover:shadow-md dark:border-darkbg-3 dark:bg-darkbg-3 dark:text-natural-5 dark:hover:bg-natural-8 dark:hover:shadow-xsdark`}
      >
        <Arrow direction='left' />
        Previous
      </button>

      <div className='flex items-center gap-2 text-sm'>
        {Array.from({ length: totalPages }).map((_, i) => {
          i++;
          if (
            i <= 3 || // the first three pages
            i >= totalPages - 2 || // the last three pages
            (i >= currentPage - 1 && i <= currentPage + 1) // the currentPage, the page before and after
          ) {
            return (
              <PaginationButton
                key={uuidv4()}
                currentPage={currentPage}
                i={i}
                handlePaginationClick={handlePaginationClick}
              />
            );
          } else if (
            (i >= currentPage + 2 && i < currentPage + 3) ||
            (i <= currentPage - 2 && i > currentPage - 3) ||
            (i === 4 && currentPage === 1) ||
            (i === totalPages - 3 && currentPage === totalPages)
          ) {
            // any other page should be represented by ...

            return <Dots key={uuidv4()} />;
          }

          return null;
        })}
      </div>
      <button
        onClick={handleNextPage}
        className={`${
          currentPage >= totalPages && 'invisible'
        } flex items-center gap-2 rounded-lg border border-natural-4 bg-base-white px-[14px] py-2 font-bold text-natural-8 shadow-xs transition-all hover:bg-[#FCFCFC] hover:shadow-md dark:border-darkbg-3 dark:bg-darkbg-3 dark:text-natural-5 dark:hover:bg-natural-8 dark:hover:shadow-xsdark`}
      >
        Next
        <Arrow direction='right' />
      </button>
    </div>
  );
};

export default Pagination;
