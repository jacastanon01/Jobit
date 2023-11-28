import React from 'react';
import List from '../List';
import Image from 'next/image';
import { JobHighlightsType, JobListingType } from '@/types';

const JobDescription = ({ job }: { job: JobListingType }) => {
  const { Responsibilities: responsibilities, Qualifications: qualifications } =
    job?.job_highlights as JobHighlightsType;
  return (
    <section className='mt-5 flex w-full flex-col gap-4 dark:text-white'>
      <div className='flex flex-col'>
        <div className='pr-3'>
          <p className='body-l-bold'>About the job</p>
          <p className=' whitespace-break-spaces text-justify leading-tight text-natural-7 dark:text-white'>
            {job.job_description}
          </p>
        </div>
      </div>
      <div className='my-2 flex flex-col gap-6 py-3'>
        {!job.job_description || (!responsibilities && !qualifications) ? (
          <>
            <div>
              <Image
                src='/assets/not-found.svg'
                alt='not-found'
                height={30}
                width={53}
              />
            </div>
            <p className='body-l-bold'>No description provided</p>
          </>
        ) : (
          <>
            {responsibilities?.length > 0 && (
              <div>
                <h3 className=''>Responsibilities</h3>
                <div className='mt-2 flex flex-col gap-2'>
                  {responsibilities?.map((item: string) => (
                    <List key={item} description={item} />
                  ))}
                </div>
              </div>
            )}
            {qualifications?.length > 0 && (
              <div>
                <h3>Qualifications</h3>
                <div className='mt-2 flex flex-col gap-2'>
                  {qualifications?.map((item: string) => (
                    <List key={item} description={item} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default JobDescription;
