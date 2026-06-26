import React, { useState, useCallback } from 'react';
import { useScrollY } from '../hooks/useScrollY';
import { Cube16Solid, Search, XMark } from '../assets/svgs';

export default function Navbar() {
  const scrolled = useScrollY();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleMobile = useCallback(() => setMobileOpen((v) => !v), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-150 ease-out ${
        scrolled
          ? 'bg-oceanic-noir/80 backdrop-blur-xl border-b border-forsythia/10'
          : 'bg-transparent'
      }`}
    >
      <nav aria-label="Main navigation" className="container flex items-center justify-between h-16 sm:h-20">
        <a href="#" className="flex items-center gap-2" aria-label="Plasma AI home">
          <Cube16Solid className="w-7 h-7 text-forsythia" />
          <span className="font-display text-lg font-bold tracking-tight">
            <span className="text-forsythia">PLASMA</span>
            <span className="text-arctic-powder"> AI</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="nav-link">Features</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#workflow" className="nav-link">Integrations</a>
          <a href="#" className="nav-link">Docs</a>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            <div
              className={`overflow-hidden transition-all duration-200 ease-out ${
                searchOpen ? 'w-48 opacity-100' : 'w-0 opacity-0'
              }`}
            >
              <input
                type="search"
                placeholder="Search..."
                aria-label="Search Plasma AI"
                className="w-full bg-transparent border border-forsythia/20 rounded-lg px-3 py-1.5 text-sm text-arctic-powder placeholder-mystic-mint/50 focus:outline-none focus:border-forsythia"
              />
            </div>
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label={searchOpen ? 'Close search' : 'Open search'}
              className="text-mystic-mint hover:text-forsythia transition-colors duration-150"
            >
              {searchOpen ? <XMark className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>
          </div>

          <a href="#cta-banner" className="hidden sm:inline-flex btn-primary">
            Get Started
          </a>

          <button
            type="button"
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
            onClick={toggleMobile}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span
              className="absolute block w-5 h-0.5 bg-arctic-powder transition-all duration-300 ease-out rounded-full"
              style={{ transform: mobileOpen ? 'rotate(45deg)' : 'translateY(-4px)' }}
            />
            <span
              className="absolute block w-5 h-0.5 bg-arctic-powder transition-all duration-300 ease-out rounded-full"
              style={{ transform: mobileOpen ? 'rotate(-45deg)' : 'translateY(4px)' }}
            />
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container glass-panel my-2 flex flex-col gap-1 p-4">
          <a href="#features" className="nav-link px-3 py-2" onClick={closeMobile}>Features</a>
          <a href="#pricing" className="nav-link px-3 py-2" onClick={closeMobile}>Pricing</a>
          <a href="#workflow" className="nav-link px-3 py-2" onClick={closeMobile}>Integrations</a>
          <a href="#" className="nav-link px-3 py-2" onClick={closeMobile}>Docs</a>
          <div className="flex items-center gap-2 mt-1">
            <XMark className="w-4 h-4 text-mystic-mint/50" />
            <button
              type="button"
              onClick={closeMobile}
              className="text-sm text-mystic-mint/50 font-display"
            >
              Close menu
            </button>
          </div>
          <a href="#cta-banner" className="btn-primary mt-2" onClick={closeMobile}>
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}
