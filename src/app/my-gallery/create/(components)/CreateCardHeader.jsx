import MobileGNB from '@/components/ui/GNB/MobileGNB';
import React from 'react';
import { brBold } from '@/fonts';

const CreateCardHeader = () => {
  return (
    <>
      <header className="hidden md:flex justify-start pb-[20px] border-b-1 ">
        <h1 className={`${brBold.className} text-[48px] lg:text-[62px]`}>
          포토카드 생성
        </h1>
      </header>
      <MobileGNB title="포토카드 생성" />
    </>
  );
};

export default CreateCardHeader;
