'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

// 화면 스타일
const alignStyles = {
  center: 'items-center justify-center',
  end: 'items-end',
};

export const Overlay = ({ onClose, align = 'center', children }) => {
  // ESC 키 입력으로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // 뒷배경 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return createPortal(
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
