import React from 'react';
import Head from 'next/head';
import { useAuth } from '../hooks/useAuth';
import { MechanicaLayout } from '../components/layout/mechanicaLayout';
import { MechanicaCard } from '../components/ui/mechanicaCard';
import { MechanicaButton } from '../components/ui/mechanicaButton';
import { MechanicaGear } from '../components/ui/mechanicaGear';

const tools = [
  {
    name: 'Portfolio Simulation Engine',
    icon: '⚙️',
    description:
      'Build and test investment strategies in a risk-free environment with virtual capital.',
    href: '/portfolio-simulation',
    category: 'Core Tools',
    status: 'active',
    features: ['Virtual trading', 'Historical data', 'Performance tracking'],
    gearColor: 'steel' as const,
  },
  {
    name: 'AI Behavioral Coach',
    icon: '🧠',
    description:
      'Get real-time insights on emotional patterns and decision-making biases.',
    href: '/ai-coach',
    category: 'Core Tools',
    status: 'active',
    features: [
      'Pattern recognition',
      'Nudge alerts',
      'Learning recommendations',
    ],
    gearColor: 'brass' as const,
  },
  {
    name: 'Risk Analysis Dashboard',
    icon: '📊',
    description:
      'Understand portfolio risk metrics with advanced analytics powered by Python.',
    href: '/risk-analysis',
    category: 'Core Tools',
    status: 'active',
    features: ['Sharpe ratio', 'Beta analysis', 'Volatility metrics'],
    gearColor: 'copper' as const,
  },
  {
    name: 'Market Data Explorer',
    icon: '📈',
    description:
      'Access real-time and historical market data from Alpha Vantage and Finnhub.',
    href: '/market-data',
    category: 'Research',
    status: 'active',
    features: ['Live quotes', 'Historical charts', 'Company fundamentals'],
    gearColor: 'steel' as const,
  },
  {
    name: 'Risk Assessment Quiz',
    icon: '🎯',
    description:
      'Discover your risk tolerance and get a personalized investment profile.',
    href: '/risk-assessment',
    category: 'Learning',
    status: 'active',
    features: [
      'Personality analysis',
      'Goal setting',
      'Custom recommendations',
    ],
    gearColor: 'brass' as const,
  },
  {
    name: 'Fractional Share Calculator',
    icon: '🧮',
    description:
      'Calculate how much of any stock you can buy with your available capital.',
    href: '/fractional-calculator',
    category: 'Utilities',
    status: 'active',
    features: ['Real-time prices', 'Cost breakdown', 'Multiple stocks'],
    gearColor: 'copper' as const,
  },
  {
    name: 'ESG/SRI Screener',
    icon: '🌍',
    description:
      'Screen investments for environmental, social, and governance factors.',
    href: '/esg-screener',
    category: 'Research',
    status: 'coming-soon',
    features: ['ESG ratings', 'Impact metrics', 'Sustainable portfolios'],
    gearColor: 'steel' as const,
  },
  {
    name: 'Learning Hub',
    icon: '📚',
    description:
      'Access your personalized learning dashboard with progress tracking and educational content.',
    href: '/dashboard',
    category: 'Learning',
    status: 'active',
    features: ['Progress tracking', 'Achievements', 'Gamification'],
    gearColor: 'brass' as const,
  },
  {
    name: 'VARK Assessment',
    icon: '🧠',
    description:
      'Discover your learning style with Visual, Auditory, Read/Write, and Kinesthetic assessment.',
    href: '/vark-assessment',
    category: 'Learning',
    status: 'active',
    features: ['Learning style analysis', 'Personalized recommendations', 'Study strategies'],
    gearColor: 'copper' as const,
  },
];

