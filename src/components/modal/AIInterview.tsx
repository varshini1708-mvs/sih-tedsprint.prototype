import React, { useState, useEffect, useCallback } from 'react';
import { useAIInterview } from '../../hooks/useAIInterview';
import { useVoiceRecorder } from '../../hooks/useVoiceRecorder';
import { useLanguage } from '../../context/LanguageContext';
import { ProductProfile } from '../../types';

interface AIInterviewProps {
  currentProfile: ProductProfile;
  onProfileUpdate: (updatedProfile: ProductProfile) => void;
  voiceLanguage?: string;
  onVoiceLanguageChange?: (lang: string) => void;
}

export const AIInterview: React.FC<AIInterviewProps> = ({
  currentProfile,
  onProfileUpdate,
  voiceLanguage = 'en',
  onVoiceLanguageChange,
}) => {
  const {
    conversationHistory,
    currentQuestion,
    nextQuestionLanguage,
    detectedLanguage,
    isComplete,
    isLoading,
    error,
    startInterview,
    submitAnswer,
  } = useAIInterview(currentProfile, onProfileUpdate, voiceLanguage);

  const [inputAnswer, setInputAnswer] = useState('');
  const [lastSpokenQuestion, setLastSpokenQuestion] = useState<string | null>(null);

  const activeQuestionLang = voiceLanguage || nextQuestionLanguage || detectedLanguage || 'en';

  // 1. Text-to-Speech (TTS) for AI Questions
  const speakQuestion = useCallback((text: string, langStr: string) => {
    if (!text || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel(); // Stop any previous speech
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const targetLang = (langStr || voiceLanguage || 'en').toLowerCase();
      let ttsLanguage = 'en-US';
      if (targetLang.startsWith('ta')) ttsLanguage = 'ta-IN';
      else if (targetLang.startsWith('hi')) ttsLanguage = 'hi-IN';
      else if (targetLang.startsWith('kn')) ttsLanguage = 'kn-IN';
      else if (targetLang.startsWith('te')) ttsLanguage = 'te-IN';

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = ttsLanguage;
      utterance.rate = 0.9;
      utterance.pitch = 1.0;

      const doSpeak = () => {
        const voices = window.speechSynthesis.getVoices() || [];
        
        // Console debug format requested by user
        console.log({
          ttsLanguage,
          question: text,
          availableVoices: voices.map(v => ({
            name: v.name,
            lang: v.lang
          }))
        });

        // Search for matching target voice
        const matchedVoice = voices.find(v => {
          const vLang = v.lang.toLowerCase().replace('_', '-');
          return vLang.startsWith(targetLang) ||
                 vLang.startsWith(ttsLanguage.toLowerCase()) ||
                 vLang.startsWith(ttsLanguage.substring(0, 2).toLowerCase());
        });

        // CRITICAL: Only set voice if a matching language voice is found.
        // Never set an English voice when speaking Tamil or Hindi.
        if (matchedVoice) {
          utterance.voice = matchedVoice;
        }

        console.log('[AI TTS DEBUG]', {
          text: text,
          lang: ttsLanguage,
          voice: utterance.voice ? utterance.voice.name : 'default (browser locale)',
        });

        utterance.onstart = () => {
          console.log('[AI TTS] Started speaking question in:', ttsLanguage);
        };
        utterance.onerror = (evt) => {
          console.warn('[AI TTS] Speech synthesis utterance error:', evt);
        };

        window.speechSynthesis.speak(utterance);
      };

      // Handle async voice loading (Chrome/Edge onvoiceschanged)
      const currentVoices = window.speechSynthesis.getVoices();
      if (!currentVoices || currentVoices.length === 0) {
        let hasSpoken = false;
        window.speechSynthesis.onvoiceschanged = () => {
          if (!hasSpoken) {
            hasSpoken = true;
            window.speechSynthesis.onvoiceschanged = null;
            doSpeak();
          }
        };
        setTimeout(() => {
          if (!hasSpoken) {
            hasSpoken = true;
            doSpeak();
          }
        }, 150);
      } else {
        doSpeak();
      }
    } catch (e) {
      console.warn('Speech synthesis failed:', e);
    }
  }, [voiceLanguage]);

  // Speak AI question whenever a new question is rendered
  useEffect(() => {
    if (currentQuestion && !isComplete) {
      const targetLang = (activeQuestionLang || 'en').toLowerCase();
      let targetCode = 'en-US';
      if (targetLang.startsWith('ta')) targetCode = 'ta-IN';
      else if (targetLang.startsWith('hi')) targetCode = 'hi-IN';

      console.log('[AI INTERVIEW DEBUG]', {
        questionLanguage: activeQuestionLang,
        questionText: currentQuestion,
        ttsLanguage: targetCode,
        voiceLanguage: voiceLanguage,
      });

      if (currentQuestion !== lastSpokenQuestion) {
        setLastSpokenQuestion(currentQuestion);
        speakQuestion(currentQuestion, activeQuestionLang);
      }
    }
  }, [currentQuestion, lastSpokenQuestion, isComplete, activeQuestionLang, voiceLanguage, speakQuestion]);

  // 2. Voice Answer Integration using existing useVoiceRecorder hook
  const handleVoiceCaptured = useCallback((text: string) => {
    console.log('[AIInterview] Voice answer captured:', text);
    if (text && text.trim()) {
      setInputAnswer(text);
    }
  }, []);

  const {
    isRecording,
    isTranscribing,
    recordingTime,
    silenceStatus,
    error: voiceError,
    startRecording,
    stopRecording,
    cancelRecording,
  } = useVoiceRecorder(handleVoiceCaptured, activeQuestionLang);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputAnswer.trim() || isLoading) return;

    const answer = inputAnswer;
    setInputAnswer('');
    await submitAnswer(answer);
  };

  return (
    <div className="ai-interview-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{ fontSize: '11px', letterSpacing: '2px', color: 'var(--gold-dark)', fontWeight: 700 }}>
          ✦ AI FOLLOW-UP INTERVIEW
        </span>
        <span style={{ fontSize: '11px', color: isComplete ? 'var(--teal)' : 'var(--gold-dark)', fontWeight: 700 }}>
          {isComplete
            ? 'INTERVIEW COMPLETE ✓'
            : isLoading
            ? 'AI THINKING...'
            : conversationHistory.length > 0
            ? 'IN PROGRESS'
            : 'READY TO START'}
        </span>
      </div>

      {conversationHistory.length === 0 && !isComplete && (
        <div style={{ background: '#fdfbf7', border: '1px solid var(--border-light)', padding: '14px', textAlign: 'center', marginBottom: '10px' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>
            Let AI inspect your current product information and ask follow-up questions to fill missing details.
          </p>
          <button
            type="button"
            className="primary-btn"
            style={{ padding: '8px 20px', fontSize: '11px' }}
            onClick={startInterview}
            disabled={isLoading}
          >
            {isLoading ? 'ANALYSING PROFILE...' : 'START AI INTERVIEW →'}
          </button>
        </div>
      )}

      {conversationHistory.length > 0 && (
        <div className="interview-chat-log" style={{ maxHeight: '220px', overflowY: 'auto', marginBottom: '10px' }}>
          {conversationHistory.map((msg) => (
            <div key={msg.id} className={`chat-msg ${msg.sender}`} style={{ margin: '8px 0', fontSize: '12px' }}>
              <strong>{msg.sender === 'ai' ? 'TEDKRAFT AI: ' : 'YOU: '}</strong>
              {msg.text}
            </div>
          ))}
        </div>
      )}

      {/* Audio Question Replay Control */}
      {currentQuestion && !isComplete && (
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            className="outline-btn"
            style={{ padding: '4px 10px', fontSize: '11px', borderColor: 'var(--gold-dark)', color: 'var(--gold-dark)' }}
            onClick={() => speakQuestion(currentQuestion, activeQuestionLang)}
          >
            🔊 Replay Question
          </button>
          <small style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            AI speaks in {activeQuestionLang.toUpperCase()}
          </small>
        </div>
      )}

      {/* Voice Answer Recording Controls */}
      {conversationHistory.length > 0 && !isComplete && (
        <div style={{ background: '#fcf8f2', border: '1px solid var(--border-light)', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--maroon)' }}>
              ANSWER BY VOICE OR TYPE BELOW:
            </span>
            <span style={{ fontSize: '10px', color: isRecording ? 'var(--teal)' : 'var(--text-muted)' }}>
              {isRecording ? `REC (${recordingTime}s) - ${silenceStatus}` : isTranscribing ? 'TRANSCRIBING...' : 'Microphone Ready'}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {!isRecording ? (
              <button
                type="button"
                className="voice-record-btn"
                style={{ padding: '6px 14px', fontSize: '11px', flex: 1 }}
                onClick={() => startRecording()}
                disabled={isTranscribing || isLoading}
              >
                🎙️ Answer by Voice
              </button>
            ) : (
              <>
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
                  onClick={() => cancelRecording()}
                >
                  ✖ CANCEL
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {(error || voiceError) && (
        <div style={{ fontSize: '12px', color: '#c0392b', marginBottom: '10px', background: '#fdf2e9', padding: '8px', border: '1px solid #e74c3c' }}>
          <strong>Notice:</strong> {error || voiceError}
        </div>
      )}

      {/* Text Input Row / Answer Submission */}
      {conversationHistory.length > 0 && !isComplete && (
        <form onSubmit={handleSend} className="interview-input-row" style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            style={{ flex: 1, padding: '8px 12px', fontSize: '12px', border: '1px solid var(--border-light)' }}
            placeholder={
              isTranscribing
                ? 'Transcribing audio answer...'
                : isLoading
                ? 'AI is processing...'
                : 'Transcribed answer will appear here or type answer...'
            }
            value={inputAnswer}
            onChange={(e) => setInputAnswer(e.target.value)}
            disabled={isLoading || isTranscribing}
          />
          <button
            type="submit"
            className="primary-btn"
            style={{ padding: '8px 16px', fontSize: '11px' }}
            disabled={isLoading || isTranscribing || !inputAnswer.trim()}
          >
            {isLoading ? 'SENDING...' : 'SUBMIT ANSWER →'}
          </button>
        </form>
      )}

      {isComplete && (
        <div style={{ background: '#eafaf1', color: 'var(--teal)', padding: '10px', fontSize: '12px', textAlign: 'center', fontWeight: 700, border: '1px solid var(--teal)' }}>
          ✓ All product details collected! Your catalogue has been updated with the complete artisan story.
        </div>
      )}
    </div>
  );
};
