import { useState, useRef, useCallback, useEffect } from 'react';
import { ApiService } from '../api/client';
import { ProcessVoiceResponse } from '../types';

export interface UseVoiceRecorderReturn {
  isRecording: boolean;
  isTranscribing: boolean;
  recordingTime: number;
  transcript: string;
  error: string | null;
  hasSpoken: boolean;
  silenceStatus: string;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<ProcessVoiceResponse | null>;
  cancelRecording: () => void;
  setTranscript: (text: string) => void;
  resetVoiceState: () => void;
}

const MAX_RECORDING_TIME = 60; // 60 seconds max
const SILENCE_TIMEOUT = 2200; // 2.2 seconds of silence after speech triggers auto-stop
const VOLUME_THRESHOLD = 0.012; // RMS audio level threshold for speech detection

function getBestMimeType(): string {
  const types = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/mp4',
    'audio/aac',
    'audio/ogg;codecs=opus',
  ];
  for (const t of types) {
    if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(t)) {
      return t;
    }
  }
  return '';
}

export function useVoiceRecorder(
  onTranscriptCaptured?: (text: string, parsedData?: any) => void,
  voiceLanguage: string = 'en'
): UseVoiceRecorderReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [hasSpoken, setHasSpoken] = useState(false);
  const [silenceStatus, setSilenceStatus] = useState<string>('WAITING');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const silenceTimerRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const isStoppingRef = useRef<boolean>(false);
  const mimeTypeRef = useRef<string>('audio/webm');

  const stopAudioTracksAndNodes = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (e) {
        // Ignore
      }
      audioContextRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  }, []);

  const cancelRecording = useCallback(() => {
    isStoppingRef.current = true;
    stopAudioTracksAndNodes();
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {
        // Ignore
      }
    }
    setIsRecording(false);
    setIsTranscribing(false);
    setRecordingTime(0);
    setHasSpoken(false);
    setSilenceStatus('CANCELLED');
    audioChunksRef.current = [];
  }, [stopAudioTracksAndNodes]);

  const resetVoiceState = useCallback(() => {
    cancelRecording();
    setTranscript('');
    setError(null);
  }, [cancelRecording]);

  const stopRecording = useCallback(async (): Promise<ProcessVoiceResponse | null> => {
    if (isStoppingRef.current) return null;
    isStoppingRef.current = true;

    if (!mediaRecorderRef.current || mediaRecorderRef.current.state === 'inactive') {
      stopAudioTracksAndNodes();
      setIsRecording(false);
      return null;
    }

    return new Promise((resolve) => {
      const mediaRecorder = mediaRecorderRef.current!;

      mediaRecorder.onstop = async () => {
        // Stop audio stream tracks AFTER MediaRecorder has finished collecting final chunks
        stopAudioTracksAndNodes();

        const blobType = mimeTypeRef.current || 'audio/webm';
        const audioBlob = new Blob(audioChunksRef.current, { type: blobType });
        setIsRecording(false);
        setIsTranscribing(true);

        console.log('[VOICE DEBUG] Recording stopped & processing:', {
          selectedVoiceLanguage: voiceLanguage,
          chunkCount: audioChunksRef.current.length,
          blobSize: audioBlob.size,
          blobType: audioBlob.type,
        });

        try {
          if (audioBlob.size === 0) {
            throw new Error('Recorded audio stream was empty. Please speak clearly into your microphone and try again.');
          }

          const result = await ApiService.processVoice(audioBlob, voiceLanguage);

          console.log('[VOICE DEBUG] Backend transcription response:', result);

          if (result.success && result.originalText) {
            setTranscript(result.originalText);
            setSilenceStatus('CAPTURED ✓');
            if (onTranscriptCaptured) {
              onTranscriptCaptured(result.originalText, result.product);
            }
          } else {
            const errStr = result.error || 'No speech was detected. Please speak clearly into your microphone and try again.';
            setError(errStr);
            setSilenceStatus('ERROR');
          }

          setIsTranscribing(false);
          resolve(result);
        } catch (err: any) {
          console.error('[VOICE DEBUG] Transcription error:', err);
          setError(err.message || 'Voice transcription failed. Please check backend connection.');
          setSilenceStatus('ERROR');
          setIsTranscribing(false);
          resolve(null);
        }
      };

      try {
        mediaRecorder.stop();
      } catch (e) {
        stopAudioTracksAndNodes();
        setIsRecording(false);
        setIsTranscribing(false);
        resolve(null);
      }
    });
  }, [stopAudioTracksAndNodes, onTranscriptCaptured, voiceLanguage]);

  const startRecording = useCallback(async () => {
    setError(null);
    audioChunksRef.current = [];
    setRecordingTime(0);
    setHasSpoken(false);
    setSilenceStatus('LISTENING');
    isStoppingRef.current = false;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      // 1. Configure Web Audio API for volume and silence detection
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioCtx();
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      let userSpoke = false;

      const checkAudioLevel = () => {
        if (isStoppingRef.current) return;

        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;
        const normalizedVolume = average / 255;

        if (normalizedVolume > VOLUME_THRESHOLD) {
          if (!userSpoke) {
            userSpoke = true;
            setHasSpoken(true);
            setSilenceStatus('SPEECH DETECTED');
          }
          // Reset silence timer whenever user is actively speaking
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = null;
          }
        } else if (userSpoke) {
          // User has spoken, now experiencing silence
          if (!silenceTimerRef.current) {
            setSilenceStatus('SILENCE DETECTED — AUTO STOPPING...');
            silenceTimerRef.current = window.setTimeout(() => {
              stopRecording();
            }, SILENCE_TIMEOUT);
          }
        }

        animFrameRef.current = requestAnimationFrame(checkAudioLevel);
      };

      animFrameRef.current = requestAnimationFrame(checkAudioLevel);

      // 2. Configure MediaRecorder with cross-browser MIME type
      const mimeType = getBestMimeType();
      mimeTypeRef.current = mimeType;

      const mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start(200);
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);

      // 3. Recording timer & 60s max duration check
      timerRef.current = window.setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= MAX_RECORDING_TIME - 1) {
            stopRecording();
            return MAX_RECORDING_TIME;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err: any) {
      console.error('Microphone access error:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('Microphone access was denied. Please allow microphone permissions in your browser settings.');
      } else {
        setError('Unable to access microphone. Please check your audio input settings.');
      }
      setIsRecording(false);
    }
  }, [stopRecording]);

  useEffect(() => {
    return () => {
      stopAudioTracksAndNodes();
    };
  }, [stopAudioTracksAndNodes]);

  return {
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
    resetVoiceState,
  };
}
