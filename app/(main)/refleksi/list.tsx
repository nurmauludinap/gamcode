"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from './card';  // Make sure Card component handles onClick

const List = () => {
  const router = useRouter();

  // Sample data or fetch from an API
  const [items, setItems] = useState<{ id: number; title: string; imageSrc: string; }[]>([]);

  useEffect(() => {
    // Fetch data from an API or use static data
    // For demonstration, using static data
    const fetchedItems = [
      { id: 1, title: 'Refleksi Peserta Didik - Pertemuan 1', imageSrc: '/algoritma.svg' },
      { id: 2, title: 'Refleksi Peserta Didik - Pertemuan 2', imageSrc: '/algoritma.svg' },
      { id: 3, title: 'Refleksi Peserta Didik - Pertemuan 3', imageSrc: '/algoritma.svg' },
      // Add more items here
    ];
    setItems(fetchedItems);
  }, []);

  // Navigation handler
  const handleCardClick = (id: number) => {
    router.push(`/refleksi/${id}`);
  };

  return (
    <div>
        {items.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            imageSrc={item.imageSrc}
            title={item.title}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
    </div>
  );
};

export default List;
