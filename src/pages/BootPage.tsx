import React, { useState, useEffect } from 'react';

interface BootPageProps {
  onComplete: () => void;
}

export const BootPage: React.FC<BootPageProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 800);
          return 100;
        }
        return prev + 5;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div id="tedkraftBoot" className="boot-screen-container">
      <div className="boot-box">
        <div className="boot-symbol-circle">
          T
        </div>

        <h1 className="boot-logo-title">
          TEDKRAFT
        </h1>

        <div className="boot-divider-row">
          <span className="boot-line-rule" />
          <p className="boot-subtitle-text">
            INDIAN CRAFT × MODERN TECHNOLOGY
          </p>
          <span className="boot-line-rule" />
        </div>

        <div className="boot-progress-wrapper">
          <div className="boot-progress-labels">
            <span>INITIALIZING</span>
            <span>{progress}%</span>
          </div>
          <div className="boot-progress-track">
            <div
              className="boot-progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="boot-heritage-quote">
          {"Preserving India's handmade heritage through AI."}
        </p>
      </div>
    </div>
  );
};
