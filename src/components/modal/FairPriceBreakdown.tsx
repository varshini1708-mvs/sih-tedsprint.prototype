import React, { useState } from 'react';
import { FairPriceBreakdown as FairPriceType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface FairPriceBreakdownProps {
  breakdown: FairPriceType | null;
  isVisible: boolean;
  onCalculateWithCosts?: (material: number, labor: number, extra: number) => void;
}

export const FairPriceBreakdown: React.FC<FairPriceBreakdownProps> = ({
  breakdown,
  isVisible,
  onCalculateWithCosts,
}) => {
  const { t } = useLanguage();
  const [materialInput, setMaterialInput] = useState<string>('');
  const [laborInput, setLaborInput] = useState<string>('');
  const [extraInput, setExtraInput] = useState<string>('');

  if (!isVisible) return null;

  const currency = breakdown ? breakdown.currency : '₹';

  const handleRecalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (onCalculateWithCosts) {
      const mat = parseFloat(materialInput) || 0;
      const lab = parseFloat(laborInput) || 0;
      const ext = parseFloat(extraInput) || 0;
      onCalculateWithCosts(mat, lab, ext);
    }
  };

  return (
    <div id="price" className="price-result active" aria-live="polite" style={{ marginTop: '15px' }}>
      <small>{t.fairPriceRange}</small>

      {breakdown && (
        <strong style={{ fontSize: '18px', display: 'block', margin: '8px 0', color: 'var(--maroon)' }}>
          Recommended: {currency}{breakdown.recommendedMin} — {currency}{breakdown.recommendedMax}
        </strong>
      )}

      {/* Artisan Cost Inputs */}
      <form onSubmit={handleRecalculate} style={{ margin: '12px auto', maxWidth: '400px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', textAlign: 'left' }}>
        <div>
          <label style={{ fontSize: '10px', color: 'var(--gold-dark)', display: 'block', fontWeight: 600 }}>MATERIAL (₹)</label>
          <input
            type="number"
            value={materialInput}
            onChange={(e) => setMaterialInput(e.target.value)}
            style={{ width: '100%', padding: '6px', fontSize: '12px', border: '1px solid var(--border-light)' }}
            placeholder="200"
          />
        </div>
        <div>
          <label style={{ fontSize: '10px', color: 'var(--gold-dark)', display: 'block', fontWeight: 600 }}>LABOUR (₹)</label>
          <input
            type="number"
            value={laborInput}
            onChange={(e) => setLaborInput(e.target.value)}
            style={{ width: '100%', padding: '6px', fontSize: '12px', border: '1px solid var(--border-light)' }}
            placeholder="300"
          />
        </div>
        <div>
          <label style={{ fontSize: '10px', color: 'var(--gold-dark)', display: 'block', fontWeight: 600 }}>EXTRA (₹)</label>
          <input
            type="number"
            value={extraInput}
            onChange={(e) => setExtraInput(e.target.value)}
            style={{ width: '100%', padding: '6px', fontSize: '12px', border: '1px solid var(--border-light)' }}
            placeholder="50"
          />
        </div>
        <button
          type="submit"
          className="outline-btn"
          style={{ gridColumn: 'span 3', padding: '6px', fontSize: '11px', marginTop: '4px' }}
        >
          RECALCULATE PRICE BREAKDOWN →
        </button>
      </form>

      {breakdown && (
        <div style={{ margin: '12px auto', maxWidth: '400px', fontSize: '12px', textAlign: 'left', background: '#ffffff', padding: '12px', border: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span>Material Cost:</span>
            <strong>{currency}{breakdown.materialCost}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span>Labour Cost:</span>
            <strong>{currency}{breakdown.laborCost}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span>Extra Charges:</span>
            <strong>{currency}{breakdown.extraCharges}</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '4px', marginTop: '4px', color: 'var(--maroon)' }}>
            <strong>Total Cost:</strong>
            <strong>{currency}{breakdown.totalCost}</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', color: '#7f8c8d' }}>
            <span>Negotiation Floor (Floor Price):</span>
            <strong>{currency}{breakdown.negotiationFloor}</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', color: 'var(--gold-dark)' }}>
            <span>Recommended Price Range:</span>
            <strong>{currency}{breakdown.recommendedMin} — {currency}{breakdown.recommendedMax}</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', color: 'var(--teal)' }}>
            <span>Estimated Market Range:</span>
            <strong>{currency}{breakdown.estimatedMarketMin} — {currency}{breakdown.estimatedMarketMax}</strong>
          </div>
        </div>
      )}

      <p style={{ fontSize: '11px', color: '#7f8c8d', marginTop: '8px' }}>
        Calculated deterministically using exact material costs, labor days, extra charges, and transparent margin policies.
      </p>
    </div>
  );
};
