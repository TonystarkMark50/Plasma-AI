import React from 'react';

const companies = [
  'Vercel', 'Stripe', 'Netflix', 'Figma', 'Linear', 'Notion',
  'Vercel', 'Stripe', 'Netflix', 'Figma', 'Linear', 'Notion',
];

export default function TrustedBy() {
  return (
    <section id="trusted-by" aria-label="Trusted companies" className="bg-nocturnal-expedition py-10 overflow-hidden">
      <p className="text-center text-mystic-mint/70 mb-6 font-body" style={{ fontSize: 'var(--text-sm)' }}>
        Trusted by engineering teams at
      </p>
      <div className="relative overflow-hidden">
        <div
          className="flex gap-16"
          style={{
            animation: 'marquee-scroll 30s linear infinite',
            width: 'fit-content',
          }}
          aria-hidden="true"
        >
          {companies.map((name, i) => (
            <span
              key={i}
              className="font-display text-lg text-arctic-powder/40 whitespace-nowrap font-medium"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
