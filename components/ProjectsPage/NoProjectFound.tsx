import { PiBracketsCurlyDuotone } from 'react-icons/pi';

import AddProjectButton from './AddProjectButton';
const NoProjectFound = () => {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-3 rounded-2xl bg-natural-5/40 p-16 text-lg text-natural-6 dark:bg-darkbg-2/50 dark:text-natural-7'>
      <div className='text-5xl'>
        <PiBracketsCurlyDuotone />
      </div>
      You do not have projects on your profile yet
      <AddProjectButton />
    </div>
  );
};

export default NoProjectFound;
