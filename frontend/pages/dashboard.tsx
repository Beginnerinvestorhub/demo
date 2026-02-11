import Head from 'next/head';
import { useAuth } from '../hooks/useAuth';
import { useGamification } from '../hooks/useGamification';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { MechanicaLayout } from '../components/layout/mechanicaLayout';
import { MechanicaCard } from '../components/ui/mechanicaCard';
import { MechanicaButton } from '../components/ui/mechanicaButton';
import { MechanicaGear } from '../components/ui/mechanicaGear';
import VisualLearner from '../components/learning/VisualLearner';
import AuralLearner from '../components/learning/AuralLearner';
import ReadWriteLearner from '../components/learning/ReadWriteLearner';
import KinestheticLearner from '../components/learning/KinestheticLearner';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'tools' | 'learning'>(
    'overview'
  );
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);

    // Simulate API call to Google Sheets
    setTimeout(() => {
      setIsSubscribing(false);
      setShowConfirmation(true);
      setEmail('');

      // Hide confirmation after 5 seconds
      setTimeout(() => setShowConfirmation(false), 5000);
    }, 1500);
  };

  // Get gamification data - call hook unconditionally
  const { userProgress, loading: gamificationLoading, } = useGamification(user?.uid || '');

  // Generate dynamic progress data if not available
  const dynamicProgress = React.useMemo(() => {
    if (userProgress) return userProgress;

    // Deterministic fallback data for demo (consistent within a session)
    const seed = new Date().toDateString().length; // Same value for the entire day
    const hour = new Date().getHours();
    const dayMultiplier = hour >= 9 && hour <= 17 ? 1.5 : 1.0;

    return {
      level: (seed % 5) + 1,
      totalPoints: Math.floor(((seed * 137) % 2000 + 500) * dayMultiplier),
      streaks: {
        loginStreak: (seed % 15) + 1,
        learningStreak: (seed % 7) + 1,
      },
      badges: Array.from({ length: (seed % 3) + 1 }, (_, i) => ({
        id: `badge_${i}`,
        name: ['Precision Learner', 'Risk Analyst', 'Portfolio Builder'][i] || 'Achievement Unlocked',
        description: 'Completed foundational investment training',
        icon: '🏆',
        earnedAt: new Date(Date.now() - (i + 1) * 2 * 24 * 60 * 60 * 1000).toISOString(),
      })),
      completedModules: (seed % 3) + 1,
      totalTime: (seed % 50) + 10, // hours
    };
  }, [userProgress]);

  useEffect(() => {
    // Enable demo mode in development
    const isDemoMode = process.env.NODE_ENV === 'development';

    if (!loading && !user && !isDemoMode) {
      setIsRedirecting(true);
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading || isRedirecting || gamificationLoading) {
    return (
      <>
        <Head>
          <title>Loading Dashboard | Beginner Investor Hub</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="mechanica-loading-container flex flex-col items-center justify-center min-h-screen">
          <div className="mechanica-spinner w-12 h-12 border-4 border-mechanica-moonlight-blue border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="mechanica-loading-text text-gray-600 font-mono">
            {isRedirecting ? 'Redirecting...' : 'Loading your dashboard...'}
          </p>
        </div>
      </>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <MechanicaLayout>
      <Head>
        <title>Investor Dashboard | BeginnerInvestorHub</title>
        <meta name="description" content="Track your engineering level, precision points, and learning progress on your investment mastery journey with our AI-powered dashboard." />
      </Head>
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Welcome Header */}
          <div className="text-center mb-12 relative overflow-hidden rounded-lg p-8 bg-gradient-to-br from-white to-gray-50 shadow-xl border border-gray-200 mechanica-hum">
            {/* Steam Vents */}
            <div className="absolute top-0 right-1/4 w-px h-16 bg-gradient-to-b from-blue-400/20 to-transparent mechanica-steam"></div>
            <div className="absolute top-0 left-1/4 w-px h-24 bg-gradient-to-b from-blue-400/20 to-transparent mechanica-steam" style={{ animationDelay: '1s' }}></div>
            {/* Subtle background pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.02) 10px, rgba(0,0,0,0.02) 20px),
                  repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(0,0,0,0.01) 10px, rgba(0,0,0,0.01) 20px)
                `
              }}
            ></div>

            {/* Decorative Mechanical Gears */}
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-10">
              <MechanicaGear size="xl" color="steel" speed="slow" />
            </div>
            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 opacity-10">
              <MechanicaGear size="xl" color="brass" speed="reverse" />
            </div>

            <div className="relative z-10">
              <div className="flex justify-center items-center space-x-6 mb-6">
                <MechanicaGear size="xl" color="brass" speed="slow" />
                <h1 className="text-4xl md:text-5xl font-bold mechanica-heading-professional text-mechanica-moonlight-blue">
                  Welcome back, {user.displayName || 'Investor'}!
                </h1>
                <MechanicaGear size="xl" color="brass" speed="reverse" />
              </div>
              <div className="w-24 h-1 bg-mechanica-polished-brass mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 mechanica-text-technical mb-8">
                Ready to continue your precision investment learning journey?
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto relative z-10">
              <MechanicaCard variant="mechanical" animated gearDecoration>
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <MechanicaGear size="medium" color="steel" speed="medium" />
                  </div>
                  <div className="text-3xl font-bold text-mechanica-moonlight-blue mb-2 font-mono">
                    {dynamicProgress.level}
                  </div>
                  <div className="text-sm mechanica-text-technical text-gray-600 uppercase tracking-wide">
                    Engineering Level
                  </div>
                </div>
              </MechanicaCard>

              <MechanicaCard variant="wood" animated gearDecoration>
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <MechanicaGear size="medium" color="brass" speed="slow" />
                  </div>
                  <div className="text-3xl font-bold text-mechanica-moonlight-blue mb-2 font-mono">
                    {dynamicProgress.totalPoints.toLocaleString()}
                  </div>
                  <div className="text-sm mechanica-text-technical text-gray-600 uppercase tracking-wide">
                    Precision Points
                  </div>
                </div>
              </MechanicaCard>

              <MechanicaCard variant="brass" animated gearDecoration>
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <MechanicaGear size="medium" color="copper" speed="fast" />
                  </div>
                  <div className="text-3xl font-bold text-mechanica-moonlight-blue mb-2 font-mono">
                    {dynamicProgress.streaks.loginStreak}
                  </div>
                  <div className="text-sm mechanica-text-technical text-gray-600 uppercase tracking-wide">
                    Day Streak
                  </div>
                </div>
              </MechanicaCard>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="flex justify-center">
              <div className="inline-flex rounded-lg border border-mechanica-polished-brass/20 bg-white p-1">
                <button
                  className={`px-6 py-3 rounded-md font-medium transition-all ${activeTab === 'overview'
                    ? 'bg-mechanica-moonlight-blue text-white shadow-lg'
                    : 'text-gray-600 hover:text-mechanica-moonlight-blue mechanica-text-technical'
                    }`}
                  onClick={() => setActiveTab('overview')}
                >
                  📊 Overview
                </button>
                <button
                  className={`px-6 py-3 rounded-md font-medium transition-all ${activeTab === 'tools'
                    ? 'bg-mechanica-moonlight-blue text-white shadow-lg'
                    : 'text-gray-600 hover:text-mechanica-moonlight-blue mechanica-text-technical'
                    }`}
                  onClick={() => setActiveTab('tools')}
                >
                  🛠️ Tools
                </button>
                <button
                  className={`px-6 py-3 rounded-md font-medium transition-all ${activeTab === 'learning'
                    ? 'bg-mechanica-moonlight-blue text-white shadow-lg'
                    : 'text-gray-600 hover:text-mechanica-moonlight-blue mechanica-text-technical'
                    }`}
                  onClick={() => setActiveTab('learning')}
                >
                  📚 Learning
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-12">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <MechanicaCard variant="mechanical" animated className="mechanica-hum">
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <MechanicaGear size="medium" color="steel" speed="medium" />
                      <h3 className="text-2xl font-bold mechanica-heading-professional">
                        Recent Activity
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600">✅</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 mechanica-text-technical">
                            Completed &ldquo;Risk Assessment&rdquo; module
                          </div>
                          <div className="text-sm text-gray-500">2 hours ago</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600">📈</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 mechanica-text-technical">
                            Updated portfolio simulation
                          </div>
                          <div className="text-sm text-gray-500">1 day ago</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <span className="text-yellow-600">🏆</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 mechanica-text-technical">
                            Earned &ldquo;First Investment&rdquo; badge
                          </div>
                          <div className="text-sm text-gray-500">3 days ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </MechanicaCard>

                {/* Progress Overview */}
                <MechanicaCard variant="wood" animated className="mechanica-hum">
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <MechanicaGear size="medium" color="brass" speed="slow" />
                      <h3 className="text-2xl font-bold mechanica-heading-professional">
                        Learning Progress
                      </h3>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700 mechanica-text-technical">Modules Completed</span>
                          <span className="text-sm font-bold text-mechanica-moonlight-blue mechanica-text-technical">13/20</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-mechanica-moonlight-blue h-3 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700 mechanica-text-technical">Tools Mastered</span>
                          <span className="text-sm font-bold text-mechanica-moonlight-blue mechanica-text-technical">4/10</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-mechanica-polished-brass h-3 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700 mechanica-text-technical">Portfolio Simulations</span>
                          <span className="text-sm font-bold text-mechanica-moonlight-blue mechanica-text-technical">8/10</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-mechanica-brushed-copper h-3 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </MechanicaCard>
              </div>
            )}

            {activeTab === 'tools' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link href="/portfolio-monitor">
                  <MechanicaCard variant="mechanical" animated className="cursor-pointer h-full">
                    <div className="p-6 text-center">
                      <div className="flex justify-center mb-4">
                        <MechanicaGear size="large" color="steel" speed="medium" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 mechanica-heading-professional">Portfolio Monitor</h3>
                      <p className="text-gray-600 mb-4 mechanica-text-technical">Track your virtual investments</p>
                      <MechanicaButton variant="mechanical" size="sm">Open Tool</MechanicaButton>
                    </div>
                  </MechanicaCard>
                </Link>

                <Link href="/risk-assessment">
                  <MechanicaCard variant="wood" animated className="cursor-pointer h-full">
                    <div className="p-6 text-center">
                      <div className="flex justify-center mb-4">
                        <MechanicaGear size="large" color="brass" speed="slow" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 mechanica-heading-professional">Risk Assessment</h3>
                      <p className="text-gray-600 mb-4 mechanica-text-technical">Evaluate your risk tolerance</p>
                      <MechanicaButton variant="wood" size="sm">Open Tool</MechanicaButton>
                    </div>
                  </MechanicaCard>
                </Link>

                <Link href="/esg-screener">
                  <MechanicaCard variant="brass" animated className="cursor-pointer h-full">
                    <div className="p-6 text-center">
                      <div className="flex justify-center mb-4">
                        <MechanicaGear size="large" color="copper" speed="fast" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 mechanica-heading-professional">ESG Screener</h3>
                      <p className="text-gray-600 mb-4 mechanica-text-technical">Find sustainable investments</p>
                      <MechanicaButton variant="brass" size="sm">Open Tool</MechanicaButton>
                    </div>
                  </MechanicaCard>
                </Link>

                <Link href="/fractional-share-calculator">
                  <MechanicaCard variant="mechanical" animated className="cursor-pointer h-full">
                    <div className="p-6 text-center">
                      <div className="flex justify-center mb-4">
                        <MechanicaGear size="large" color="steel" speed="reverse" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 mechanica-heading-professional">Fractional Calculator</h3>
                      <p className="text-gray-600 mb-4 mechanica-text-technical">Calculate fractional share values</p>
                      <MechanicaButton variant="mechanical" size="sm">Open Tool</MechanicaButton>
                    </div>
                  </MechanicaCard>
                </Link>
              </div>
            )}

            {activeTab === 'learning' && (
              <MechanicaCard variant="mechanical" animated>
                <div className="p-8">
                  <div className="flex items-center space-x-3 mb-8">
                    <MechanicaGear size="large" color="brass" speed="slow" />
                    <h3 className="text-3xl font-bold mechanica-heading-professional">Your Learning Path</h3>
                  </div>
                  {(() => {
                    // Default to visual learner since learningStyle is not available
                    const defaultLearningStyle: string = 'visual';
                    switch (defaultLearningStyle) {
                      case 'visual':
                        return <VisualLearner />;
                      case 'aural':
                        return <AuralLearner />;
                      case 'read_write':
                        return <ReadWriteLearner />;
                      case 'kinesthetic':
                        return <KinestheticLearner />;
                      default:
                        return (
                          <div className="space-y-6">
                            <MechanicaCard variant="wood" className="border-green-200 bg-green-50">
                              <div className="p-6 flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xl">✅</span>
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-xl font-bold mb-2 mechanica-heading-professional">Investment Basics</h4>
                                  <p className="text-gray-600 mechanica-text-technical">Learn fundamental investment concepts</p>
                                </div>
                              </div>
                            </MechanicaCard>

                            <MechanicaCard variant="mechanical" className="border-blue-200 bg-blue-50">
                              <div className="p-6 flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                  <MechanicaGear size="medium" color="steel" speed="medium" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-xl font-bold mb-2 mechanica-heading-professional">Portfolio Management</h4>
                                  <p className="text-gray-600 mechanica-text-technical">Master portfolio construction and rebalancing</p>
                                </div>
                              </div>
                            </MechanicaCard>

                            <MechanicaCard variant="mechanical" className="border-gray-200 bg-gray-50 opacity-75">
                              <div className="p-6 flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                  <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xl">🔒</span>
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-xl font-bold mb-2 mechanica-heading-professional">Advanced Strategies</h4>
                                  <p className="text-gray-600 mechanica-text-technical">Explore advanced investment techniques</p>
                                </div>
                              </div>
                            </MechanicaCard>
                          </div>
                        );
                    }
                  })()}
                </div>
              </MechanicaCard>
            )}
          </div>
        </div>

        {/* Founderlings CTA Section */}
        <div className="mt-12">
          <MechanicaCard variant="brass" animated className="max-w-4xl mx-auto">
            <div className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <MechanicaGear size="large" color="copper" speed="slow" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      Join <span className="text-amber-600">Founderlings</span> Community
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Get weekly investment insights, early access to new tools, and connect with 10,000+ smart investors.
                  </p>
                </div>

                <div className="flex-shrink-0">
                  {showConfirmation && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600">✅</span>
                        <span className="text-green-800 font-medium text-sm">
                          Welcome to Founderlings!
                        </span>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleEmailSignup} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                    <MechanicaButton
                      variant="mechanical"
                      type="submit"
                      disabled={isSubscribing || !email}
                      className="px-6"
                    >
                      {isSubscribing ? (
                        <div className="flex items-center space-x-2">
                          <MechanicaGear size="small" color="steel" speed="fast" />
                          <span>Joining...</span>
                        </div>
                      ) : (
                        'Join Free'
                      )}
                    </MechanicaButton>
                  </form>
                </div>
              </div>
            </div>
          </MechanicaCard>
        </div>
      </div>
    </MechanicaLayout>
  );
}
