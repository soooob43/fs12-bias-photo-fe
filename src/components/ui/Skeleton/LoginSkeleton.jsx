'use client';

import React from 'react';
import styles from '@/app/(auth)/login/(components)/LoginForm.module.css';

const LoginSkeleton = () => {
  return (
    <>
      <div className={styles.form}>
        {/* 이메일 입력 영역 스켈레톤 */}
        <div className={styles.field}>
          <div className="w-[45px] h-[20px] mb-2 rounded-[4px] bg-(--gray-gray200) animate-pulse" />
          <div className="w-full h-[50px] rounded-[8px] bg-(--gray-gray200) animate-pulse" />
        </div>
        {/* 비밀번호 입력 영역 스켈레톤 */}
        <div className={styles.field}>
          <div className="w-[60px] h-[20px] mb-2 rounded-[4px] bg-(--gray-gray200) animate-pulse" />
          <div className="w-full h-[50px] rounded-[8px] bg-(--gray-gray200) animate-pulse" />
        </div>
        {/* 버튼 영역 스켈레톤 (로그인, 구글로그인) */}
        <div className={styles.buttonBox}>
          <div className="w-full h-[52px] mb-3 rounded-[8px] bg-(--gray-gray200) animate-pulse" />
          <div className="w-full h-[52px] rounded-[8px] bg-(--gray-gray200) animate-pulse" />
        </div>
      </div>
      {/* 하단 회원가입 링크 텍스트 스켈레톤 */}
      <div className="flex justify-center mt-6">
        <div className="w-[220px] h-[20px] rounded-[4px] bg-(--gray-gray200) animate-pulse" />
      </div>
    </>
  );
};

export default LoginSkeleton;
