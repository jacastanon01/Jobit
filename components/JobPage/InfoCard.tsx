import React from 'react';

const InfoCard = ({ title, body }: { title: string; body: string }) => {
  const spacedOutTitle = Array.from(title).reduce((newStr, currentValue) => {
    if (currentValue === currentValue.toUpperCase()) {
      newStr += ` ${currentValue}`;
    } else {
      newStr += currentValue;
    }
    return newStr;
  }, '');

  return (
    <div className='flex flex-col gap-1 border-black/20 pb-2 last:border-b-0 last:pb-0 max-md:w-full max-md:border-b max-md:px-4 md:gap-2'>
      <p className='text-sm text-natural-6'>
        {`${spacedOutTitle[0].toUpperCase()}${spacedOutTitle.substring(1)}
        `}
      </p>
      <p className='dark:text-white'>{body}</p>
    </div>
  );
};

export default InfoCard;
