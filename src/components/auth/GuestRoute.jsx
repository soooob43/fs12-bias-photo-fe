'use client';

import { useMe } from '@/hooks/useMe';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

const GuestRouteContent = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  const { data: user, isLoading } = useMe();

  useEffect(() => {
    if (user) {
      router.replace(redirect || '/market');
    }
  }, [user, router]);

  if (isLoading) {
    return (
      <div
        className="
        fixed inset-0
        flex items-center justify-center
      "
      >
        <div
          className="
          w-10 h-10
          border-4
          border-gray-400
          border-t-white
          rounded-full
          animate-spin
        "
        />
      </div>
    );
  }

  if (user) {
    return null;
  }

  return children;
};

export default function GuestRoute({ children }) {
  return (
    <Suspense fallback={null}>
      <GuestRouteContent>{children}</GuestRouteContent>
    </Suspense>
  );
}
