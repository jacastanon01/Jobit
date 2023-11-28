'use client';

/* eslint-disable camelcase */
import { useState, useTransition } from 'react';
import { usePathname } from 'next/navigation';

import { SavedJobsType } from '@/types';
import SavedIcon from '../../JobSearchPage/SearchResultCard/SavedIcon';
import { removeJobFromDb, saveJobToDb } from '@/lib/supabase/actions';
import { useToast } from '@/components/ui/use-toast';
import { LoadingSpinner } from '@/components/shared';

const SaveJobClientButton = ({
  jobToSave,
  isFound: found,
  userId,
  showText,
}: {
  jobToSave: SavedJobsType;
  isFound: boolean;
  userId: string;
  showText: boolean;
}) => {
  // Initialize state from the cookie
  const pathname = usePathname();
  const { toast } = useToast();
  const [isFound, setIsFound] = useState<boolean>(found);
  const [isPending, startTransition] = useTransition();

  // Handle click to save or unsave a job
  const handleJobSave = async () => {
    if (isFound) {
      startTransition(async () => {
        jobToSave.job_id && (await removeJobFromDb(jobToSave.job_id, pathname));
      });
    } else {
      startTransition(async () => {
        await saveJobToDb(jobToSave, userId, pathname);
      });

      toast({
        title: 'Job saved!',
        description: 'You have successfully saved this job to your list',
        variant: 'success',
      });
    }

    setIsFound((prev) => !prev);
  };

  // Render the button
  return (
    <>
      {isPending ? (
        <LoadingSpinner size='sm' />
      ) : (
        <button
          disabled={isPending}
          onClick={handleJobSave}
          className={`${
            isFound &&
            'w-[19px] !bg-primary !text-base-white dark:bg-primary dark:text-base-white'
          } ${
            showText
              ? 'justify-between gap-[6px] text-sm font-medium text-natural-6 dark:bg-darkbg-3 md:w-[103px] md:rounded-[10px] md:bg-natural-3 md:px-[10px] md:py-[7px]'
              : '!h-7 !w-7 rounded-lg border border-natural-4 px-1 dark:border-darkbg-3'
          } flex items-center  bg-transparent`}
        >
          {showText && (
            <span className='hidden md:inline'>
              {isFound ? 'Remove' : 'Save Job'}
            </span>
          )}
          <SavedIcon found={isFound} />
        </button>
      )}
    </>
  );
};

export default SaveJobClientButton;
