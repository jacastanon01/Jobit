import React from 'react';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';

import { JobListingType } from '@/types';
import CoverPhoto from '../../CoverPhoto/CoverPhoto';
import { formatLocation } from '@/lib/utils';

const CompanyTitle = ({ jobs }: { jobs: JobListingType[] }) => {
  const {
    employer_logo: employerLogo,
    employer_name: employerName,
    employer_company_type: companyType,
    job_city: city,
    job_state: state,
    job_country: country,
    employer_website: employerWebsite,
  } = jobs[0];

  return (
    <section className='mt-4 w-full'>
      <CoverPhoto employerLogo={employerLogo} />
      <div className='mt-8 flex w-full justify-between gap-5 px-2 max-sm:flex-col sm:mt-14 sm:items-center md:px-6'>
        {/* company info */}
        <div className='flex flex-col gap-1 sm:flex-1'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center justify-between gap-3 sm:flex-1'>
              <div className='text-xl font-bold dark:text-white max-sm:flex-1 sm:text-2xl'>
                {employerName}
              </div>
            </div>
          </div>

          <div className='flex gap-1 text-natural-7 '>
            <div className='flex gap-1'>
              {formatLocation(city, state, country)}
            </div>
          </div>
          {companyType && (
            <div className='flex gap-1 text-natural-6 sm:gap-2'>
              <p>{companyType} platform</p>
            </div>
          )}
        </div>

        {employerWebsite && (
          <Link
            href={employerWebsite}
            target='_blank'
            className='flex items-center justify-center gap-1.5 rounded-[10px] bg-primary px-[14px] py-3 text-sm font-semibold text-natural-2 max-sm:w-full md:w-auto'
          >
            <p className='w-fit'>Employer Website</p>
            <FiExternalLink />
          </Link>
        )}
      </div>
    </section>
  );
};

export default CompanyTitle;
