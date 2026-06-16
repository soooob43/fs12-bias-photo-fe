'use client';

import React from 'react';
import styles from '@/app/(auth)/signup/(components)/SignupForm.module.css'; // 회원가입 페이지에서 사용하는 CSS 모듈 경로로 맞춰주세요.

const SignupSkeleton = () => {
  return (
    <>
      <div className={styles.form}>
        {/* 이메일 입력 영역 스켈레톤 */}
        <div className={styles.field}>
          <div className="w-[45px] h-[20px] mb-2 rounded-[4px] bg-(--gray-gray200) animate-pulse" />
          <div className="w-full h-[50px] rounded-[8px] bg-(--gray-gray200) animate-pulse" />
        </div>
        {/* 닉네임 입력 영역 스켈레톤 */}
        <div className={styles.field}>
          <div className="w-[45px] h-[20px] mb-2 rounded-[4px] bg-(--gray-gray200) animate-pulse" />
          <div className="w-full h-[50px] rounded-[8px] bg-(--gray-gray200) animate-pulse" />
        </div>
        {/* 비밀번호 입력 영역 스켈레톤 */}
        <div className={styles.field}>
          <div className="w-[60px] h-[20px] mb-2 rounded-[4px] bg-(--gray-gray200) animate-pulse" />
          <div className="w-full h-[50px] rounded-[8px] bg-(--gray-gray200) animate-pulse" />
        </div>
        {/* 비밀번호 확인 입력 영역 스켈레톤 */}
        <div className={styles.field}>
          <div className="w-[90px] h-[20px] mb-2 rounded-[4px] bg-(--gray-gray200) animate-pulse" />
          <div className="w-full h-[50px] rounded-[8px] bg-(--gray-gray200) animate-pulse" />
        </div>
        {/* 버튼 영역 스켈레톤 (가입하기, 구글로그인) */}
        <div className={styles.buttonBox}>
          <div className="w-full h-[52px] mb-3 rounded-[8px] bg-(--gray-gray200) animate-pulse" />
          <div className="w-full h-[52px] rounded-[8px] bg-(--gray-gray200) animate-pulse" />
        </div>
      </div>
      {/* 6. 하단 로그인 링크 텍스트 스켈레톤 */}
      <div className="flex justify-center mt-6">
        <div className="w-[240px] h-[20px] rounded-[4px] bg-(--gray-gray200) animate-pulse" />
      </div>
    </>
  );
};

export default SignupSkeleton;
