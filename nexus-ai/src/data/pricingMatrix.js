export const PRICING_MATRIX = {
  tiers: {
    starter: {
      baseUSDCents: 2900,
      name: 'Starter',
      tagline: 'For individuals and side projects',
      features: ['5 automated pipelines','50K tasks per month','Basic analytics','Email support','99.5% uptime SLA'],
      cta: 'Start Free Trial',
      highlighted: false,
    },
    pro: {
      baseUSDCents: 7900,
      name: 'Pro',
      tagline: 'For growing engineering teams',
      features: ['Unlimited pipelines','2M tasks per month','Real-time analytics','Priority support','99.9% uptime SLA','Custom integrations'],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    enterprise: {
      baseUSDCents: 19900,
      name: 'Enterprise',
      tagline: 'For large organizations',
      features: ['Unlimited everything','Dedicated infrastructure','White-glove onboarding','24/7 dedicated support','99.99% uptime SLA','SSO and SAML','Custom contracts'],
      cta: 'Contact Sales',
      highlighted: false,
    },
  },
  cycles: {
    monthly: { multiplier: 1.0,  badge: null },
    annual:  { multiplier: 0.80, badge: 'Save 20%' },
  },
  currencies: {
    USD: { symbol: '$', tariff: 1.000,  locale: 'en-US' },
    INR: { symbol: '₹', tariff: 83.50, locale: 'en-IN' },
    EUR: { symbol: '€', tariff: 0.920,  locale: 'de-DE' },
  },
};
