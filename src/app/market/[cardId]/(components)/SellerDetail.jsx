import React from 'react';
import { brBold, brRegular } from '@/fonts/index';
import renew from '../../img/renew.svg';

export default function SellerDetail() {
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
        <div className="flex flex-col w-[27.5rem] gap-[5rem]">
          <div className="flex flex-col gap-[1.875rem]">
            <div className="flex justify-between w-full">
              <div className="flex items-start gap-[0.9rem]">
                <span className="text-[#FF2A6A] font-['Noto_Sans_KR'] text-[1.5rem] font-bold">
                  카드등급
                </span>
                |
                <span className="text-[#A4A4A4] font-['Noto_Sans_KR'] text-[1.5rem] font-bold">
                  카테고리
                </span>
              </div>
              <span className="text-[#FFF] font-['Noto_Sans_KR'] text-[1.125rem] font-bold underline">
                소유자
              </span>
            </div>
            <div className="w-full border-t border-[1px] border-[#5A5A5A]" />
            <p className="text-[#FFF] font-['Noto_Sans_KR'] text-[1.25rem]">
              카드에 대한 설명설명설명
            </p>

            <div className="w-full border-t border-[1px] border-[#5A5A5A]" />

            <div className="flex justify-between w-full">
              <span className="text-[#A4A4A4] font-['Noto_Sans_KR'] text-[1.25rem]">
                가격
              </span>
              <span className="text-[#FFF] text-right font-['Noto_Sans_KR'] text-[1.5rem] font-bold">
                N P
              </span>
            </div>
            <div className="flex justify-between w-full">
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
            </div>

            <div className="w-full border-t border-[1px] border-[#5A5A5A]" />

            <div>
              <div className="flex gap-[0.62rem] border-b-[2px] border-[#EEE] mt-[3.75rem] mb-[2.5rem] pb-[0.62rem]">
                <img
                  src={renew}
                  alt="renew icon"
                  className="w-[1.5rem] h-[1.5rem]"
                />
                <span className="text-[#FFF] font-['Noto_Sans_KR'] text-[1.75rem] font-bold">
                  교환 희망 정보
                </span>
              </div>

              <div className="flex flex-col gap-[1.875rem]">
                <div className="flex items-start gap-[0.9rem]">
                  <span className="text-[#29C9F9] font-['Noto_Sans_KR'] text-[1.5rem] font-bold">
                    카드등급
                  </span>
                  |
                  <span className="text-[#A4A4A4] font-['Noto_Sans_KR'] text-[1.5rem] font-bold">
                    카테고리
                  </span>
                </div>
                <div className="w-full border-t border-[1px] border-[#5A5A5A]" />
                <p className="text-[#FFF] font-['Noto_Sans_KR'] text-[1.25rem]">
                  교환 희망 카드 설명설명설명
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[1.25rem]">
            <button className="flex w-[27.5rem] h-[5rem] px-[9rem] py-[1.5625rem] justify-center items-center shrink-0 rounded-[0.125rem] bg-[#EFFF04]">
              <p className="text-[#0F0F0F] font-['Noto_Sans_KR'] text-[1.125rem] font-bold">
                수정하기
              </p>
            </button>

            <button className="flex w-[27.5rem] h-[5rem] px-[9rem] py-[1.5625rem] justify-center items-center shrink-0 rounded-[0.125rem] border border-[#EEE]">
              <p className="text-[#FFF] font-['Noto_Sans_KR'] text-[1.125rem] font-bold">
                판매 내리기
              </p>
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between pb-[1.25rem] border-b-[2px] border-[#EEE]">
          <span className="inline-flex items-end text-[#FFF] font-['Noto_Sans_KR'] text-[2.5rem] font-bold">
            교환 제시 목록
          </span>
        </div>
        <div className="py-[3.75rem] flex gap-[5rem]">
          <div className="w-[27.5rem] h-[39.125rem] flex justify-center items-center rounded-[0.125rem] border border-[#FFF]/10 bg-[#161616] text-[2rem]">
            교환 요청 카드1
          </div>
          <div className="w-[27.5rem] h-[39.125rem] flex justify-center items-center rounded-[0.125rem] border border-[#FFF]/10 bg-[#161616] text-[2rem]">
            교환 요청 카드2
          </div>
          <div className="w-[27.5rem] h-[39.125rem] flex justify-center items-center rounded-[0.125rem] border border-[#FFF]/10 bg-[#161616] text-[2rem]">
            교환 요청 카드3
          </div>
        </div>
      </div>
    </div>
  );
}
