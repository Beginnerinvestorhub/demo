// src/store/learningStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OnboardingProfileData {
  ageRange: string;
  annualIncome: string;
  experienceLevel: string;
  riskProfile: string;
  investmentGoals: string[];
  timeHorizon: string;
  learningStyle: string;
  preferredTopics: string[];
}

interface VarkAssessmentResult {
  primary_vark_preference: 'visual' | 'aural' | 'read_write' | 'kinesthetic';
  vark_profile_data: {
    visual: number;
    aural: number;
    read_write: number;
    kinesthetic: number;
  };
  assessment_version: string;
  total_duration: number;
  confidence_metrics: Record<string, number>;
}

interface LearningState {
  // State
  onboardingCompleted: boolean;
  currentModule: string | null;
  completedModules: string[];
  progress: number;
  onboardingStep: number;
  isLoading: boolean;
  error: string | null;
  onboardingProfile: OnboardingProfileData;
  varkResult: VarkAssessmentResult | null;

  // Setters
  setOnboardingCompleted: (completed: boolean) => void;
  setOnboardingStep: (step: number) => void;
  setCurrentModule: (moduleId: string | null) => void;
  setProgress: (progress: number) => void;
  setCompletedModules: (modules: string[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  updateOnboardingProfile: (data: Partial<OnboardingProfileData>) => void;
  setVarkResult: (result: VarkAssessmentResult | null) => void;

  // Module actions
  addCompletedModule: (module: string) => void;
  resetProgress: () => void;

  // Onboarding actions
  startOnboarding: () => void;
  completeOnboardingStep: (step: number) => void;
  submitOnboardingProfile: (data: OnboardingProfileData) => void;

  // Dashboard actions
  fetchPersonalizedPath: () => Promise<void>;
  fetchAIRecommendations: () => Promise<void>;
  markLessonCompleted: (lessonId: string) => Promise<void>;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  contentType: string;
  difficultyLevel: string;
  estimatedMinutes: number;
  estimatedDurationMinutes: number;
  pointsValue: number;
  progressStatus: 'completed' | 'in_progress' | 'not_started';
  thumbnailUrl?: string;
}

export interface AIReco {
  id: string;
  title: string;
  contentType: string;
  estimatedDurationMinutes: number;
}

export const useLearningStore = create<LearningState>()(
  persist(
    set => ({
      onboardingCompleted: false,
      currentModule: null,
      completedModules: [],
      progress: 0,
      onboardingStep: 0,
      isLoading: false,
      error: null,
      onboardingProfile: {
        ageRange: '',
        annualIncome: '',
        experienceLevel: '',
        riskProfile: '',
        investmentGoals: [],
        timeHorizon: '',
        learningStyle: '',
        preferredTopics: [],
      },
      varkResult: null,

      setOnboardingCompleted: (completed: boolean) =>
        set({ onboardingCompleted: completed }),

      setCurrentModule: (module: string | null) =>
        set({ currentModule: module }),

      setOnboardingStep: (step: number) => set({ onboardingStep: step }),

      setCompletedModules: (modules: string[]) =>
        set({ completedModules: modules }),

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      setError: (error: string | null) => set({ error }),

      addCompletedModule: (module: string) =>
        set(state => ({
          completedModules: [...state.completedModules, module],
          progress: Math.min(state.progress + 10, 100), // Increment progress by 10% per module
        })),

      setProgress: (progress: number) => set({ progress }),

      resetProgress: () =>
        set({
          onboardingCompleted: false,
          currentModule: null,
          completedModules: [],
          progress: 0,
          onboardingStep: 0,
          varkResult: null,
          onboardingProfile: {
            ageRange: '',
            annualIncome: '',
            experienceLevel: '',
            riskProfile: '',
            investmentGoals: [],
            timeHorizon: '',
            learningStyle: '',
            preferredTopics: [],
          },
        }),

      startOnboarding: () =>
        set({ onboardingStep: 1, isLoading: false, error: null }),

      completeOnboardingStep: (step: number) =>
        set(state => ({
          onboardingStep: step,
          onboardingCompleted: step === 8 ? true : state.onboardingCompleted,
        })),

      submitOnboardingProfile: (data: OnboardingProfileData) => {
        set({ isLoading: true, error: null });
        console.log('Submitting onboarding profile:', data);
        // Simulate API call
        setTimeout(() => {
          set({
            onboardingCompleted: true,
            onboardingStep: 0,
            isLoading: false,
          });
        }, 1000);
      },

      // Additional actions for learning dashboard
      fetchPersonalizedPath: async () => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          // In a real app, this would fetch from an API
          set({ isLoading: false });
        } catch (error) {
          set({ error: 'Failed to fetch learning path', isLoading: false });
        }
      },

      updateOnboardingProfile: (data: Partial<OnboardingProfileData>) =>
        set(state => ({
          onboardingProfile: { ...state.onboardingProfile, ...data },
        })),

      setVarkResult: (result: VarkAssessmentResult | null) =>
        set({ varkResult: result }),

      fetchAIRecommendations: async () => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          // In a real app, this would fetch AI recommendations
          set({ isLoading: false });
        } catch (error) {
          set({
            error: 'Failed to fetch AI recommendations',
            isLoading: false,
          });
        }
      },

      markLessonCompleted: async (lessonId: string) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          // In a real app, this would mark the lesson as completed
          set(state => ({
            completedModules: [...state.completedModules, lessonId],
            progress: Math.min(100, state.progress + 10),
            isLoading: false,
          }));
        } catch (error) {
          set({
            error: 'Failed to mark lesson as completed',
            isLoading: false,
          });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'learning-storage',
    }
  )
);

