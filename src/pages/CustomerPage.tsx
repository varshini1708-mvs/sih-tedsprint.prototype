import React, { useState } from 'react';

export const CustomerPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const featuredProducts = [
    {
      id: 'c1',
      title: 'Traditional Bamboo Basket',
      category: 'BAMBOO CRAFT',
      description: 'Handwoven by skilled artisans using traditional bamboo techniques.',
      price: '₹750 – ₹850',
      imageUrl: '/bamboo-basket.png',
    },
    {
      id: 'c2',
      title: 'Handmade Terracotta Pot',
      category: 'POTTERY',
      description: 'A traditional handcrafted piece made using natural clay.',
      price: '₹450 – ₹600',
      imageUrl: '/pottery.png',
    },
    {
      id: 'c3',
      title: 'Traditional Cotton Weave',
      category: 'HANDLOOM',
      description: 'Handwoven using traditional techniques and natural fibres.',
      price: '₹1,200 – ₹1,500',
      imageUrl: '/handloom.png',
    },
  ];

  return (
    <main className="customer-main">
      {/* HERO */}
      <section className="customer-hero">
        <span style={{ fontSize: '11px', letterSpacing: '3px', color: 'var(--gold-dark)', fontWeight: 700 }}>
          {"DISCOVER INDIA'S HANDMADE HERITAGE"}
        </span>
        <h1>
          Discover the story <span>behind every craft.</span>
        </h1>
        <p className="customer-hero-text">
          Explore authentic handmade products created by skilled artisans and discover the stories, traditions and craftsmanship behind every creation.
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="customer-search">
          <input
            type="text"
            placeholder="Search for handmade crafts (e.g. bamboo, pottery, handloom)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">SEARCH →</button>
        </form>
      </section>

      {/* SHOP BY CRAFT CATEGORIES */}
      <section className="customer-section">
        <div className="section-heading">
          <p>EXPLORE</p>
          <h2>Shop by Craft</h2>
        </div>

        <div className="category-grid">
          <div className="category-card">
            <div className="category-icon">🧺</div>
            <h3>Bamboo Crafts</h3>
            <p>Handmade bamboo products crafted with tradition.</p>
          </div>

          <div className="category-card">
            <div className="category-icon">🏺</div>
            <h3>Pottery</h3>
            <p>Traditional handmade pottery and ceramic crafts.</p>
          </div>

          <div className="category-card">
            <div className="category-icon">🧵</div>
            <h3>Handloom</h3>
            <p>Traditional fabrics and handwoven creations.</p>
          </div>

          <div className="category-card">
            <div className="category-icon">🪵</div>
            <h3>Wood Crafts</h3>
            <p>Beautiful handmade wooden products and artwork.</p>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="customer-section">
        <div className="section-heading">
          <p>FEATURED CRAFTS</p>
          <h2>Discover Unique Creations</h2>
        </div>

        <div className="product-grid">
          {featuredProducts.map((item) => (
            <article key={item.id} className="customer-product">
              <div className="product-image-placeholder">
                <img src={item.imageUrl} alt={item.title} />
              </div>
              <div className="customer-product-info">
                <span className="product-category">{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="product-bottom">
                  <strong>{item.price}</strong>
                  <button
                    type="button"
                    onClick={() => setCartCount((prev) => prev + 1)}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* MEET THE MAKERS */}
      <section className="customer-section artisan-section">
        <div className="section-heading">
          <p>MEET THE MAKERS</p>
          <h2>Stories Behind the Craft</h2>
        </div>

        <div className="artisan-feature">
          <div className="artisan-avatar-lg">M</div>
          <div>
            <span style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--gold-dark)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
              FEATURED ARTISAN
            </span>
            <h2>Meet Murugan • Master Bamboo Artisan</h2>
            <p>
              {"\"Every bamboo basket is woven with skills passed down through three generations in Tamil Nadu. With TEDKRAFT, my craft now reaches homes and design lovers across India.\""}
            </p>
            <button type="button" className="outline-btn">
              VIEW ARTISAN STORY →
            </button>
          </div>
        </div>
      </section>

      {/* MY PURCHASES */}
      <section className="customer-section">
        <div className="section-heading">
          <p>MY PURCHASES</p>
          <h2>Orders ({cartCount})</h2>
        </div>

        {cartCount === 0 ? (
          <div className="empty-state" style={{ padding: '60px', textAlign: 'center', background: 'var(--paper-card)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>🛒</div>
            <h3>No orders yet</h3>
            <p>Start exploring handmade products and support talented artisans.</p>
          </div>
        ) : (
          <div style={{ background: 'var(--paper-card)', border: '1px solid var(--border-light)', padding: '20px' }}>
            <p style={{ color: 'var(--teal)', fontWeight: 700 }}>
              ✓ You have {cartCount} item(s) ready in your artisan cart!
            </p>
          </div>
        )}
      </section>

      {/* CUSTOMER PROFILE */}
      <section className="customer-section">
        <div className="section-heading">
          <p>MY ACCOUNT</p>
          <h2>Customer Profile</h2>
        </div>

        <div className="customer-profile-card">
          <div className="profile-avatar">C</div>
          <div>
            <h3>Craft Enthusiast</h3>
            <p>Discover • Support • Preserve Handmade Heritage</p>
          </div>
          <button type="button" className="outline-btn">
            EDIT PROFILE
          </button>
        </div>
      </section>
    </main>
  );
};
