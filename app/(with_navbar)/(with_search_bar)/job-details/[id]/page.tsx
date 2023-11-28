import Loading from '@/app/loading';
import FetchDetails from '@/components/JobPage/FetchDetails';
import { Suspense } from 'react';

const JobDetails = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <main className='w-full'>
      <Suspense fallback={<Loading />}>
        <FetchDetails id={id} />
      </Suspense>
    </main>
  );
};

export default JobDetails;
