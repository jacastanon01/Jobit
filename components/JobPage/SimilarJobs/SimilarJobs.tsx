import React from 'react';
import SimilarCard from './SimilarCard';
import { jsearchFetch } from '@/lib/utils';
import { jsearchapi } from '@/constants/jsearchapi';
import { JobListingType } from '@/types';
import { v4 as uuidv4 } from 'uuid';

const SimilarJobs = async ({ job }: { job: JobListingType }) => {
  const { job_title: title, job_job_title: jTitle, job_city: jobCity } = job;
  const jobTitle = title || jTitle;

  const data = await jsearchFetch(
    `${jsearchapi.search}?query=${jobTitle}%20in%20${jobCity}&page=1&radius=80`,
  ); // Using search filters for job title in job city within a 50 mile radius

  const filteredData: JobListingType[] =
    data?.data &&
    data?.data.filter((d: JobListingType) => d?.job_id !== job?.job_id);

  return (
    <>
      {filteredData && filteredData.length > 0 ? (
        <div className='flex w-full flex-col sm:mt-8 xl:max-w-sm'>
          <p className='body-l-bold dark:text-white'>Similar Jobs</p>
          <div className='mt-6 flex w-full flex-col gap-4'>
            {filteredData?.map((listedJob: JobListingType) => (
              <SimilarCard
                key={listedJob?.job_id || uuidv4()}
                job={listedJob}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className='body-l-bold w-fit dark:text-white sm:mt-8'>
          No Related jobs
        </div>
      )}
    </>
  );
};

export default SimilarJobs;
