import React from 'react';
import Link from 'next/link';

import ActionButtons from '../ActionButtons';
import { JobListingType } from '@/types';
import CoverPhoto from '../../CoverPhoto/CoverPhoto';
import TimeFromNow from '@/components/shared/TimeFromNow';
import { SaveJobButton } from '@/components/shared';
import { readUserServerSession } from '@/lib/supabase/actions';
import { formatLocation } from '@/lib/utils';

const TitleCard = async ({ job }: { job: JobListingType }) => {
  const {
    employer_logo: employerLogo,
    employer_name: employerName,
    job_title: title,
    job_job_title: jTitle,
    job_posted_at_timestamp: jobPostedAtTimestamp,
    job_city: city,
    job_state: state,
    job_country: country,
  } = job;
  const jobTitle = title || jTitle;

  const {
    data: { session },
  } = (await readUserServerSession()) || null;

  return (
    <div className='w-full'>
      <CoverPhoto employerLogo={employerLogo} />
      <section className='mt-8 flex w-full items-center justify-between sm:mt-14'>
        {/* company info */}
        <div className='flex-1'>
          <div className='flex items-center justify-between gap-3'>
            <div className='flex items-center gap-3 max-sm:justify-between sm:flex-1'>
              <div className='text-xl font-bold dark:text-white max-sm:flex-1 sm:text-2xl'>
                {jobTitle}
              </div>
              {session?.user && <SaveJobButton job={job} showText={false} />}
            </div>
            {/* buttons */}
            <div className='flex max-sm:hidden'>
              <ActionButtons job={job} />
            </div>
          </div>

          <div className='gap-1 text-natural-7 sm:flex'>
            <p>
              <Link
                className='font-bold text-primary underline hover:text-primary/80'
                href={`/companies/${employerName}`}
              >
                {employerName}
              </Link>
              <span className='max-sm:hidden'>{' \u2022'} </span>
            </p>
            <div className='flex gap-1'>
              <div>{formatLocation(city, state, country)}</div>
              {'\u2022'}
              <div>
                <TimeFromNow timestamp={jobPostedAtTimestamp} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TitleCard;
