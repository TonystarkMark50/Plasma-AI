import React from 'react';
import { ChevronUpSolid } from '../../assets/svgs';

export default function ScrollToTop({ visible }) {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-forsythia text-oceanic-noir flex items-center justify-center shadow-lg transition-all duration-200 ease-out hover:scale-110 hover:shadow-xl ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ChevronUpSolid className="w-5 h-5" />
    </button>
  );
}
