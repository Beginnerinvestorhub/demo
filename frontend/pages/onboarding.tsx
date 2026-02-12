import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../hooks/useAuth';
import { MechanicaLayout } from '../components/layout/mechanicaLayout';
import { MechanicaCard } from '../components/ui/mechanicaCard';
import { MechanicaGear } from '../components/ui/mechanicaGear';
import OnboardingFlow from '../components/onboarding/OnboardingFlow';

export default function OnboardingPage() {
  const { user: realUser, loading } = useAuth();
  const router = useRouter();
  const { isReady, query, asPath } = router;

  const [isRedirecting, setIsRedirecting] = useState(false);

  // Detect demo mode
  const isDemo = isReady && query.demo === 'true';

  // Use demo user fallback when in demo mode
  const user = isDemo ? { displayName: 'Demo Investor' } : realUser;

  /**
   * Redirect logic
   * - Real users must be authenticated
   * - Demo users bypass auth entirely
   */
  useEffect(() => {
    if (!loading && !isDemo) {
      if (!realUser) {
        setIsRedirecting(true);
        router.replace('/signup');
      }
    }
  }, [realUser, loading, isDemo, router]);

  /**
   * Handle onboarding completion
   */
  const handleOnboardingComplete = () => {
    setIsRedirecting(true);

    if (isDemo) {
      router.push('/dashboard?demo=true');
    } else {
      router.push('/dashboard');
    }
  };

  /**
   * Loading state
   * - Demo ignores auth loading
   */
  if ((!isDemo && loading) || isRedirecting) {
    return (
      <MechanicaLayout title="Loading Onboarding | Beginner Investor Hub">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <MechanicaGear size="large" color="steel" speed="medium" />
            <p className="mechanica-text-technical text-gray-600">
              {isRedirecting
                ? 'Redirecting...'
                : 'Preparing your onboarding experience...'}
            </p>
          </div>
        </div>
      </MechanicaLayout>
    );
  }

  /**
   * Hard guard
   * - Only block rendering for real unauthenticated users
   */
  if (!user && !isDemo) {
    return null;
  }

  return (
    <MechanicaLayout
      title="Welcome - Set Up Your Learning Path | Beginner Investor Hub"
      description="Personalize your investment learning journey with our AI-powered onboarding process."
    >
      <Head>
        <title>Set Up Learning Path | BeginnerInvestorHub</title>
        <meta
          name="description"
          content="Personalize your investment education journey with our precision-engineered onboarding process. Define your goals and learning style."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 flex flex-col">
        {/* Header */}
        <header className="py-6 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <MechanicaGear size="large" color="brass" speed="slow" />
                <div>
                  <div className="text-2xl font-bold mechanica-heading-professional text-mechanica-moonlight-blue">
                    BeginnerInvestorHub
                  </div>
                  <div className="text-gray-600 mechanica-text-technical">
                    Welcome,{' '}
                    {isDemo ? 'Demo Investor' : user?.displayName || 'Investor'}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <MechanicaGear size="small" color="steel" />
                <span className="text-sm text-gray-500 mechanica-text-technical">
                  Onboarding
                </span>
                <MechanicaGear size="small" color="copper" speed="reverse" />
              </div>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-grow bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <MechanicaCard
              variant="mechanical"
              animated
              className="max-w-4xl mx-auto"
            >
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="flex justify-center items-center space-x-4 mb-6">
                    <MechanicaGear size="large" color="brass" speed="slow" />
                    <h2 className="text-3xl font-bold mechanica-heading-professional">
                      Set Up Your Precision Learning Path
                    </h2>
                    <MechanicaGear size="large" color="brass" speed="reverse" />
                  </div>
                  <p className="text-gray-600 mechanica-text-technical">
                    Let&apos;s personalize your investment education journey
                    with our mechanically-engineered approach
                  </p>
                </div>

                {/* 
                  Key prop forces full reset on each demo visit.
                  For demo: remounts every time route changes.
                  For real users: tied to UID.
                */}
                <OnboardingFlow
                  key={isDemo ? asPath : realUser?.uid}
                  onComplete={handleOnboardingComplete}
                  isDemo={isDemo}
                />
              </div>
            </MechanicaCard>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <MechanicaGear size="small" color="steel" speed="medium" />
                <p className="text-gray-600 mechanica-text-technical">
                  You can always update these preferences later in your account
                  settings
                </p>
                <MechanicaGear size="small" color="steel" speed="reverse" />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </MechanicaLayout>
  );
}
