'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const CustomImage = ({
  src,
  className,
}: {
  src: string;
  className?: string | null | undefined;
}) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [src]);

  const isValidUrl = (url: string | null | undefined) => {
    return (
      url &&
      (url.startsWith('blob:') || /^https?:/.test(url) || url.startsWith('/'))
    );
  };

  const validSrc = isValidUrl(src) ? src : '/assets/jobit-icon.svg';

  return (
    <Image
      alt=''
      src={imageError ? '/assets/jobit-icon.svg' : validSrc}
      fill
      className={cn(`${imageError && 'grayscale'} object-cover`, className)}
      onError={() => setImageError(true)}
    />
  );
};

export default CustomImage;
