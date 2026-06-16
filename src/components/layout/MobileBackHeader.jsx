'use client';

import { useRouter } from 'next/navigation';
import LeftArrowIcon from '../icons/LeftArrowIcon';
import { brBold } from '@/fonts';

const MobileBackHeader = ({ title }) => {
  const router = useRouter();

  return (
    <header className="relative flex h-[60px] bg-[var(--black-black)] items-center min-[744px]:hidden">
      <button
        type="button"
        aria-label="뒤로가기"
        onClick={() => router.back()}
        className="absolute left-5 text-[var(--white-white)]"
      >
        <LeftArrowIcon />
      </button>

      {title && (
        <h2
          className={`${brBold.className} w-full text-center text-[20px] text-[var(--white-white)]`}
        >
          {title}
        </h2>
      )}
    </header>
  );
};

export default MobileBackHeader;
