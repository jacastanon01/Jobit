'use client';

import { motion } from 'framer-motion';

import { JobListingType } from '@/types';
import { formatLocation, truncateString } from '@/lib/utils';
import EmployerLogo from '../../JobSearchPage/SearchResultCard/EmployerLogo';

const RecommendedCard = ({ job }: { job: JobListingType }) => {
  const {
    job_title: jobTitle,
    employer_logo: employerLogo,
    employer_name: employerName,
    job_city: jobCity,
    job_country: jobCountry,
    job_employment_type: jobEmploymentType,
  } = job;

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
    },
  };

  const formattedLocation = formatLocation(jobCity, null, jobCountry) || '';

  return (
    <motion.article
      variants={itemVariants}
      className='mb-3 flex w-full max-w-[360px] grow items-center justify-between rounded-lg bg-natural-3 p-4 dark:bg-darkbg-3 max-lg:max-w-[963px]'
    >
      <div className='flex items-center gap-x-2.5'>
        <div className='relative h-16 w-16'>
          {' '}
          {/* Adjust width as needed */}
          <EmployerLogo employerLogo={employerLogo} />
        </div>
        <div className='flex grow flex-col justify-between'>
          <h1 className='truncate text-lg dark:text-white max-sm:text-sm sm:text-base'>
            {jobTitle && truncateString(jobTitle, 15)}
          </h1>
          <p className='truncate text-sm dark:text-natural-6 max-sm:text-[12px]'>
            {employerName && truncateString(employerName, 10)} •{' '}
            {truncateString(formattedLocation, 10)}
          </p>
        </div>
      </div>
      <div className='text-right'>
        <p className='mb-1 text-sm dark:text-natural-6 max-sm:text-[12px]'>
          <b className='font-medium dark:text-white'>$70-80</b> / Hr
        </p>
        <p className='text-sm dark:text-natural-6 max-sm:text-[12px]'>
          {jobEmploymentType?.toLowerCase()}
        </p>
      </div>
    </motion.article>
  );
};

export default RecommendedCard;
