import React from 'react';
import { useBreakpoint } from '../hooks/useBreakpoint';
import NeuralNetworkScene from './ThreeScene/NeuralNetworkScene';
import { ArrowTrendingUp, ArrowPath, ChartPie } from '../assets/svgs';
import Metric from '../components/ui/Metric';
import Button from '../components/ui/Button';

export default function Hero() {
  const isMobile = useBreakpoint(768);

  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-nocturnal-expedition/40 via-oceanic-noir to-oceanic-noir pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse at 50% 40%, rgba(17,76,90,0.4), rgba(23,43,54,0) 70%)' }} />

      <div aria-hidden="true" className="absolute inset-0 z-0">
        <NeuralNetworkScene simplified={isMobile} />
      </div>

      <div className="container relative z-10 text-center">
        <p className="font-display text-forsythia text-sm tracking-[0.15em] uppercase mb-6 anim-hero-1">
          AI-Powered Automation Platform
        </p>
        <h1 id="hero-heading" className="font-display text-[var(--text-hero)] font-bold text-arctic-powder leading-tight mb-6 anim-hero-2">
          Automate the Chaos.<br /><span className="text-forsythia">Ship the Future.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-mystic-mint text-lg mb-10 anim-hero-3">
          Connect any data source, build intelligent pipelines, and ship features 10x faster without the infrastructure overhead.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 anim-hero-4">
          <Button variant="primary" href="#pricing">Start Free Trial</Button>
          <Button variant="secondary" href="#workflow">Watch Demo</Button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-16">
          <Metric icon={ArrowTrendingUp} value="2.3M tasks/day" delay="0s" className="float-1" />
          <Metric icon={ArrowPath} value="99.9% uptime" delay="0.8s" className="float-2" />
          <Metric icon={ChartPie} value="140ms avg latency" delay="1.6s" className="float-3" />
        </div>
      </div>
    </section>
  );
}
