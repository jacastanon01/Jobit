import { cookies } from 'next/headers';
import { jsearchFetch } from '@/lib/utils';
import { jsearchapi } from '@/constants/jsearchapi';
import RecommendedContainer from './RecommendedContainer';

const SearchResults = async () => {
  const cookieStore = cookies();
  const locationCookie = cookieStore.get('location')?.value;

  const jobSearchResult = await jsearchFetch(
    `${jsearchapi.search}?query=Software${
      locationCookie && locationCookie
    }&page=1&num_pages=1`,
  );

  return (
    <>
      {jobSearchResult?.data && (
        <RecommendedContainer results={jobSearchResult?.data} />
      )}
    </>
  );
};

export default SearchResults;
