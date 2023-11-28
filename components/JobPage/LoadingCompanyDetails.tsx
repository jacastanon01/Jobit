import React from 'react';
import { LoadingSpinner } from '@/components/shared';

function LoadingCompanyDetails() {
  return (
    <div>
      <p className='body-l-bold'>Loading company details...</p>
      <LoadingSpinner size={'md'} />
    </div>
  );
}

export default LoadingCompanyDetails;
