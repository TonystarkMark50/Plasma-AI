import { useState, useEffect } from 'react';

export function useScrollY() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 10);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrolled;
}
