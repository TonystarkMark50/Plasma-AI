import React from 'react';

export function BadgePremium({ children }) {
  return (
    <span className="badge-premium">
      {children}
    </span>
  );
}

export function BadgeSave({ children }) {
  return (
    <span className="badge-save">
      {children}
    </span>
  );
}
