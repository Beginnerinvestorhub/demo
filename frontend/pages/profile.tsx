import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { MechanicaLayout } from '../components/layout/mechanicaLayout';
import Head from 'next/head';
import { MechanicaCard } from '../components/ui/mechanicaCard';
import { MechanicaButton } from '../components/ui/mechanicaButton';
import { MechanicaGear } from '../components/ui/mechanicaGear';
import { MechanicaInput } from '../components/ui/mechanicaInput';
import { useApiPost, useApiGet } from '../hooks/useApi'; // Import useApiGet

// --- Interface/Type Definitions (kept as is) ---

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experienceLevel: string;
  investmentGoals: string[];
  riskTolerance: string;
  preferredAssetClasses: string[];
  timeHorizon: string;
  initialCapital: number;
  monthlyContribution: number;
  riskScore: number;
}

interface UserProfile extends ProfileFormData {
  primary_vark_preference: 'visual' | 'aural' | 'read_write' | 'kinesthetic' | null;
  vark_profile_data: {
    visual: number;
    aural: number;
    read_write: number;
    kinesthetic: number;
  } | null;
}

// --- Extracted Component Interfaces (for type safety) ---

// Placeholder for an extracted component to handle a single form field group
interface FormGroupProps extends React.PropsWithChildren {
  label: string;
  htmlFor?: string;
  description?: string;
  className?: string;
}

// --- Extracted Components (defined for completeness, would be in separate files) ---

const FormGroup: React.FC<FormGroupProps> = ({ label, htmlFor, description, children, className = '' }) => (
  <div className={`flex flex-col space-y-2 ${className}`}>
    <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700 mechanica-text-technical">
      {label}
    </label>
    {children}
    {description && <p className="text-xs text-gray-500 mt-1 mechanica-text-technical">{description}</p>}
  </div>
);

const ProgressHeader: React.FC<{ progress: number }> = ({ progress }) => (
  <MechanicaCard variant="mechanical" className="mb-8">
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <MechanicaGear size="medium" color="steel" speed="medium" />
          <span className="text-sm font-semibold text-gray-700 mechanica-text-technical">Profile Completion</span>
        </div>
        <span className="text-sm font-bold text-mechanica-moonlight-blue mechanica-text-technical">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-mechanica-moonlight-blue h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  </MechanicaCard>
);

// --- Main Refactored Component ---

const initialFormData: ProfileFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  experienceLevel: 'beginner',
  investmentGoals: [],
  riskTolerance: 'moderate', // Changed from 'medium' to match a radio option value
  preferredAssetClasses: [],
  timeHorizon: '5-10',
  initialCapital: 10000,
  monthlyContribution: 500,
  riskScore: 5,
};

// Helper function from VarkResultDisplay to ensure consistent display
const getStyleDetails = (style: string | null | undefined) => { // Adjusted type to include undefined
  switch (style) {
    case 'visual':
      return { label: 'Visual (V)', icon: '👀', color: 'text-blue-500' };
    case 'aural':
      return { label: 'Aural (A)', icon: '👂', color: 'text-green-500' };
    case 'read_write':
      return { label: 'Read/Write (R)', icon: '✍️', color: 'text-purple-500' };
    case 'kinesthetic':
      return { label: 'Kinesthetic (K)', icon: '🤸', color: 'text-yellow-600' };
    default:
      return { label: 'Not Assessed', icon: '❓', color: 'text-gray-500' };
  }
};

