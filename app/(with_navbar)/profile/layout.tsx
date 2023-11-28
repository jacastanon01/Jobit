import ProfileNav from '@/components/ProfilePage/ProfileNav';
import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='main-container flex w-full flex-col gap-6 pb-8 md:flex-row md:gap-10'>
      <aside className='shrink-0'>
        <ProfileNav />
      </aside>
      {children}
    </main>
  );
}
