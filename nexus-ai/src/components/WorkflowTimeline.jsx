import React from 'react';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { LinkSolid, Cog8Tooth, ArrowPath, ChartPie, ChevronRight, ChevronDown } from '../assets/svgs';

const steps = [
  {
    num: '01',
    title: 'Connect',
    desc: 'Connect your data sources via API or pre-built connectors.',
    Icon: LinkSolid,
  },
  {
    num: '02',
    title: 'Configure',
    desc: 'Define your pipeline logic with declarative YAML or our visual editor.',
    Icon: Cog8Tooth,
  },
  {
    num: '03',
    title: 'Automate',
    desc: 'Nexus AI runs, monitors, and self-heals your pipelines continuously.',
    Icon: ArrowPath,
  },
  {
    num: '04',
    title: 'Analyze',
    desc: 'Explore outcomes in real-time across every dimension of your data.',
    Icon: ChartPie,
  },
];

export default function WorkflowTimeline() {
  const isMobile = useBreakpoint();

  return (
    <section id="workflow" aria-labelledby="workflow-heading" className="py-16 sm:py-24 bg-oceanic-noir">
      <div className="container">
        <div className="text-center mb-12 sm:mb-16">
          <p className="section-label mb-4">HOW IT WORKS</p>
          <h2
            id="workflow-heading"
            className="font-display font-bold text-arctic-powder"
            style={{ fontSize: 'var(--text-4xl)' }}
          >
            From raw data to production in four steps.
          </h2>
        </div>

        {isMobile ? (
          <div className="flex flex-col gap-6 max-w-md mx-auto">
            {steps.map((step, i) => {
              const Icon = step.Icon;
              return (
                <div key={step.num}>
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-forsythia/10 border border-forsythia/15 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-forsythia" />
                      </div>
                      {i < steps.length - 1 && (
                        <div className="w-px h-6 bg-forsythia/20 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-display text-xl font-bold text-forsythia">{step.num}</span>
                        <h3 className="font-display text-base font-bold text-arctic-powder">{step.title}</h3>
                      </div>
                      <p className="text-sm text-mystic-mint/60 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex justify-center mt-2">
                      <ChevronDown className="w-4 h-4 text-forsythia/20" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex items-start justify-between gap-4">
            {steps.map((step, i) => {
              const Icon = step.Icon;
              return (
                <React.Fragment key={step.num}>
                  <div className="flex flex-col items-center text-center flex-1">
                    <div className="w-14 h-14 rounded-xl bg-forsythia/10 border border-forsythia/15 flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-forsythia" />
                    </div>
                    <span className="font-display text-2xl font-bold text-forsythia mb-3">{step.num}</span>
                    <h3 className="font-display text-base font-bold text-arctic-powder mb-2">{step.title}</h3>
                    <p className="text-sm text-mystic-mint/60 leading-relaxed max-w-[200px]">{step.desc}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex items-center mt-7 flex-shrink-0">
                      <ChevronRight className="w-5 h-5 text-forsythia/30" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
