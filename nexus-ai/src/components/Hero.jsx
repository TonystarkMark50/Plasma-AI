import React, { lazy, Suspense } from 'react';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { ArrowTrendingUp, ArrowPath, ChartPie } from '../assets/svgs';

const NeuralNetworkScene = lazy(() =>
  import('./ThreeScene/NeuralNetworkScene')
);

function MetricBadge({ Icon, value, label }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-forsythia/15 bg-oceanic-noir/60 backdrop-blur-sm shadow-lg">
      <Icon className="w-4 h-4 text-forsythia flex-shrink-0" />
      <span className="font-display text-sm font-semibold text-arctic-powder whitespace-nowrap">{value}</span>
      {label && <span className="text-xs text-mystic-mint/60 hidden sm:inline">{label}</span>}
    </div>
  );
}

function Scene3D({ className, style }) {
  return (
    <div className={className} style={style} aria-hidden="true">
      <Suspense fallback={null}>
        <NeuralNetworkScene />
      </Suspense>
    </div>
  );
}

export default function Hero() {
  const isMobile = useBreakpoint();

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex items-center overflow-hidden pt-16 sm:pt-20"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 65% at 65% 48%, rgba(17,76,90,0.55), transparent 68%), #172B36',
        }}
      />

      <div className="container relative z-10 w-full">
        {isMobile ? (
          /* ── Mobile: scene tinted behind, content centred ── */
          <div className="relative py-16 px-4 text-center">
            <Scene3D
              className="absolute inset-0 z-0"
              style={{ opacity: 0.28 }}
            />
            <div className="relative z-10">
              <Content mobile />
            </div>
          </div>
        ) : (
          /* ── Desktop: content left | scene right ── */
          <div className="grid grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-center"
               style={{ minHeight: 'calc(100vh - 80px)' }}>
            <div className="flex flex-col justify-center">
              <Content />
            </div>
            <Scene3D
              className="relative w-full rounded-2xl overflow-hidden"
              style={{ height: 'min(580px, 68vh)' }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

function Content({ mobile = false }) {
  const h1Size  = mobile ? 'clamp(2rem, 8vw, 3rem)'   : 'clamp(2.5rem, 4vw, 3.8rem)';
  const bodySize= mobile ? '0.95rem' : 'clamp(1rem, 1.3vw, 1.15rem)';

  return (
    <>
      <p
        className="font-display text-forsythia tracking-[0.16em] uppercase anim-hero-1"
        style={{ fontSize: mobile ? '0.7rem' : '0.8rem', marginBottom: mobile ? '1rem' : '1.25rem' }}
      >
        AI-Powered Automation Platform
      </p>

      <h1
        id="hero-heading"
        className="font-display font-bold text-arctic-powder leading-tight anim-hero-2"
        style={{ fontSize: h1Size, marginBottom: mobile ? '1.1rem' : '1.4rem' }}
      >
        Automate the Chaos.<br />
        <span className="text-forsythia">Ship the Future.</span>
      </h1>

      <p
        className="text-mystic-mint anim-hero-3"
        style={{
          fontSize: bodySize,
          lineHeight: 1.72,
          maxWidth: mobile ? '28rem' : '30rem',
          margin: mobile ? '0 auto 2rem' : '0 0 2.4rem',
        }}
      >
        Connect any data source, build intelligent pipelines, and ship features
        10× faster — without the infrastructure overhead.
      </p>

      <div
        className="flex flex-wrap gap-4 anim-hero-4"
        style={{ justifyContent: mobile ? 'center' : 'flex-start' }}
      >
        <a href="#pricing"  className="btn-primary">Start Free Trial</a>
        <a href="#workflow" className="btn-secondary">Watch Demo</a>
      </div>

      <div
        className="flex flex-wrap gap-3 anim-hero-4"
        style={{
          marginTop: mobile ? '2.4rem' : '3rem',
          justifyContent: mobile ? 'center' : 'flex-start',
        }}
      >
        <MetricBadge Icon={ArrowTrendingUp} value="2.3M"  label="tasks / day"  />
        <MetricBadge Icon={ArrowPath}       value="99.9%" label="uptime"        />
        <MetricBadge Icon={ChartPie}        value="140ms" label="avg latency"   />
      </div>
    </>
  );
}
