import React from 'react';

export default function Section({ id, label, title, children, className = '', light = false, dark = false }) {
  const bgClass = dark ? 'bg-nocturnal-expedition' : light ? 'bg-arctic-powder' : 'bg-oceanic-noir';
  const titleClass = dark || light ? 'section-title-light' : 'section-title';

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={`py-16 sm:py-24 ${bgClass} ${className}`}>
      <div className="container">
        <div className="text-center mb-12 sm:mb-16">
          {label && (
            <p className="section-label mb-4">
              {label}
            </p>
          )}
          <h2 id={`${id}-heading`} className={`${titleClass}`}>
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
