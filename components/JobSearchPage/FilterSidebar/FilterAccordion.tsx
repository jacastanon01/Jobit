import { v4 as uuidv4 } from 'uuid';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { CommonFilterDataShapeType } from '@/types';
import FilterCheckbox from './FilterCheckbox';

const FilterAccordion = ({
  filterKey,
  arrayOfFilter,
}: {
  filterKey: string;
  arrayOfFilter: CommonFilterDataShapeType[];
}) => {
  return (
    arrayOfFilter.length > 0 && (
      <Accordion type='single' className='w-full' collapsible>
        <AccordionItem value='item-1'>
          <AccordionTrigger className='pt-0 text-lg font-semibold capitalize text-base-black dark:text-white'>
            {filterKey.replace('_', ' ')}
          </AccordionTrigger>
          <AccordionContent>
            <div className='flex flex-col gap-3.5'>
              {arrayOfFilter.map((filter) => {
                return (
                  <div
                    className='flex items-center justify-between'
                    key={uuidv4()}
                  >
                    <FilterCheckbox
                      filterKey={filterKey}
                      filterName={filter.name}
                      filterValue={filter.value}
                    ></FilterCheckbox>
                    <div className='rounded-[5px] bg-natural-2 px-1.5 py-0.5 text-sm text-natural-8 dark:bg-darkbg-3 dark:text-natural-2'>
                      {filter.est_count}
                    </div>
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  );
};

export default FilterAccordion;
