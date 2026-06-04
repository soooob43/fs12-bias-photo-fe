import Image from 'next/image';
import React from 'react';
import imgTest from '@/assets/images/img_photo_card_test.svg';
import imgLogo from '@/assets/images/img_logo.svg';

const GRADE_COLORS = {
  COMMON: 'text-(--main-main)',
  RARE: 'text-(--blue-blue)',
  'SUPER RARE': 'text-(--purple-purple)',
  LEGENDARY: 'text-(--pink-pink)',
};

const Card = ({
  title,
  grade = 'COMMON',
  genre,
  nickname,
  price = 0,
  remainingQuantity = 0,
  totalQuantity = 0,
}) => {
  return (
    <main className="flex flex-col gap-[10px] p-[10px] w-full bg-(--gray-gray500) border border-(--gray-gray400) rounded-[2px] md:p-[20px] md:gap-[26px] lg:p-[40px] lg:max-w-[440px] lg:gap-[32px]">
      <div className="relative w-full aspect-[150/112] overflow-hidden lg:max-w-[360px] lg:max-h-[270px]">
        <Image
          src={imgTest}
          alt="디폴트 이미지"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-[5px] text-[10px] text-(--gray-gray300) md:text-[16px] md:gap-[10px] lg:text-[18px]">
        <h1 className="text-[14px] font-bold text-(--white-white) md:text-[22px]">
          {title}
        </h1>
        <section className="flex justify-between items-center pb-[10px] border-b-1 border-(--gray-gray400) md:pb-[20px]">
          <div className="flex">
            <p
              className={`pr-[5px] border-r-1 border-(--gray-gray400) ${GRADE_COLORS[grade] || 'text-(--white-white)'} md:pr-[10px]`}
            >
              {grade}
            </p>
            <p className="pl-[5px] md:pl-[10px]">{genre}</p>
          </div>
          <p className="text-(--white-white) underline underline-offset-3">
            {nickname}
          </p>
        </section>
        <section className="flex justify-between mt-[5px] md:mt-[10px]">
          <p>가격</p>
          <p className="text-(--white-white)">{price} P</p>
        </section>
        <section className="flex justify-between mb-[5px]">
          <p>잔여</p>
          <p>
            <span className="text-(--white-white)">{remainingQuantity}</span>
            {` / ${totalQuantity}`}
          </p>
        </section>
      </div>
      <div className="hidden md:flex justify-center mt-[20px] lg:mt-[30px]">
        <Image
          src={imgLogo}
          alt="최애의 포토 로고"
          width={99.2}
          height={18}
          className="object-cover"
        />
      </div>
    </main>
  );
};

export default Card;
