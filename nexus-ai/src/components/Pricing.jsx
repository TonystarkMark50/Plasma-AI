import React, { useRef, useCallback } from 'react';
import PricingCard from './ui/PricingCard';
import { PRICING_MATRIX } from '../data/pricingMatrix';
import { computePrice } from '../utils/pricingCalc';
import { ChevronDown } from '../assets/svgs';

export default function Pricing() {
  const currencyRef = useRef('USD');
  const cycleRef = useRef('monthly');

  const updateAllPrices = useCallback(() => {
    const currency = currencyRef.current;
    const cycle = cycleRef.current;

    Object.keys(PRICING_MATRIX.tiers).forEach((tier) => {
      const { symbol, amount, period, badge } = computePrice(tier, currency, cycle);

      const priceEl  = document.getElementById(`price-amount-${tier}`);
      const symbolEl = document.getElementById(`price-symbol-${tier}`);
      const periodEl = document.getElementById(`price-period-${tier}`);
      const badgeEl  = document.getElementById(`price-badge-${tier}`);

      if (priceEl)  priceEl.textContent  = amount;
      if (symbolEl) symbolEl.textContent = symbol;
      if (periodEl) periodEl.textContent = period;
      if (badgeEl) {
        badgeEl.textContent = badge ?? '';
        badgeEl.style.opacity = badge ? '1' : '0';
      }
    });
  }, []);

  const handleCycleChange = useCallback((newCycle) => {
    cycleRef.current = newCycle;
    document.querySelectorAll('[data-cycle-btn]').forEach((btn) => {
      btn.setAttribute('data-active', btn.dataset.cycleValue === newCycle ? 'true' : 'false');
    });
    updateAllPrices();
  }, [updateAllPrices]);

  const handleCurrencyChange = useCallback((e) => {
    currencyRef.current = e.target.value;
    updateAllPrices();
  }, [updateAllPrices]);

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="py-16 sm:py-24 bg-nocturnal-expedition">
      <div className="container">
        <div className="text-center mb-12">
          <p className="section-label mb-4">PRICING</p>
          <h2 id="pricing-heading" className="font-display text-[var(--text-4xl)] font-bold text-arctic-powder">
            Transparent pricing, zero surprises.
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <div
            role="group"
            aria-label="Billing cycle"
            className="flex bg-oceanic-noir/60 rounded-lg p-1 border border-forsythia/10"
          >
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
          {Object.entries(PRICING_MATRIX.tiers).map(([tierId, tier]) => {
            const initialPrice = computePrice(tierId, 'USD', 'monthly');
            return (
              <PricingCard
                key={tierId}
                tierId={tierId}
                tier={tier}
                initialPrice={initialPrice}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
