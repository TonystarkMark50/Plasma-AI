import React, { useRef, useEffect, useCallback } from 'react';
import Section from '../components/ui/Section';
import PricingCard from './ui/PricingCard';
import { PRICING_MATRIX } from '../data/pricingMatrix';
import { computePrice } from '../utils/pricingCalc';
import { ChevronDown } from '../assets/svgs';

export default function Pricing() {
  const currencyRef = useRef('USD');
  const cycleRef = useRef('monthly');
  const currencySelectRef = useRef(null);

  const writePrices = useCallback(() => {
    const currency = currencyRef.current;
    const cycle = cycleRef.current;
    Object.keys(PRICING_MATRIX.tiers).forEach((tierId) => {
      const price = computePrice(tierId, currency, cycle);
      const symbolEl = document.getElementById(`price-symbol-${tierId}`);
      const amountEl = document.getElementById(`price-amount-${tierId}`);
      const periodEl = document.getElementById(`price-period-${tierId}`);
      const badgeEl = document.getElementById(`price-badge-${tierId}`);
      if (symbolEl) symbolEl.textContent = price.symbol;
      if (amountEl) amountEl.textContent = price.amount;
      if (periodEl) periodEl.textContent = price.period;
      if (badgeEl) {
        badgeEl.textContent = price.badge || '';
        badgeEl.style.opacity = price.badge ? '1' : '0';
      }
    });
  }, []);

  useEffect(() => {
    writePrices();
  }, [writePrices]);

  const handleCycleChange = useCallback((cycle) => {
    cycleRef.current = cycle;
    document.querySelectorAll('[data-cycle-btn]').forEach((btn) => {
      btn.setAttribute('data-active', btn.dataset.cycleValue === cycle ? 'true' : 'false');
    });
    writePrices();
  }, [writePrices]);

  const handleCurrencyChange = useCallback((e) => {
    currencyRef.current = e.target.value;
    writePrices();
  }, [writePrices]);

  return (
    <Section id="pricing" label="PRICING" title="Transparent pricing, zero surprises." dark className="bg-nocturnal-expedition">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
        <div className="flex bg-oceanic-noir/60 rounded-lg p-1 border border-forsythia/10">
          <button
            type="button"
            data-cycle-btn
            data-cycle-value="monthly"
            data-active="true"
            onClick={() => handleCycleChange('monthly')}
            className="px-5 py-2 rounded-md text-sm font-display font-medium transition-all duration-150 ease-out data-[active=true]:bg-forsythia data-[active=true]:text-oceanic-noir data-[active=false]:text-mystic-mint/60 data-[active=false]:hover:text-arctic-powder"
          >
            Monthly
          </button>
          <button
            type="button"
            data-cycle-btn
            data-cycle-value="annual"
            data-active="false"
            onClick={() => handleCycleChange('annual')}
            className="px-5 py-2 rounded-md text-sm font-display font-medium transition-all duration-150 ease-out data-[active=true]:bg-forsythia data-[active=true]:text-oceanic-noir data-[active=false]:text-mystic-mint/60 data-[active=false]:hover:text-arctic-powder"
          >
            Annual
          </button>
        </div>
        <div className="relative">
          <select
            ref={currencySelectRef}
            onChange={handleCurrencyChange}
            defaultValue="USD"
            aria-label="Select currency"
            className="bg-oceanic-noir/40 backdrop-blur-sm border border-forsythia/10 rounded-lg px-4 py-2 pr-10 text-sm font-display text-arctic-powder cursor-pointer focus:outline-none focus:border-forsythia appearance-none"
          >
            {Object.entries(PRICING_MATRIX.currencies).map(([code, curr]) => (
              <option key={code} value={code}>{curr.symbol} {code}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mystic-mint/60 pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
        {Object.entries(PRICING_MATRIX.tiers).map(([tierId, tier]) => (
          <PricingCard
            key={tierId}
            tierId={tierId}
            name={tier.name}
            tagline={tier.tagline}
            features={tier.features}
            cta={tier.cta}
            highlighted={tier.highlighted}
            price={{ symbol: '$', amount: '0', period: '/month', badge: null }}
          />
        ))}
      </div>
    </Section>
  );
}
