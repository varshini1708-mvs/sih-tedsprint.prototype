import { ProductProfile, FairPriceBreakdown, ProcessVoiceResponse, NextQuestionResponse, InterviewMessage } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * Utility to execute fetch with timeout and structured error handling.
 */
async function fetchWithHandling<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server returned error status ${response.status}`);
    }

    return await response.json();
  } catch (err: any) {
    console.error(`API Call failed [${endpoint}]:`, err);
    if (err.name === 'TypeError' || err.message?.includes('fetch')) {
      throw new Error('Unable to connect to the AI service. Please check your backend connection.');
    }
    throw err;
  }
}

export const ApiService = {
  /**
   * Process voice recording audio blob via backend AI transcription/understanding
   */
  async processVoice(audioBlob: Blob, language: string = 'en'): Promise<ProcessVoiceResponse> {
    const formData = new FormData();
    const mime = audioBlob.type || 'audio/webm';
    let ext = 'webm';
    if (mime.includes('mp4') || mime.includes('m4a')) ext = 'mp4';
    else if (mime.includes('wav')) ext = 'wav';
    else if (mime.includes('ogg')) ext = 'ogg';

    formData.append('audio', audioBlob, `recording.${ext}`);
    formData.append('language', language);
    formData.append('voice_language', language);

    try {
      return await fetchWithHandling<ProcessVoiceResponse>('/api/process-voice', {
        method: 'POST',
        body: formData,
      });
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Voice transcription failed. Please try again.',
      };
    }
  },

  /**
   * Generate/refine product catalogue using current product profile
   */
  async generateCatalogue(productProfile: Partial<ProductProfile>): Promise<{ success: boolean; catalogue: ProductProfile; error?: string }> {
    try {
      const result = await fetchWithHandling<{ success: boolean; catalogue: ProductProfile }>('/api/catalogue/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: productProfile }),
      });
      return result;
    } catch (error: any) {
      console.warn('Catalogue API error:', error.message);
      return {
        success: false,
        catalogue: productProfile as ProductProfile,
        error: 'Unable to connect to AI catalogue service.',
      };
    }
  },

  /**
   * AI Follow-up Interview: determine missing info & generate next question
   */
  async getNextInterviewQuestion(
    productProfile: ProductProfile,
    conversationHistory: InterviewMessage[],
    language: string = 'en',
    askedQuestionIntents: string[] = []
  ): Promise<NextQuestionResponse> {
    const lastMsg = conversationHistory.length > 0 ? conversationHistory[conversationHistory.length - 1] : null;
    const userAnswerText = lastMsg && lastMsg.sender === 'user' ? lastMsg.text : '';

    console.log('[API] getNextInterviewQuestion request:', { productProfile, conversationHistory, language, askedQuestionIntents, userAnswerText });
    try {
      const res = await fetchWithHandling<any>('/api/interview/next', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productProfile,
          userAnswer: userAnswerText,
          conversationHistory,
          language,
          askedQuestionIntents,
        }),
      });
      console.log('[API] getNextInterviewQuestion response:', res);
      const questionText = res.nextQuestion || res.assistantMessage || res.question || null;
      const qLang = res.questionLanguage || res.nextQuestionLanguage || res.detectedLanguage || language;

      return {
        success: res.success ?? true,
        originalText: res.originalText || '',
        detectedLanguage: res.detectedLanguage || 'en',
        englishText: res.englishText || '',
        extractedFields: res.extractedFields || {},
        question: questionText,
        nextQuestion: questionText,
        assistantMessage: questionText,
        questionLanguage: qLang,
        nextQuestionLanguage: qLang,
        askedQuestionIntents: res.askedQuestionIntents || askedQuestionIntents,
        isComplete: res.isComplete ?? false,
        updatedProduct: res.updatedProduct || res.product,
        missingRequiredFields: res.missingRequiredFields || [],
        catalogue: res.catalogue,
        error: res.error,
      };
    } catch (error: any) {
      console.error('[API] Interview API error:', error.message);
      return {
        success: false,
        question: null,
        isComplete: false,
        error: error.message || 'Unable to connect to AI interview assistant.',
      };
    }
  },

  /**
   * Calculate transparent fair price breakdown
   */
  async getFairPrice(
    productProfile: ProductProfile,
    materialCost?: number,
    laborCost?: number,
    extraCharges?: number
  ): Promise<{ success: boolean; breakdown: FairPriceBreakdown; error?: string }> {
    try {
      return await fetchWithHandling<{ success: boolean; breakdown: FairPriceBreakdown }>('/api/fair-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productProfile,
          materialCost: materialCost || 0,
          laborCost: laborCost || 0,
          extraCharges: extraCharges || 0,
        }),
      });
    } catch (error: any) {
      console.warn('Fair price API error:', error.message);
      return {
        success: false,
        breakdown: {
          materialCost: materialCost || 0,
          laborCost: laborCost || 0,
          extraCharges: extraCharges || 0,
          totalCost: (materialCost || 0) + (laborCost || 0) + (extraCharges || 0),
          negotiationFloor: 0,
          recommendedMin: 0,
          recommendedMax: 0,
          estimatedMarketMin: 0,
          estimatedMarketMax: 0,
          currency: '₹',
          explanation: 'Unable to connect to fair price calculation service.',
        },
        error: 'Unable to connect to fair price calculation service.',
      };
    }
  }
};

function roundVal(num: number): number {
  return Math.round(num * 100) / 100;
}
