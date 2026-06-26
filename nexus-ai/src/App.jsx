import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import TrustedBy from './components/TrustedBy';
import Features from './components/Features';
import WorkflowTimeline from './components/WorkflowTimeline';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTABanner from './components/CTABanner';
import Footer from './components/Footer';
import ScrollToTop from './components/ui/ScrollToTop';

const Hero = lazy(() => import('./components/Hero'));

export default function App() {
  return (
    <>
      <header role="banner">
        <Navbar />
      </header>

      <main id="main-content">
        <Suspense fallback={<div className="min-h-screen bg-oceanic-noir" />}>
          <Hero />
        </Suspense>
        <TrustedBy />
        <Features />
        <WorkflowTimeline />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTABanner />
      </main>

      <footer role="contentinfo" className="bg-oceanic-noir border-t border-forsythia/10">
        <Footer />
      </footer>

      <ScrollToTop />
    </>
  );
}
