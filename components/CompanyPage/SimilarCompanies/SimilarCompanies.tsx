import { JobListingType } from '@/types';
import SimilarCard from '@/components/JobPage/SimilarJobs/SimilarCard';

const SimilarCompanies = ({ employers }: { employers: JobListingType[] }) => {
  return (
    <div className='w-full xl:mt-[4.5rem] xl:max-w-sm'>
      <h4 className='dark:text-white'>Similar Jobs</h4>
      <div className='flex w-full flex-col gap-6'>
        {employers &&
          employers
            .slice(0, 10)
            .map((listedJob: JobListingType) => (
              <SimilarCard key={listedJob?.job_id} job={listedJob} />
            ))}
      </div>
    </div>
  );
};

export default SimilarCompanies;
