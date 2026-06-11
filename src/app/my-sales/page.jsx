import React from 'react'

import cards from "@/mock/cards.json";
import PhotoCard from "@/app/my-sales/(components)/photoCard";

export default function MarketPage() {

  return (
    <main className="
      min-h-screen
    ">

      <div className="
        max-w-7xl
        mx-auto
        px-6
        py-16
      ">

        <h1 className="
          text-5xl
          font-bold
        ">
          나의 판매 포토카드
        </h1>

        {/* 카드 목록 */}
        <section className="
          mt-14
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-10
        ">

          {cards.map((card) => (
            <PhotoCard
              key={card.id}
              card={card}
            />
          ))}

        </section>

      </div>

    </main>
  );
}