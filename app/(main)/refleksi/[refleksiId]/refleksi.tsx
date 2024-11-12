"use client"

import { Button } from '@/components/ui/button';
import Link from 'next/link'; // Correct import
import { useEffect, useState } from 'react';

// Move forms outside of the component
const forms = [
  "https://docs.google.com/forms/d/e/1FAIpQLSdrar5DwvbqhsXYBa9GG1mQ0Al3VLZfecLFBOJ5Iyr-CS5G6Q/viewform?embedded=true",
  "https://docs.google.com/forms/d/e/1FAIpQLSf5v7njZqkTekoxY_i3iiQ4-Yilc3RgaBhKpEBenlOv_jttrQ/viewform?embedded=true",
  "https://docs.google.com/forms/d/e/1FAIpQLSduDYUVIV5ONYzRmAls0sauOmd3aVcF66kTEKbbt14CYZJ36g/viewform?embedded=true",
];

const Refleksi = () => {
  const [formId, setFormId] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false); // Track if the component is mounted

  useEffect(() => {
    setIsMounted(true); // Set mounted to true once on client side
  }, []);

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') { // Only run this code after mount
      // Get the path from the URL
      const path = window.location.pathname;
      
      // Extract the last part of the path, which is the form ID
      const idParam = path.split('/').pop(); // Get the last part of the URL (e.g., '1')

      if (idParam) {
        const formIndex = parseInt(idParam, 10) - 1;

        if (formIndex >= 0 && formIndex < forms.length) {
          setFormId(formIndex); // Set the form ID based on the path parameter
        }
      }
    }
  }, [isMounted]);

  return (
    <>
      <div>
        {isMounted && formId !== null ? (  // Only render iframe after mounting
          <iframe
            src={forms[formId]}
            className="responsive-iframe"
            title="Refleksi Form"
          >
            Loading...
          </iframe>
        ) : (
          <p className='text-center'>Loading form...</p>
        )}
        {/* <Link href="/refleksi">
          <Button
            size="default"
            variant="secondary"
            className="h-[60px] w-[140px] border-b-8 relative"
          >
            <span>Selesai</span>
          </Button>
        </Link> */}
      </div>
    </>
  );
};

export default Refleksi;
