import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { MechanicaLayout } from '../components/layout/mechanicaLayout';
import { MechanicaCard } from '../components/ui/mechanicaCard';
import { MechanicaButton } from '../components/ui/mechanicaButton';
import { MechanicaGear } from '../components/ui/mechanicaGear';
import { MechanicaInput } from '../components/ui/mechanicaInput';
import { MechanicaTicker } from '../components/ui/MechanicaTicker';

interface PlatformStats {
  portfoliosBuilt: number;
  simulationsRun: number;
  simulatedValue: number;
  userSatisfaction: number;
}

export default function HomePage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsAnimated, setStatsAnimated] = useState(false);

  const [stats, setStats] = useState<PlatformStats>({
    portfoliosBuilt: 0,
    simulationsRun: 0,
    simulatedValue: 0,
    userSatisfaction: 0,
  });

  // Helper function for in-view check (simplified or from useInView hook)
  const isElementInView = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  // Animate stats when visible
  useEffect(() => {
    const handleScroll = () => {
      if (statsRef.current && isElementInView(statsRef.current) && !statsAnimated) {
        setStatsAnimated(true);

        // Set final stats with realistic startup values
        setTimeout(() => {
          setStats({
            portfoliosBuilt: 2847,
            simulationsRun: 8923,
            simulatedValue: 487293,
            userSatisfaction: 94,
          });
        }, 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [statsAnimated]); // Dependency array updated

  const features = [
    {
      // Updated Title
      title: 'Strategic Portfolio Simulator',
      // Updated Description: Focus on learning and testing strategies
      description: 'Learn and test investment strategies using our algorithmically validated simulation system, featuring real-time market data and advanced analytics.',
      icon: '⚙️',
      href: '/portfolio-monitor',
      gearColor: 'steel' as const,
    },
    {
      title: 'ESG Strategy Screener',
      description: 'Precision investment filter for screening components based on Environmental, Social, and Governance criteria. Detect red flags and verify component integrity.',
      icon: '🌍',
      href: '/esg-screener',
      gearColor: 'steel' as const,
    },
    {
      // Updated Title
      title: 'Risk & Volatility Analytics',
      // Updated Description: Focus on understanding risk with data science
      description: 'Master risk assessment with our engineering-grade analytics powered by advanced algorithms and predictive modeling.',
      icon: '📊',
      href: '/risk-assessment',
      gearColor: 'copper' as const,
    },
    {
      // Updated Title
      title: 'Fractional Share Calculator',
      // Updated Description: Focus on precision calculation and broker comparison
      description: 'Calculate fractional shares with any investment amount, compare broker fees, and visualize your purchase blueprint with precision engineering.',
      icon: '📈',
      href: '/fractional-share-calculator',
      gearColor: 'steel' as const,
    },
  ];

  const learningPaths = [
    {
      // Updated Title: Focus on Fundamentals
      title: 'Financial Fundamentals',
      // Updated Description: Focus on Core Skills
      description: 'Master the core financial skills with our structured learning path, featuring foundational knowledge and step-by-step guidance.',
      level: 'Foundation',
      duration: '4 weeks',
      gearColor: 'brass' as const,
    },
    {
      // Updated Title: Focus on Portfolio Building
      title: 'Intermediate Portfolio Construction',
      // Updated Description: Focus on Advanced Skills
      description: 'Advance your skills with complex strategies and technical analysis using our structured learning modules.',
      level: 'Intermediate',
      duration: '8 weeks',
      gearColor: 'steel' as const,
    },
    {
      // Updated Title: Focus on Expertise
      title: 'Advanced Strategic Expertise',
      // Updated Description: Focus on sophisticated management
      description: 'Become an expert with sophisticated strategies and professional-grade portfolio management techniques.',
      level: 'Advanced',
      duration: '12 weeks',
      gearColor: 'copper' as const,
    },
  ];

  return (
    <MechanicaLayout>
      <Head>
        <title>Precision Investment Mastery | BeginnerInvestorHub</title>
        <meta name="description" content="Master investing with guided simulations built for first-time investors. Practice portfolio strategies, visualize risk metrics, and build confidence with virtual money." />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Precision Investment Mastery | BeginnerInvestorHub" />
        <meta property="og:description" content="Master investing with guided simulations built for first-time investors. Practice portfolio strategies with virtual money." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://beginnerinvestorhub-demo.vercel.app/" />
        <meta property="og:image" content="https://beginnerinvestorhub-demo.vercel.app/og-image.jpg" />
        <meta property="og:site_name" content="BeginnerInvestorHub" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Precision Investment Mastery | BeginnerInvestorHub" />
        <meta name="twitter:description" content="Master investing with guided simulations built for first-time investors." />
        <meta name="twitter:image" content="https://beginnerinvestorhub-demo.vercel.app/og-image.jpg" />
      </Head>
      {/* Hero Section */}
      <header>
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-mechanica-moonlight-blue via-mechanica-moonlight-blue-light to-mechanica-moonlight-blue-dark text-white overflow-hidden">
        {/* Mechanical background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255, 255, 255, 0.1) 40px, rgba(255, 255, 255, 0.1) 80px),
                repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255, 255, 255, 0.05) 40px, rgba(255, 255, 255, 0.05) 80px)
              `
            }}
          />
        </div>

        {/* Animated gears */}
        <div className="absolute top-20 left-10 opacity-30">
          <MechanicaGear size="xl" color="brass" speed="slow" aria-label="Animated decorative gear" />
        </div>
        <div className="absolute top-40 right-20 opacity-30">
          <MechanicaGear size="large" color="steel" speed="reverse" aria-label="Animated decorative gear" />
        </div>
        <div className="absolute bottom-20 left-20 opacity-30">
          <MechanicaGear size="medium" color="copper" speed="medium" aria-label="Animated decorative gear" />
        </div>
        <div className="absolute bottom-40 right-10 opacity-30">
          <MechanicaGear size="small" color="brass" speed="fast" aria-label="Animated decorative gear" />
        </div>

        {/* Demo Banner - Mission Protocol Bar */}
        <nav className="absolute top-0 left-0 right-0 z-30 flex justify-center p-4" role="banner">
          <div className="inline-flex items-center space-x-3 px-6 py-2 bg-black/30 backdrop-blur-xl border-x border-b border-yellow-500/30 rounded-b-2xl shadow-2xl">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
            </span>
            <p className="text-[11px] sm:text-xs font-black uppercase tracking-[0.2em] text-yellow-100/90" role="status">
              Protocol: This is a production-quality demo showcasing frontend architecture, UX, and system design for a larger AI-driven financial education platform
            </p>
          </div>
        </nav>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Mechanical logo */}
            <div className="flex justify-center items-center space-x-6 mb-8">
              <MechanicaGear size="large" color="brass" speed="slow" aria-label="Animated decorative gear" />
              <div className="text-6xl font-bold font-serif text-yellow-400">
                BeginnerInvestorHub
              </div>
              <MechanicaGear size="large" color="brass" speed="reverse" aria-label="Animated decorative gear" />
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-serif">
              Master investing with guided simulations — built for first-time investors.
            </h1>

            <h2 className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto font-normal">
              Practice with portfolio simulations, visualize risk metrics, and build confidence — 
              all with virtual money, no real investment required.
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm flex flex-col sm:flex-row gap-2 w-full max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="px-4 py-3 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 flex-grow mechanica-text-technical"
                  aria-label="Email address for simulation signup"
                  tabIndex={0}
                />
                <Link href="/signup">
                  <MechanicaButton variant="mechanical" size="md" className="w-full sm:w-auto whitespace-nowrap">
                    Start a 5-minute Simulation
                  </MechanicaButton>
                </Link>
              </div>
            </div>
            <div className="flex justify-center gap-4 text-sm text-blue-200 mb-8">
              <Link href="/login" className="hover:text-white underline decoration-yellow-400/50">Already have an account? Sign in</Link>
              <span>•</span>
              <Link href="/tools" className="hover:text-white underline decoration-yellow-400/50">See how it works</Link>
            </div>
          </div>
        </div>

        {/* Mechanical decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 right-0">
          <MechanicaTicker />
        </div>
      </section>
    </header>

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
      <section ref={statsRef} className="py-20 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-mechanica-moonlight-blue font-serif">
              Strategic Impact in Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Track your learning progress and the scale of our platform&apos;s simulations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <MechanicaCard variant="mechanical" animated gearDecoration>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <MechanicaGear size="medium" color="steel" speed="medium" />
                </div>
                <div className="text-4xl font-bold text-mechanica-moonlight-blue mb-2 font-mono">
                  {statsAnimated ? stats.portfoliosBuilt.toLocaleString() : '0'}
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
                  {statsAnimated ? stats.simulationsRun.toLocaleString() : '0'}
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
                  ${statsAnimated ? (stats.simulatedValue / 1000000).toFixed(1) : '0'}M
                </div>
                <div className="text-sm font-mono text-gray-600 uppercase tracking-wide">
                  Total Simulated AUM
                </div>
              </div>
            </MechanicaCard>

            <MechanicaCard variant="mechanical" animated gearDecoration>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <MechanicaGear size="medium" color="steel" speed="reverse" />
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
              Core Investment Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our structured tools provide accuracy and support for your investment education
            </p>
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
                    <MechanicaGear size="large" color={feature.gearColor} speed="medium" aria-label="Animated decorative gear" />
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
                        Launch Tool
                      </MechanicaButton>
                    </Link>
                  </div>
                </div>
              </MechanicaCard>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-mechanica-moonlight-blue font-serif">
              Structured Investment Curricula
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Structured learning with a focus on skill development and strategic application
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learningPaths.map((path, index) => (
              <MechanicaCard
                key={index}
                variant="wood"
                animated
                gearDecoration
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="mb-6">
                  <MechanicaGear size="large" color={path.gearColor} speed="slow" aria-label="Animated decorative gear" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-mechanica-moonlight-blue font-serif">
                  {path.title}
                </h3>
                <div className="flex justify-center space-x-4 mb-4">
                  <span className="px-3 py-1 bg-mechanica-moonlight-blue text-white rounded-full text-xs font-mono">
                    {path.level}
                  </span>
                  <span className="px-3 py-1 bg-amber-600 text-white rounded-full text-xs font-mono">
                    {path.duration}
                  </span>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {path.description}
                </p>
                <MechanicaButton variant="wood" size="sm">
                  Start Path
                </MechanicaButton>
              </MechanicaCard>
            ))}
          </div>
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
              `
            }}
          />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center items-center space-x-6 mb-8">
              <MechanicaGear size="large" color="brass" speed="slow" aria-label="Animated decorative gear" />
              <div className="text-5xl font-bold font-serif text-yellow-400">
                Start Your Journey
              </div>
              <MechanicaGear size="large" color="brass" speed="reverse" aria-label="Animated decorative gear" />
            </div>

            <h2 className="text-4xl font-bold mb-6 font-serif">
              Ready to Master Your Investment Strategy?
            </h2>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              Join thousands of learners who are mastering the art of portfolio management
              with our precision-engineered educational platform.
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

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <MechanicaInput
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <MechanicaButton variant="mechanical" size="md">
                Subscribe
              </MechanicaButton>
            </div>
          </div>
        </div>
      </section>
    </MechanicaLayout>
  );
}