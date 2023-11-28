import Link from 'next/link';

const NotFoundLeftColumn = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className='w-full max-w-xl lg:shrink-0 xl:max-w-2xl'>
      <h1 className='text-4xl font-bold tracking-tight text-gray-900 dark:text-natural-3 sm:text-6xl'>
        {title}
      </h1>
      <p className='relative mt-6 text-xl leading-8 text-natural-6 dark:text-natural-6 sm:max-w-md lg:max-w-none'>
        {subtitle}
      </p>
      <div className='mt-10 flex items-center gap-x-6'>
        <Link
          href='/jobs-search'
          className='rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:scale-105 focus-visible:outline  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
        >
          Find my new job
        </Link>
        <Link
          href='/'
          className='text-sm font-semibold leading-6 text-natural-8 transition-all hover:text-natural-7 dark:text-natural-3 dark:hover:text-natural-6'
        >
          See an overview <span aria-hidden='true'>→</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundLeftColumn;
