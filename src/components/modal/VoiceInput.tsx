import React from 'react';
import { useVoiceRecorder } from '../../hooks/useVoiceRecorder';
import { useLanguage } from '../../context/LanguageContext';

interface VoiceInputProps {
  onTranscriptCaptured: (text: string, parsedProduct?: any) => void;
  voiceLanguage?: string;
  onVoiceLanguageChange?: (lang: string) => void;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  onTranscriptCaptured,
  voiceLanguage: externalVoiceLang,
  onVoiceLanguageChange,
}) => {
  const { t } = useLanguage();
  const [internalVoiceLang, setInternalVoiceLang] = React.useState<string>('en');

  const activeVoiceLang = externalVoiceLang || internalVoiceLang;

  const handleLangChange = (lang: string) => {
    setInternalVoiceLang(lang);
    if (onVoiceLanguageChange) {
      onVoiceLanguageChange(lang);
    }
  };

  const {
    isRecording,
    isTranscribing,
    recordingTime,
    transcript,
    error,
    hasSpoken,
    silenceStatus,
    startRecording,
    stopRecording,
    cancelRecording,
    setTranscript,
  } = useVoiceRecorder(onTranscriptCaptured, activeVoiceLang);

  const handleMicClick = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  return (
    <div className="demo-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <label style={{ margin: 0 }}>{t.stepVoice}</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
          <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Voice language:</span>
          <select
            id="voiceLanguageSelect"
            value={activeVoiceLang}
            onChange={(e) => handleLangChange(e.target.value)}
            disabled={isRecording || isTranscribing}
            style={{
              padding: '3px 8px',
              borderRadius: '4px',
              border: '1px solid var(--gold-dark)',
              fontSize: '11px',
              fontWeight: 700,
              background: '#fff',
              color: 'var(--maroon)',
              cursor: 'pointer',
            }}
          >
            <option value="en">English</option>
            <option value="ta">தமிழ் / Tamil</option>
            <option value="hi">हिन्दी / Hindi</option>
          </select>
        </div>
      </div>

      <button
        id="voiceBtn"
        type="button"
        className={`voice-record-btn ${isRecording ? 'listening' : ''}`}
        onClick={handleMicClick}
        disabled={isTranscribing}
        data-listening={isRecording ? 'true' : undefined}
      >
        <span className="voice-symbol">
          {isRecording ? '🎙️' : isTranscribing ? '⏳' : '🎙️'}
        </span>

        <strong>
          {isRecording
            ? `LISTENING (${recordingTime}s)...`
            : isTranscribing
            ? 'TRANSCRIBING AUDIO...'
            : transcript
            ? t.voiceCaptured
            : t.tapSpeak}
        </strong>

        <small>
          {isRecording
            ? hasSpoken
              ? silenceStatus
              : 'Speak naturally — recording will stop automatically when you finish speaking'
            : isTranscribing
            ? 'Backend AI processing in progress...'
            : `Selected language: ${activeVoiceLang === 'ta' ? 'தமிழ் (Tamil)' : activeVoiceLang === 'hi' ? 'हिन्दी (Hindi)' : 'English'}`}
        </small>
      </button>

      {isRecording && (
        <div style={{ marginTop: '10px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            type="button"
            className="primary-btn"
            style={{ padding: '6px 14px', fontSize: '11px', background: 'var(--maroon)' }}
            onClick={() => stopRecording()}
          >
            ⏹ STOP & TRANSCRIBE
          </button>
          <button
            type="button"
            className="outline-btn"
            style={{ padding: '6px 14px', fontSize: '11px' }}
            onClick={cancelRecording}
          >
            ✖ CANCEL
          </button>
        </div>
      )}

      {error && (
        <div style={{ marginTop: '10px', color: '#c0392b', fontSize: '12px', background: '#fdf2e9', padding: '8px', border: '1px solid #e74c3c' }}>
          <strong>Notice:</strong> {error}
        </div>
      )}

      <div className="voice-transcript-box" id="voiceTranscriptBox" style={{ marginTop: '12px' }}>
        <div className="voice-transcript-head">
          <span>VOICE TRANSCRIPT</span>
          <small id="voiceTranscriptStatus" style={{ fontWeight: 700, color: transcript ? 'var(--teal)' : error ? '#c0392b' : 'var(--gold-dark)' }}>
            {isRecording
              ? silenceStatus
              : isTranscribing
              ? 'TRANSCRIBING AUDIO...'
              : transcript.trim()
              ? 'CAPTURED ✓'
              : error
              ? 'ERROR'
              : 'READY FOR VOICE INPUT'}
          </small>
        </div>

        <textarea
          style={{
            width: '100%',
            border: 'none',
            background: 'transparent',
            resize: 'none',
            fontFamily: 'inherit',
            fontSize: '13px',
            color: 'var(--maroon)',
            outline: 'none',
            height: '50px',
          }}
          value={transcript}
          placeholder="Your spoken transcript will appear here automatically when you speak..."
          onChange={(e) => {
            setTranscript(e.target.value);
            if (e.target.value.trim()) {
              onTranscriptCaptured(e.target.value);
            }
          }}
        />
      </div>
    </div>
  );
};
