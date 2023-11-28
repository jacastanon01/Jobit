import { JobListingType } from '@/types';
import EmployerLogo from '../../JobSearchPage/SearchResultCard/EmployerLogo';
import Link from 'next/link';
import { SaveJobButton, TimeFromNow } from '@/components/shared';
import { formatLocation } from '@/lib/utils';
import { readUserServerSession } from '@/lib/supabase/actions';

const SimilarCard = async ({ job }: { job: JobListingType }) => {
  const {
    job_id: jobId,
    job_title: title,
    job_job_title: jTitle,
    employer_logo: employerLogo,
    job_city: jobCity,
    job_state: jobState,
    job_country: jobCountry,
    job_posted_at_timestamp: jobPostedAtTimestamp,
  } = job;
  const jobTitle = title || jTitle;

  const {
    data: { session },
  } = (await readUserServerSession()) || null;

  return (
    <article className='flex flex-col gap-6 rounded-md bg-white p-4 dark:bg-darkbg-2'>
      <div className='flex'>
        <div className='flex gap-2'>
          <div className='relative h-[40px] w-[40px]'>
            <EmployerLogo employerLogo={employerLogo} />
          </div>
          <div className=''>
            <h3 className='body-l-bold dark:text-white'>{jobTitle}</h3>
            <p className='text-natural-6'>
              {formatLocation(jobCity, jobState, jobCountry)}
            </p>
          </div>
        </div>
        <div className='ml-auto text-sm text-natural-6'>
          <span className='text-black dark:text-white'></span>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <p className='text-natural-6'>
          <TimeFromNow timestamp={jobPostedAtTimestamp} />
        </p>
        <div className='flex items-center gap-5'>
          {session?.user && <SaveJobButton job={job} showText={false} />}
          <Link
            className='rounded-lg bg-primary/10 px-2 py-1 text-primary'
            href={`/job-details/${jobId}`}
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
};

export default SimilarCard;
