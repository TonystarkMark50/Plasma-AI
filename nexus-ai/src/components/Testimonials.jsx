import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from '../assets/svgs';

const testimonials = [
  {
    quote: 'Nexus AI transformed our data pipeline from a nightmare into a competitive advantage. We reduced time-to-insight by 87%.',
    name: 'Sarah Chen',
    role: 'VP of Engineering',
    company: 'Vercel',
    stars: 5,
  },
  {
    quote: 'The intelligent automation and self-healing pipelines saved us thousands in engineering hours. It is infrastructure magic.',
    name: 'Marcus Rivera',
    role: 'CTO',
    company: 'Linear',
    stars: 5,
  },
  {
    quote: 'We evaluated every solution on the market. Nexus AI won on reliability, performance, and sheer developer experience.',
    name: 'Priya Patel',
    role: 'Head of Data',
    company: 'Stripe',
    stars: 5,
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = useCallback(() => setActive((v) => (v === 0 ? testimonials.length - 1 : v - 1)), []);
  const next = useCallback(() => setActive((v) => (v === testimonials.length - 1 ? 0 : v + 1)), []);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="py-16 sm:py-24 bg-mystic-mint"
    >
      <div className="container">
        <div className="text-center mb-12">
          <h2
            id="testimonials-heading"
            className="font-display font-bold text-oceanic-noir"
            style={{ fontSize: 'var(--text-4xl)' }}
          >
            Trusted by 10,000+ engineering teams.
          </h2>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <div className="overflow-hidden rounded-2xl bg-white border border-oceanic-noir/06 shadow-md">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <blockquote
                  key={i}
                  className="min-w-0 w-full flex-shrink-0 p-8 sm:p-10 text-center"
                >
                  <div className="flex justify-center gap-0.5 mb-6" aria-label={`${t.stars} stars`}>
                    {Array.from({ length: t.stars }).map((_, si) => (
                      <span key={si} className="text-forsythia text-xl" aria-hidden="true">★</span>
                    ))}
                  </div>
                  <p className="text-oceanic-noir/80 leading-relaxed mb-8" style={{ fontSize: 'var(--text-lg)' }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer>
                    <p className="font-display text-base font-bold text-oceanic-noir">{t.name}</p>
                    <p className="text-sm text-oceanic-noir/50 mt-1">{t.role}, {t.company}</p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full bg-oceanic-noir/10 hover:bg-oceanic-noir/20 flex items-center justify-center transition-all duration-150 ease-out hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5 text-oceanic-noir" />
            </button>

            <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => setActive(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-150 ease-out ${
                    active === i ? 'bg-forsythia w-6' : 'bg-oceanic-noir/20 hover:bg-oceanic-noir/30 w-2'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full bg-oceanic-noir/10 hover:bg-oceanic-noir/20 flex items-center justify-center transition-all duration-150 ease-out hover:scale-105"
            >
              <ChevronRight className="w-5 h-5 text-oceanic-noir" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
