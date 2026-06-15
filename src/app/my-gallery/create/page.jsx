import React from 'react';
import CreateCardForm from './(components)/CreateCardForm';
import { brBold } from '@/fonts';

const CreatePhotoCardPage = () => {
  return (
    <div className="w-full max-w-[1480px] mx-auto px-[15px]">
      <header className="hidden md:flex justify-start pb-[20px] border-b-1 ">
        <h1 className={`${brBold.className} text-[48px] lg:text-[62px]`}>
          포토 카드 생성
        </h1>
      </header>
      <main className="flex justify-center w-full mb-10 md:my-20">
        <CreateCardForm />
      </main>
    </div>
  );
};

export default CreatePhotoCardPage;
