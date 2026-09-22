export type Language = 'en' | 'ta' | 'hi' | 'kn' | 'te';

export type ActiveDomain = 'artisan' | 'customer';

export interface ProductProfile {
  id?: string;
  title: string;
  category: string;
  material: string;
  craft: string;
  description: string;
  weight?: string;
  workDays?: string;
  price?: number | null;
  priceRangeMin?: number;
  priceRangeMax?: number;
  keyFeatures?: string[];
  suitableUses?: string[];
  location?: string;
  artisanName?: string;
  additionalInformation?: string;
  imageUrl?: string;
  createdAt?: string;
  isAiEnhanced?: boolean;
  matchScore?: string;
}

export interface InterviewMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export interface InterviewState {
  currentProfile: ProductProfile;
  conversationHistory: InterviewMessage[];
  collectedFields: string[];
  currentQuestion: string | null;
  questionLanguage?: string;
  nextQuestionLanguage?: string;
  askedQuestionIntents?: string[];
  detectedLanguage?: string;
  originalText?: string;
  englishText?: string;
  extractedFields?: Record<string, any>;
  isComplete: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface FairPriceBreakdown {
  materialCost: number;
  laborCost: number;
  extraCharges: number;
  totalCost: number;
  negotiationFloor: number;
  recommendedMin: number;
  recommendedMax: number;
  estimatedMarketMin: number;
  estimatedMarketMax: number;
  currency: string;
  explanation?: string;
}

export interface ProcessVoiceResponse {
  success: boolean;
  originalText?: string;
  detectedLanguage?: string;
  englishText?: string;
  extractedFields?: Record<string, any>;
  product?: Partial<ProductProfile>;
  error?: string;
}

export interface NextQuestionResponse {
  success: boolean;
  originalText?: string;
  detectedLanguage?: string;
  englishText?: string;
  extractedFields?: Record<string, any>;
  question?: string | null;
  nextQuestion?: string | null;
  assistantMessage?: string | null;
  questionLanguage?: string;
  nextQuestionLanguage?: string;
  askedQuestionIntents?: string[];
  isComplete: boolean;
  updatedProduct?: Partial<ProductProfile>;
  missingRequiredFields?: string[];
  catalogue?: any;
  error?: string;
}
