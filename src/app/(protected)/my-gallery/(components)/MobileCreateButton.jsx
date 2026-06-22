import Link from 'next/link';
import React from 'react';

const MobileCreateButton = ({
  remainingCount,
  totalLimit,
  isPending,
  setIsToastOpen,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 py-[0.9375rem] px-[0.9375rem] mx-auto w-full max-w-[92.5rem] md:hidden z-50">
      <Link
        href="/my-gallery/create"
        onClick={(e) => {
          if (remainingCount === 0) {
            e.preventDefault();
            setIsToastOpen(true);
          }
        }}
        className={`flex justify-center items-center max-h-[3.75rem] py-[1.0625rem] font-semibold text-[1rem] rounded-[0.125rem]
          ${
            remainingCount === 0
              ? 'bg-(--gray-gray300) text-(--gray-gray400)'
              : 'bg-(--main-main) text-(--black-black) hover:bg-[#b8c41a]'
          }`}
      >
        <p>포토카드 생성하기 </p>
        <span>{isPending ? `(-/3)` : `(${remainingCount}/${totalLimit})`}</span>
      </Link>
    </div>
  );
};

export default MobileCreateButton;
