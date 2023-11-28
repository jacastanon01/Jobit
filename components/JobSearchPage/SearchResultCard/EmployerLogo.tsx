'use client';

import Image from 'next/image';
import { useState } from 'react';

const EmployerLogo = ({
  employerLogo,
}: {
  employerLogo: string | null | undefined;
}) => {
  const [imageError, setImageError] = useState(false);

  return employerLogo ? (
    <Image
      alt='Mountains'
      src={imageError ? '/assets/jobit-icon.svg' : employerLogo}
      fill
      className={`${imageError && 'grayscale'} object-contain`}
      onError={() => setImageError(true)}
    />
  ) : (
    <Image
      alt='Mountains'
      src={'/assets/jobit-icon.svg'}
      fill
      className='object-contain grayscale'
    />
  );
};

export default EmployerLogo;
