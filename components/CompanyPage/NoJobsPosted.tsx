import Link from 'next/link';
import React from 'react';

const NoJobsPosted = ({ employer }: { employer: string }) => {
  return (
    <div className='mt-6'>
      <p className='p-4'>
        {employer} does not appear to have any job openings at the moment.
        Please come again at a later date and check out{' '}
        <span>
          <Link href={'/'} className='font-bold text-primary'>
            these jobs
          </Link>{' '}
          in the meantime.
        </span>
      </p>
    </div>
  );
};

export default NoJobsPosted;
