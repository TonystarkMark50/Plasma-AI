import { PRICING_MATRIX } from '../data/pricingMatrix';

export function computePrice(tier, currency, cycle) {
  const { baseUSDCents }           = PRICING_MATRIX.tiers[tier];
  const { multiplier, badge }      = PRICING_MATRIX.cycles[cycle];
  const { symbol, tariff, locale } = PRICING_MATRIX.currencies[currency];

  const raw    = (baseUSDCents / 100) * multiplier * tariff;
  const amount = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(raw);

  return {
    symbol,
    amount,
    period: cycle === 'annual' ? '/mo, billed annually' : '/month',
    badge,
  };
}
