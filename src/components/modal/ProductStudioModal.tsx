import React from 'react';
import { useProduct } from '../../context/ProductContext';
import { useLanguage } from '../../context/LanguageContext';
import { VoiceInput } from './VoiceInput';
import { PhotoUpload } from './PhotoUpload';
import { AIInterview } from './AIInterview';
import { CataloguePreview } from './CataloguePreview';
import { FairPriceBreakdown } from './FairPriceBreakdown';

export const ProductStudioModal: React.FC = () => {
  const { t } = useLanguage();
  const [voiceLanguage, setVoiceLanguage] = React.useState<string>('en');

  const {
    isDemoModalOpen,
    closeDemoModal,
    startNewProduct,
    currentProduct,
    updateCurrentProduct,
    generateCatalogue,
    calculateFairPrice,
    isGeneratingCatalogue,
    isCalculatingPrice,
    statusText,
    fairPriceBreakdown,
    showPriceBreakdown,
    error,
  } = useProduct();

  if (!isDemoModalOpen) return null;

  const handleTranscriptCaptured = (text: string, parsedProduct?: any) => {
    if (parsedProduct) {
      updateCurrentProduct(parsedProduct);
    } else {
      updateCurrentProduct({
        description: text,
      });
    }
  };

  const handlePhotoSelected = (imageUrl: string) => {
    updateCurrentProduct({ imageUrl });
  };

  return (
    <div id="demo" className={`modal ${isDemoModalOpen ? 'active' : ''}`}>
      <div className="modal-box">
        <button type="button" className="close" onClick={closeDemoModal} aria-label="Close modal">
          ×
        </button>

        <div className="modal-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span>{t.modalEngine}</span>
            <h2>{t.createProduct}</h2>
            <p>{t.modalDescription}</p>
          </div>
          <button
            type="button"
            className="outline-btn"
            style={{ fontSize: '11px', padding: '4px 10px', marginTop: '10px', borderColor: 'var(--gold-dark)', color: 'var(--gold-dark)' }}
            onClick={() => startNewProduct(false)}
            title="Clear all fields and start a fresh product"
          >
            ✦ Start Fresh Product
          </button>
        </div>

        <div className="studio-progress" aria-label="Product creation steps">
          <div className="studio-step active">
            <span>01</span>
            <b>{t.speak}</b>
          </div>
          <div className="studio-step active">
            <span>02</span>
            <b>PHOTO</b>
          </div>
          <div className="studio-step active">
            <span>03</span>
            <b>CATALOGUE</b>
          </div>
        </div>

        {error && (
          <div style={{ background: '#fdf2e9', color: '#c0392b', border: '1px solid #e74c3c', padding: '10px 14px', marginBottom: '15px', fontSize: '13px' }}>
            {error}
          </div>
        )}

        <div className="demo-grid">
          <VoiceInput
            onTranscriptCaptured={handleTranscriptCaptured}
            voiceLanguage={voiceLanguage}
            onVoiceLanguageChange={setVoiceLanguage}
          />
          <PhotoUpload onPhotoSelected={handlePhotoSelected} currentImageUrl={currentProduct.imageUrl} />
        </div>

        {/* AI Follow-up Interview section */}
        <AIInterview
          currentProfile={currentProduct}
          onProfileUpdate={updateCurrentProduct}
          voiceLanguage={voiceLanguage}
          onVoiceLanguageChange={setVoiceLanguage}
        />

        {/* Dynamic Catalogue Display */}
        <CataloguePreview product={currentProduct} statusText={statusText} />

        <div className="modal-buttons">
          <button
            type="button"
            className="primary-btn"
            onClick={generateCatalogue}
            disabled={isGeneratingCatalogue}
          >
            {isGeneratingCatalogue ? 'GENERATING...' : t.generateCatalogueBtn}
          </button>

          <button
            type="button"
            className="outline-btn"
            onClick={() => calculateFairPrice()}
            disabled={isCalculatingPrice}
          >
            {isCalculatingPrice ? 'CALCULATING...' : t.fairPriceButton}
          </button>
        </div>

        <FairPriceBreakdown
          breakdown={fairPriceBreakdown}
          isVisible={showPriceBreakdown}
          onCalculateWithCosts={(material, labor, extra) => calculateFairPrice(material, labor, extra)}
        />
      </div>
    </div>
  );
};
