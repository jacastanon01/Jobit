import SearchResultCard from './SearchResultCard/SearchResultCard';
import { jsearchFetch } from '@/lib/utils';
import { jsearchapi } from '@/constants/jsearchapi';
import { JobListingType } from '@/types';
import { MotionDiv } from '../shared/Motion/MotionDiv';

const SearchResults = async ({ searchParams }: { searchParams: any }) => {
  const queryString = new URLSearchParams(searchParams).toString();
  const jobSearchResult = await jsearchFetch(
    `${jsearchapi.search}?query=software ${
      searchParams.query || ''
    }&${queryString}`,
  );

  const containerVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <MotionDiv
      className='flex flex-col gap-4'
      variants={containerVariant}
      initial='hidden'
      animate='show'
    >
      {jobSearchResult?.data &&
        jobSearchResult?.data?.map((job: JobListingType) => (
          <SearchResultCard key={job.job_id} job={job} />
        ))}
    </MotionDiv>
  );
};

export default SearchResults;
