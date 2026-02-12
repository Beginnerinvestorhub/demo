/**
 * OnboardingFlow Component
 * Multi-step onboarding process for personalized learning setup
 * Demo mode safe
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLearningStore } from '../../src/store/learningStore';
import { useAuth } from '../../hooks/useAuth';
import VarkAssessment from './VarkAssessment';
import VarkResultDisplay from './VarkResultDisplay';
import {
  CheckCircleIcon,
  LightBulbIcon,
  TrophyIcon,
  ChartBarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

interface OnboardingFlowProps {
  onComplete?: () => void;
  isDemo?: boolean; // optional, defaults to false
}

// VARK assessment result structure
interface VarkAssessmentResult {
  primary_vark_preference: 'visual' | 'aural' | 'read_write' | 'kinesthetic';
  vark_profile_data: {
    visual: number;
    aural: number;
    read_write: number;
    kinesthetic: number;
  };
  assessment_version: string;
  total_duration: number; // seconds
  confidence_metrics: Record<string, number>;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  onComplete,
  isDemo = false,
}) => {
  const { user } = useAuth();
  const {
    onboardingStep,
    startOnboarding,
    completeOnboardingStep,
    clearError,
  } = useLearningStore();

  const [formData, setFormData] = useState({
    riskProfile: '',
    investmentGoals: [] as string[],
    timeHorizon: '',
    learningStyle: '',
    preferredTopics: [] as string[],
  });

  const [varkResult, setVarkResult] = useState<VarkAssessmentResult | null>(
    null
  );

  // Initialize onboarding (skip DB for demo)
  useEffect(() => {
    if (user && onboardingStep === 0 && !isDemo) {
      startOnboarding();
    }
  }, [user, onboardingStep, startOnboarding, isDemo]);

  // Clear errors on mount
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Form helpers
  const updateFormData = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Navigation
  const handleNext = () => {
    if (onboardingStep < 7) {
      completeOnboardingStep(onboardingStep + 1);
    } else {
      onComplete?.();
    }
  };

  const handleBack = () => {
    if (onboardingStep > 1) {
      completeOnboardingStep(onboardingStep - 1);
    }
  };

  // Step renderer
  const renderStep = () => {
    switch (onboardingStep) {
      case 1:
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <LightBulbIcon className="h-10 w-10 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Your Investment Journey!
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let&apos;s personalize your learning experience to match your goals,
              risk tolerance, and learning style. This will take just 2-3 minutes.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <div className="text-center p-4">
                <TrophyIcon className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Personalized Path</h3>
                <p className="text-sm text-gray-600">
                  AI-curated lessons based on your profile
                </p>
              </div>
              <div className="text-center p-4">
                <ChartBarIcon className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Track Progress</h3>
                <p className="text-sm text-gray-600">
                  Visual progress tracking and achievements
                </p>
              </div>
              <div className="text-center p-4">
                <ClockIcon className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Smart Nudges</h3>
                <p className="text-sm text-gray-600">
                  Gentle reminders to keep you on track
                </p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What&apos;s your investment risk tolerance?
            </h2>
            <p className="text-gray-600 mb-6">
              This helps us recommend the right investment strategies for you.
            </p>
            <div className="space-y-4">
              {[
                { value: 'conservative', title: 'Conservative', description: 'I prefer stable, low-risk investments even if returns are lower' },
                { value: 'moderate', title: 'Moderate', description: 'I want balanced growth with some risk for better returns' },
                { value: 'aggressive', title: 'Aggressive', description: "I'm comfortable with high risk for potentially high returns" },
              ].map(option => (
                <label
                  key={option.value}
                  className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.riskProfile === option.value
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <input
                    type="radio"
                    name="riskProfile"
                    value={option.value}
                    checked={formData.riskProfile === option.value}
                    onChange={e => updateFormData('riskProfile', e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 ${formData.riskProfile === option.value ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'}`}>
                      {formData.riskProfile === option.value && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{option.title}</h3>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What are your primary investment goals?
            </h2>
            <p className="text-gray-600 mb-6">
              Select all that apply. This helps us tailor your learning path.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'wealth', label: 'Wealth Accumulation' },
                { id: 'retirement', label: 'Retirement Planning' },
                { id: 'income', label: 'Passive Income' },
                { id: 'education', label: 'Education Funding' },
                { id: 'home', label: 'First Home' },
                { id: 'other', label: 'Other' },
              ].map(goal => (
                <label
                  key={goal.id}
                  className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${formData.investmentGoals.includes(goal.id)
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mr-3"
                    checked={formData.investmentGoals.includes(goal.id)}
                    onChange={() => {
                      const newGoals = formData.investmentGoals.includes(goal.id)
                        ? formData.investmentGoals.filter(g => g !== goal.id)
                        : [...formData.investmentGoals, goal.id];
                      updateFormData('investmentGoals', newGoals);
                    }}
                  />
                  <span className="text-gray-900 font-medium">{goal.label}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What is your anticipated investment time horizon?
            </h2>
            <p className="text-gray-600 mb-6">
              How long do you plan to hold your investments?
            </p>
            <div className="space-y-4">
              {[
                { value: 'short_term', label: 'Short Term (Less than 3 years)' },
                { value: 'medium_term', label: 'Medium Term (3-7 years)' },
                { value: 'long_term', label: 'Long Term (More than 7 years)' },
                { value: 'ultra_long_term', label: 'Ultra Long Term (15+ years)' },
              ].map(horizon => (
                <label
                  key={horizon.value}
                  className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.timeHorizon === horizon.value
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <input
                    type="radio"
                    name="timeHorizon"
                    className="sr-only"
                    checked={formData.timeHorizon === horizon.value}
                    onChange={() => updateFormData('timeHorizon', horizon.value)}
                  />
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 ${formData.timeHorizon === horizon.value ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300'}`}>
                      {formData.timeHorizon === horizon.value && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>}
                    </div>
                    <span className="text-gray-900 font-medium">{horizon.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <VarkAssessment
            userId={user?.uid ?? 'demo-user'}
            onComplete={(result) => {
              setVarkResult(result);
              updateFormData('learningStyle', result.primary_vark_preference);
              if (!isDemo) completeOnboardingStep(5);
              else onComplete?.();
            }}
          />
        );

      case 6:
        return varkResult ? (
          <VarkResultDisplay result={varkResult} onContinue={handleNext} />
        ) : (
          <div className="text-center text-red-500">VARK results not found. Please retake the assessment.</div>
        );

      case 7:
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Perfect! Your personalized path is ready.
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Based on your preferences, we&apos;ve created a customized learning journey.
            </p>
            <div className="bg-indigo-50 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
              <h3 className="font-semibold text-indigo-900 mb-2">Your Profile Summary:</h3>
              <div className="text-sm text-indigo-700 space-y-1">
                <p><strong>Risk Profile:</strong> {formData.riskProfile}</p>
                <p><strong>Goals:</strong> {formData.investmentGoals.join(', ')}</p>
                <p><strong>Time Horizon:</strong> {formData.timeHorizon.replace('_', ' ')}</p>
                <p><strong>Learning Style:</strong> {formData.learningStyle}</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!user && !isDemo) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Please log in to continue with onboarding.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Step {onboardingStep} of 7</span>
            <span className="text-sm font-medium text-indigo-600">{Math.round((onboardingStep / 7) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(onboardingStep / 7) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={onboardingStep === 1}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${onboardingStep === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors shadow-sm"
          >
            {onboardingStep === 7 ? 'Go to Dashboard' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
