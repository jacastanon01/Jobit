import { PiGraduationCapDuotone } from 'react-icons/pi';

import AddEducationButton from './AddEducationButton';
const NoEducationFound = () => {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-3 rounded-2xl bg-natural-5/40 p-16 text-lg text-natural-6 dark:bg-darkbg-2/50 dark:text-natural-7'>
      <div className='text-5xl'>
        <PiGraduationCapDuotone />
      </div>
      You do not have education on your profile yet
      <AddEducationButton />
    </div>
  );
};

export default NoEducationFound;
