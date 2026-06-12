import Link from 'next/link';
import MyGalleryHeader from './(components)/MyGalleryHeader';
import MyGalleryCardList from './(components)/MyGalleryCardList';

export default function MyGalleryPage() {
  return (
    <div className="w-full max-w-[92.5rem] mx-auto px-[0.9375rem] pb-[5.625rem] md:pb-0">
      <MyGalleryHeader />
      <MyGalleryCardList />
      <div className="fixed bottom-0 left-0 right-0 py-[0.9375rem] px-[0.9375rem] mx-auto w-full max-w-[92.5rem] md:hidden z-50">
        <Link
          href="/my-gallery/create"
          className="flex justify-center items-center max-h-[3.75rem] py-[1.0625rem] bg-(--main-main) text-(--black-black) font-semibold text-[1rem] rounded-[0.125rem] cursor-pointer hover:bg-[#b8c41a]"
        >
          포토카드 생성하기
        </Link>
      </div>
    </div>
  );
}
