type JsearchApiType = {
  search: string;
  searchFilter: string;
  jobDetails: string;
  estimatedSalaries: string;
};

export const jsearchapi: JsearchApiType = {
  search: 'https://jsearch.p.rapidapi.com/search',
  searchFilter: 'https://jsearch.p.rapidapi.com/search-filters',
  jobDetails: 'https://jsearch.p.rapidapi.com/job-details',
  estimatedSalaries: 'https://jsearch.p.rapidapi.com/estimated-salary',
};
