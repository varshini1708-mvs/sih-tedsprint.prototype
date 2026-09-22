import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useProduct } from '../context/ProductContext';

interface HomePageProps {
  onNavigateToDashboard: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigateToDashboard }) => {
  const { t } = useLanguage();
  const { startNewProduct } = useProduct();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="home-main">
      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="top-ornament">✦</div>
          <h2 className="brand-heading" data-no-translate>
            TEDKRAFT
          </h2>

          <div className="heading-line">
            <span />
            ✦
            <span />
          </div>

          <p className="eyebrow">{t.eyebrow}</p>

          <h3>
            {t.heroLine1}<br />
            {t.heroLine2}<br />
            <span>{t.heroLine3}</span>
          </h3>

          <p className="hero-text">{t.heroText}</p>

          <div className="hero-buttons">
            <button type="button" className="primary-btn" onClick={() => startNewProduct()}>
              {t.startCreating}
            </button>

            <button
              type="button"
              className="outline-btn"
              onClick={() => scrollToSection('workflow')}
            >
              {t.exploreProcess}
            </button>
          </div>

          <div className="feature-strip">
            <span>{t.voiceFirst}</span>
            <i />
            <span>{t.aiPhotography}</span>
            <i />
            <span>{t.multilingual}</span>
            <i />
            <span>{t.smartPricing}</span>
          </div>
        </div>

        {/* HERO PRODUCT DISPLAY */}
        <div className="hero-product">
          <div className="product-image">
            <img src="/bamboo-basket.png" alt="Handcrafted bamboo basket" />
            <div className="image-overlay" />
            <div className="image-tag">TEDKRAFT AI ENHANCED</div>
          </div>

          <div className="product-card">
            <small>AI ENHANCED</small>
            <div className="card-line" />
            <p>HOME DÉCOR</p>
            <strong>94%</strong>
            <span>MATCH</span>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem" className="problem">
        <div className="section-title">
          <span>✦</span>
          <h2>{t.problemTitle}</h2>
          <span>✦</span>
          <p>{t.problemIntro}</p>
        </div>

        <div className="problem-grid">
          <div className="problem-card">
            <div className="problem-image">
              <img src="/artisan-weaving.png" alt="Indian artisan weaving" />
            </div>
            <h3>{t.poorPhotography}</h3>
            <p>{t.poorPhotographyText}</p>
          </div>

          <div className="problem-card">
            <div className="problem-image">
              <img src="/pottery.png" alt="Traditional Indian pottery" />
            </div>
            <h3>{t.difficultCataloguing}</h3>
            <p>{t.difficultCataloguingText}</p>
          </div>

          <div className="problem-card">
            <div className="problem-image">
              <img src="/handloom.png" alt="Indian handloom weaving" />
            </div>
            <h3>{t.languageBarriers}</h3>
            <p>{t.languageBarriersText}</p>
          </div>

          <div className="problem-card">
            <div className="problem-image">
              <img src="/jewellery.png" alt="Traditional Indian jewellery" />
            </div>
            <h3>{t.pricingUncertainty}</h3>
            <p>{t.pricingUncertaintyText}</p>
          </div>

          <div className="problem-card text-card">
            <div className="simple-symbol">₹</div>
            <h3>{t.limitedMarket}</h3>
            <p>{t.limitedMarketText}</p>
          </div>

          <div className="problem-card text-card">
            <div className="simple-symbol">AI</div>
            <h3>{t.lowDigital}</h3>
            <p>{t.lowDigitalText}</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="features">
        <div className="section-title">
          <span>✦</span>
          <h2>{t.aiTitle}</h2>
          <span>✦</span>
          <p>{t.aiIntro}</p>
        </div>

        <div className="feature-grid">
          {/* FEATURE 01 */}
          <div className="feature-card big">
            <div className="feature-photo">
              <img src="/bamboo-products.jpg" alt="Indian handmade bamboo products" />
              <div className="feature-photo-overlay" />
              <span>AI PRODUCT STUDIO</span>
            </div>

            <div>
              <div className="feature-number">01</div>
              <h3>{t.productStudio}</h3>
              <p>{t.productStudioText}</p>
              <button type="button" className="primary-btn" onClick={() => startNewProduct()}>
                {t.tryProductStudio}
              </button>
            </div>
          </div>

          {/* FEATURE 02 */}
          <div className="feature-card">
            <div className="feature-number">02</div>
            <div className="feature-icon">MIC</div>
            <h3>{t.voiceCatalogue}</h3>
            <p>{t.voiceCatalogueText}</p>
          </div>

          {/* FEATURE 03 */}
          <div className="feature-card">
            <div className="feature-number">03</div>
            <div className="feature-icon">LANG</div>
            <h3>{t.multilingualAI}</h3>
            <p>{t.multilingualAIText}</p>
          </div>

          {/* FEATURE 04 */}
          <div className="feature-card">
            <div className="feature-number">04</div>
            <div className="feature-icon">₹</div>
            <h3>{t.fairPrice}</h3>
            <p>{t.fairPriceText}</p>
          </div>

          {/* FEATURE 05 */}
          <div className="feature-card">
            <div className="feature-number">05</div>
            <div className="feature-icon">DATA</div>
            <h3>{t.demand}</h3>
            <p>{t.demandText}</p>
          </div>

          {/* FEATURE 06 */}
          <div className="feature-card">
            <div className="feature-number">06</div>
            <div className="feature-icon">LINK</div>
            <h3>{t.buyerMatching}</h3>
            <p>{t.buyerMatchingText}</p>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section id="workflow" className="workflow">
        <div className="section-title">
          <span>✦</span>
          <h2>{t.workflowTitle}</h2>
          <span>✦</span>
          <p>{t.workflowIntro}</p>
        </div>

        <div className="workflow-container">
          <div className="workflow-card">
            <div className="number">01</div>
            <div className="workflow-icon">VOICE</div>
            <h3>{t.speak}</h3>
            <p>{t.speakText}</p>
          </div>

          <div className="workflow-arrow">→</div>

          <div className="workflow-card">
            <div className="number">02</div>
            <div className="workflow-icon">AI</div>
            <h3>{t.aiUnderstands}</h3>
            <div className="data">
              Product → Basket<br />
              Material → Bamboo<br />
              Time → 2 Days<br />
              Cost → ₹300
            </div>
          </div>

          <div className="workflow-arrow">→</div>

          <div className="workflow-card">
            <div className="number">03</div>
            <div className="workflow-icon">CATALOG</div>
            <h3>{t.catalogue}</h3>

            <div className="mini-product">
              <div className="mini-product-image">
                <img src="/bamboo-basket.png" alt="Bamboo basket" />
              </div>
              <div>
                <strong>Handwoven Bamboo Basket</strong>
                <p>Traditional handcrafted product...</p>
                <b>₹750 – ₹850</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARKET LINKAGE */}
      <section id="market" className="market">
        <div className="market-content">
          <span>{t.marketLinkage}</span>
          <h2>
            {t.marketTitle1}<br />
            <strong>{t.marketTitle2}</strong>
          </h2>
          <p>{t.marketText}</p>
          <button type="button" className="primary-btn" onClick={() => startNewProduct()}>
            {t.findBuyers}
          </button>
        </div>

        <div className="market-network">
          <div className="network-box artisan">
            <div className="network-photo">
              <img src="/artisan-weaving.png" alt="Artisan" />
            </div>
            <strong>ARTISAN</strong>
          </div>

          <div className="network-line" />

          <div className="network-box ted">
            <div className="ted-symbol">T</div>
            <strong>TEDKRAFT AI</strong>
            <small style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)' }}>
              Catalogue • Pricing • Matching
            </small>
          </div>

          <div className="network-line" />

          <div className="buyers">
            <div>
              HOTEL
              <b>{t.hotels}</b>
            </div>
            <div>
              B2B
              <b>{t.corporate}</b>
            </div>
            <div>
              RETAIL
              <b>{t.retailers}</b>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final">
        <span>TEDKRAFT AI</span>
        <h2>
          {t.finalTitle1} <strong>{t.finalTitle2}</strong>
        </h2>
        <p>{t.finalText}</p>
        <button type="button" className="primary-btn" onClick={() => startNewProduct()}>
          {t.finalButton}
        </button>
      </section>

      {/* FOOTER */}
      <footer>
        <strong>{t.footerTitle}</strong>
        <p>{t.footerText}</p>
        <small>{t.sih}</small>
      </footer>
    </main>
  );
};