export default function ToolsOverview() {
  const { user } = useAuth();

  const categories = ['All', 'Core Tools', 'Research', 'Learning', 'Utilities'];
  const [activeCategory, setActiveCategory] = React.useState('All');

  const filteredTools =
    activeCategory === 'All'
      ? tools
      : tools.filter(tool => tool.category === activeCategory);

  return (
    <MechanicaLayout
      title="Investment Tools | Beginner Investor Hub"
      description="Explore our comprehensive suite of investment tools: portfolio simulation, AI coaching, risk analysis, market data, and more."
    >
      <Head>
        <title>Investment Tools | BeginnerInvestorHub</title>
        <meta name="description" content="Explore our comprehensive suite of precision architectural tools for investment mastery: portfolio simulation, AI coaching, risk analysis, and real-time market data." />
      </Head>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-mechanica-moonlight-blue via-mechanica-moonlight-blue-light to-mechanica-moonlight-blue-dark text-white overflow-hidden">
          {/* Steam Vents for Hero */}
          <div className="absolute top-0 right-1/4 w-px h-32 bg-gradient-to-b from-white/20 to-transparent mechanica-steam"></div>
          <div className="absolute top-0 left-1/4 w-px h-48 bg-gradient-to-b from-white/20 to-transparent mechanica-steam" style={{ animationDelay: '1.5s' }}></div>
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

          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-center items-center space-x-6 mb-8">
                <MechanicaGear size="xl" color="brass" speed="slow" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-white uppercase tracking-tighter">
                  Professional <span className="text-yellow-400">Tools</span>
                </h1>
                <MechanicaGear size="xl" color="brass" speed="reverse" />
              </div>

              <h2 className="text-xl md:text-2xl text-blue-100 mb-4 max-w-3xl mx-auto font-light leading-relaxed">
                Built for Your Success
              </h2>

              <p className="text-lg text-blue-200 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
                We've simplified complex investing strategies into easy-to-use modules. Think of this as your personal financial workshop—calibrated for clarity and growth.
              </p>

              <div className="text-xs font-black uppercase tracking-[0.3em] text-green-400/90">
                Status: [ All Systems Ready ]
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50" />
        </section>

        <div className="container mx-auto px-4 relative z-10 py-12">
          {/* Content */}
          <div className="flex flex-col items-center">
            {/* Category Filter */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex rounded-2xl border-2 border-mechanica-moonlight-blue/10 bg-blue-50/30 p-1.5 backdrop-blur-sm shadow-inner-premium">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${activeCategory === category
                      ? 'bg-mechanica-moonlight-blue text-white shadow-lg scale-105'
                      : 'text-gray-500 hover:text-mechanica-moonlight-blue'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 w-full max-w-7xl">
              {filteredTools.map(tool => (
                <MechanicaCard
                  key={tool.name}
                  variant={tool.category === 'Core Tools' ? 'mechanical' : tool.category === 'Research' ? 'wood' : 'brass'}
                  animated
                  className="relative group hover:scale-[1.02] transition-transform"
                >
                  {tool.status === 'coming-soon' && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg">
                        Coming Soon
                      </span>
                    </div>
                  )}

                  <div className="p-8 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <MechanicaGear size="lg" color={tool.gearColor} speed="medium" />
                      <div className="text-4xl opacity-80 group-hover:scale-110 transition-transform duration-500">{tool.icon}</div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-2xl font-black mb-3 mechanica-heading-professional text-gray-900 group-hover:text-mechanica-moonlight-blue transition-colors">
                        {tool.name}
                      </h3>
                      <div className="w-12 h-1 bg-yellow-500/20 mb-4 transition-all group-hover:w-24 group-hover:bg-yellow-500"></div>
                      <p className="text-gray-600 mb-6 leading-relaxed mechanica-text-technical line-clamp-2">
                        {tool.description}
                      </p>
                    </div>

                    <div className="space-y-2 mb-8 flex-grow">
                      {tool.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <span className="text-mechanica-polished-brass font-black">✓</span>
                          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto">
                      {tool.status === 'active' ? (
                        user ? (
                          <MechanicaButton
                            variant="mechanical"
                            size="lg"
                            className="w-full py-4 text-xs font-black uppercase tracking-[0.2em] shadow-lg active:scale-95"
                            href={tool.href}
                          >
                            Launch Module
                          </MechanicaButton>
                        ) : (
                          <MechanicaButton
                            variant="wood"
                            size="lg"
                            className="w-full py-4 text-xs font-black uppercase tracking-[0.2em] shadow-lg active:scale-95"
                            href="/signup"
                          >
                            Sign Up to Access
                          </MechanicaButton>
                        )
                      ) : (
                        <MechanicaButton variant="wood" size="lg" className="w-full py-4 text-xs font-black uppercase tracking-[0.2em] opacity-50 cursor-not-allowed" disabled>
                          Under Construction
                        </MechanicaButton>
                      )}
                    </div>
                  </div>
                </MechanicaCard>
              ))}
            </div>

            {/* CTA Section */}
            {!user && (
              <div className="w-full max-w-4xl pb-12">
                <MechanicaCard variant="mechanical" animated className="text-center bg-gradient-to-br from-blue-50 to-white mechanica-hum">
                  <div className="p-12">
                    <div className="flex justify-center items-center space-x-6 mb-8">
                      <MechanicaGear size="large" color="brass" speed="slow" />
                      <h2 className="text-3xl font-black text-mechanica-moonlight-blue uppercase tracking-tighter">
                        Ready to Start Building?
                      </h2>
                      <MechanicaGear size="large" color="brass" speed="reverse" />
                    </div>

                    <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto font-medium italic">
                      &ldquo;Initialize your investor profile to unlock our full suite of premium architectural tools and start your learning journey.&rdquo;
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                      <MechanicaButton
                        variant="mechanical"
                        size="lg"
                        className="px-10 py-5 text-sm font-black uppercase tracking-widest"
                        href="/signup"
                      >
                        Create Free Account <span className="ml-2">→</span>
                      </MechanicaButton>
                      <MechanicaButton
                        variant="wood"
                        size="lg"
                        className="px-10 py-5 text-sm font-black uppercase tracking-widest"
                        href="/login"
                      >
                        Sign In
                      </MechanicaButton>
                    </div>
                  </div>
                </MechanicaCard>
              </div>
            )}
          </div>
        </div>
      </div>
    </MechanicaLayout>
  );
}
