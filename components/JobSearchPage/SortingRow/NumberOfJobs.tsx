import React from 'react';

const NumberOfJobs = ({ numberOfJobs }: { numberOfJobs: number }) => {
  return (
    <div className='font-semibold text-natural-6'>
      Showing:
      <span className='ml-1 font-bold text-base-black dark:text-base-white'>
        {numberOfJobs} Jobs
      </span>
    </div>
  );
};

export default NumberOfJobs;
