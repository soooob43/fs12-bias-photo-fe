'use client';

import { useRouter } from 'next/navigation';
import LeftArrowIcon from '@/components/icons/LeftArrowIcon';
import { brBold } from '@/fonts';

const NotificationHeader = () => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 flex h-[60px] items-center border-b border-[#333333] bg-black px-5">
      <button
        type="button"
        aria-label="뒤로가기"
        onClick={() => router.back()}
        className="absolute left-5 text-white"
      >
        <LeftArrowIcon />
      </button>

      <h2
        className={`${brBold.className} w-full text-center text-[20px] text-white`}
      >
        알림
      </h2>
    </header>
  );
};

export default NotificationHeader;
