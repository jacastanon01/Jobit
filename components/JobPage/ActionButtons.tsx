import { JobListingType } from '@/types';
import Link from 'next/link';
import React from 'react';

const ActionButtons = ({ job }: { job: JobListingType }) => {
  const { job_apply_link: applyLink } = job;
  return (
    <>
      {applyLink && (
        <Link
          className='rounded-lg bg-primary px-3 py-2 text-white'
          href={applyLink}
          target='_blank'
        >
          Apply Now
        </Link>
      )}
    </>
  );
};

export default ActionButtons;
