import JobCard from './JobCard';
import { v4 as uuidv4 } from 'uuid';
import { jsearchFetch } from '@/lib/utils';
import { cookies } from 'next/headers';
import { jsearchapi } from '@/constants/jsearchapi';
import { JobListingType } from '@/types';

const SearchResults = async () => {
  const cookieStore = cookies();
  const locationCookie = cookieStore.get('location')?.value;

  let jobSearchResult;

  try {
    jobSearchResult = await jsearchFetch(
      `${jsearchapi.search}?query=Software${locationCookie && locationCookie}&page=1&num_pages=1`,
    );

    const jobsDisplayed = jobSearchResult?.data?.slice(0, 4);
    const shouldAddRadius = jobsDisplayed && jobsDisplayed.length < 4;

    if (shouldAddRadius) {
      jobSearchResult = await jsearchFetch(
        `${jsearchapi.search}?query=Software${locationCookie && locationCookie}&page=1&num_pages=1&radius=50`,
      );
    }
  } catch (error) {
    console.error('Error fetching job search results:', error);
  }
  return (
    <div className='flex flex-wrap gap-9 '>
      {jobSearchResult?.data &&
        jobSearchResult?.data
          ?.slice(0, 4)
          .map((job: JobListingType) => (
            <JobCard key={job?.job_id || uuidv4()} job={job} />
          ))}
    </div>
  );
};

export default SearchResults;
