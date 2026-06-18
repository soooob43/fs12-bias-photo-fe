import MobileBackHeader from '@/components/layout/MobileBackHeader';
import Header from '@/components/layout/Header';
import MySalesCardList from './(components)/MySalesCardList';
import MySaleHeader from './(components)/MySaleHeader';

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
