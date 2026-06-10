'use client';

import { fetchMyGallery } from '@/api/galleryApi';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MyGalleryPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getGallery = async () => {
      const result = await fetchMyGallery();
      console.log(result);
      setItems(result.data || []);
    };

    getGallery();
  }, []);

  return (
    <div className="mt-[20px] grid grid-cols-2 gap-[10px] md:mt-[40px] md:gap-[20px] lg:mt-[60px] lg:grid-cols-3 lg:gap-5">
      {items.map((item) => (
        <Link key={item.id} href="">
          <Card
            title={item.card?.title}
            imageUrl={item.card?.imageUrl}
            grade={item.card?.grade}
            genre={item.card?.genre}
            nickname={item.seller?.nickname}
            price={item.price}
            remainingQuantity={item.remainingQuantity}
            totalQuantity={item.totalQuantity}
            isSoldOut={item.remainingQuantity === 0}
          />
        </Link>
      ))}
    </div>
  );
}
