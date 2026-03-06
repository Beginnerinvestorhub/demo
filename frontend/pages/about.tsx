import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
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
              Claim Your Founding Seat. <br />
              <span className="text-yellow-400">Skip the Long Way Around.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-4xl mx-auto">
              I spent 13 years building structures with precision. Now, I'm building the
              engagement layer the financial world was always missing—turning complex markets
              into a rewarding, risk-free mastery loop.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/signup">
                <MechanicaButton variant="brass" size="lg">
                  Begin Your Apprenticeship
                </MechanicaButton>
              </Link>
              <button 
                onClick={() => {
                  document.getElementById('neural-blueprint')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <MechanicaButton variant="primary" size="lg" className="text-white border-white">
                  Inspect System Blueprint
                </MechanicaButton>
              </button>
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

          {/* ─── Our Proprietary 14-Microservice Neural Blueprint ─── */}
          <section id="neural-blueprint" className="py-20 bg-gray-50 border-y border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16" data-animate>
                <h2 className="text-4xl font-bold text-mechanica-moonlight-blue mb-4 font-serif">
                  Our Proprietary 14-Microservice Neural Blueprint
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
                  BeginnerInvestorHub is engineered on a robust, four-tier microservice architecture designed for institutional stability, 
                  low-latency financial simulation, and dynamic educational delivery. Our stack leverages distributed systems to turn 
                  complex market telemetry into actionable, personalized learning paths.
                </p>

                {/* Architecture Blueprint Visual */}
                <div className="max-w-5xl mx-auto mb-16 p-6 bg-white rounded-2xl shadow-2xl border border-gray-100 group cursor-pointer hover:shadow-mechanica-moonlight-blue/10 transition-all">
                  <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-4">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">System Blueprint v1.0.4 // GCP Mesh</span>
                    </div>
                    <span className="text-[10px] text-mechanica-moonlight-blue font-black uppercase tracking-widest px-2 py-0.5 bg-blue-50 rounded">Production Infrastructure</span>
                  </div>
                  <img 
                    src="/assets/images/beginner-investor-hub-architecture-blueprint.png" 
                    alt="BeginnerInvestorHub 14-Service Architecture Blueprint"
                    className="w-full rounded-lg"
                  />
                  <p className="mt-4 text-[10px] text-center text-gray-400 font-mono uppercase tracking-widest">
                    Fig 1.1: Distributed Hierarchical Risk Parity (HRP) Computation Cluster
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div data-animate>
                  <MechanicaCard variant="mechanical" className="p-8 h-full">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <span className="font-bold text-blue-600">T1</span>
                      </div>
                      <h3 className="text-xl font-bold text-mechanica-moonlight-blue">Tier 1: Intelligent Client & Gateway</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      Our high-performance frontend, built on Next.js and React Native, interfaces with a unified API Gateway to orchestrate 
                      asynchronous requests across our service mesh. This layer utilizes Firebase Auth for enterprise-grade, role-based access 
                      control (RBAC), ensuring secure session management and encrypted user handshakes across all platform modules.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-black uppercase text-gray-400">Next.js</span>
                      <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-black uppercase text-gray-400">Firebase Auth</span>
                    </div>
                  </MechanicaCard>
                </div>

                <div data-animate>
                  <MechanicaCard variant="mechanical" className="p-8 h-full">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                        <span className="font-bold text-purple-600">T2</span>
                      </div>
                      <h3 className="text-xl font-bold text-mechanica-moonlight-blue">Tier 2: Intelligence & Workhorse Tier</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      Google Vertex AI powers our proprietary Behavioral Nudge Engine, utilizing real-time inference to detect emotional 
                      trading biases. Simultaneously, our High-Fidelity Risk Engine executes on Google Cloud Run, performing intensive 
                      computation of institutional metrics including Sharpe Ratio, Sortino Ratio, and Value at Risk (VaR) with sub-millisecond latency.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-black uppercase text-gray-400">Vertex AI</span>
                      <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-black uppercase text-gray-400">Cloud Run</span>
                    </div>
                  </MechanicaCard>
                </div>

                <div data-animate>
                  <MechanicaCard variant="mechanical" className="p-8 h-full">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                        <span className="font-bold text-green-600">T3</span>
                      </div>
                      <h3 className="text-xl font-bold text-mechanica-moonlight-blue">Tier 3: Optimization & Learning Tier</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      The VARK Adaptive Learning Engine dynamically restructures educational content delivery based on individualized user 
                      psychometrics. We leverage GCP Pub/Sub for high-throughput, asynchronous market data streaming, enabling concurrent 
                      portfolio simulations and real-time state synchronization across the global user base.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-black uppercase text-gray-400">Pub/Sub</span>
                      <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-black uppercase text-gray-400">Adaptive Learning</span>
                    </div>
                  </MechanicaCard>
                </div>

                <div data-animate>
                  <MechanicaCard variant="mechanical" className="p-8 h-full">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
                        <span className="font-bold text-amber-600">T4</span>
                      </div>
                      <h3 className="text-xl font-bold text-mechanica-moonlight-blue">Tier 4: Security & Persistence</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      Our persistence layer ensures absolute data integrity and auditability. We utilize Google Secret Manager for secure 
                      credential rotation and environment isolation, alongside horizontally scalable databases optimized for the storage of 
                      high-resolution simulation logs and complex behavioral profiles used for continuous model training.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-black uppercase text-gray-400">Secret Manager</span>
                      <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-black uppercase text-gray-400">GCP SQL/Spanner</span>
                    </div>
                  </MechanicaCard>
                </div>
              </div>
            </div>
          </section>

          {/* ─── The Founder: Built, Not Bought ─── */}
          <section className="py-24 bg-mechanica-moonlight-blue text-white overflow-hidden relative border-y border-white/5">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
              <div data-animate>
                <h2 className="text-4xl md:text-5xl font-bold mb-12 font-serif text-yellow-400">The Founder&apos;s Build</h2>
                
                <div className="relative block">
                  {/* Circular Image with Shape-Outside for Advanced Wrapping */}
                  <div 
                    className="float-left mr-12 mb-8 relative group"
                    style={{ shapeOutside: 'circle(50%)', width: 'clamp(200px, 30vw, 320px)' }}
                  >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-full bg-yellow-500/20 blur-3xl group-hover:bg-yellow-500/30 transition-all duration-700 -z-10 scale-110"></div>
                    
                    <div className="aspect-square rounded-full border-8 border-white/5 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10">
                      <img
                        src="/assets/images/KRprofilepic.jpg"
                        alt="Kevin Ringler – Founder & CEO of BeginnerInvestorHub"
                        className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                      />
                    </div>
                    
                    {/* Decorative Technical Overlay */}
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 opacity-40 z-20 hidden md:block">
                      <MechanicaGear size="lg" color="brass" speed="slow" />
                    </div>
                  </div>

                  <div className="text-lg md:text-xl leading-relaxed space-y-6 text-gray-100 font-light">
                    <p>
                      I spent 13 years as a master carpenter, where I learned that a structure is
                      only as strong as its foundation. When I tried to build my own financial
                      house, I realized the foundations were missing—not because they weren&apos;t
                      there, but because nobody gave me the blueprints. 
                    </p>
                    <p>
                      The complexity of modern markets is often used as a barrier to entry, but I saw it 
                      differently. To me, a market is just another structure to be mapped, measured, 
                      and mastered. I decided to stop taking the long way around. I taught myself to code 
                      and engineered the platform I wish I had when I started.
                    </p>
                    <p>
                      This isn&apos;t a collection of off-the-shelf tools; it&apos;s a{' '}
                      <strong className="text-yellow-400 font-bold">14-service proprietary architecture</strong> built from scratch to
                      provide the transparency and engagement I once lacked. My mission is to 
                      democratize financial intelligence by applying the same rigorous standards 
                      of structural engineering to retail investing.
                    </p>
                    <p>
                      Every "Guardian" in our system and every line of our Risk Engine was crafted 
                      with the same precision I used to frame a roof. We&apos;ve built the engagement 
                      layer the financial world was always missing—turning complex markets into 
                      a rewarding, risk-free mastery loop for everyone.
                    </p>
                  </div>

                  <div className="mt-12 flex flex-wrap items-center gap-6 clear-both">
                    <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center font-bold text-xl shadow-[0_0_20px_rgba(250,204,21,0.3)]">
                        KR
                      </div>
                      <div className="pr-6">
                        <p className="font-bold text-xl leading-tight">Kevin Ringler</p>
                        <p className="text-xs uppercase tracking-widest text-yellow-500 font-black mt-1">Founder &amp; CEO</p>
                      </div>
                      <a
                        href="https://www.linkedin.com/in/kevin-ringler"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#0077b5] hover:bg-[#005582] text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(0,119,181,0.4)] flex items-center group"
                      >
                        <i className="fab fa-linkedin mr-2 text-sm group-hover:scale-110 transition-transform"></i>
                        Connect
                      </a>
                    </div>
                    
                    <div className="hidden lg:flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                      <span>Established 2024</span>
                      <span className="w-1 h-1 rounded-full bg-white/20"></span>
                      <span>Raleigh, NC</span>
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
                <p className="text-xl text-gray-600 mb-6">
                  Autonomous agents built on Google Cloud Platform to ensure your learning platform never fails.
                </p>
                <div className="flex flex-wrap justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <span className="px-2 py-1 bg-gray-100 rounded border border-gray-200">Vertex AI</span>
                  <span className="px-2 py-1 bg-gray-100 rounded border border-gray-200">Gemini 1.5 Pro</span>
                  <span className="px-2 py-1 bg-gray-100 rounded border border-gray-200">Cloud Run</span>
                  <span className="px-2 py-1 bg-gray-100 rounded border border-gray-200">BigQuery</span>
                  <span className="px-2 py-1 bg-gray-100 rounded border border-gray-200">Pub/Sub</span>
                </div>
              </div>

              {/* flex + wrap so 7 items center gracefully on last row */}
              <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
                {[
                  { name: 'TrafficController', desc: 'Cloud Run dynamic scaling' },
                  { name: 'ProviderArbiter', desc: 'Vertex AI endpoint governance' },
                  { name: 'QualitySteward', desc: 'BigQuery data integrity audits' },
                  { name: 'GovernanceEngine', desc: 'IAM & Secret Manager protocols' },
                  { name: 'PsychometricSteward', desc: 'Gemini-powered learning paths' },
                  { name: 'RebalancingGuardian', desc: 'Portfolio telemetry monitoring' },
                  { name: 'CircuitBreaker', desc: 'Automated error isolation' },
                ].map((guardian) => (
                  <div
                    key={guardian.name}
                    className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)] p-6 border border-gray-200 rounded-lg text-center hover:bg-gray-50 hover:border-mechanica-moonlight-blue transition-all group"
                    data-animate
                  >
                    <i className="fas fa-shield-alt text-mechanica-moonlight-blue text-xl mb-3 block group-hover:scale-110 transition-transform"></i>
                    <p className="text-sm font-bold text-gray-800 mb-1">{guardian.name}</p>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tight">{guardian.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── CTA Section ─── */}
          <section className="py-20 bg-mechanica-moonlight-blue text-white text-center">
            <div className="max-w-4xl mx-auto px-4" data-animate>
              <h2 className="text-4xl font-bold mb-6 font-serif text-white">
                Ready to End the Long Way Around?
              </h2>
              <p className="text-xl mb-8 font-medium text-gray-100">
                Join a community of builders who are leveling up their financial future today.
              </p>
              <Link href="/signup">
                <MechanicaButton variant="brass" size="lg" className="shadow-xl">
                  Join the Founderlings
                </MechanicaButton>
              </Link>
            </div>
          </section>

        </main>
      </div>
    </MechanicaLayout>
  );
};

export default AboutPage;
