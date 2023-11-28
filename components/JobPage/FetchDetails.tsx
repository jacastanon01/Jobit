import React from 'react';
import JobDetailsCard from './DetailsCard/JobDetailsCard';
import SimilarJobs from './SimilarJobs/SimilarJobs';
import { jsearchapi } from '@/constants/jsearchapi';
import { jsearchFetch } from '@/lib/utils';
import { JobListingType } from '@/types';
import { v4 as uuidv4 } from 'uuid';

const FetchDetails = async ({ id }: { id: string }) => {
  const jobDetails = await jsearchFetch(
    `${jsearchapi.jobDetails}?job_id=${decodeURIComponent(id)}`,
  );
  return (
    <section>
      {jobDetails?.data &&
        jobDetails?.data?.map((job: JobListingType) => (
          <div
            key={job?.job_id || uuidv4()}
            className='flex w-full gap-6 max-xl:flex-col'
          >
            <JobDetailsCard job={job} />
            <SimilarJobs job={job} />
          </div>
        ))}
    </section>
  );
};

export default FetchDetails;
