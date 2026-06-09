'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const alignStyles = {
  center: 'items-center justify-center', // 모달: 화면 중앙
  end: 'items-end', // 바텀시트: 화면 하단
};

export const Overlay = ({ onClose, align = 'center', children }) => {
  // ESC 키 입력 시 닫힘
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // 모달 열려있는 동안 배경 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return createPortal(
    // 배경 클릭 시 모달/바텀시트 닫힘
    <div
      className={`fixed inset-0 z-50 flex bg-black/70 ${alignStyles[align]}`}
      onClick={onClose}
    >
      <div className="contents" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body,
  );
};
