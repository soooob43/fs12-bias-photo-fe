'use client';

import CloseIcon from '@/components/icons/CloseIcon';
import React, { useRef } from 'react';

const ImageUpload = ({
  labelName,
  name,
  file,
  setFile,
  errorMsg = null,
  ...rest
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleClearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // 동일한 파일을 다시 선택할 수 있도록 input 초기화
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-[0.625rem]">
      <label>
        <h2 className="text-[1rem] text-(--white-white) font-semibold md:text-[1.25rem]">
          {labelName}
        </h2>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          name={name}
          onChange={handleFileChange}
          className="hidden"
          {...rest}
        />
      </label>
      <div className="flex justify-between gap-2">
        <div
          className={`flex-1 flex justify-between bg-(--black-black) items-center w-full max-w-[390px] font-light border px-[1.25rem] py-[1.125rem] rounded-[0.125rem] focus:outline-none ${errorMsg ? 'border-(--red-red)' : ' border-(--gray-gray200)'}`}
        >
          <span
            className={`truncate ${file ? 'text-(--white-white)' : 'text-(--gray-gray300)'} text-[0.875rem] font-light md:text-[1rem] md:font-normal`}
          >
            {file ? file.name : '사진 업로드'}
          </span>
          {/* 파일이 있을 때만 X 버튼 표시 */}
          {file && (
            <button type="button" onClick={handleClearFile}>
              <CloseIcon className={'text-(--white-white) cursor-pointer'} />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={handleFileButtonClick}
          className="max-w-[7.5rem] w-full px-[1.75rem] py-[1.125rem] text-[0.875rem] text-(--main-main) border border-(--main-main) rounded-[0.125rem] cursor-pointer md:text-[1rem]"
        >
          파일선택
        </button>
      </div>
      {errorMsg && (
        <p className="text-[0.875rem] text-(--red-red) font-light md:text-[1rem]">
          {errorMsg}
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
