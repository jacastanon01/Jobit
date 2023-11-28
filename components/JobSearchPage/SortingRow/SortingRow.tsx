import React from 'react';
import NumberOfJobs from './NumberOfJobs';
import SortSelect from './SortSelect';

const SortingRow = () => {
  return (
    <div className='mb-[33px] flex justify-between'>
      <NumberOfJobs numberOfJobs={10} />
      <SortSelect />
    </div>
  );
};

export default SortingRow;
