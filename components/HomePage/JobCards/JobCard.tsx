import Tags from '../Tags';
import { JobListingType, SavedJobsType } from '@/types';
import { findKeywords, truncateString } from '@/lib/utils';
import EmployerLogo from '../../JobSearchPage/SearchResultCard/EmployerLogo';
import Link from 'next/link';
import Tag from '@/components/JobSearchPage/SearchResultCard/Tag';
import moment from 'moment';
import { JobStats } from '@/components/shared';

import {
  getSavedJobsFromUser,
  readUserServerSession,
} from '@/lib/supabase/actions';
import SaveJobClientButton from '@/components/shared/SaveJobButton/SaveJobClientButton';
// import SaveJobButton from '@/components/JobSearchPage/SearchResultCard/SaveJobButton';

const JobCard = async ({ job }: { job: JobListingType }) => {
  const {
    data: { session },
  } = (await readUserServerSession()) || null;

  const checkIfJobIsSaved = async () => {
    const savedJobsArr: SavedJobsType[] = await getSavedJobsFromUser();
    // Check if current job is in DB
    return savedJobsArr.some(
      (savedJob: SavedJobsType) => savedJob.job_id === job.job_id,
    );
  };
  const isFound = await checkIfJobIsSaved();
  const userId = session?.user?.id;

  const {
    job_title: jobTitle,
    job_id: jobId,
    job_description: jobDescription,
    employer_logo: employerLogo,
    job_employment_type: employmentType,
    job_offer_expiration_timestamp: jobOfferExpiration,
    job_posted_at_timestamp: jobPostedAtTimestamp,
    job_min_salary: jobMinSalary,
    job_max_salary: jobMaxSalary,
    job_apply_quality_score: jobApplyQualityScore,
  } = job;

  const dynamicTagsData = [
    { text: employmentType, image: '/assets/icons/briefcase.svg' },
  ];

  if (jobPostedAtTimestamp) {
    dynamicTagsData.push({
      text: `Posted ${moment(new Date(jobPostedAtTimestamp * 1000)).fromNow()}`,
      image: '/assets/icons/clock.svg',
    });
  }

  if (jobOfferExpiration) {
    dynamicTagsData.push({
      text: `Expires ${moment(new Date(jobOfferExpiration * 1000)).fromNow()}`,
      image: '/assets/icons/clock.svg',
    });
  }

  return (
    <section className='flex max-h-fit w-full max-w-[400px] flex-col gap-1 rounded-lg bg-white p-5 dark:bg-darkbg-2 max-[1423px]:max-w-[840px] max-lg:max-w-[976px]'>
      <div className='mb-7 flex items-center justify-between'>
        <div className='flex grow items-center gap-x-2.5 max-lg:gap-x-4'>
          <div className='relative flex h-16 w-full max-w-[64px] items-center justify-center overflow-hidden rounded-xl border-[3px] border-[#FAFAFB] bg-[#F1F1F2] dark:border-darkbg-4 dark:bg-transparent max-sm:h-14 max-sm:w-14'>
            <EmployerLogo employerLogo={employerLogo} />
          </div>
          <div>
            <h1 className='mb-2 line-clamp-1 text-lg dark:text-white max-sm:text-base'>
              {jobTitle && truncateString(jobTitle, 24)}
            </h1>
            <div className='flex flex-wrap gap-1.5'>
              {jobDescription &&
                findKeywords(jobDescription)
                  ?.slice(0, 3)
                  .map((word) => word && <Tag key={word} tag={word} />)}
            </div>
          </div>
        </div>
        <div className='shrink-0 self-start'>
          {session?.user && (
            <SaveJobClientButton
              jobToSave={job}
              isFound={isFound}
              userId={userId || ''}
              showText={false}
            />
          )}
        </div>
      </div>

      <p className='mb-7 line-clamp-6 dark:text-natural-6'>{jobDescription}</p>

      <div className='mt-auto flex flex-col gap-4'>
        <div className='mb-5 flex h-14 justify-start'>
          <Tags tags={dynamicTagsData} />
        </div>
        <div className='flex flex-col items-center justify-between max-sm:gap-4 sm:flex-row'>
          {jobMinSalary && jobMaxSalary ? (
            <JobStats minSalary={jobMinSalary} maxSalary={jobMaxSalary} />
          ) : (
            <JobStats qualityScore={jobApplyQualityScore} />
          )}

          <Link
            href={`/job-details/${jobId}`}
            className='rounded-lg bg-primary px-4 py-3 text-white hover:bg-[#0A9A70] dark:bg-primary dark:text-white dark:hover:bg-[#0A9A70]'
          >
            Visit Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JobCard;
