import React, { useState } from 'react';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { FEATURES } from '../data/featuresData';
import { ChevronDown } from '../assets/svgs';
import Section from '../components/ui/Section';

export default function Features() {
  const [accordionOpen, setAccordionOpen] = useState(null);
  const isMobile = useBreakpoint();

  return (
    <Section id="features" label="Capabilities" title="Everything your data pipeline needs." light>
      {!isMobile ? (
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateAreas: `
              "pipelines  analytics  intelligence"
              "pipelines  config     modeling"
              "integrations config   modeling"
            `,
          }}
        >
          {FEATURES.map((feature) => {
            const Icon = feature.Icon;
            return (
              <div
                key={feature.id}
                className="card-elevated p-8 cursor-default"
                style={{ gridArea: feature.gridArea }}
              >
                <div className="w-10 h-10 rounded-lg bg-deep-saffron/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-deep-saffron" />
                </div>
                <h3 className="font-display text-base font-bold text-oceanic-noir mb-2">{feature.title}</h3>
                <p className="text-sm text-oceanic-noir/60 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {FEATURES.map((feature) => {
            const Icon = feature.Icon;
            const isOpen = accordionOpen === feature.id;
            return (
              <div key={feature.id} className="bg-white rounded-xl border border-oceanic-noir/10 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setAccordionOpen(isOpen ? null : feature.id)}
                  aria-expanded={isOpen}
                  aria-controls={`feature-panel-${feature.id}`}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-deep-saffron" />
                    <h3 className="font-display text-base font-bold text-oceanic-noir">{feature.title}</h3>
                  </div>
                  <div className={`transition-transform duration-200 ease-out ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5 text-oceanic-noir/40" />
                  </div>
                </button>
                <div
                  id={`feature-panel-${feature.id}`}
                  role="region"
                  style={{
                    maxHeight: isOpen ? '500px' : '0',
                    opacity: isOpen ? 1 : 0,
                    transition: 'max-height 350ms ease-in-out, opacity 300ms ease-in-out',
                    overflow: 'hidden',
                  }}
                >
                  <p className="px-5 pb-5 text-sm text-oceanic-noir/70 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Section>
  );
}
