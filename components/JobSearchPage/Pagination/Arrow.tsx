import React from 'react';

const Arrow = ({ direction = 'left' }: { direction: 'left' | 'right' }) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${direction !== 'left' && 'rotate-180'}`}
    >
      <path
        d='M15.8333 10H4.16666M4.16666 10L9.99999 15.8334M4.16666 10L9.99999 4.16669'
        stroke='currentColor'
        strokeWidth='1.66667'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default Arrow;
