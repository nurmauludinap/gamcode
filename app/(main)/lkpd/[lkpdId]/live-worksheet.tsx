"use client"

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// Move the map outside of the component to avoid unnecessary re-renders
const worksheetMap: { [key: string]: [number, string, number, string, string] } = {
  '1': [7680887, 'q3kz', 11210, 'www', 'new'],
  '2': [7753744, 'vuub', 14359, 'www', 'new'],
  // Add more mappings here
};

const LiveWorksheet = () => {
  const pathname = usePathname();

  // Ensure pathname is not null and extract the 'id'
  const id = pathname ? pathname.split('/').pop() : null;

  const [worksheetId, setWorksheetId] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;

    const params = worksheetMap[id];
    if (params) {
      setWorksheetId(params[0]); // Set worksheetId to the first parameter
    }

    const script = document.createElement('script');
    script.src = 'https://www.liveworksheets.com/embed/embed.js?v=1';
    script.async = true;

    const handleScriptLoad = () => {
      const loadLiveWorksheet = (window as any).loadliveworksheet;
      if (loadLiveWorksheet) {
        if (params) {
          loadLiveWorksheet(...params);
        } else {
          console.error('No worksheet parameters found for this id');
        }
      } else {
        console.error('loadliveworksheet function is not available on the window object');
      }
    };

    script.addEventListener('load', handleScriptLoad);
    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', handleScriptLoad);
      document.body.removeChild(script);
    };
  }, [id]);

  return (
    <>
      <div id={`liveworksheet${worksheetId || id}`} style={{ width: '100%', maxWidth: '100%' }} />
    </>
  );
};

export default LiveWorksheet;