// Export the hook that dashboard.tsx is using
export const useOnboardingCompleted = () => {
  const { onboardingCompleted } = useLearningStore();
  return onboardingCompleted;
};

// Additional exports that components might need
export const useLearningLoading = () => {
  const { isLoading } = useLearningStore();
  return isLoading;
};

export const useLearningError = () => {
  const { error } = useLearningStore();
  return error;
};

export const useCurrentModule = () => {
  const { currentModule } = useLearningStore();
  return currentModule;
};

export const useProgress = () => {
  const { progress } = useLearningStore();
  return progress;
};

export const useModuleProgress = (moduleId: string) => {
  const { completedModules } = useLearningStore();
  return completedModules.includes(moduleId) ? 100 : 0;
};

// Additional placeholder exports for missing functionality
export const useCurrentLearningPath = () => {
  return {
    currentPath: {
      name: 'Beginner Investment Fundamentals',
      description: 'Learn the basics of investing and portfolio management',
      estimatedDuration: '4 weeks',
      estimatedDurationHours: 15,
    },
    modules: [] as LearningModule[],
    overallProgress: 65,
    isLoading: false,
  };
};

export const useLearningContent = () => {
  return {
    content: [] as LearningModule[],
    isLoading: false,
  };
};

export const useNextRecommended = () => {
  return {
    nextModule: {
      id: 'intro-stocks',
      title: 'Introduction to Stock Markets',
      description: 'Learn the fundamentals of stock market investing',
      contentType: 'Video Lesson',
      difficultyLevel: 'Beginner',
      estimatedMinutes: 25,
      estimatedDurationMinutes: 25,
      pointsValue: 50,
      progressStatus: 'in_progress',
      thumbnailUrl: '/images/stocks-intro.jpg',
    } as LearningModule,
    isLoading: false,
  };
};

export const useAIRecommendations = () => {
  return {
    recommendations: [] as AIReco[],
    nudgeMessage: null as string | null,
    confidenceScore: 0.85,
    priorityScore: 75,
    reasoning: 'Based on your profile',
    isLoading: false,
  };
};

export const useLearningStats = () => {
  return {
    stats: {
      totalTimeSpent: 120,
      modulesCompleted: 8,
      averageScore: 85,
      completedLessons: 12,
      totalLessons: 20,
      totalPoints: 450,
      streakDays: 5,
    },
    isLoading: false,
  };
};
