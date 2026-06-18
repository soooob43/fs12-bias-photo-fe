import MobileBackHeader from '@/components/layout/MobileBackHeader';
import Header from '@/components/layout/Header';
import MySalesCardList from './(components)/MySalesCardList';
import MySaleHeader from './(components)/MySaleHeader';

export const metadata = {
  title: '나의 판매 포토카드',
  description:
    '마켓플레이스에 등록한 내 포토카드의 판매 및 교환 내역을 확인하세요.',
  robots: {
    index: false,
    follow: false,
  },
};

const MySalesPage = () => {
  return (
    <>
      <MobileBackHeader title="나의 판매 포토카드" />
      <Header />
      <main className="w-full max-w-[92.5rem] mx-auto px-[0.9375rem] pb-[5.625rem] md:pb-0">
        <MySaleHeader />
        <MySalesCardList />
      </main>
    </>
  );
};

export default MySalesPage;
