'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import icDropdownDown from '@/assets/icons/ic_dropdown_down.svg';
import icDropdownUP from '@/assets/icons/ic_dropdown_up.svg';

const LabelDropdown = ({
  labelName,
  name,
  options,
  value,
  onChange,
  widthClass,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <label className="flex flex-col gap-[0.625rem]">
      <h2 className="text-[1rem] text-(--white-white) font-semibold md:text-[1.25rem]">
        {labelName}
      </h2>
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
          className={`flex items-center justify-between py-[1.125rem] pl-[20px] pr-[12px] w-full border border-(--gray-gray200) rounded-[2px] cursor-pointer ${widthClass}`}
        >
          <p
            className={`${value === '' ? 'text-(--gray-gray300)' : 'text-(--white-white)'} text-[0.875rem] font-light md:text-[1rem] md:font-normal`}
          >
            {value || `${labelName}을 선택해주세요`}
          </p>
          <Image
            src={isOpen ? icDropdownUP : icDropdownDown}
            alt="Dropdown icon"
            width={24}
            height={24}
          />
        </button>
        {isOpen && (
          <div
            className={`absolute mt-[0.25rem] top-full left-0 border border-(--gray-gray200) rounded-[0.125rem] z-10 min-w-full`}
          >
            {options.map((option, index) => {
              const isFirst = index === 0;
              const isLast = index === options.length - 1;

              return (
                <button
                  type="button"
                  key={option}
                  value={option}
                  onClick={() => {
                    console.log('option', option);
                    onChange({
                      target: {
                        name: name,
                        value: option,
                      },
                    });
                    setIsOpen(false);
                  }}
                  className={`${
                    isFirst
                      ? 'pt-[10px] pb-[5px] lg:pt-[15px] lg:pb-[7.5px]'
                      : ''
                  } ${
                    isLast ? 'pt-[5px] pb-[10px] lg:pt-[7px] lg:pb-[15px]' : ''
                  } w-full whitespace-nowrap px-[15px] py-[5px] text-[12px] text-normal text-start bg-(--black-black) hover:text-(--gray-gray200) cursor-pointer md:text-[16px] lg:px-[20px] lg:py-[7.5px]`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </label>
  );
};

export default LabelDropdown;
