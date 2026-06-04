import Card from '@/components/ui/Card';
import React from 'react';

const MarketCardList = () => {
  return (
    <div className="mt-[20px] grid grid-cols-2 gap-[10px] md:mt-[40px] md:gap-[20px] lg:mt-[60px] lg:grid-cols-3 lg:gap-5">
      <Card
        title={'우리집 앞마당'}
        grade="COMMON"
        genre={'시즌그리팅'}
        nickname={'테스트 1'}
        price={10}
        remainingQuantity={5}
        totalQuantity={5}
      />
      <Card
        title={'우리집 앞마당'}
        grade="LEGENDARY"
        genre={'팬미팅'}
        nickname={'테스트 2'}
        price={3}
        remainingQuantity={10}
        totalQuantity={10}
      />
      <Card
        title={'아이고'}
        grade="RARE"
        genre={'콜라보'}
        nickname={'테스트 3'}
        price={2}
        remainingQuantity={5}
        totalQuantity={6}
      />
      <Card
        title={'우리집 앞마당'}
        grade="SUPER RARE"
        genre={'시즌그리팅'}
        nickname={'테스트 1'}
        price={10}
        remainingQuantity={5}
        totalQuantity={5}
      />
      <Card
        title={'좋아요'}
        grade="COMMON"
        genre={'시즌그리팅'}
        nickname={'테스트 1'}
        price={10}
        remainingQuantity={5}
        totalQuantity={5}
      />
      <Card
        title={'안녕'}
        grade="COMMON"
        genre={'시즌그리팅'}
        nickname={'테스트 1'}
        price={10}
        remainingQuantity={5}
        totalQuantity={5}
      />
    </div>
  );
};

export default MarketCardList;
