import React from 'react';

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  dark: 'btn-dark',
  ghost: 'btn-ghost',
};

export default function Button({ variant = 'primary', href, children, className = '', ...props }) {
  const cls = `${variants[variant] || variants.primary} ${className}`;

  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={cls} {...props}>
      {children}
    </button>
  );
}
