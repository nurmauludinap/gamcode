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
      { id: 1, title: '#LKPD 1 - Percabangan IF', imageSrc: '/algoritma.svg' },
      { id: 2, title: '#LKPD 2 - Percabangan IF-ELSE dan IF-ELSE IF', imageSrc: '/algoritma.svg' },
      { id: 3, title: '#LKPD 3 - Percabangan Switch Case dan Nested IF', imageSrc: '/algoritma.svg' },
      // Add more items here
    ];
    setItems(fetchedItems);
  }, []);

  // Navigation handler
  const handleCardClick = (id: number) => {
    router.push(`/lkpd/${id}`);
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
