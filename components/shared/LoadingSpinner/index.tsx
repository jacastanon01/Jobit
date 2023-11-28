import { cn } from '@/lib/utils';

const LoadingSpinner = ({ size }: { size: 'lg' | 'md' | 'sm' }) => {
  const outerVariant = {
    lg: 'h-[40px] w-[40px]',
    md: 'h-[26px] w-[26px]',
    sm: 'h-[18px] w-[18px]',
  };

  const innerVariant = {
    lg: 'h-[32px] w-[32px]',
    md: 'h-[20px] w-[20px]',
    sm: 'h-[13px] w-[13px]',
  };

  return (
    <div
      className={cn(
        'flex animate-spin items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary-green',
        outerVariant[size],
      )}
    >
      <div
        className={cn(
          'rounded-full bg-white dark:bg-darkbg-2',
          innerVariant[size],
        )}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
