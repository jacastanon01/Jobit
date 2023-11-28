import InfoGrid from './InfoGrid';
import ActionButtons from '../ActionButtons';
import JobDescription from './JobDescription';
import CompanyInfo from './CompanyInfo';
import { JobListingType } from '@/types';
import TitleCard from './TitleCard';
import LoadingCompanyDetails from '../LoadingCompanyDetails';
import { Suspense } from 'react';
import { DetailsCard } from '@/components/shared';

const JobDetailsCard = ({ job }: { job: JobListingType }) => {
  return (
    <DetailsCard>
      <div className='mt-4 flex flex-col gap-6 bg-white p-6 dark:bg-darkbg-2'>
        <TitleCard job={job} />

        <InfoGrid job={job} />

        <div className='flex w-full items-center gap-3 max-sm:justify-evenly sm:hidden'>
          <ActionButtons job={job} />
        </div>

        <JobDescription job={job} />

        {/* About company */}
        <Suspense fallback={<LoadingCompanyDetails />}>
          <CompanyInfo job={job} />
        </Suspense>
      </div>
    </DetailsCard>
  );
};

export default JobDetailsCard;
