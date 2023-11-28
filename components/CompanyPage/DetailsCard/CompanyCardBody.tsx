'use client';

import SearchInput from './SearchInput';
import PostedJobs from './PostedJobs';
import { JobListingType } from '@/types';

const CompanyCardBody = ({
  employer,
  jobs,
}: {
  employer: string;
  jobs: JobListingType[];
}) => {
  return (
    <div className='mt-12 w-full bg-white p-6 dark:bg-darkbg-2'>
      <SearchInput />
      <PostedJobs jobs={jobs} employer={employer} />
    </div>
  );
};

export default CompanyCardBody;
