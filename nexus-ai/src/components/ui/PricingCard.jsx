import React from 'react';
import { Cube16Solid, ChevronRight } from '../../assets/svgs';
import { BadgePremium } from './Badge';
import Button from './Button';

const PricingCard = React.memo(function PricingCard({ tierId, price, features, cta, highlighted, tagline, name }) {
  return (
    <article
      className={`relative flex flex-col transition-all duration-200 ease-out will-change-transform ${
        highlighted
          ? 'card-featured scale-[1.02] md:scale-[1.05] z-10'
          : 'card-glass'
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <BadgePremium>Most Popular</BadgePremium>
        </div>
      )}

      <div className="p-6 sm:p-8 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${highlighted ? 'bg-forsythia/20' : 'bg-forsythia/10'}`}>
            <Cube16Solid className="w-5 h-5 text-forsythia" />
          </div>
          <h3 className="font-display text-lg font-bold text-arctic-powder">{name}</h3>
        </div>
        <p className="text-mystic-mint text-sm mb-6 opacity-80">{tagline}</p>

        <div className="mb-8">
          <div className="flex items-baseline gap-1">
            <span className={`font-display text-4xl font-bold ${highlighted ? 'text-forsythia' : 'text-arctic-powder'}`}>
              <span id={`price-symbol-${tierId}`} aria-live="polite" aria-atomic="true" className="text-2xl align-top mr-0.5">{price.symbol}</span>
              <span id={`price-amount-${tierId}`} aria-live="polite" aria-atomic="true">{price.amount}</span>
            </span>
            <span id={`price-period-${tierId}`} className="text-mystic-mint text-sm opacity-60 ml-1">{price.period}</span>
          </div>
          <div id={`price-badge-${tierId}`} className="mt-2 opacity-0 transition-opacity duration-150 ease-out" style={{ opacity: price.badge ? 1 : 0 }}>
            {price.badge && (
              <span className="badge-save">{price.badge}</span>
            )}
          </div>
        </div>

        <ul className="space-y-3 mb-10 flex-1">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-mystic-mint">
              <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${highlighted ? 'bg-forsythia' : 'bg-forsythia/50'}`} />
              {feature}
            </li>
          ))}
        </ul>

        <Button
          variant={highlighted ? 'primary' : 'secondary'}
          href={cta === 'Contact Sales' ? '#' : '#pricing'}
          className="w-full"
        >
          {cta}
        </Button>
      </div>
    </article>
  );
});

export default PricingCard;
