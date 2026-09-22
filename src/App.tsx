import React, { useState, useEffect } from 'react';
import { ActiveDomain } from './types';
import { LanguageProvider } from './context/LanguageContext';
import { ProductProvider } from './context/ProductContext';
import { Sidebar } from './components/common/Sidebar';
import { DomainSwitcher } from './components/common/DomainSwitcher';
import { ProductStudioModal } from './components/modal/ProductStudioModal';
import { BootPage } from './pages/BootPage';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { CustomerPage } from './pages/CustomerPage';

import './assets/styles/global.css';
import './assets/styles/sidebar.css';
import './assets/styles/modal.css';
import './assets/styles/landing.css';
import './assets/styles/dashboard.css';
import './assets/styles/customer.css';

export const AppContent: React.FC = () => {
  const [hasBooted, setHasBooted] = useState<boolean>(() => {
    return !!sessionStorage.getItem('tedkraftBooted');
  });

  const [activePage, setActivePage] = useState<'home' | 'dashboard' | 'customer'>('home');
  const [activeDomain, setActiveDomain] = useState<ActiveDomain>('artisan');

  const handleBootComplete = () => {
    sessionStorage.setItem('tedkraftBooted', 'true');
    setHasBooted(true);
  };

  const handleDomainChange = (domain: ActiveDomain) => {
    setActiveDomain(domain);
    if (domain === 'customer') {
      setActivePage('customer');
    } else {
      setActivePage('home');
    }
  };

  const handleNavigate = (page: 'home' | 'dashboard' | 'customer', sectionId?: string) => {
    setActivePage(page);
    if (page === 'customer') {
      setActiveDomain('customer');
    } else {
      setActiveDomain('artisan');
    }

    if (sectionId && page === 'home') {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  if (!hasBooted) {
    return <BootPage onComplete={handleBootComplete} />;
  }

  return (
    <div className="app-container">
      {/* Universal Floating Switcher */}
      <DomainSwitcher activeDomain={activeDomain} onDomainChange={handleDomainChange} />

      {/* Navigation Sidebar */}
      <Sidebar activePage={activePage} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      {activePage === 'home' && (
        <HomePage onNavigateToDashboard={() => handleNavigate('dashboard')} />
      )}

      {activePage === 'dashboard' && <DashboardPage />}

      {activePage === 'customer' && <CustomerPage />}

      {/* Creation & Interview Studio Modal */}
      <ProductStudioModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ProductProvider>
        <AppContent />
      </ProductProvider>
    </LanguageProvider>
  );
};

export default App;
