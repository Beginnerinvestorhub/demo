import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { MechanicaButton } from '../components/ui/mechanicaButton';
import { MechanicaLayout } from '../components/layout/mechanicaLayout';
import { MechanicaCard } from '../components/ui/mechanicaCard';
import { MechanicaGear } from '../components/ui/mechanicaGear';

const AboutPage: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Animate elements into view on scroll
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const targets = document.querySelectorAll('[data-animate]');
    targets.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <MechanicaLayout>
      <Head>
        <title>About Us - BeginnerInvestorHub | Precision Financial Education</title>
        <meta name="description" content="Learn about BeginnerInvestorHub's mission to democratize financial education through AI-powered adaptive learning and behavioral psychology. Founded by a master carpenter turned systems engineer." />
        <meta name="keywords" content="financial education, AI learning, behavioral finance, investing for beginners, adaptive learning, VARK model, financial literacy" />
        <meta name="author" content="Kevin Ringler" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.svg" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://beginnerinvestorhub.vercel.app/about" />
        <meta property="og:title" content="About Us - BeginnerInvestorHub | Precision Financial Education" />
        <meta property="og:description" content="Learn about our mission to democratize financial education through AI-powered adaptive learning. Founded by a master carpenter turned systems engineer." />
        <meta property="og:image" content="https://beginnerinvestorhub.vercel.app/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="BeginnerInvestorHub" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://beginnerinvestorhub.vercel.app/about" />
        <meta property="twitter:title" content="About Us - BeginnerInvestorHub | Precision Financial Education" />
        <meta property="twitter:description" content="Learn about our mission to democratize financial education through AI-powered adaptive learning. Founded by a master carpenter turned systems engineer." />
        <meta property="twitter:image" content="https://beginnerinvestorhub.vercel.app/og-image.png" />
        <meta property="twitter:creator" content="@kevinringler" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="theme-color" content="#4f738e" />
        <link rel="canonical" href="https://beginnerinvestorhub.vercel.app/about" />
      </Head>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease forwards;
        }
        [data-animate] {
          opacity: 0;
        }
      `}</style>

      <div className="min-h-screen bg-gray-50">

        {/* ─── Hero Section ─── */}
        <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-mechanica-moonlight-blue via-mechanica-moonlight-blue-light to-mechanica-moonlight-blue-dark text-white overflow-hidden">
          {/* Diagonal grid texture */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.1) 30px, rgba(255,255,255,0.1) 60px)',
              }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif">
              Master the Machine. <br />
              <span className="text-yellow-400">Skip the Long Way Around.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-4xl mx-auto">
              I spent 13 years building structures with precision. Now, I'm building the
              engagement layer the financial world was always missing—turning complex markets
              into a rewarding, risk-free mastery loop.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <MechanicaButton variant="brass" size="lg">
                Start Your Apprenticeship
              </MechanicaButton>
              <MechanicaButton variant="primary" size="lg" className="text-white border-white">
                View Platform Tech
              </MechanicaButton>
            </div>
          </div>
        </section>

        <main>

          {/* ─── The Why: The Long Way Around ─── */}
          <section className="py-20 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-16 items-center">

                {/* Video placeholder */}
                <div className="order-2 md:order-1" data-animate>
                  <div className="bg-gray-900 rounded-2xl aspect-video flex items-center justify-center text-white shadow-2xl overflow-hidden border-4 border-mechanica-moonlight-blue">
                    <div className="text-center p-8">
                      <i className="fas fa-play-circle text-6xl text-yellow-400 mb-4 animate-pulse"></i>
                      <h3 className="text-xl font-bold mb-2">The Long Way Around</h3>
                      <p className="text-gray-400 text-sm">Play Origin Story Animation</p>
                    </div>
                  </div>
                </div>

                {/* Copy */}
                <div className="order-1 md:order-2" data-animate>
                  <h2 className="text-4xl font-bold text-mechanica-moonlight-blue mb-6 font-serif">
                    The &ldquo;Why&rdquo;
                  </h2>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Nobody talks about finances. They didn&apos;t teach it in school, and for most
                    of us, the subject is <strong>hard, scary, and boring.</strong> Because we
                    aren&apos;t educated on it, the standard has become learning &ldquo;The Long
                    Way Around&rdquo;—making expensive, real-world mistakes just to understand
                    the basics.
                  </p>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    With 70% of Americans feeling unprepared, and the markets getting more
                    complicated every day, the old way isn&apos;t just slow—it&apos;s dangerous.
                    I built this hub to be the shortcut I never had.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 text-mechanica-moonlight-blue font-bold">
                      <i className="fas fa-times-circle text-red-500"></i>
                      <span>No More Fear</span>
                    </div>
                    <div className="flex items-center space-x-3 text-mechanica-moonlight-blue font-bold">
                      <i className="fas fa-times-circle text-red-500"></i>
                      <span>No More Boredom</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ─── Mission & Gamification: Precision Progression ─── */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16" data-animate>
                <h2 className="text-4xl font-bold text-mechanica-moonlight-blue mb-4 font-serif">
                  Precision Progression
                </h2>
                <p className="text-xl text-gray-600">
                  We turned financial theory into a high-fidelity experience engine.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div data-animate>
                  <MechanicaCard variant="mechanical" gearDecoration className="p-8 text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <i className="fas fa-trophy text-3xl text-yellow-600"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-4">Level Up Mastery</h3>
                    <p className="text-gray-600 mb-4">
                      Earn XP and unlock 50+ achievements as you move from Apprentice to Market
                      Architect.
                    </p>
                    <span className="text-xs font-mono bg-gray-200 px-2 py-1 rounded">
                      GAMIFIED SYSTEM
                    </span>
                  </MechanicaCard>
                </div>

                <div data-animate>
                  <MechanicaCard variant="mechanical" gearDecoration className="p-8 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <i className="fas fa-brain text-3xl text-blue-600"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-4">Adaptive AI Nudges</h3>
                    <p className="text-gray-600 mb-4">
                      Our AI learns your style and delivers personalized interventions to curb
                      emotional trading.
                    </p>
                    <span className="text-xs font-mono bg-gray-200 px-2 py-1 rounded">
                      GPT-4 POWERED
                    </span>
                  </MechanicaCard>
                </div>

                <div data-animate>
                  <MechanicaCard variant="mechanical" gearDecoration className="p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <i className="fas fa-chart-line text-3xl text-green-600"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-4">Zero-Risk Simulator</h3>
                    <p className="text-gray-600 mb-4">
                      Practice with real market data and Hierarchical Risk Parity without risking
                      a single dollar.
                    </p>
                    <span className="text-xs font-mono bg-gray-200 px-2 py-1 rounded">
                      INSTITUTIONAL GRADE
                    </span>
                  </MechanicaCard>
                </div>
              </div>
            </div>
          </section>

          {/* ─── The Founder: Built, Not Bought ─── */}
          <section className="py-24 bg-mechanica-moonlight-blue text-white overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
              <div className="grid md:grid-cols-2 gap-16 items-center">

                {/* Copy */}
                <div data-animate>
                  <h2 className="text-4xl font-bold mb-8 font-serif">The Founder&apos;s Build</h2>
                  <p className="text-lg mb-6 opacity-90 leading-relaxed">
                    I spent 13 years as a master carpenter, where I learned that a structure is
                    only as strong as its foundation. When I tried to build my own financial
                    house, I realized the foundations were missing—not because they weren&apos;t
                    there, but because nobody gave me the blueprints.
                  </p>
                  <p className="text-lg mb-6 opacity-90 leading-relaxed">
                    I decided to stop taking the long way around. I taught myself to code and
                    engineered the platform I wish I had when I started. This isn&apos;t a
                    collection of off-the-shelf tools; it&apos;s a{' '}
                    <strong>14-service proprietary architecture</strong> built from scratch to
                    provide the transparency and engagement I once lacked.
                  </p>
                  <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-lg border border-white/20">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center font-bold text-lg">
                      KR
                    </div>
                    <div>
                      <p className="font-bold text-lg">Kevin Ringler</p>
                      <p className="text-sm opacity-75">Founder &amp; CEO</p>
                    </div>
                  </div>
                </div>

                {/* Founder photo with gear decoration */}
                <div className="relative" data-animate>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20">
                    <MechanicaGear size="xl" color="brass" speed="slow" />
                  </div>
                  {/* Render photo if available, else branded fallback */}
                  <div className="relative z-10 rounded-2xl shadow-2xl overflow-hidden aspect-[5/6] bg-white/10 border-2 border-white/20 flex items-center justify-center">
                    <Image
                      src="/assets/images/KRprofilepic.jpg"
                      alt="Kevin Ringler – Founder & CEO of BeginnerInvestorHub"
                      width={500}
                      height={600}
                      className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                      onError={(e) => {
                        // Hide broken image; fallback div is visible beneath
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    {/* Fallback visible when image is missing */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 pointer-events-none">
                      <div className="w-24 h-24 rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center text-4xl font-bold mb-4">
                        KR
                      </div>
                      <p className="font-bold text-xl">Kevin Ringler</p>
                      <p className="text-sm opacity-75">Founder &amp; CEO</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ─── The 7 Guardians: Self-Healing Governance ─── */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-12" data-animate>
                <h2 className="text-4xl font-bold text-mechanica-moonlight-blue mb-4 font-serif">
                  The 7 Guardians
                </h2>
                <p className="text-xl text-gray-600">
                  Autonomous agents that ensure your learning platform never fails.
                </p>
              </div>

              {/* flex + wrap so 7 items center gracefully on last row */}
              <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
                {[
                  'TrafficController',
                  'ProviderArbiter',
                  'QualitySteward',
                  'GovernanceEngine',
                  'PsychometricSteward',
                  'RebalancingGuardian',
                  'CircuitBreaker',
                ].map((guardian) => (
                  <div
                    key={guardian}
                    className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)] p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50 hover:border-mechanica-moonlight-blue transition-colors"
                    data-animate
                  >
                    <i className="fas fa-shield-alt text-mechanica-moonlight-blue text-xl mb-2 block"></i>
                    <p className="text-sm font-bold text-gray-800">{guardian}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── CTA Section ─── */}
          <section className="py-20 bg-yellow-400 text-gray-900 text-center">
            <div className="max-w-4xl mx-auto px-4" data-animate>
              <h2 className="text-4xl font-bold mb-6 font-serif">
                Ready to End the Long Way Around?
              </h2>
              <p className="text-xl mb-8 font-medium">
                Join a community of builders who are leveling up their financial future today.
              </p>
              <MechanicaButton variant="mechanical" size="lg" className="shadow-xl">
                Start Your First Quest
              </MechanicaButton>
            </div>
          </section>

        </main>
      </div>
    </MechanicaLayout>
  );
};

export default AboutPage;
