import React, { useState } from 'react';
import { ChevronDown } from '../assets/svgs';
import Section from '../components/ui/Section';

const faqs = [
  { q: 'How does Nexus AI handle data security and compliance?', a: 'Nexus AI is SOC 2 Type II certified and fully GDPR compliant. All data is encrypted at rest using AES-256 and in transit using TLS 1.3. We offer dedicated infrastructure for enterprise customers with VPC peering and private networking options.' },
  { q: 'Can I connect my existing databases and tools?', a: 'Absolutely. Nexus AI features 200+ pre-built connectors for databases (PostgreSQL, MySQL, Snowflake, BigQuery), SaaS tools (Slack, Salesforce, HubSpot), and cloud services (AWS, GCP, Azure). Our universal API lets you connect anything custom.' },
  { q: 'What happens if I exceed my monthly task limit?', a: 'You will receive notifications at 80% and 100% of your task limit. Pro plans include auto-scaling with pay-as-you-go overage pricing. Enterprise plans include unlimited tasks with no overage charges.' },
  { q: 'Is there a free trial available?', a: 'Yes! All plans come with a 14-day free trial, no credit card required. You get full access to all features with your selected plan limits to evaluate Nexus AI risk-free.' },
  { q: 'How does annual billing work?', a: 'Annual billing gives you a 20% discount compared to monthly pricing. You are billed once annually at the discounted rate. All plans include the option to switch from monthly to annual at any time.' },
  { q: 'Do you offer custom enterprise contracts?', a: 'Yes, our Enterprise plan includes custom contracts, dedicated infrastructure, white-glove onboarding, 24/7 support, SSO/SAML, and custom terms. Contact our sales team for a tailored quote.' },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <Section id="faq" title="Frequently asked questions." light className="bg-mystic-mint">
      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="bg-white rounded-2xl border border-oceanic-noir/06 overflow-hidden shadow-sm transition-shadow duration-200 hover:shadow-md">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <h3 className="font-display text-base font-bold text-oceanic-noir pr-4">{faq.q}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-oceanic-noir/50 flex-shrink-0 transition-transform duration-150 ease-out ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                id={`faq-panel-${i}`}
                role="region"
                style={{
                  maxHeight: isOpen ? '500px' : '0',
                  opacity: isOpen ? 1 : 0,
                  transition: 'max-height 350ms ease-in-out, opacity 300ms ease-in-out',
                  overflow: 'hidden',
                }}
              >
                <p className="px-6 pb-6 text-sm text-oceanic-noir/60 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
