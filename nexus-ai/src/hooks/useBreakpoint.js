import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

export function useBreakpoint() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  );

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setIsMobile(entry.contentRect.width < MOBILE_BREAKPOINT);
      }
    });
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  return isMobile;
}
