'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import icDropdownDown from '@/assets/icons/ic_dropdown_down.svg';
import icDropdownUP from '@/assets/icons/ic_dropdown_up.svg';

const Dropdown = ({
  type = 'default', // "default", "sort"
  options,
  value,
  onChange,
  widthClass,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative inline-block"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center ${type === 'sort' ? 'justify-between pl-[15px] pr-[6px] h-[35px] border border-(--gray-gray200) w-[130px] md:w-[140px] md:h-[45px] lg:w-[180px] lg:h-[50px] lg:pl-[20px] lg:pr-[11px]' : 'gap-[10px]'} rounded-[2px] cursor-pointer ${widthClass}`}
      >
        <p
          className={`${type === 'default' ? 'font-bold' : ''} text-[12px] font-normal text-(--white-white) md:text-[14px] lg:text-[16px]`}
        >
          {value}
        </p>
        <Image
          src={isOpen ? icDropdownUP : icDropdownDown}
          alt="드롭다운 다운 아이콘"
          width={24}
          height={24}
        />
      </button>
      {isOpen && (
        <div
          className={`absolute ${
            type === 'default' ? 'mt-[15px]' : 'mt-[4px]'
          } top-full left-0 border border-(--gray-gray200) rounded-[2px] z-10 min-w-full`}
        >
          {options.map((option, index) => {
            const isFirst = index === 0;
            const isLast = index === options.length - 1;

            return (
              <button
                type="button"
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`${
                  isFirst ? 'pt-[10px] pb-[5px] lg:pt-[15px] lg:pb-[7.5px]' : ''
                } ${
                  isLast ? 'pt-[5px] pb-[10px] lg:pt-[7px] lg:pb-[15px]' : ''
                } w-full whitespace-nowrap px-[15px] py-[5px] text-[12px] text-normal text-start bg-(--black-black) hover:text-(--gray-gray200) cursor-pointer md:text-[14px] lg:text-[16px] lg:px-[20px] lg:py-[7.5px]`}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
