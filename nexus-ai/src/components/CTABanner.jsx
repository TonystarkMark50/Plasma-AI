import React from 'react';

export default function CTABanner() {
  return (
    <section
      id="cta-banner"
      aria-label="Call to action"
      className="py-20 sm:py-28"
      style={{ background: 'linear-gradient(135deg, #FF9932, #FFC801)' }}
    >
      <div className="container text-center">
        <h2
          className="font-display font-bold text-oceanic-noir mb-4"
          style={{ fontSize: 'var(--text-4xl)' }}
        >
          Ready to automate everything?
        </h2>
        <p className="text-oceanic-noir/70 mb-10 max-w-xl mx-auto" style={{ fontSize: 'var(--text-lg)' }}>
          Join thousands of engineering teams already shipping faster with Plasma AI.
        </p>
        <a href="#pricing" className="btn-dark">
          Start Free Trial
        </a>
      </div>
    </section>
  );
}
