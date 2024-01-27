import type { Metadata } from 'next';
import { Manrope as FontSans } from 'next/font/google';
import React from 'react';
import { cookies } from 'next/headers';

import './globals.css';
import { cn } from '@/lib/utils';

import { ThemeProvider } from '@/context/ThemeProvider';
import { LocationProvider } from '@/context/LocationProvider';
import { Toaster } from '@/components/ui/toaster';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jobit-codemigos.vercel.app/'),
  title: 'Jobit',
  description: 'Find your next engineer job in days, not months.',
  openGraph: {
    title: 'Jobit',
    description: 'Find your next engineer job in days, not months.',
    url: 'https://jobit-codemigos.vercel.app/',
    siteName: 'Jobit',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jobit - Find your next engineer job in days, not months.',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme');

  return (
    <html lang='en' className={`font-sans ${theme?.value}`}>
      <ThemeProvider defaultMode={theme?.value || ''}>
        <LocationProvider />
        <body
          className={cn(
            'min-h-screen bg-[#F9FAFC] dark:bg-darkbg-1 font-sans antialiased',
            fontSans.variable,
          )}
        >
          {children}
          <Toaster />
        </body>
      </ThemeProvider>
    </html>
  );
}
