'use client';

import { useEffect, useState } from 'react';

export default function LeftScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 bottom-0 w-2 z-[9999]"
      style={{ background: '#f1f1f1' }}
    >
      <div
        className="w-full"
        style={{
          height: `${scrollProgress}%`,
          background: '#ea580c',
          borderRadius: '0 0 4px 4px',
          transition: 'height 0.05s linear',
        }}
      />
    </div>
  );
}
