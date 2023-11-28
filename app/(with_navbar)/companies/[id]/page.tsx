import { notFound } from 'next/navigation';

import { DetailsCard } from '@/components/shared';
import {
  CompanyCardBody,
  CompanyCardTitle,
} from '@/components/CompanyPage/DetailsCard';
import { SimilarCompanies } from '@/components/CompanyPage/SimilarCompanies';
import { JobListingType } from '@/types';
import { jsearchapi } from '@/constants/jsearchapi';
import { jsearchFetch } from '@/lib/utils';

const CompanyDetails = async ({
  params: { id: companyName },
  searchParams: { search },
}: {
  params: { id: string };
  searchParams: { search?: string | null };
}) => {
  const fetchJobsInCompany = await jsearchFetch(
    `${jsearchapi.search}?query=software%20jobs%20${companyName}&num_pages=20`,
  );

  if (!fetchJobsInCompany?.data || fetchJobsInCompany?.data.length === 0)
    return notFound();

  const { data } = fetchJobsInCompany;

  const { employer_name: employerName } = data[0];

  const filteredData = data.filter(
    (d: JobListingType) =>
      d.employer_name
        ?.toLocaleLowerCase()
        .includes(decodeURIComponent(companyName.toLocaleLowerCase())),
  );

  const searchFilteredData =
    search &&
    filteredData.filter(
      (d: JobListingType) =>
        d.job_description
          ?.toLocaleLowerCase()
          ?.includes(search.toLocaleLowerCase()) ||
        d.job_title?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase()),
    );

  if (filteredData.length === 0) return notFound();
  return (
    <main className='main-container'>
      <div className='w-full'>
        <div className='flex min-h-screen w-full gap-6 max-xl:flex-col'>
          <DetailsCard>
            <div className='my-8 w-full'>
              <CompanyCardTitle jobs={filteredData} />

              <CompanyCardBody
                jobs={!search ? filteredData : searchFilteredData}
                employer={employerName}
              />
            </div>
          </DetailsCard>
          <SimilarCompanies employers={data} />
        </div>
      </div>
    </main>
  );
};

export default CompanyDetails;
