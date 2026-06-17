'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import Header from './Header';

const ConditionalHeader = () => {
  const pathname = usePathname();

  const hideHeaderRoutes = [
    '/my-gallery/create/success',
    '/my-gallery/create/fail',
  ];

  if (hideHeaderRoutes.includes(pathname)) {
    return null;
  }

  return <Header />;
};

export default ConditionalHeader;
