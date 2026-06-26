import React from 'react';
import Section from '../components/ui/Section';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { LinkSolid, Cog8Tooth, ArrowPath, ChartPie, ChevronRight, ChevronDown } from '../assets/svgs';

const steps = [
  { num: '01', title: 'Connect', desc: 'Connect your data sources via API or pre-built connectors.', Icon: LinkSolid },
  { num: '02', title: 'Configure', desc: 'Define your pipeline logic with declarative YAML or our visual editor.', Icon: Cog8Tooth },
  { num: '03', title: 'Automate', desc: 'Nexus AI runs, monitors, and self-heals your pipelines continuously.', Icon: ArrowPath },
  { num: '04', title: 'Analyze', desc: 'Explore outcomes in real-time across every dimension of your data.', Icon: ChartPie },
];

export default function WorkflowTimeline() {
  const isMobile = useBreakpoint();

  return (
    <Section id="workflow" label="HOW IT WORKS" title="From raw data to production in four steps." dark>
      <div className={`flex ${isMobile ? 'flex-col gap-8' : 'items-start justify-between gap-4'}`}>
        {steps.map((step, i) => {
          const Icon = step.Icon;
          return (
            <div key={step.num} className={`flex ${isMobile ? 'flex-row items-start gap-4' : 'flex-col items-center text-center flex-1'}`}>
              <div className={`flex items-center gap-3 ${isMobile ? '' : 'flex-col'}`}>
                <div className="w-14 h-14 rounded-xl bg-forsythia/10 border border-forsythia/15 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-forsythia" />
                </div>
                <span className="font-display text-2xl font-bold text-forsythia">{step.num}</span>
              </div>
              {!isMobile && i < steps.length - 1 && (
                <div className="hidden md:flex items-center mt-7">
                  <ChevronRight className="w-5 h-5 text-forsythia/30" />
                </div>
              )}
              {isMobile && i < steps.length - 1 && (
                <ChevronDown className="w-5 h-5 text-forsythia/30 ml-8 flex-shrink-0" />
              )}
              <div className={`${isMobile ? 'flex-1' : 'mt-4'}`}>
                <h3 className="font-display text-lg font-bold text-arctic-powder mb-2">{step.title}</h3>
                <p className="text-sm text-mystic-mint/60 leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
