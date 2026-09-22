import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useProduct } from '../context/ProductContext';

export const DashboardPage: React.FC = () => {
  const { t } = useLanguage();
  const { products, startNewProduct } = useProduct();

  return (
    <main className="dashboard-main">
      {/* HEADER */}
      <header className="dashboard-header">
        <div>
          <span className="dashboard-eyebrow">{t.dashboardEyebrow}</span>
          <h1>
            {t.heroCraft}<br />
            <strong>{t.heroBusiness}</strong>
          </h1>
          <p>{t.heroDescription}</p>
        </div>

        <button type="button" className="dashboard-add-btn" onClick={() => startNewProduct()}>
          {t.addProduct}
        </button>
      </header>

      {/* ARTISAN PROFILE */}
      <section className="artisan-profile">
        <div className="artisan-avatar">M</div>

        <div className="artisan-details">
          <h2>TEDKRAFT ARTISAN</h2>
          <p style={{ marginBottom: '8px' }}>Traditional Bamboo Artisan • Tamil Nadu</p>
          <div className="details">
            <span>
              MATERIAL <b>Bamboo</b>
            </span>
            <span>
              CRAFT <b>Hand Weaving</b>
            </span>
            <span>
              TIME <b>2 Days average</b>
            </span>
          </div>
        </div>

        <div className="verified-badge">{t.verified}</div>
      </section>

      {/* STATISTICS */}
      <section className="dashboard-stats">
        <div className="stat-card">
          <span>{t.productsUploaded}</span>
          <strong>{products.length}</strong>
          <small>+3 this month</small>
        </div>

        <div className="stat-card">
          <span>{t.marketViews}</span>
          <strong>1,248</strong>
          <small>+24% this month</small>
        </div>

        <div className="stat-card">
          <span>{t.potentialBuyers}</span>
          <strong>37</strong>
          <small>8 new opportunities</small>
        </div>

        <div className="stat-card">
          <span>{t.estimatedSales}</span>
          <strong>₹18,500</strong>
          <small>This month</small>
        </div>
      </section>

      {/* PRODUCTS + AI INSIGHTS */}
      <section className="dashboard-two-column">
        {/* PRODUCTS PANEL */}
        <section className="dashboard-panel">
          <div className="panel-header">
            <div>
              <span>MY PRODUCTS</span>
              <h2>Uploaded Products</h2>
            </div>
            <button type="button" onClick={() => startNewProduct()}>
              + ADD
            </button>
          </div>

          <div className="dashboard-products">
            {products.map((prod) => (
              <article key={prod.id || prod.title} className="dashboard-product">
                <img src={prod.imageUrl || '/bamboo-basket.png'} alt={prod.title} />
                <div>
                  <span>{prod.category}</span>
                  <h3>{prod.title}</h3>
                  <p>AI Catalogue ✓</p>
                  <strong>
                    ₹{prod.priceRangeMin || 750} – ₹{prod.priceRangeMax || 850}
                  </strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* AI BUSINESS INSIGHTS */}
        <section className="dashboard-panel">
          <div className="panel-header">
            <div>
              <span>TEDKRAFT AI</span>
              <h2>Business Insights</h2>
            </div>
          </div>

          <div className="ai-insights-list">
            <div className="ai-insight">
              <div className="insight-icon">🔥</div>
              <div>
                <span>HIGH DEMAND DETECTED</span>
                <h4>Bamboo Home Décor</h4>
                <p>{t.highDemandText}</p>
              </div>
            </div>

            <div className="ai-insight">
              <div className="insight-icon">₹</div>
              <div>
                <span>PRICE OPPORTUNITY</span>
                <h4>Optimal Price Range</h4>
                <p>{t.priceOpportunityText}</p>
              </div>
            </div>

            <div className="ai-insight">
              <div className="insight-icon">🤝</div>
              <div>
                <span>BUYER OPPORTUNITY</span>
                <h4>Buyer Matches</h4>
                <p>{t.buyerOpportunityText}</p>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* PERFORMANCE CHART */}
      <section className="performance-panel dashboard-panel">
        <div className="panel-header">
          <div>
            <span>MARKET PERFORMANCE</span>
            <h2>Product Interest & Analytics</h2>
          </div>
        </div>

        <div className="performance-chart">
          <div className="chart-column">
            <span style={{ height: '60%' }} />
            <label>Mon</label>
          </div>
          <div className="chart-column">
            <span style={{ height: '80%' }} />
            <label>Tue</label>
          </div>
          <div className="chart-column">
            <span style={{ height: '45%' }} />
            <label>Wed</label>
          </div>
          <div className="chart-column">
            <span style={{ height: '95%' }} />
            <label>Thu</label>
          </div>
          <div className="chart-column">
            <span style={{ height: '70%' }} />
            <label>Fri</label>
          </div>
          <div className="chart-column">
            <span style={{ height: '85%' }} />
            <label>Sat</label>
          </div>
          <div className="chart-column">
            <span style={{ height: '100%' }} />
            <label>Sun</label>
          </div>
        </div>
      </section>

      {/* AI ACTIVITY */}
      <section className="dashboard-panel" style={{ marginBottom: '28px' }}>
        <div className="panel-header">
          <div>
            <span>AI ACTIVITY</span>
            <h2>Recent Actions</h2>
          </div>
        </div>

        <div className="activity-list">
          <div className="activity-item">
            <span>✦</span>
            <p>Product photograph enhanced & lighting optimized</p>
            <small>Just now</small>
          </div>
          <div className="activity-item">
            <span>✦</span>
            <p>Multilingual English catalogue generated</p>
            <small>5 min ago</small>
          </div>
          <div className="activity-item">
            <span>✦</span>
            <p>Fair price range calculated (₹750 – ₹850)</p>
            <small>12 min ago</small>
          </div>
          <div className="activity-item">
            <span>✦</span>
            <p>3 buyer matches discovered in hospitality sector</p>
            <small>25 min ago</small>
          </div>
        </div>
      </section>

      {/* AI RECOMMENDATION */}
      <section className="ai-recommendation">
        <div className="recommendation-icon">💡</div>
        <div>
          <span>TEDKRAFT RECOMMENDS</span>
          <h3>{t.recommendationTitle}</h3>
          <p>{t.recommendationText}</p>
        </div>
        <button type="button" className="primary-btn" onClick={() => startNewProduct()}>
          CREATE PRODUCT →
        </button>
      </section>
    </main>
  );
};
