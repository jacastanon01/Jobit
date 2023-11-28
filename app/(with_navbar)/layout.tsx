import React from 'react';

import Navbar from '@/components/Navbar/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className='mb-12'>
        <Navbar />
      </header>
      {children}
    </>
  );
}
