type mainMenuType = {
  label: string;
  route: string;
}[];

export const mainMenu: mainMenuType = [
  {
    label: 'Overview',
    route: '/',
  },
  {
    label: 'Job Search',
    route: '/jobs-search',
  },
  {
    label: 'Estimated Salaries',
    route: '/estimated-salaries',
  },
];
