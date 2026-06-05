import React from 'react';
import { brBold, brRegular } from '@/fonts/index';

export default function BuyerDetail() {
  return (
    <div className="w-[92.5rem] h-[95rem] flex flex-col justify-between">
      <div className="text-[#A4A4A4] font-['brBold'] text-[1.5rem] mb-[3.75rem]">
        마켓플레이스
      </div>
      <div className="text-[#FFF] font-['Noto_Sans_KR'] text-[2.5rem] font-bold pb-[1.25rem] mb-[4.37rem] border-b-[2px] border-[#EEE]">
        카드 제목
      </div>
      <div className="flex justify-between items-start">
        <img
          src="https://ldsagency.co.kr/files/attach/images/50352/170/056/51ed4382d891f3af676e73b4ea030571.png"
          alt="포토카드 이미지"
          className="w-[60rem] h-[45rem] object-cover"
        />
        <div className="flex flex-col w-[27.5rem] h-[45rem] gap-[5rem]">
          <div className="flex flex-col gap-[1.875rem]">
            <div className="flex justify-between w-full">
              <p className="flex items-start gap-[0.9rem]">
                <span className="text-[#FF2A6A] font-['Noto_Sans_KR'] text-[1.5rem] font-bold">
                  카드등급
                </span>
                |
                <span className="text-[#A4A4A4] font-['Noto_Sans_KR'] text-[1.5rem] font-bold">
                  카테고리
                </span>
              </p>
              <span className="text-[#FFF] font-['Noto_Sans_KR'] text-[1.125rem] font-bold underline">
                소유자
              </span>
            </div>
            <div className="w-full border-t border-[1px] border-[#5A5A5A]" />
            <p className="text-[#FFF] font-['Noto_Sans_KR'] text-[1.25rem]">
              카드에 대한 설명설명설명
            </p>
            <div className="w-full border-t border-[1px] border-[#5A5A5A]" />
            <p className="flex justify-between w-full">
              <span className="text-[#A4A4A4] font-['Noto_Sans_KR'] text-[1.25rem]">
                가격
              </span>
              <span className="text-[#FFF] text-right font-['Noto_Sans_KR'] text-[1.5rem] font-bold">
                N P
              </span>
            </p>
            <p className="flex justify-between w-full">
              <span className="text-[#A4A4A4] font-['Noto_Sans_KR'] text-[1.25rem]">
                잔여
              </span>
              <span>
                <span className="text-[#FFF] text-right font-['Noto_Sans_KR'] text-[1.5rem] font-bold">
                  남은카드
                </span>
                <span className="text-[#A4A4A4] font-['Noto_Sans_KR'] text-[1.5rem]">
                  /5
                </span>
              </span>
            </p>

            <div className="w-full border-t border-[1px] border-[#5A5A5A]" />
            <p className="flex justify-between w-fulls">
              <span className="text-[#FFF] font-['Noto_Sans_KR'] text-[1.25rem]">
                구매수량
              </span>
              <span className="w-[11rem] h-[3.125rem] flex justify-between rounded-[0.125rem] p-[0.6rem] border border-[#FFF] text-[#FFF] font-['Noto_Sans_KR'] text-[1.25rem]">
                <button>-</button>N<button>+</button>
              </span>
            </p>
            <p className="flex justify-between w-full">
              <span className="text-[#FFF] font-['Noto_Sans_KR'] text-[1.25rem]">
                총 가격
              </span>
              <span>
                <span className="text-[#FFF] text-right font-['Noto_Sans_KR'] text-[1.5rem] font-bold">
                  N P
                </span>
                <span className="text-[#A4A4A4] font-['Noto_Sans_KR'] text-[1.5rem]">
                  (N장)
                </span>
              </span>
            </p>
          </div>

          <button className="flex w-[27.5rem] h-[5rem] px-[9rem] py-[1.5625rem] justify-center items-center shrink-0 rounded-[0.125rem] bg-[#EFFF04]">
            <p className="text-[#0F0F0F] font-['Noto_Sans_KR'] text-[1.125rem] font-bold">
              포토카드 구매하기
            </p>
          </button>
        </div>
      </div>
      <div>
        <div className="flex justify-between pb-[1.25rem] border-b-[2px] border-[#EEE]">
          <span className="inline-flex items-end text-[#FFF] font-['Noto_Sans_KR'] text-[2.5rem] font-bold">
            교환 희망 정보
          </span>
          <button className="flex w-[27.5rem] h-[5rem] px-[9rem] py-[1.5625rem] justify-center items-center shrink-0 rounded-[0.125rem] bg-[#EFFF04]">
            <p className="text-[#0F0F0F] font-['Noto_Sans_KR'] text-[1.125rem] font-bold">
              포토카드 교환하기
            </p>
          </button>
        </div>
        <div className="py-[3.75rem]">
          <p className="mb-[1.25rem] text-[#FFF] font-['Noto_Sans_KR'] text-[1.5rem] font-bold">
            교환희망정보설명설명설명설명
          </p>
          <p className="flex gap-[0.62rem] text-[#A4A4A4]">
            <span className="text-[#29C9F9] font-['Noto_Sans_KR'] text-[1.5rem] font-bold">
              희망등급
            </span>
            |
            <span className="text-[#A4A4A4] font-['Noto_Sans_KR'] text-[1.5rem] font-bold">
              희망카테고리
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
