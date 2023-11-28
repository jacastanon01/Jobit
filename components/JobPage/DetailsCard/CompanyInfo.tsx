import { JobListingType } from '@/types';
import EmployerLogo from '../../JobSearchPage/SearchResultCard/EmployerLogo';
import { theCompaniesApiFetch } from '@/lib/utils';
import Link from 'next/link';

const CompanyInfo = async ({ job }: { job: JobListingType }) => {
  const { employer_logo: employerLogo, employer_name: employerName } = job;
  const companyInfo = employerName
    ? await theCompaniesApiFetch(employerName)
    : { description: null };

  const description = companyInfo?.description;

  if (!description) return null;

  return (
    <section className='mt-4 dark:text-white'>
      <div className='border-t-2 border-natural-4 py-3 text-lg font-bold dark:text-white lg:flex-1'>
        About the company
      </div>
      <div className='flex flex-col gap-4 py-3 sm:flex-row sm:justify-between'>
        <div className='flex flex-1 flex-col gap-6'>
          <div className='flex h-14 items-center gap-4'>
            <div className='relative h-[50px] w-[50px]'>
              <EmployerLogo employerLogo={employerLogo} />
            </div>
            <div>
              <p className='body-l-bold dark:text-white'>{employerName}</p>
              <div>
                <Link
                  href={`/companies/${employerName}`}
                  className='flex w-fit items-center gap-2 rounded-lg border border-primary px-3 text-primary'
                >
                  View jobs
                </Link>
              </div>
            </div>
          </div>
          <p className='dark:text-white'>{description}</p>
        </div>
      </div>
    </section>
  );
};

export default CompanyInfo;
