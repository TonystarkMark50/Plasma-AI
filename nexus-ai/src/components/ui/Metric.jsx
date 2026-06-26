import React from 'react';

export default function Metric({ icon: Icon, value, className = '', delay = '0s' }) {
  return (
    <div
      className={`flex items-center gap-2 bg-oceanic-noir/60 border border-forsythia/10 rounded-xl px-4 py-3 ${className}`}
      style={{ animationDelay: delay }}
    >
      {Icon && <Icon className="w-5 h-5 text-forsythia" />}
      <span className="font-display text-sm text-arctic-powder font-medium">{value}</span>
    </div>
  );
}
