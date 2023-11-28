import { JobListingType } from '@/types';
import SearchResultCard from '../JobSearchPage/SearchResultCard/SearchResultCard';

const SavedJobs = ({ savedJobs }: { savedJobs: JobListingType[] | any[] }) => {
  return (
    <div className='flex flex-col gap-4'>
      {savedJobs &&
        savedJobs.length > 0 &&
        savedJobs.map((job: JobListingType) => (
          <SearchResultCard key={job.job_id} job={job} />
        ))}
    </div>
  );
};

export default SavedJobs;
