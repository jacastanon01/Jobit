import React from 'react';
import Link from 'next/link';

import EmployerLogo from '@/components/JobSearchPage/SearchResultCard/EmployerLogo';
import { CommonFilterDataShapeType } from '@/types';

const SimilarCompanyCard = ({
  company,
}: {
  company: CommonFilterDataShapeType;
}) => {
  const formatJobs =
    company.est_count === 1
      ? `${company.est_count} job`
      : `${company.est_count} jobs`;
  return (
    <article className=' rounded-lg bg-white p-5 dark:bg-darkbg-2'>
      <div className='flex w-full items-center'>
        <div className='flex w-full flex-1 items-center gap-2'>
          <div className='relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden'>
            <EmployerLogo employerLogo={null} />
          </div>
          <div className='flex flex-col justify-center'>
            <p className='body-m-semibold dark:text-white'>{company.name}</p>
            <p className='text-sm dark:text-natural-6'>{formatJobs}</p>
          </div>
        </div>
        <div className='ml-auto'>
          <Link
            href={`/companies/${company.name}`}
            className='flex items-center gap-2 rounded-lg border border-primary px-3 text-primary'
          >
            View jobs
          </Link>
        </div>
      </div>
    </article>
  );
};

export default SimilarCompanyCard;
