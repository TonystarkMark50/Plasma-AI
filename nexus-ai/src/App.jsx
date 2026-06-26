import React, { Suspense, lazy, useState, useEffect } from 'react';
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

const HeroScene = lazy(() => import('./components/Hero'));

export default function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Suspense fallback={<div className="min-h-screen bg-oceanic-noir" />}>
          <HeroScene />
        </Suspense>
        <TrustedBy />
        <Features />
        <WorkflowTimeline />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
      <ScrollToTop visible={scrollY > 400} />
    </>
  );
}
