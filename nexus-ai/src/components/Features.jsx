import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { FEATURES } from '../data/featuresData';
import { ChevronDown } from '../assets/svgs';

export default function Features() {
  const activeIndexRef = useRef(null);
  const [accordionOpen, setAccordionOpen] = useState(null);
  const isMobile = useBreakpoint();
  const prevIsMobileRef = useRef(isMobile);

  useEffect(() => {
    const crossedToMobile = !prevIsMobileRef.current && isMobile;
    if (crossedToMobile && activeIndexRef.current !== null) {
      setAccordionOpen(activeIndexRef.current);
    }
    prevIsMobileRef.current = isMobile;
  }, [isMobile]);

  const handleBentoEnter = useCallback((id) => {
    activeIndexRef.current = id;
  }, []);

  const handleBentoLeave = useCallback(() => {
    /* intentionally empty — do NOT clear activeIndexRef so context lock works */
  }, []);

  const toggleAccordion = useCallback((id) => {
    setAccordionOpen((prev) => (prev === id ? null : id));
  }, []);

  if (isMobile) {
    return (
      <section id="features" aria-labelledby="features-heading" className="py-16 sm:py-24 bg-arctic-powder">
        <div className="container">
          <div className="text-center mb-12">
            <p className="section-label mb-4">CAPABILITIES</p>
            <h2 id="features-heading" className="font-display text-[var(--text-4xl)] font-bold text-oceanic-noir">
              Everything your data pipeline needs.
            </h2>
          </div>
          <div className="accordion max-w-3xl mx-auto space-y-3">
            {FEATURES.map((f) => {
              const Icon = f.Icon;
              const isOpen = accordionOpen === f.id;
              return (
                <article key={f.id} className="bg-white rounded-xl border border-oceanic-noir/10 overflow-hidden shadow-sm">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between p-5 text-left"
                    onClick={() => toggleAccordion(f.id)}
                    aria-expanded={isOpen}
                    aria-controls={`accordion-panel-${f.id}`}
                    id={`accordion-btn-${f.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-lg bg-deep-saffron/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-deep-saffron" />
                      </span>
                      <h3 className="font-display text-base font-bold text-oceanic-noir">{f.title}</h3>
                    </div>
                    <ChevronDown
                      className={`accordion-chevron w-5 h-5 text-oceanic-noir/40 flex-shrink-0 ${isOpen ? 'open' : ''}`}
                    />
                  </button>
                  <div
                    id={`accordion-panel-${f.id}`}
                    role="region"
                    aria-labelledby={`accordion-btn-${f.id}`}
                    className={`accordion-panel ${isOpen ? 'accordion-panel--open' : ''}`}
                  >
                    <p className="px-5 pb-5 text-sm text-oceanic-noir/70 leading-relaxed">{f.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="features" aria-labelledby="features-heading" className="py-16 sm:py-24 bg-arctic-powder">
      <div className="container">
        <div className="text-center mb-12">
          <p className="section-label mb-4">CAPABILITIES</p>
          <h2 id="features-heading" className="font-display text-[var(--text-4xl)] font-bold text-oceanic-noir">
            Everything your data pipeline needs.
          </h2>
        </div>
        <div
          role="list"
          className="grid gap-6"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateAreas: `
              "pipelines  analytics    intelligence"
              "pipelines  config       modeling"
              "integrations config     modeling"
            `,
          }}
        >
          {FEATURES.map((f) => {
            const Icon = f.Icon;
            return (
              <article
                key={f.id}
                role="listitem"
                className="bento-card card-elevated p-8 cursor-default"
                style={{ gridArea: f.gridArea }}
                onMouseEnter={() => handleBentoEnter(f.id)}
                onMouseLeave={handleBentoLeave}
                onFocus={() => handleBentoEnter(f.id)}
                tabIndex={0}
              >
                <div className="w-10 h-10 rounded-lg bg-deep-saffron/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-deep-saffron" />
                </div>
                <h3 className="font-display text-base font-bold text-oceanic-noir mb-2">{f.title}</h3>
                <p className="text-sm text-oceanic-noir/60 leading-relaxed">{f.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
