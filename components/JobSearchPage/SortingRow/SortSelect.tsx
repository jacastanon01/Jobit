'use client';
import React, { useState } from 'react';

const SortSelect = () => {
  const [selectOption, setSelectOption] = useState('relevance');

  return (
    <div className='font-semibold text-natural-6'>
      Sort by:
      <span className='ml-1 font-bold text-base-black dark:text-base-white'>
        <select
          name='employee-type'
          value={selectOption}
          className='cursor-pointer bg-transparent outline-none'
          id='employee-type'
          onChange={(e) => setSelectOption(e.target.value)}
        >
          <option className='cursor-pointer dark:text-black' value='relevance'>
            Relevance
          </option>
          <option className='cursor-pointer dark:text-black' value='date'>
            Date Posted
          </option>
        </select>
      </span>
    </div>
  );
};

export default SortSelect;
