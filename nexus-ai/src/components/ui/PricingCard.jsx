import React, { memo } from 'react';
import { Cube16Solid } from '../../assets/svgs';

const PricingCard = memo(function PricingCard({ tierId, tier, initialPrice }) {
  return (
    <article
      className={`relative flex flex-col transition-all duration-200 ease-out will-change-transform ${
        tier.highlighted ? 'card-featured scale-[1.02] md:scale-[1.05] z-10' : 'card-glass'
      }`}
      aria-label={`${tier.name} pricing plan`}
    >
      {tier.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="badge-premium">Most Popular</span>
        </div>
      )}

      <div className="p-6 sm:p-8 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${tier.highlighted ? 'bg-forsythia/20' : 'bg-forsythia/10'}`}>
            <Cube16Solid className="w-5 h-5 text-forsythia" />
          </div>
          <h3 className="font-display text-lg font-bold text-arctic-powder">{tier.name}</h3>
        </div>

        <p className="text-mystic-mint text-sm mb-6 opacity-80">{tier.tagline}</p>

        <div className="mb-2" aria-live="polite" aria-atomic="true">
          <div className="flex items-baseline gap-1">
            <span className={`font-display text-4xl font-bold ${tier.highlighted ? 'text-forsythia' : 'text-arctic-powder'}`}>
              <span
                id={`price-symbol-${tierId}`}
                className="text-2xl align-top mr-0.5"
              >{initialPrice.symbol}</span>
              <span id={`price-amount-${tierId}`}>{initialPrice.amount}</span>
            </span>
            <span
              id={`price-period-${tierId}`}
              className="text-mystic-mint text-sm opacity-60 ml-1"
            >{initialPrice.period}</span>
          </div>
        </div>

        <div className="h-7 flex items-center mb-4">
          <span
            id={`price-badge-${tierId}`}
            className="badge-save"
            style={{ opacity: 0, transition: 'opacity 150ms ease-out' }}
            aria-live="polite"
            aria-atomic="true"
          />
        </div>

        <ul aria-label={`${tier.name} features`} className="space-y-3 mb-10 flex-1">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-mystic-mint">
              <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${tier.highlighted ? 'bg-forsythia' : 'bg-forsythia/50'}`} />
              {f}
            </li>
          ))}
        </ul>

        <a
          href={tier.cta === 'Contact Sales' ? '#' : '#pricing'}
          role="button"
          className={tier.highlighted ? 'btn-primary w-full text-center' : 'btn-secondary w-full text-center'}
        >
          {tier.cta}
        </a>
      </div>
    </article>
  );
});

PricingCard.displayName = 'PricingCard';
export default PricingCard;
