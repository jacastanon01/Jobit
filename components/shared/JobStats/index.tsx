import { formatNumber } from '@/lib/utils';

const JobStats = ({
  minSalary,
  maxSalary,
  qualityScore,
}: {
  minSalary?: number | null;
  maxSalary?: number | null;
  qualityScore?: number | null;
}) => {
  return (
    <div className='flex flex-wrap gap-2 text-lg font-medium leading-6 text-natural-7 md:gap-[35px]'>
      {(minSalary || maxSalary) && (
        <div>
          <span className='text-base-black dark:text-base-white'>
            {minSalary && `$${formatNumber(minSalary)}`}
            {minSalary && maxSalary && '-'}
            {maxSalary && `$${formatNumber(maxSalary)}`}
          </span>
          /month
        </div>
      )}
      {qualityScore && (
        <div>
          Quality Score:
          <span className='ml-1 text-base-black dark:text-base-white'>
            {(qualityScore * 100).toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default JobStats;
