'use client';

import React, { useEffect, useState } from 'react';

import PostedJobCard from './PostedJobCard';
import NoJobsPosted from '../NoJobsPosted';
import { JobListingType } from '@/types';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';

const PostedJobs = ({
  employer,
  jobs,
}: {
  employer: string;
  jobs: JobListingType[];
}) => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const jobsPerPage = 4; // ? Set jobsPerPage as dropdown to display number of jobs per page
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (search) {
      setPage(0);
    }
  }, [search]);

  const isFirstPage = page === 0;
  const isLastPage = Math.ceil(jobs.length / jobsPerPage) === page + 1;

  return (
    <div className='flex w-full flex-col'>
      <div>
        <p className='body-l-bold dark:text-white'>Recently posted jobs</p>
      </div>
      {jobs ? (
        <div className='mt-6 flex w-full grow flex-wrap gap-12 sm:flex-row'>
          {jobs
            ?.slice(page * 4, jobsPerPage + page * 4)
            .map((job: JobListingType) => (
              <PostedJobCard job={job} key={job.job_id} />
            ))}
          {Math.ceil(jobs.length / jobsPerPage) > page && (
            <div className='flex w-full items-center justify-around'>
              <div className='w-32 md:w-48'>
                <button
                  disabled={isFirstPage}
                  onClick={() => setPage((prev) => prev - 1)}
                  className={cn(
                    'w-full shrink-0 rounded-lg border border-natural-5 px-3 py-2 text-natural-6 dark:border-natural-7',
                    isFirstPage &&
                      'disabled:bg-natural-4 disabled:dark:bg-natural-7',
                  )}
                >
                  Previous
                </button>
              </div>
              <div className='w-32 md:w-48'>
                <button
                  disabled={isLastPage}
                  onClick={() => setPage((prev) => prev + 1)}
                  className={cn(
                    'w-full shrink-0 rounded-lg border border-natural-5 px-3 py-2 text-natural-6 dark:border-natural-7',
                    isLastPage &&
                      'disabled:bg-natural-4 disabled:dark:bg-natural-7',
                  )}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <NoJobsPosted employer={employer} />
      )}
    </div>
  );
};

export default PostedJobs;
