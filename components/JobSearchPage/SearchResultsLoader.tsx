import { Skeleton } from '../ui/skeleton';
import { v4 as uuidv4 } from 'uuid';

const SearchResultsLoader = () => {
  const numberOfSkeletons = 10;
  return (
    <div className='flex flex-col gap-4'>
      {Array.from({ length: numberOfSkeletons }).map((_, i) => (
        <Skeleton
          key={uuidv4()}
          className='h-[302px] w-full rounded-[10px] !bg-primary/10'
        />
      ))}
    </div>
  );
};

export default SearchResultsLoader;
