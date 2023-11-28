import StickyThemeSwitch from '@/components/shared/StickyThemeSwitch';
import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <StickyThemeSwitch />
    </>
  );
}
