import React from 'react';

const CloseIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className} // ⭐️ 외부에서 전달받은 Tailwind 클래스 적용
    >
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor" // ⭐️ stroke나 fill을 currentColor로 변경
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CloseIcon;
