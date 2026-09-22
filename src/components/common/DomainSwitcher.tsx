import React from 'react';
import { ActiveDomain } from '../../types';

interface DomainSwitcherProps {
  activeDomain: ActiveDomain;
  onDomainChange: (domain: ActiveDomain) => void;
}

export const DomainSwitcher: React.FC<DomainSwitcherProps> = ({ activeDomain, onDomainChange }) => {
  return (
    <div className="domain-switcher" aria-label="Role Switcher">
      <button
        type="button"
        className={`domain-option ${activeDomain === 'artisan' ? 'active' : ''}`}
        onClick={() => onDomainChange('artisan')}
      >
        <span>🧑‍🎨</span> ARTISAN
      </button>

      <button
        type="button"
        className={`domain-option ${activeDomain === 'customer' ? 'active' : ''}`}
        onClick={() => onDomainChange('customer')}
      >
        <span>🛍</span> CUSTOMER
      </button>
    </div>
  );
};
