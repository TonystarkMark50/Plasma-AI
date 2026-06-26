import React from 'react';

const variants = {
  default: 'card',
  elevated: 'card-elevated',
  glass: 'card-glass',
  featured: 'card-featured',
};

export default function Card({ variant = 'default', children, className = '', ...props }) {
  const cls = `${variants[variant] || variants.default} ${className}`;
  return (
    <div className={cls} {...props}>
      {children}
    </div>
  );
}
