import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useProduct } from '../../context/ProductContext';
import { LanguageSelector } from './LanguageSelector';

interface SidebarProps {
  activePage: 'home' | 'dashboard' | 'customer';
  onNavigate: (page: 'home' | 'dashboard' | 'customer', sectionId?: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  const { t } = useLanguage();
  const { startNewProduct } = useProduct();

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-symbol">T</div>
        <h1>TEDKRAFT</h1>
        <p>AI FOR ARTISANS</p>
        <div className="brand-line">✦</div>
      </div>

      <nav className="side-nav" aria-label="Main Navigation">
        <button
          className={`nav-item ${activePage === 'home' ? 'active' : ''}`}
          onClick={() => onNavigate('home', 'home')}
        >
          <span>⌂</span>
          {t.navHome}
        </button>

        <button
          className="nav-item"
          onClick={() => onNavigate('home', 'problem')}
        >
          <span>◇</span>
          {t.navProblem}
        </button>

        <button
          className="nav-item"
          onClick={() => onNavigate('home', 'features')}
        >
          <span>✦</span>
          {t.navFeatures}
        </button>

        <button
          className="nav-item"
          onClick={() => onNavigate('home', 'workflow')}
        >
          <span>◎</span>
          {t.navWorks}
        </button>

        <button
          className="nav-item"
          onClick={() => onNavigate('home', 'market')}
        >
          <span>♧</span>
          {t.navMarket}
        </button>

        <button
          className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
          onClick={() => onNavigate('dashboard')}
        >
          <span>▣</span>
          {t.navDashboard}
        </button>
      </nav>

      <div className="sidebar-bottom">
        <LanguageSelector />

        <div className="mandala">✿</div>
        <p>{t.ready}</p>
        <button type="button" onClick={() => startNewProduct()}>
          {t.tryTedkraft}
        </button>
      </div>
    </aside>
  );
};
