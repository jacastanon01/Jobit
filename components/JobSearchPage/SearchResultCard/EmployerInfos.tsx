import { JobListingType } from '@/types';
import EmployerLogo from './EmployerLogo';
import { TimeFromNow } from '@/components/shared';

const EmployerInfos = ({ job }: { job: JobListingType }) => {
  const {
    job_title: title,
    job_job_title: jTitle,
    employer_name: employerName,
    job_city: jobCity,
    employer_logo: employerLogo,
    job_state: jobState,
    job_country: jobCountry,
    job_posted_at_timestamp: jobPostedAtTimestamp,
  } = job;
  const jobTitle = title || jTitle;

  return (
    <div className='flex gap-5'>
      <div className='flex h-16 w-16 items-center justify-center rounded-[10px] bg-natural-3 dark:bg-darkbg-3'>
        <div className='relative h-12 w-12 overflow-hidden rounded-[10px]'>
          <EmployerLogo employerLogo={employerLogo} />
        </div>
      </div>
      <div className='flex flex-col gap-[6px]'>
        <h3 className='text-lg leading-6 text-base-black dark:text-base-white'>
          {jobTitle}
        </h3>
        <div className='flex flex-wrap gap-[5px] text-sm font-medium text-natural-7'>
          <div>{employerName}</div>
          <div>•</div>
          <div>
            {jobCity} {jobState}, {jobCountry}
          </div>
          <div>•</div>
          <div>
            <TimeFromNow timestamp={jobPostedAtTimestamp} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerInfos;
