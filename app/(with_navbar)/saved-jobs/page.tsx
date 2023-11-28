import moment from 'moment';
import React from 'react';

import Notfound from '@/components/NotFound/NotFound';
import SavedJobs from '@/components/SavedJobsPage/SavedJobs';
import { getSavedJobsFromUser } from '@/lib/supabase/actions';

const SavedJobsPage = async () => {
  const savedJobs = await getSavedJobsFromUser();

  return savedJobs.length > 0 ? (
    <main className='main-container pb-8 pt-[50px]'>
      <h1 className='mb-1 font-bold text-base-black dark:text-white sm:mb-3'>
        Here are your saved jobs
      </h1>
      <h2 className='mb-[30px] text-base font-medium leading-6 text-natural-6 sm:text-[20px] sm:leading-8'>
        {moment().format('dddd, DD MMM YYYY')}
      </h2>
      <div>
        <SavedJobs savedJobs={savedJobs} />
      </div>
    </main>
  ) : (
    <Notfound
      title={"You don't have any saved jobs yet"}
      subtitle={'Let Jobit find a new one for you!'}
    />
  );
};

export default SavedJobsPage;