export default function ProfileForm() {
  const [formData, setFormData] = useState<ProfileFormData>(initialFormData);
  const [success, setSuccess] = useState(false);

  // Fetch initial profile data
  const { data: initialProfileData, loading: isLoadingInitial, error: initialLoadError } = useApiGet<UserProfile>('/api/profile');

  // Use useApiPost hook for submitting profile data
  const { post, loading: isSubmitting, error: submitError } = useApiPost<UserProfile, ProfileFormData>('/api/profile');

  // Initialize formData with fetched data when available
  useEffect(() => {
    if (initialProfileData) {
      setFormData({
        firstName: initialProfileData.firstName || '',
        lastName: initialProfileData.lastName || '',
        email: initialProfileData.email || '',
        phone: initialProfileData.phone || '',
        experienceLevel: initialProfileData.experienceLevel || 'beginner',
        investmentGoals: initialProfileData.investmentGoals || [],
        riskTolerance: initialProfileData.riskTolerance || 'moderate',
        preferredAssetClasses: initialProfileData.preferredAssetClasses || [],
        timeHorizon: initialProfileData.timeHorizon || '5-10',
        initialCapital: initialProfileData.initialCapital || 0,
        monthlyContribution: initialProfileData.monthlyContribution || 0,
        riskScore: initialProfileData.riskScore || 0,
      });
    }
  }, [initialProfileData]);

  // Progress is now calculated based on filled fields for dynamic behavior
  const progress = useMemo(() => {
    // A slightly more realistic calculation: count personal info (4) + 4 profile questions
    const relevantFields = 8;
    const personalInfoFilled = [formData.firstName, formData.lastName, formData.email, formData.phone].filter(v => v.trim() !== '').length;
    const profileFieldsFilled = (formData.investmentGoals.length > 0 ? 1 : 0) +
      (formData.experienceLevel !== 'beginner' ? 1 : 0) +
      (formData.riskTolerance !== 'moderate' ? 1 : 0) +
      (formData.initialCapital > 0 ? 1 : 0);

    const calculatedProgress = Math.round(((personalInfoFilled + profileFieldsFilled) / relevantFields) * 100);

    // Clamp the value, or return the hardcoded 30 if you prefer static progress
    return Math.min(100, calculatedProgress || 30);
  }, [formData]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false); // Reset success state on new submission

    try {
      await post(formData); // Use the post function from useApiPost
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      // Error is already handled by useApiPost, but we can log it or show a specific message here if needed
      console.error("Profile update failed:", err);
    }
  };

  // Use useCallback for handler functions for performance and stability
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      const key = name as keyof ProfileFormData;
      const currentValues = [...formData[key] as string[]];

      setFormData(prevData => ({
        ...prevData,
        [name]: checked
          ? [...currentValues, value]
          : currentValues.filter(item => item !== value)
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: type === 'number' ? parseFloat(value) || 0 : value
      }));
    }
  }, [formData]);


  // Display loading state for initial data fetch
  if (isLoadingInitial) {
    return (
      <MechanicaLayout
        title="Loading Profile | Beginner Investor Hub"
        description="Loading user profile and preferences"
      >
        <div className="min-h-screen flex items-center justify-center">
          <MechanicaCard variant="mechanical" className="p-8 text-center">
            <MechanicaGear size="xl" color="steel" speed="slow" className="mx-auto mb-4" />
            <h2 className="text-xl font-bold mechanica-heading-professional">Loading Your Profile...</h2>
            <p className="mechanica-text-technical">We're getting things ready for you.</p>
          </MechanicaCard>
        </div>
      </MechanicaLayout>
    );
  }

  // Display error state for initial data fetch
  if (initialLoadError) {
    return (
      <MechanicaLayout
        title="Error Loading Profile | Beginner Investor Hub"
        description="Error fetching user profile"
      >
        <div className="min-h-screen flex items-center justify-center">
          <MechanicaCard variant="mechanical" className="p-8 text-center">
            <MechanicaGear size="xl" color="copper" speed="fast" className="mx-auto mb-4" />
            <h2 className="text-xl font-bold text-red-600 mechanica-heading-professional">Error Loading Profile</h2>
            <p className="text-red-600 mechanica-text-technical">{initialLoadError}</p>
            <MechanicaButton variant="mechanical" onClick={() => window.location.reload()} className="mt-4">
              Retry
            </MechanicaButton>
          </MechanicaCard>
        </div>
      </MechanicaLayout>
    );
  }

  return (
    <MechanicaLayout
      title="Investor Profile Setup | Beginner Investor Hub"
      description="Set up your investment profile and preferences"
    >
      <Head>
        <title>Your Investor Profile | BeginnerInvestorHub</title>
        <meta name="description" content="Tell us about your goals so we can help you better. This helps your coach give you the right advice." />
      </Head>
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center items-center space-x-6 mb-6">
                <MechanicaGear size="xl" color="brass" speed="slow" />
                <h1 className="text-4xl md:text-5xl font-bold mechanica-heading-professional text-mechanica-moonlight-blue">
                  Your Investor Profile
                </h1>
                <MechanicaGear size="xl" color="brass" speed="reverse" />
              </div>
              <p className="text-gray-600 mechanica-text-technical">
                Tell us about your goals so we can help you better.
              </p>
            </div>

            <MechanicaCard variant="mechanical" animated className="shadow-xl">
              <div className="p-8">

                {/* Extracted Progress Bar */}
                <ProgressHeader progress={progress} />

                <form onSubmit={handleSubmit} className="space-y-10">

                  {/* Personal Information Section */}
                  <section className="p-6 border border-gray-200 rounded-lg bg-gray-50/50">
                    <div className="flex items-center space-x-3 mb-6">
                      <MechanicaGear size="medium" color="steel" speed="medium" />
                      <h2 className="text-xl font-semibold mechanica-heading-professional text-mechanica-moonlight-blue">
                        1. Personal Information 📝
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormGroup label="First Name" htmlFor="firstName">
                        <MechanicaInput
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </FormGroup>

                      <FormGroup label="Last Name" htmlFor="lastName">
                        <MechanicaInput
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </FormGroup>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <FormGroup label="Email" htmlFor="email">
                        <MechanicaInput
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </FormGroup>

                      <FormGroup label="Phone" htmlFor="phone" description="Optional: Used for important account alerts.">
                        <MechanicaInput
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </div>
                  </section>

                  {/* Investment Profile Section */}
                  <section className="p-6 border border-gray-200 rounded-lg bg-gray-50/50">
                    <div className="flex items-center space-x-3 mb-6">
                      <MechanicaGear size="medium" color="brass" speed="slow" />
                      <h2 className="text-xl font-semibold mechanica-heading-professional text-mechanica-moonlight-blue">
                        2. Investment Profile 📊
                      </h2>
                    </div>

                    <FormGroup label="Investment Experience" htmlFor="experienceLevel" className="mb-6">
                      <select
                        id="experienceLevel"
                        name="experienceLevel"
                        value={formData.experienceLevel}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-mechanica-moonlight-blue focus:ring-mechanica-moonlight-blue sm:text-sm p-2.5 bg-white mechanica-text-technical"
                        required
                      >
                        <option value="beginner">Beginner (0-2 years)</option>
                        <option value="intermediate">Intermediate (2-5 years)</option>
                        <option value="advanced">Advanced (5+ years)</option>
                        <option value="professional">Professional</option>
                      </select>
                    </FormGroup>

                    <FormGroup label="Investment Goals" description="Select all that apply." className="mb-6">
                      <div className="flex flex-wrap gap-4">
                        {['Retirement', 'Wealth Building', 'Education', 'Major Purchase', 'Other'].map((goal) => (
                          <label key={goal} className="inline-flex items-center space-x-2 text-sm text-gray-700 cursor-pointer mechanica-text-technical">
                            <input
                              type="checkbox"
                              name="investmentGoals"
                              value={goal.toLowerCase().replace(' ', '-')}
                              checked={formData.investmentGoals.includes(goal.toLowerCase().replace(' ', '-'))}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-mechanica-moonlight-blue border-gray-300 rounded focus:ring-mechanica-moonlight-blue"
                            />
                            <span>{goal}</span>
                          </label>
                        ))}
                      </div>
                    </FormGroup>

                    <FormGroup label="Risk Tolerance" description="How willing are you to accept market fluctuations for higher potential returns?" className="mb-6">
                      <div className="flex flex-wrap gap-4 items-center">
                        {[
                          { value: 'conservative', label: 'Conservative' },
                          { value: 'moderate', label: 'Moderate' },
                          { value: 'balanced', label: 'Balanced' },
                          { value: 'growth', label: 'Growth' },
                          { value: 'aggressive', label: 'Aggressive' },
                        ].map((option) => (
                          <label key={option.value} className="inline-flex items-center space-x-2 text-sm text-gray-700 cursor-pointer mechanica-text-technical">
                            <input
                              type="radio"
                              name="riskTolerance"
                              value={option.value}
                              checked={formData.riskTolerance === option.value}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-mechanica-moonlight-blue border-gray-300 focus:ring-mechanica-moonlight-blue"
                            />
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${formData.riskTolerance === option.value ? 'bg-mechanica-moonlight-blue text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}>
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </FormGroup>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormGroup label="Initial Investment Capital" htmlFor="initialCapital">
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <MechanicaInput
                            type="number"
                            id="initialCapital"
                            name="initialCapital"
                            value={formData.initialCapital}
                            onChange={handleInputChange}
                            min="0"
                            step="100"
                            className="pl-7"
                            required
                          />
                        </div>
                      </FormGroup>

                      <FormGroup label="Monthly Contribution" htmlFor="monthlyContribution">
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <MechanicaInput
                            type="number"
                            id="monthlyContribution"
                            name="monthlyContribution"
                            value={formData.monthlyContribution}
                            onChange={handleInputChange}
                            min="0"
                            step="10"
                            className="pl-7"
                            required
                          />
                        </div>
                      </FormGroup>
                    </div>
                  </section>

                  {/* VARK Learning Style Section */}
                  {initialProfileData?.primary_vark_preference && initialProfileData?.vark_profile_data && (
                    <section className="p-6 border border-gray-200 rounded-lg bg-gray-50/50">
                      <div className="flex items-center space-x-3 mb-6">
                        <MechanicaGear size="medium" color="steel" speed="medium" />
                        <h2 className="text-xl font-semibold mechanica-heading-professional text-mechanica-moonlight-blue">
                          3. VARK Learning Style 📚
                        </h2>
                      </div>
                      <div className="space-y-4">
                        <p className="text-gray-600 mechanica-text-technical">
                          Your primary learning preference is:
                          <span className="ml-2 font-bold text-mechanica-moonlight-blue">
                            {getStyleDetails(initialProfileData.primary_vark_preference).label}
                          </span>
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {Object.entries(initialProfileData.vark_profile_data).map(([style, score]) => {
                            const details = getStyleDetails(style);
                            return (
                              <MechanicaCard key={style} variant="mechanical" className="p-3 text-center">
                                <span className={`text-2xl ${details.color}`}>{details.icon}</span>
                                <p className="font-semibold mechanica-text-technical">{details.label}</p>
                                <p className="text-xl font-bold mechanica-heading-mechanical">{score}</p>
                              </MechanicaCard>
                            );
                          })}
                        </div>
                        <p className="text-sm text-gray-600 mt-4 mechanica-text-technical">
                          You can retake the VARK assessment during onboarding to update this profile.
                        </p>
                      </div>
                    </section>
                  )}

                  {/* Success/Error Messages */}
                  <div className="min-h-[40px] flex justify-center items-center">
                    {success && (
                      <MechanicaCard variant="mechanical" className="border-green-200 bg-green-50">
                        <div className="p-4 flex items-center justify-center">
                          <div className="w-5 h-5 mr-2 text-green-600">✓</div>
                          <span className="text-green-700 mechanica-text-technical">Profile updated successfully!</span>
                        </div>
                      </MechanicaCard>
                    )}
                    {submitError && (
                      <MechanicaCard variant="mechanical" className="border-red-200 bg-red-50">
                        <div className="p-4 flex items-center justify-center">
                          <div className="w-5 h-5 mr-2 text-red-600">✕</div>
                          <span className="text-red-700 mechanica-text-technical">{submitError}</span>
                        </div>
                      </MechanicaCard>
                    )}
                  </div>


                  <div className="flex justify-between gap-4 pt-4 border-t border-gray-200">
                    <MechanicaButton
                      variant="wood"
                      size="lg"
                      className="flex-1"
                      onClick={() => window.history.back()}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </MechanicaButton>
                    <MechanicaButton
                      variant="mechanical"
                      size="lg"
                      className="flex-1"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <MechanicaGear size="small" color="steel" speed="fast" className="mr-2" />
                          Saving...
                        </span>
                      ) : (
                        'Save Changes'
                      )}
                    </MechanicaButton>
                  </div>
                </form>
              </div>
            </MechanicaCard>
          </div>
        </div>
      </div>
    </MechanicaLayout>
  );
}