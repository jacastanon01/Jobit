import FilterAccordion from './FilterAccordion';

import { jsearchapi } from '@/constants/jsearchapi';
// import { filters } from '@/constants/filtersExample';
import { jsearchFetch } from '@/lib/utils';
import { CommonFilterDataShapeType } from '@/types';

const FilterSidebar = async ({ searchParams }: { searchParams: any }) => {
  const filters: { data: object } | undefined = await jsearchFetch(
    `${jsearchapi.searchFilter}?query=software%20${searchParams.query || ''}`,
  );

  return (
    <aside className='hidden w-[251px] xl:block'>
      {filters?.data &&
        Object.entries(filters.data).map(
          ([key, value]: [string, CommonFilterDataShapeType[]]) => {
            return (
              key !== 'categories' && (
                <FilterAccordion
                  key={key}
                  arrayOfFilter={value}
                  filterKey={key}
                />
              )
            );
          },
        )}
    </aside>
  );
};

export default FilterSidebar;
