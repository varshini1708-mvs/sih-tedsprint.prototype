import { useState, useCallback, useEffect } from 'react';
import { ProductProfile, InterviewMessage, InterviewState } from '../types';
import { ApiService } from '../api/client';

const EMPTY_PRODUCT_PROFILE: ProductProfile = {
  title: '',
  category: '',
  material: '',
  craft: '',
  description: '',
  workDays: '',
};

/**
 * Safely merges updated product fields into existing product profile.
 * CRITICAL REQUIREMENT:
 * Never overwrite an existing non-empty field with an empty/null/undefined value.
 */
export function safeMergeProductProfile(
  current: ProductProfile,
  incoming?: Partial<ProductProfile> | null
): ProductProfile {
  if (!incoming) return current;

  const merged: ProductProfile = { ...current };

  (Object.keys(incoming) as Array<keyof ProductProfile>).forEach((key) => {
    const val = incoming[key];
    // Only update if incoming value is valid and non-empty
    if (val !== undefined && val !== null && val !== '') {
      if (Array.isArray(val)) {
        if (val.length > 0) {
          (merged as any)[key] = val;
        }
      } else {
        (merged as any)[key] = val;
      }
    }
  });

  return merged;
}

export function useAIInterview(
  currentProfile: ProductProfile,
  onProfileUpdate?: (updatedProfile: ProductProfile) => void,
  language: string = 'en'
) {
  const [state, setState] = useState<InterviewState>({
    currentProfile: currentProfile || EMPTY_PRODUCT_PROFILE,
    conversationHistory: [],
    collectedFields: [],
    currentQuestion: null,
    isComplete: false,
    isLoading: false,
    error: null,
  });

  // Keep local currentProfile state synchronized with parent currentProfile prop
  useEffect(() => {
    if (!currentProfile) return;

    const isEmptyFreshProduct =
      !currentProfile.title?.trim() &&
      !currentProfile.category?.trim() &&
      !currentProfile.material?.trim() &&
      !currentProfile.craft?.trim() &&
      !currentProfile.description?.trim() &&
      !currentProfile.workDays?.trim();

    if (isEmptyFreshProduct) {
      console.log('[useAIInterview] NEW PRODUCT CREATED');
      console.log('ProductProfile after reset:', currentProfile);
      console.log('Previous workDays:', state.currentProfile.workDays || 'null/empty');
      console.log('Current workDays:', currentProfile.workDays || 'null/empty');
      console.log('Interview history length:', 0);
      console.log('Missing fields: title, category, material, craft, description, workDays');

      setState({
        currentProfile: { ...EMPTY_PRODUCT_PROFILE, ...currentProfile },
        conversationHistory: [],
        collectedFields: [],
        currentQuestion: null,
        isComplete: false,
        isLoading: false,
        error: null,
      });
    } else {
      setState((prev) => ({
        ...prev,
        currentProfile: safeMergeProductProfile(prev.currentProfile, currentProfile),
      }));
    }
  }, [currentProfile]);

  /**
   * Update product profile directly with safe merge
   */
  const updateProfile = useCallback(
    (delta: Partial<ProductProfile>) => {
      setState((prev) => {
        const mergedProfile = safeMergeProductProfile(prev.currentProfile, delta);
        if (onProfileUpdate) {
          onProfileUpdate(mergedProfile);
        }
        return {
          ...prev,
          currentProfile: mergedProfile,
        };
      });
    },
    [onProfileUpdate]
  );

  /**
   * Submit an artisan answer to the AI interview
   */
  const submitAnswer = useCallback(
    async (userAnswerText: string) => {
      if (!userAnswerText.trim()) return;

      const userMessage: InterviewMessage = {
        id: `msg-${Date.now()}-user`,
        sender: 'user',
        text: userAnswerText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      const updatedHistory = [...state.conversationHistory, userMessage];

      setState((prev) => ({
        ...prev,
        conversationHistory: updatedHistory,
        isLoading: true,
        error: null,
      }));

      try {
        const profileToSubmit = safeMergeProductProfile(state.currentProfile, currentProfile);
        console.log('[useAIInterview] submitAnswer profileToSubmit:', profileToSubmit);
        const result = await ApiService.getNextInterviewQuestion(
          profileToSubmit,
          updatedHistory,
          language,
          state.askedQuestionIntents || []
        );
        console.log('[useAIInterview] submitAnswer result:', result);

        if (result.success) {
          const mergedProfile = safeMergeProductProfile(profileToSubmit, result.updatedProduct);

          if (onProfileUpdate) {
            onProfileUpdate(mergedProfile);
          }

          const qText = result.question || result.nextQuestion || result.assistantMessage || null;
          const qLang = result.questionLanguage || result.nextQuestionLanguage || result.detectedLanguage || language;
          const newMessages = [...updatedHistory];
          if (qText) {
            newMessages.push({
              id: `msg-${Date.now()}-ai`,
              sender: 'ai',
              text: qText,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            });
          }

          const isFullyComplete = result.isComplete || (
            !!mergedProfile.title?.trim() &&
            !!mergedProfile.category?.trim() &&
            !!mergedProfile.material?.trim() &&
            !!mergedProfile.craft?.trim() &&
            !!mergedProfile.description?.trim() &&
            !!mergedProfile.workDays?.trim()
          );

          setState((prev) => ({
            ...prev,
            currentProfile: mergedProfile,
            conversationHistory: newMessages,
            currentQuestion: isFullyComplete ? null : qText,
            questionLanguage: qLang,
            nextQuestionLanguage: qLang,
            askedQuestionIntents: result.askedQuestionIntents || prev.askedQuestionIntents || [],
            detectedLanguage: result.detectedLanguage || prev.detectedLanguage || language,
            originalText: result.originalText || userAnswerText,
            englishText: result.englishText || '',
            extractedFields: result.extractedFields || {},
            isComplete: isFullyComplete,
            isLoading: false,
          }));
        } else {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: result.error || 'Failed to process interview response.',
          }));
        }
      } catch (err: any) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: err.message || 'Unable to connect to AI interview assistant.',
        }));
      }
    },
    [state.conversationHistory, state.currentProfile, state.askedQuestionIntents, currentProfile, onProfileUpdate, language]
  );

  /**
   * Start AI Interview explicitly by fetching initial missing field question
   */
  const startInterview = useCallback(async () => {
    const profileToSubmit = safeMergeProductProfile(state.currentProfile, currentProfile);
    console.log('[useAIInterview] START AI INTERVIEW button clicked. Current Profile:', profileToSubmit);
    
    // Check if profile is already complete before fetching next question
    const isAlreadyComplete = (
      !!profileToSubmit.title?.trim() &&
      !!profileToSubmit.category?.trim() &&
      !!profileToSubmit.material?.trim() &&
      !!profileToSubmit.craft?.trim() &&
      !!profileToSubmit.description?.trim() &&
      !!profileToSubmit.workDays?.trim()
    );

    if (isAlreadyComplete) {
      setState((prev) => ({
        ...prev,
        currentProfile: profileToSubmit,
        isComplete: true,
        isLoading: false,
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const result = await ApiService.getNextInterviewQuestion(
        profileToSubmit,
        [],
        language,
        state.askedQuestionIntents || []
      );
      console.log('[useAIInterview] startInterview result:', result);

      if (result.success) {
        const mergedProfile = safeMergeProductProfile(profileToSubmit, result.updatedProduct);
        if (onProfileUpdate) {
          onProfileUpdate(mergedProfile);
        }

        const qText = result.question || result.nextQuestion || result.assistantMessage || null;
        const qLang = result.questionLanguage || result.nextQuestionLanguage || result.detectedLanguage || language;
        const newMessages: InterviewMessage[] = [];
        if (qText) {
          newMessages.push({
            id: `msg-${Date.now()}-ai`,
            sender: 'ai',
            text: qText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          });
        }

        const isFullyComplete = result.isComplete || (
          !!mergedProfile.title?.trim() &&
          !!mergedProfile.category?.trim() &&
          !!mergedProfile.material?.trim() &&
          !!mergedProfile.craft?.trim() &&
          !!mergedProfile.description?.trim() &&
          !!mergedProfile.workDays?.trim()
        );

        setState((prev) => ({
          ...prev,
          currentProfile: mergedProfile,
          conversationHistory: newMessages,
          currentQuestion: isFullyComplete ? null : qText,
          questionLanguage: qLang,
          nextQuestionLanguage: qLang,
          askedQuestionIntents: result.askedQuestionIntents || prev.askedQuestionIntents || [],
          detectedLanguage: result.detectedLanguage || language,
          isComplete: isFullyComplete,
          isLoading: false,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: result.error || 'Failed to start AI interview.',
        }));
      }
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err.message || 'Unable to connect to AI interview assistant.',
      }));
    }
  }, [currentProfile, state.currentProfile, state.askedQuestionIntents, onProfileUpdate, language]);

  /**
   * Handle dynamic language switching mid-interview
   */
  useEffect(() => {
    if (!state.isComplete && state.conversationHistory.length > 0 && state.currentQuestion) {
      const profileToSubmit = safeMergeProductProfile(state.currentProfile, currentProfile);
      console.log('[useAIInterview] Language changed to:', language, '- fetching next question in new language');
      ApiService.getNextInterviewQuestion(
        profileToSubmit,
        state.conversationHistory,
        language,
        state.askedQuestionIntents || []
      )
        .then((result) => {
          if (result.success) {
            const qText = result.question || result.nextQuestion || result.assistantMessage || null;
            const qLang = result.questionLanguage || result.nextQuestionLanguage || language;
            if (qText) {
              setState((prev) => {
                const updatedHistory = [...prev.conversationHistory];
                if (updatedHistory.length > 0 && updatedHistory[updatedHistory.length - 1].sender === 'ai') {
                  updatedHistory[updatedHistory.length - 1] = {
                    ...updatedHistory[updatedHistory.length - 1],
                    text: qText,
                  };
                }
                return {
                  ...prev,
                  conversationHistory: updatedHistory,
                  currentQuestion: qText,
                  questionLanguage: qLang,
                  nextQuestionLanguage: qLang,
                  askedQuestionIntents: result.askedQuestionIntents || prev.askedQuestionIntents || [],
                };
              });
            }
          }
        })
        .catch((err) => {
          console.warn('[useAIInterview] Dynamic language switch error:', err);
        });
    }
  }, [language]);

  /**
   * Reset interview state
   */
  const resetInterview = useCallback(
    (newProfile?: Partial<ProductProfile>) => {
      setState({
        currentProfile: {
          ...EMPTY_PRODUCT_PROFILE,
          ...newProfile,
        },
        conversationHistory: [],
        collectedFields: [],
        currentQuestion: null,
        isComplete: false,
        isLoading: false,
        error: null,
      });
    },
    []
  );

  return {
    ...state,
    updateProfile,
    startInterview,
    submitAnswer,
    resetInterview,
  };
}
