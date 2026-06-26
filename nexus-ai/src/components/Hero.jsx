import React, { Component } from 'react';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { ArrowTrendingUp, ArrowPath, ChartPie } from '../assets/svgs';

class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

function LazyScene({ simplified }) {
  const NeuralNetworkScene = React.lazy(() =>
    import('./ThreeScene/NeuralNetworkScene').catch(() => ({ default: () => null }))
  );
  return (
    <React.Suspense fallback={null}>
      <SceneErrorBoundary>
        <NeuralNetworkScene simplified={simplified} />
      </SceneErrorBoundary>
    </React.Suspense>
  );
}

function MetricBadge({ Icon, value, floatClass }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border border-forsythia/10 bg-oceanic-noir/60 backdrop-blur-sm shadow-lg ${floatClass}`}>
      <Icon className="w-4 h-4 text-forsythia flex-shrink-0" />
      <span className="font-display text-sm font-medium text-arctic-powder whitespace-nowrap">{value}</span>
    </div>
  );
}

export default function Hero() {
  const isMobile = useBreakpoint();

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-oceanic-noir pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(ellipse at 50% 40%, rgba(17,76,90,0.4), rgba(23,43,54,0) 70%)' }}
      />

      <div aria-hidden="true" className="absolute inset-0 z-0">
        <LazyScene simplified={isMobile} />
      </div>

      <div className="container relative z-10 text-center px-4">
        <p
          className="font-display text-forsythia tracking-[0.15em] uppercase mb-6 anim-hero-1"
          style={{ fontSize: 'var(--text-sm)' }}
        >
          AI-Powered Automation Platform
        </p>

        <h1
          id="hero-heading"
          className="font-display font-bold text-arctic-powder leading-tight mb-6 anim-hero-2"
          style={{ fontSize: 'var(--text-hero)' }}
        >
          Automate the Chaos.<br />
          <span className="text-forsythia">Ship the Future.</span>
        </h1>

        <p
          className="max-w-2xl mx-auto text-mystic-mint mb-10 anim-hero-3"
          style={{ fontSize: 'var(--text-lg)' }}
        >
          Connect any data source, build intelligent pipelines, and ship features 10x faster without the infrastructure overhead.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 anim-hero-4">
          <a href="#pricing" className="btn-primary">Start Free Trial</a>
          <a href="#workflow" className="btn-secondary">Watch Demo</a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-16">
          <MetricBadge Icon={ArrowTrendingUp} value="2.3M tasks/day"    floatClass="float-1" />
          <MetricBadge Icon={ArrowPath}       value="99.9% uptime"      floatClass="float-2" />
          <MetricBadge Icon={ChartPie}        value="140ms avg latency" floatClass="float-3" />
        </div>
      </div>
    </section>
  );
}
