import Image from 'next/image';
import Link from 'next/link';

import { JobListingType } from '@/types';
import EmployerLogo from '../../JobSearchPage/SearchResultCard/EmployerLogo';
import { truncateString } from '@/lib/utils';

const FeaturedCards = ({ job }: { job: JobListingType }) => {
  const {
    job_city: jobCity,
    job_country: jobCountry,
    employer_name: employerName,
    employer_logo: employerLogo,
  } = job;

  return (
    <section className='max-h-[240px] w-full max-w-[256px] rounded-lg bg-white p-[20px] text-base-black dark:bg-darkbg-2 max-lg:max-w-[275px] max-lg:px-[36px] max-sm:max-w-[325px] max-sm:px-[20px]'>
      <div className='mb-2 flex items-center gap-x-2.5 max-lg:gap-x-4'>
        <div className='relative flex h-16 w-full max-w-[64px] items-center justify-center overflow-hidden'>
          <EmployerLogo employerLogo={employerLogo} />
        </div>
        <div>
          <h2 className='mb-2 text-lg dark:text-white max-sm:text-lg'>
            {employerName && truncateString(employerName, 20)}
          </h2>
        </div>
      </div>

      <div className=' max-sm:flex'>
        <div className='mr-2 flex items-center gap-x-2 pb-2 text-natural-6'>
          <Image
            src={'/assets/icons/briefcase.svg'}
            alt='briefcase icon'
            width={20}
            height={20}
            className='opacity-[80%]'
          />
          <p className='max-sm:text-sm'>
            {jobCity && truncateString(jobCity, 15)}, {jobCountry}
          </p>
        </div>
      </div>
      <Link href={`/companies/${employerName}`}>
        <div className='mt-6 w-full max-w-[216px] rounded-lg bg-natural-4 py-3 text-center text-natural-6 hover:bg-slate-200 dark:bg-darkbg-3 dark:text-natural-6 dark:hover:bg-slate-200 max-sm:max-w-[287px]'>
          See all jobs
        </div>
      </Link>
    </section>
  );
};

export default FeaturedCards;
