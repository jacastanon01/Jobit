import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';

import Tag from './Tag';
import JobStats from './JobStats';
import { SaveJobButton } from '@/components/shared';
import { JobListingType } from '@/types';
import { truncateString, findKeywords } from '@/lib/utils';
import EmployerInfos from './EmployerInfos';
import { getProfile } from '@/lib/supabase/actions';
import { MotionArticle } from '@/components/shared/Motion/MotionArticle';

const SearchResultCard = async ({ job }: { job: JobListingType }) => {
  const {
    job_description: jobDescription,
    job_min_salary: jobMinSalary,
    job_max_salary: jobMaxSalary,
    job_apply_quality_score: jobApplyQualityScore,
    employer_website: employerWebsite,
    job_id: jobId,
  } = job;

  const profile = await getProfile();
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      transition: {
        duration: 0.4,
      },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };
  return (
    <MotionArticle
      variants={itemVariants}
      className='flex flex-col gap-5 rounded-[10px] bg-base-white p-5 dark:bg-darkbg-2'
    >
      {/* Basic info about the job + save button */}
      <div className='flex justify-between'>
        <Link href={`/job-details/${jobId}`}>
          <EmployerInfos job={job} />
        </Link>

        {profile && (
          <div key={job.job_id}>
            <SaveJobButton job={job} showText={true} />
          </div>
        )}
      </div>

      {/* Short job description */}
      <div className='text-sm leading-[22px] text-natural-7 dark:text-natural-5'>
        {jobDescription && truncateString(jobDescription, 350)}
      </div>

      {/* Tag list */}
      <div className='flex flex-wrap gap-[10px] '>
        {jobDescription &&
          findKeywords(jobDescription).map(
            (word, i) => word && <Tag key={word} tag={word} />,
          )}
      </div>

      <div className='flex flex-col items-center justify-between gap-3 md:flex-row'>
        {/* Job stats */}
        <JobStats
          qualityScore={jobApplyQualityScore}
          minSalary={jobMinSalary}
          maxSalary={jobMaxSalary}
        />
        <div className='flex w-full flex-wrap gap-2 md:w-auto'>
          {/* Employer Website Button
           */}

          {employerWebsite && (
            <Link
              href={employerWebsite}
              target='_blank'
              className='flex w-full min-w-[125px] items-center justify-center gap-1.5 rounded-[10px] bg-natural-4 px-[14px] py-3 text-sm font-semibold text-natural-7 dark:bg-darkbg-3 md:w-auto'
            >
              Employer Website
              <FiExternalLink />
            </Link>
          )}

          {/* Apply Button */}
          {jobId && (
            <Link
              href={`/job-details/${jobId}`}
              className='flex w-full min-w-[180px] justify-center rounded-[10px] bg-primary px-[14px] py-3 text-sm font-semibold text-base-white md:w-auto'
            >
              View in details
            </Link>
          )}
        </div>
      </div>
    </MotionArticle>
  );
};

export default SearchResultCard;
