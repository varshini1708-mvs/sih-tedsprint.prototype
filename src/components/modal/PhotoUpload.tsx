import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface PhotoUploadProps {
  onPhotoSelected: (imageUrl: string) => void;
  currentImageUrl?: string;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({ onPhotoSelected, currentImageUrl }) => {
  const { t } = useLanguage();
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(currentImageUrl);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onPhotoSelected(url);
    }
  };

  return (
    <div className="demo-card">
      <label>{t.stepPhoto}</label>

      <label className="upload" htmlFor="imageInput">
        <span className="upload-symbol">📸</span>
        <strong>{t.uploadProduct}</strong>
        <small>{t.imageTypes}</small>

        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>

      <div className="photo-status">
        {previewUrl ? 'PHOTO READY ✓' : 'READY FOR PRODUCT PHOTO'}
      </div>

      {previewUrl && (
        <div id="imagePreview" style={{ textAlign: 'center' }}>
          <img src={previewUrl} alt="Product Preview" className="preview-img" />
        </div>
      )}
    </div>
  );
};
