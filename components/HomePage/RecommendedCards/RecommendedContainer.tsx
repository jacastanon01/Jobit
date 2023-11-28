'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { JobListingType } from '@/types';
import RecommendedCard from './RecommendedCard';

const RecommendedContainer = ({ results }: { results: JobListingType[] }) => {
  const containerVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };
  return (
    <motion.div variants={containerVariant} initial='hidden' animate='show'>
      {results.map((job: JobListingType) => (
        <Link key={job.job_id} href={`/job-details/${job.job_id}`}>
          <RecommendedCard job={job} />
        </Link>
      ))}
    </motion.div>
  );
};

export default RecommendedContainer;
