import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { MechanicaLayout } from '../components/layout/mechanicaLayout';
import { MechanicaCard } from '../components/ui/mechanicaCard';
import { MechanicaButton } from '../components/ui/mechanicaButton';
import { MechanicaGear } from '../components/ui/mechanicaGear';
import { MechanicaInput } from '../components/ui/mechanicaInput';

interface PlatformStats {
  portfoliosBuilt: number;
  simulationsRun: number;
  simulatedValue: number;
  userSatisfaction: number;
}

export default function HomePage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsAnimated, setStatsAnimated] = useState(true);
  const [email, setEmail] = useState('');
  const [heroEmail, setHeroEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const submitGuardRef = useRef(false);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitGuardRef.current) return;
    submitGuardRef.current = true;

    setIsSubscribing(true);

    try {
      const response = await fetch('/api/founderlings-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowConfirmation(true);
        setEmail('');
        setTimeout(() => setShowConfirmation(false), 5000);
      } else {
        // Handle error (email already exists, etc.)
        alert(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Email signup error:', error);
      alert('Network error. Please try again.');
    } finally {
      setIsSubscribing(false);
      submitGuardRef.current = false;
    }
  };

  const stats: PlatformStats = {
    portfoliosBuilt: 12847,
    simulationsRun: 45923,
    simulatedValue: 85487293,
    userSatisfaction: 98,
  };

  // Helper function for in-view check (simplified or from useInView hook)
  const isElementInView = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  // Animate stats when visible
  useEffect(() => {
    const handleScroll = () => {
      if (
        statsRef.current &&
        isElementInView(statsRef.current) &&
        !statsAnimated
      ) {
        setStatsAnimated(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [statsAnimated]);

  const features = [
    {
      title: 'Level 1: Foundational Basics',
      description: 'Start with the absolute essentials: Money fundamentals, budgeting (50/30/20), banking, credit, and saving strategies. No jargon, just plain English.',
      icon: '🌱',
      href: '/learning-hub',
      gearColor: 'steel' as const,
    },
    {
      title: 'Level 2: Intermediate Management',
      description: 'Advance with debt management (snowball/avalanche), insurance fundamentals, and a practical introduction to the risk/return mechanics of investing.',
      icon: '📚',
      href: '/learning-hub',
      gearColor: 'copper' as const,
    },
    {
      title: 'Level 3: Advanced Investing',
      description: 'Dive into stock market mechanics, retirement planning (401k/IRA), real estate, and tax optimization using our zero-risk simulations.',
      icon: '🏗️',
      href: '/learning-hub',
      gearColor: 'brass' as const,
    },
    {
      title: 'Level 4: Expert Strategies',
      description: 'For those ready for advanced vehicles: options, technical analysis, portfolio management theory, and comprehensive estate planning.',
      icon: '🚀',
      href: '/learning-hub',
      gearColor: 'steel' as const,
    },
    {
      title: 'Level 5: Institutional Mastery',
      description: 'Explore pro-level topics: derivatives risk, quantitative modeling, institutional management, and multi-generational wealth preservation.',
      icon: '🏛️',
      href: '/learning-hub',
      gearColor: 'brass' as const,
    },
  ];

  return (
    <MechanicaLayout>
      <Head>
        <title>Full Financial Education & Risk-Free Investing | BeginnerInvestorHub</title>
        <meta
          name="description"
          content="Democratizing financial education through AI-powered adaptive learning. From money basics to institutional strategies, build your confidence with zero risk."
        />

        {/* Open Graph Tags */}
        <meta
          property="og:title"
          content="Full Financial Education & Risk-Free Investing | BeginnerInvestorHub"
        />
        <meta
          property="og:description"
          content="Master money fundamentals and institutional investing strategies with our 5-level adaptive learning journey and zero-risk simulations."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={
            process.env.NEXT_PUBLIC_SITE_URL ||
            'https://beginnerinvestorhub-demo.vercel.app/'
          }
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://beginnerinvestorhub-demo.vercel.app'}/favicon.svg`}
        />
        <meta property="og:site_name" content="BeginnerInvestorHub" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Start Investing Safely | BeginnerInvestorHub"
        />
        <meta
          name="twitter:description"
          content="A confidence-building financial education platform for scared, overwhelmed beginners."
        />
        <meta
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://beginnerinvestorhub-demo.vercel.app'}/favicon.svg`}
        />
      </Head>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-mechanica-moonlight-blue via-mechanica-moonlight-blue-light to-mechanica-moonlight-blue-dark text-white overflow-hidden">
          {/* Mechanical background */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255, 255, 255, 0.1) 40px, rgba(255, 255, 255, 0.1) 80px),
                repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255, 255, 255, 0.05) 40px, rgba(255, 255, 255, 0.05) 80px)
              `,
              }}
            />
          </div>

          {/* Animated gears */}
          <div className="absolute top-20 left-10 opacity-30 hidden sm:block">
            <MechanicaGear
              size="xl"
              color="brass"
              speed="slow"
              aria-hidden="true"
            />
          </div>
          <div className="absolute top-40 right-20 opacity-30 hidden sm:block">
            <MechanicaGear
              size="large"
              color="steel"
              speed="reverse"
              aria-hidden="true"
            />
          </div>
          <div className="absolute bottom-20 left-20 opacity-30 hidden sm:block">
            <MechanicaGear
              size="medium"
              color="copper"
              speed="medium"
              aria-hidden="true"
            />
          </div>
          <div className="absolute bottom-40 right-10 opacity-30 hidden sm:block">
            <MechanicaGear
              size="small"
              color="brass"
              speed="fast"
              aria-hidden="true"
            />
          </div>

          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Mechanical logo */}
              <div className="flex justify-center items-center space-x-4 md:space-x-6 mb-12">
                <div className="hidden sm:block">
                  <MechanicaGear
                    size="large"
                    color="brass"
                    speed="slow"
                    aria-hidden="true"
                  />
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-serif uppercase tracking-tighter mechanica-title-gold-chrome">
                  BeginnerInvestorHub
                </div>
                <div className="hidden sm:block">
                  <MechanicaGear
                    size="large"
                    color="brass"
                    speed="reverse"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 font-serif leading-tight">
                Scared to Invest? <br className="hidden md:block" />
                Start with Full Financial Education Here.
              </h1>

              <h2 className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto font-normal leading-relaxed">
                We go beyond investing to cover budgeting, debt, taxes, and more—all in a beginner-friendly, simulation-based hub.
              </h2>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <div className="bg-white/10 p-2 rounded-lg backdrop-blur-md flex flex-col sm:flex-row gap-3 w-full max-w-2xl items-stretch">
                  <input
                    type="email"
                    value={heroEmail}
                    onChange={e => setHeroEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="px-4 py-3 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 flex-grow mechanica-text-technical min-w-0"
                    aria-label="Email address for simulation signup"
                    tabIndex={0}
                  />
                  <Link href="/vark-assessment" className="flex flex-shrink-0">
                    <MechanicaButton
                      variant="mechanical"
                      size="md"
                      className="w-full whitespace-nowrap shadow-xl"
                    >
                      Discover Your Learning Style — Free
                    </MechanicaButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mechanical decorative elements */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50" />
        </section>

      <main>
        {/* Trust Signals */}
        <section id="trust-signals" className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <p className="text-lg font-mono text-gray-600">
                Educational simulations only
              </p>
              <p className="text-lg font-mono text-gray-600">
                No real money required
              </p>
              <p className="text-lg font-mono text-gray-600">
                No brokerage access
              </p>
            </div>
          </div>
        </section>

        {/* Platform Stats */}
        <section
          ref={statsRef}
          className="py-20 bg-gradient-to-br from-gray-50 to-amber-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-mechanica-moonlight-blue font-serif">
                Our Growing Community
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands building their confidence before risking real money
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <MechanicaCard variant="mechanical" animated gearDecoration>
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <MechanicaGear size="medium" color="steel" speed="medium" />
                  </div>
                  <div className="text-4xl font-bold text-mechanica-moonlight-blue mb-2 font-mono">
                    {statsAnimated
                      ? stats.portfoliosBuilt.toLocaleString()
                      : '0'}
                  </div>
                  <div className="text-sm font-mono text-gray-600 uppercase tracking-wide">
                    Portfolio Blueprints Created
                  </div>
                </div>
              </MechanicaCard>

              <MechanicaCard variant="wood" animated gearDecoration>
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <MechanicaGear size="medium" color="brass" speed="slow" />
                  </div>
                  <div className="text-4xl font-bold text-mechanica-moonlight-blue mb-2 font-mono">
                    {statsAnimated
                      ? stats.simulationsRun.toLocaleString()
                      : '0'}
                  </div>
                  <div className="text-sm font-mono text-gray-600 uppercase tracking-wide">
                    Learning Simulations Run
                  </div>
                </div>
              </MechanicaCard>

              <MechanicaCard variant="brass" animated gearDecoration>
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <MechanicaGear size="medium" color="copper" speed="fast" />
                  </div>
                  <div className="text-4xl font-bold text-mechanica-moonlight-blue mb-2 font-mono">
                    $
                    {statsAnimated
                      ? (stats.simulatedValue / 1000000).toFixed(1)
                      : '0'}
                    M
                  </div>
                  <div className="text-sm font-mono text-gray-600 uppercase tracking-wide">
                    Total Simulated AUM
                  </div>
                </div>
              </MechanicaCard>

              <MechanicaCard variant="mechanical" animated gearDecoration>
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <MechanicaGear
                      size="medium"
                      color="steel"
                      speed="reverse"
                    />
                  </div>
                  <div className="text-4xl font-bold text-mechanica-moonlight-blue mb-2 font-mono">
                    {statsAnimated ? stats.userSatisfaction : '0'}%
                  </div>
                  <div className="text-sm font-mono text-gray-600 uppercase tracking-wide">
                    Learner Confidence Rating
                  </div>
                </div>
              </MechanicaCard>
            </div>
          </div>

          {/* Sample Data Disclaimer */}
          <div className="text-center mt-8">
            <p className="text-sm font-mono text-gray-500 uppercase tracking-wide">
              Sample demo data — not real assets
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-mechanica-moonlight-blue font-serif">
                Your Learning Journey (5 Levels)
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
                Build your confidence step-by-step in a safe, guided environment. From foundations to institutional mastery.
              </p>
              <Link href="/financial-education-index">
                <span className="text-mechanica-moonlight-blue font-bold border-b-2 border-mechanica-moonlight-blue/20 hover:border-mechanica-moonlight-blue transition-all cursor-pointer">
                  View Full Curriculum Index &rarr;
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <MechanicaCard
                  key={index}
                  variant="mechanical"
                  animated
                  gearDecoration
                  className="group hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <MechanicaGear
                        size="large"
                        color={feature.gearColor}
                        speed="medium"
                        aria-label="Animated decorative gear"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3 text-mechanica-moonlight-blue font-serif">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      <Link href={feature.href}>
                        <MechanicaButton variant="mechanical" size="sm">
                          Explore Level
                        </MechanicaButton>
                      </Link>
                    </div>
                  </div>
                </MechanicaCard>
              ))}
            </div>
          </div>
        </section>

        {/* Founderlings CTA Section */}
        <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-mechanica-moonlight-blue font-serif">
                Become a Founderling
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join our founding community and help shape the future of
                investing education
              </p>
            </div>
            <MechanicaCard
              variant="brass"
              animated
              className="max-w-6xl mx-auto mb-16"
            >
              <div className="p-10">
                <div className="text-center mb-8">
                  <div className="flex justify-center items-center space-x-4 mb-6">
                    <MechanicaGear size="xl" color="copper" speed="slow" />
                    <h2 className="text-4xl font-bold text-gray-900 font-serif">
                      You&apos;re Not Just a User. <br />
                      You&apos;re a{' '}
                      <span className="text-amber-600">Co-creator</span>.
                    </h2>
                    <MechanicaGear size="xl" color="copper" speed="reverse" />
                  </div>

                  <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-5xl mx-auto">
                    Founderlings don&apos;t just provide data — you actively
                    tune our risk-modeling engine and shape product direction.
                    Every learning decision you make teaches our AI how to
                    personalize investing education for thousands of future
                    users.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">👑</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Lifetime Premium Access
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Normally $29.99/month
                    </p>
                    <p className="text-lg font-bold text-amber-600">
                      Yours forever
                    </p>
                    <p className="text-xs text-gray-500">(Pro tier excluded)</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🤖</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      AI Co-creation Rights
                    </h3>
                    <p className="text-sm text-gray-600">
                      Tune risk-modeling engine
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Product Direction Influence
                    </h3>
                    <p className="text-sm text-gray-600">
                      Shape what gets built next
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Early Feature Access
                    </h3>
                    <p className="text-sm text-gray-600">
                      Test AI capabilities first
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">👥</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Founderling Community
                    </h3>
                    <p className="text-sm text-gray-600">
                      Private space with members #1-1000
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Founding Recognition
                    </h3>
                    <p className="text-sm text-gray-600">
                      Permanent badge and member number
                    </p>
                  </div>
                </div>

                {/* Email Signup Form */}
                <div className="text-center">
                  <p className="text-lg text-gray-700 mb-6 font-medium">
                    Join first 1000 Founderlings to access our full 5-level financial education, 
                    from foundations to institutional strategies, with AI-personalized simulations.
                  </p>
                  <form
                    onSubmit={handleEmailSignup}
                    className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-4"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter your email to become a Founderling"
                      required
                      className="flex-1 px-6 py-4 border-2 border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg"
                    />
                    <MechanicaButton
                      variant="mechanical"
                      type="submit"
                      disabled={isSubscribing || !email}
                      size="lg"
                      className="px-8"
                    >
                      {isSubscribing ? (
                        <div className="flex items-center space-x-3">
                          <MechanicaGear
                            size="small"
                            color="steel"
                            speed="fast"
                          />
                          <span>Becoming Founderling...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span>🚀</span>
                          <span>Become a Founderling</span>
                        </div>
                      )}
                    </MechanicaButton>
                  </form>

                  {showConfirmation && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-green-600 text-2xl">✅</span>
                        <span className="text-green-800 font-medium">
                          Welcome to Founderlings! Check your email for your
                          co-creator credentials.
                        </span>
                      </div>
                    </div>
                  )}

                  <p className="text-sm text-gray-500 mt-4">
                    Limited to first 1000 members. No spam, unsubscribe anytime.
                  </p>
                </div>
              </div>
            </MechanicaCard>
          </div>
        </section>
      </main>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-mechanica-moonlight-blue to-mechanica-moonlight-blue-dark text-white relative overflow-hidden">
        {/* Mechanical background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255, 255, 255, 0.1) 30px, rgba(255, 255, 255, 0.1) 60px),
                repeating-linear-gradient(-45deg, transparent, transparent 30px, rgba(255, 255, 255, 0.05) 30px, rgba(255, 255, 255, 0.05) 60px)
              `,
            }}
          />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center items-center space-x-6 mb-8">
              <MechanicaGear
                size="large"
                color="brass"
                speed="slow"
                aria-label="Animated decorative gear"
              />
              <div className="text-5xl font-bold font-serif text-yellow-400">
                Start Your Journey
              </div>
              <MechanicaGear
                size="large"
                color="brass"
                speed="reverse"
                aria-label="Animated decorative gear"
              />
            </div>

            <h2 className="text-4xl font-bold mb-6 font-serif">
              Ready to Master Your Investment Strategy?
            </h2>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Join thousands of learners who are mastering the art of portfolio
              management with our precision-engineered educational platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/signup">
                <MechanicaButton variant="mechanical" size="lg">
                  Start Learning Now
                </MechanicaButton>
              </Link>
              <Link href="/dashboard">
                <MechanicaButton variant="mechanical" size="lg">
                  View Dashboard
                </MechanicaButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Mechanical decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50" />
      </section>

      {/* Email Signup Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-mechanica-moonlight-blue font-serif">
              Stay Updated with Market Insights
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Get precision analysis and investment tips delivered to your inbox
            </p>

            <form
              onSubmit={e => {
                e.preventDefault();
                if (!newsletterEmail) return;
                setNewsletterSubmitted(true);
                setNewsletterEmail('');
                setTimeout(() => setNewsletterSubmitted(false), 5000);
              }}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <MechanicaInput
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewsletterEmail(e.target.value)
                }
                className="flex-1"
                required
              />
              <MechanicaButton variant="mechanical" size="md" type="submit">
                Subscribe
              </MechanicaButton>
            </form>
            {newsletterSubmitted && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 font-medium text-sm">
                ✅ Thanks for subscribing! You&apos;ll receive our next update.
              </div>
            )}
          </div>
        </div>
      </section>
    </MechanicaLayout>
  );
}
