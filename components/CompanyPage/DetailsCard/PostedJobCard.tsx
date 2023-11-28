import React from 'react';
import Link from 'next/link';

import { Tag } from '../../shared';
import EmployerLogo from '../../JobSearchPage/SearchResultCard/EmployerLogo';
import { JobListingType } from '@/types';
import { findKeywords } from '@/lib/utils';
import JobStats from '../../JobSearchPage/SearchResultCard/JobStats';

const PostedJobCard = ({ job }: { job: JobListingType }) => {
  const {
    employer_logo: employerLogo,
    job_title: jobTitle,
    job_description: jobDescription,
    job_id: jobId,
    job_max_salary: maxSalary,
    job_min_salary: minSalary,
    job_apply_quality_score: qualityScore,
  } = job;

  return (
    <article className='flex w-full grow flex-col rounded-lg bg-white px-4 shadow-lg dark:bg-darkbg-3 md:max-w-[45%]'>
      <div className='flex flex-col gap-4 p-3'>
        <div className='flex items-center'>
          <div className='flex items-center gap-5'>
            <div className='relative h-[40px] w-[40px]'>
              <EmployerLogo employerLogo={employerLogo} />
            </div>
            <div className='flex flex-col gap-2'>
              <p className='line-clamp-1 font-semibold dark:text-white'>
                {jobTitle}
              </p>
              <div className='flex flex-wrap items-center gap-3'>
                {jobDescription &&
                  findKeywords(jobDescription)
                    ?.slice(0, 3)
                    .map((word, i) => word && <Tag key={word} tag={word} />)}
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className='line-clamp-6'>{jobDescription}</p>
        </div>
        <div className='flex w-full items-center justify-between gap-4 max-sm:flex-col'>
          <JobStats
            qualityScore={qualityScore}
            minSalary={minSalary}
            maxSalary={maxSalary}
          />
          <Link
            className='rounded-lg bg-primary/10 p-2 text-primary'
            href={`/job-details/${jobId}`}
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostedJobCard;
