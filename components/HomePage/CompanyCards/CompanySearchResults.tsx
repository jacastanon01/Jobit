import CompanyCards from '@/components/HomePage/CompanyCards/CompanyCard';
import { v4 as uuidv4 } from 'uuid';
import { jsearchFetch } from '@/lib/utils';
import { cookies } from 'next/headers';
import { jsearchapi } from '@/constants/jsearchapi';
import { JobListingType } from '@/types';

const CompanySearchResults = async () => {
  const cookieStore = cookies();
  const locationCookie = cookieStore.get('location')?.value;

  const jobSearchResult = await jsearchFetch(
    `${jsearchapi.search}?query=Software${locationCookie && locationCookie}&page=1&num_pages=1`,
  );

  const sortedJobs = jobSearchResult?.data?.sort(
    (
      a: { job_apply_quality_score: number },
      b: { job_apply_quality_score: number },
    ) => b.job_apply_quality_score - a.job_apply_quality_score,
  );

  return (
    <div className='flex grow flex-wrap gap-[34px]'>
      {sortedJobs
        ?.slice(0, 3)
        .map((job: JobListingType) => (
          <CompanyCards key={job?.job_id || uuidv4()} job={job} />
        ))}
    </div>
  );
};

export default CompanySearchResults;
