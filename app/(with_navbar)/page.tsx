import Image from 'next/image';
import LatestSearchResults from '@/components/HomePage/JobCards/LatestSearchResults';
import CompanySearchResults from '@/components/HomePage/CompanyCards/CompanySearchResults';
import RecSearchResults from '@/components/HomePage/RecommendedCards/RecSearchResults';
import Link from 'next/link';
// import { Suspense } from 'react';
// import { SearchResultsLoader } from "@/components/JobSearchPage";

export default function Home() {
  return (
    <main className='main-container py-12 max-lg:px-16 max-md:px-10 max-sm:px-8'>
      <h1 className='mb-4 text-base-black dark:text-white max-sm:mb-10 max-sm:text-[22px]'>
        Welcome to the Job Search Platform for Developers
      </h1>
      <h5 className='mb-8 text-xl text-natural-6 max-sm:hidden'>
        Monday, 13 Jan 2023
      </h5>
      <div className='flex gap-x-7 max-lg:flex-col'>
        <section>
          <div className='flex max-w-[840px] justify-between  max-lg:max-w-[976px]'>
            <h2 className='mb-6 text-base-black dark:text-white'>
              Latest Job Posts
            </h2>
            <Link
              href='/jobs-search?page=1'
              className='flex h-10 items-center justify-center gap-x-1.5 rounded-lg border-2 border-natural-2 bg-transparent px-3 py-2 text-[14px] text-natural-7 hover:bg-slate-200 dark:border-darkbg-3 dark:bg-transparent dark:text-natural-7 dark:hover:bg-slate-200'
            >
              See All
              <Image
                src='/assets/icons/vector.svg'
                className='hidden max-sm:inline-block'
                alt='dropdown icon'
                width={8}
                height={6}
              />
            </Link>
          </div>
          <div className='flex max-w-[840px] flex-wrap gap-9 max-lg:max-w-[976px]'>
            <LatestSearchResults />
          </div>
          <div className='mx-auto  max-lg:mx-0 lg:max-w-screen-lg'>
            <h2 className='my-6 text-start text-base-black dark:text-white lg:text-left'>
              Featured Companies
            </h2>
            <div className='flex flex-wrap justify-center gap-8 max-lg:flex lg:justify-start lg:gap-9'>
              <CompanySearchResults />
            </div>
          </div>
        </section>
        {/* Recommended for you section */}
        <section className='max-w-[400px] max-lg:max-w-[900px]'>
          <div className='flex w-full justify-between max-lg:items-center'>
            <h2 className='mb-6 text-base-black dark:text-white max-lg:my-6 max-sm:text-[20px]'>
              Recommended For You
            </h2>
            <Link
              href='/jobs-search?page=1'
              className='flex h-10 items-center justify-center gap-x-1.5 rounded-lg border-2 border-natural-2 bg-transparent px-3 py-2 text-[14px] text-natural-7 hover:bg-slate-200 dark:border-darkbg-3 dark:bg-transparent dark:text-natural-7 dark:hover:bg-slate-200'
            >
              See All
              <Image
                src='/assets/icons/vector.svg'
                className='hidden max-sm:inline-block'
                alt='dropdown icon'
                width={8}
                height={6}
              />
            </Link>
          </div>
          <div className='h-fit w-[400px] rounded-lg bg-white p-4 dark:bg-darkbg-2 max-lg:w-full max-lg:max-w-[900px]'>
            <RecSearchResults />
          </div>
        </section>
      </div>
    </main>
  );
}
