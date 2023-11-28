/* eslint-disable camelcase */
import { JobListingType, SavedJobsType } from '@/types';
import {
  getSavedJobsFromUser,
  readUserServerSession,
} from '@/lib/supabase/actions';
import SaveJobClientButton from './SaveJobClientButton';

const SaveJobButton = async ({
  job,
  showText,
}: {
  job: JobListingType;
  showText: boolean;
}) => {
  const {
    data: { session },
  } = (await readUserServerSession()) || null;

  const userId = session?.user?.id;

  const checkIfJobIsSaved = async () => {
    const savedJobsArr: SavedJobsType[] = await getSavedJobsFromUser();
    // Check if current job is in DB
    return savedJobsArr.some(
      (savedJob: SavedJobsType) => savedJob.job_id === job.job_id,
    );
  };

  const isFound = await checkIfJobIsSaved();

  return (
    <SaveJobClientButton
      jobToSave={job}
      isFound={isFound}
      userId={userId || ''}
      showText={showText}
    />
  );
};

export default SaveJobButton;
