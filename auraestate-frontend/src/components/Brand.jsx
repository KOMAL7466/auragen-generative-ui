import React from 'react';

export default function Brand({ compact = false, dark = false }) {
  return (
    <div className={`brand ${compact ? 'brand-compact' : ''} ${dark ? 'brand-dark' : ''}`}>
      <img src="/aura-logo.jpeg" alt="AuraEstate logo" />
      <div>
        <strong>AuraEstate</strong>
        {!compact && <span>Smarter Choices. Brighter Futures.</span>}
      </div>
    </div>
  );
}
