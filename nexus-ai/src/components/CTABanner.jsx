import React from 'react';
import Button from '../components/ui/Button';

export default function CTABanner() {
  return (
    <section id="cta-banner" aria-label="Call to action" className="py-20 sm:py-28" style={{ background: 'linear-gradient(135deg, #FF9932, #FFC801)' }}>
      <div className="container text-center">
        <h2 className="font-display text-[var(--text-4xl)] font-bold text-oceanic-noir mb-4">
          Ready to automate everything?
        </h2>
        <p className="text-oceanic-noir/70 text-lg mb-10 max-w-xl mx-auto">
          Join thousands of engineering teams already shipping faster with Nexus AI.
        </p>
        <Button variant="dark" href="#pricing">Start Free Trial</Button>
      </div>
    </section>
  );
}
