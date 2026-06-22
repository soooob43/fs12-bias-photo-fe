import React from 'react';
import CreateCardForm from './(components)/CreateCardForm';
import CreateCardHeader from './(components)/CreateCardHeader';

const CreatePhotoCardPage = () => {
  return (
    <div className="w-full max-w-[1480px] mx-auto px-[15px]">
      <CreateCardHeader />
      <main className="flex justify-center w-full pt-5 pb-10 md:my-20">
        <CreateCardForm />
      </main>
    </div>
  );
};

export default CreatePhotoCardPage;
