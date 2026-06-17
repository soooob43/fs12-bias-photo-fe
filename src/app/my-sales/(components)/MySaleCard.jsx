import Image from 'next/image';
import React from 'react';
import imgTest from '@/assets/images/img_photo_card_test.svg';
import imgLogo from '@/assets/images/img_logo.svg';
import icSoldOut from '@/assets/icons/ic_sold_out.svg';
import {
  GRADE_COLORS,
  GRADE_MAP,
  GENRE_MAP,
  STATUS_MAP,
  STATUS_STYLE,
} from '@/constants/mySaleCard';

const MySaleCard = ({
  type = 'default',
  title,
  imageUrl,
  grade = 'COMMON',
  genre,
  nickname,
  price = 0,
  remainingQuantity = 0,
  quantity = 0,
  status,
  isSoldOut = false,
}) => {
  return (
    <main
      className={`flex flex-col gap-[10px] p-[10px] w-full bg-(--gray-gray500) border border-(--gray-gray400) rounded-[2px] md:p-[20px] md:gap-[26px] lg:p-[40px] lg:max-w-[440px] lg:gap-[32px] ${
        isSoldOut ? 'cursor-not-allowed' : ''
      }`}
    >
      <div className="relative w-full aspect-[150/112] overflow-hidden lg:max-w-[360px] lg:max-h-[270px]">
        <Image
          src={imageUrl || imgTest}
          alt="Default Image"
          fill
          priority
          className={`object-cover ${isSoldOut ? 'opacity-15' : ''}`}
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
        />

        {status && !isSoldOut && (
          <div className="absolute top-[10px] left-[10px] bg-(--gray-gray500) px-[8px] py-[4px] text-[10px] md:text-[12px]">
            <span className={STATUS_STYLE[status]}>{STATUS_MAP[status]}</span>
          </div>
        )}

        {isSoldOut ? (
          <Image
            src={icSoldOut}
            alt="SoldOut Image"
            fill
            className="absolute top-1/2 left-1/2"
          />
        ) : null}
      </div>

      <div className="flex flex-col gap-[5px] text-[10px] text-(--gray-gray300) md:text-[16px] md:gap-[10px] lg:text-[18px]">
        <h1 className="truncate text-[14px] font-bold text-(--white-white) md:text-[22px]">
          {title}
        </h1>

        <section className="flex justify-between items-center pb-[10px] border-b-1 border-(--gray-gray400) md:pb-[20px]">
          <div className="flex">
            <p
              className={`pr-[5px] border-r-1 border-(--gray-gray400) ${
                GRADE_COLORS[grade] || 'text-(--white-white)'
              } md:pr-[10px]`}
            >
              {GRADE_MAP[grade] || grade}
            </p>

            <p className="pl-[5px] md:pl-[10px]">{GENRE_MAP[genre] || genre}</p>
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
          {type === 'my' ? (
            <>
              <p>수량</p>
              <p>{quantity}</p>
            </>
          ) : (
            <>
              <p>잔여</p>

              <p>
                <span className="text-(--white-white)">
                  {remainingQuantity}
                </span>
              </p>
            </>
          )}
        </section>
      </div>

      <div className="hidden relative w-full max-w-[100px] mx-auto md:inline-block mt-[20px] lg:mt-[30px]">
        <Image
          src={imgLogo}
          alt="최애의 포토 로고"
          width={100}
          height={18}
          className="w-auto h-auto"
        />
      </div>
    </main>
  );
};

export default MySaleCard;
