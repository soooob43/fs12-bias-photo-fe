'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { useMe } from '@/hooks/useMe';
import LoginRequiredModal from '@/components/auth/LoginRequiredModal';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const { data: user, isLoading, isError } = useMe();

  const [isOpen, setIsOpen] = useState(true);

  // 로그인 페이지 이동
  const handleLogin = () => {
    router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
  };

  // 모달 닫기
  const handleClose = () => {
    setIsOpen(false);

    // 이전 페이지로 이동
    router.back();
  };

  // users/me 요청 중
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

  // 로그인 안 된 경우
  if (!user || isError) {
    return (
      <LoginRequiredModal
        isOpen={isOpen}
        onClose={handleClose}
        onConfirm={handleLogin}
      />
    );
  }

  // 로그인 된 경우
  return children;
}
