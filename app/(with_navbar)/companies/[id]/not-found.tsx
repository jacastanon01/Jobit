'use client';

import { usePathname } from 'next/navigation';

import Notfound from '@/components/NotFound/NotFound';

export default function NotFound() {
  const path = usePathname()?.split('/').pop();
  // unencoded path
  const unencodedPath = decodeURIComponent(path || '');
  return <Notfound title={`Cannot find ${unencodedPath || 'this page'}`} />;
}
