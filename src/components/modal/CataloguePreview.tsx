import React from 'react';
import { ProductProfile } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface CataloguePreviewProps {
  product: ProductProfile;
  statusText: string;
}

export const CataloguePreview: React.FC<CataloguePreviewProps> = ({ product, statusText }) => {
  const { t } = useLanguage();

  return (
    <div className="ai-result">
      <div className="result-head">
        <span>{t.generatedCatalogue}</span>
        <b id="status">{statusText}</b>
      </div>

      <div className="catalogue">
        <div className="catalogue-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f0eb' }}>
          {product.imageUrl ? (
            <img
              id="catalogueImage"
              src={product.imageUrl}
              alt={product.title || 'Artisan product'}
            />
          ) : (
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>📷 Photo Pending</span>
          )}
        </div>

        <div>
          <small id="catalogueCategory">{product.category || 'Not provided'}</small>

          <h3 id="catalogueTitle">
            {product.title || 'Product Title Not Provided'}
          </h3>

          <p id="catalogueDescription">
            {product.description || 'Description not provided yet.'}
          </p>

          <div className="details">
            <span>
              {t.material}
              <b id="catalogueMaterial">{product.material || 'Not provided'}</b>
            </span>

            <span>
              {t.craft}
              <b id="catalogueCraft">{product.craft || 'Not provided'}</b>
            </span>

            <span>
              {t.time}
              <b id="catalogueTime">{product.workDays || 'Not provided'}</b>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
