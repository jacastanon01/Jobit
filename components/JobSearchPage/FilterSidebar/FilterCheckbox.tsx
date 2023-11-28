'use client';

import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';

const FilterCheckbox = ({
  filterName,
  filterValue,
  filterKey,
}: {
  filterName: string;
  filterValue: string;
  filterKey: string;
}) => {
  const router = useRouter();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();

  const [isChecked, setIsChecked] = useState(
    searchParams.get(filterKey)?.split(',').includes(filterValue),
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    let currentValues = queryParams.get(filterKey)?.split(',') || [];
    currentValues = currentValues.filter((value) => value !== ''); // Remove any empty strings

    const valueExists = currentValues.includes(filterValue);

    if (isChecked && !valueExists) {
      currentValues.push(filterValue);
    } else if (!isChecked && valueExists) {
      currentValues.splice(currentValues.indexOf(filterValue), 1);
    } else {
      return;
    }

    if (currentValues.length === 0) {
      queryParams.delete(filterKey);
    } else {
      queryParams.set(filterKey, currentValues.join(','));
    }

    router.push(`/jobs-search?${queryParams.toString()}`, { scroll: false });
  }, [isChecked, router, filterKey, filterValue]);

  const handleChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  return (
    <div className='flex items-center gap-3.5'>
      <Checkbox
        value={filterValue}
        checked={isChecked}
        id={filterValue}
        name={filterValue}
        onCheckedChange={handleChange}
        className='rounded border-natural-6 text-white'
      />

      <label
        htmlFor={filterValue}
        className='flex cursor-pointer gap-2 text-sm font-medium capitalize dark:text-natural-5 '
      >
        {filterName}
      </label>
    </div>
  );
};

export default FilterCheckbox;
