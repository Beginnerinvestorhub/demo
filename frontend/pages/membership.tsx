import React, { useState } from 'react';
import Head from 'next/head';
import { MechanicaLayout } from '../components/layout/mechanicaLayout';
import { MechanicaCard } from '../components/ui/mechanicaCard';
import { MechanicaButton } from '../components/ui/mechanicaButton';
import { MechanicaGear } from '../components/ui/mechanicaGear';

const MembershipPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'The Apprentice',
      price: 'Free Forever',
      tagline: 'Build your foundation.',
      description: 'Master the mechanics of investing without risking a cent.',
      features: [
        'Personalized Learning Path (VARK style)',
        '3 Virtual Portfolios',
        'Community Rankings',
        'Basic Risk Dashboards (Volatility & Beta)',
      ],
      cta: 'Start Learning',
      href: '/signup',
      variant: 'mechanical' as const,
    },
    {
      name: 'The Strategist',
      price: billingCycle === 'monthly' ? '$9.99 /mo' : '$7.99 /mo',
      tagline: 'Stress-test your theories.',
      description: 'For the serious student who wants to see the "what-ifs."',
      features: [
        'Unlimited Virtual Portfolios',
        'Monte Carlo Simulations (10,000 scenarios)',
        'Historical Backtesting',
        'Ad-Free Environment',
      ],
      cta: 'Go Premium',
      href: '/signup?plan=strategist',
      variant: 'brass' as const,
      popular: true,
    },
    {
      name: 'The Analyst',
      price: billingCycle === 'monthly' ? '$29.99 /mo' : '$23.99 /mo',
      tagline: 'Analyze your real wealth.',
      description: 'Bridge the gap between "Learning" and "Real-World Wealth."',
      features: [
        'Read-Only Broker Sync (Fidelity, Robinhood, etc.)',
        '1-on-1 AI Tutoring (Personal Coach)',
        'Portfolio Optimization Suggestions',
        'Real-World Tax Impact Simulation',
      ],
      cta: 'Get Pro Access',
      href: '/signup?plan=analyst',
      variant: 'primary' as const,
    },
  ];

  return (
    <MechanicaLayout>
      <Head>
        <title>Membership Plans | BeginnerInvestorHub</title>
        <meta
          name="description"
          content="Choose the membership plan that fits your learning style. From free foundations to professional-grade analysis tools."
        />
      </Head>

      <div className="min-h-screen bg-gray-50 pb-24">
        {/* ─── Hero Section ─── */}
        <section className="relative py-24 bg-mechanica-moonlight-blue text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.1) 30px, rgba(255,255,255,0.1) 60px)',
              }}
            />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
            {/* Brand Header with Animation */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-12 mechanica-float">
              <div className="hidden sm:block">
                <MechanicaGear
                  size="large"
                  color="brass"
                  speed="medium"
                  aria-hidden="true"
                />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-serif uppercase tracking-tighter mechanica-title-gold-chrome">
                Membership Plans
              </h1>
              <div className="hidden sm:block">
                <MechanicaGear
                  size="large"
                  color="brass"
                  speed="reverse"
                  aria-hidden="true"
                />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6 font-serif leading-tight">
              Master the Markets on <br className="hidden md:block" />
              <span className="text-yellow-400">Your Own Terms.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-100 max-w-3xl mx-auto font-light">
              Stop guessing. Start learning with tools designed for how you think.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`text-sm font-bold uppercase tracking-widest ${billingCycle === 'monthly' ? 'text-white' : 'text-white/50'}`}>Monthly</span>
              <button 
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className="w-14 h-8 bg-white/10 rounded-full relative p-1 border border-white/20 transition-all"
              >
                <div className={`w-6 h-6 bg-yellow-400 rounded-full transition-all duration-300 ${billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
              <span className={`text-sm font-bold uppercase tracking-widest ${billingCycle === 'annual' ? 'text-white' : 'text-white/50'}`}>
                Annual <span className="text-emerald-400 ml-1">(Save 20%)</span>
              </span>
            </div>
          </div>
        </section>

        {/* ─── Pricing Grid ─── */}
        <section className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <MechanicaCard 
                key={plan.name} 
                variant="mechanical" 
                className={`flex flex-col h-full ${plan.popular ? 'border-yellow-400 border-2 shadow-2xl scale-105' : 'border-gray-200 shadow-xl'}`}
              >
                {plan.popular && (
                  <div className="bg-yellow-400 text-gray-900 text-[10px] font-black uppercase tracking-[0.2em] py-1 text-center absolute top-0 left-0 right-0">
                    Most Strategic Choice
                  </div>
                )}
                
                <div className="p-8 flex-grow">
                  <h3 className="text-2xl font-bold text-mechanica-moonlight-blue mb-1 font-serif">{plan.name}</h3>
                  <p className="text-sm text-gray-500 mb-6 italic">{plan.tagline}</p>
                  
                  <div className="mb-8">
                    <span className="text-4xl font-black text-gray-900">{plan.price}</span>
                  </div>

                  <p className="text-sm text-gray-600 mb-8 leading-relaxed font-medium">
                    {plan.description}
                  </p>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start text-sm text-gray-700">
                        <span className="text-emerald-500 mr-3">✔</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 pt-0 mt-auto">
                  <MechanicaButton href={plan.href} variant={plan.variant} size="lg" className="w-full justify-center">
                    {plan.cta}
                  </MechanicaButton>
                </div>
              </MechanicaCard>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-sm text-gray-500 font-medium italic">
              Every plan starts with our signature VARK Assessment to unlock your personal learning style.
            </p>
          </div>
        </section>

        {/* ─── The VARK Edge ─── */}
        <section className="py-24 bg-white mt-12 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-mechanica-moonlight-blue mb-6 font-serif">
                  Step 1: The VARK Edge <br />
                  <span className="text-yellow-400 text-2xl uppercase tracking-widest font-black">(Included in All Plans)</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  We don&rsquo;t believe in one-size-fits-all finance. Our platform adapts to 
                  your cognitive profile to ensure complex data becomes intuitive knowledge.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-blue-500">
                    <h4 className="font-bold text-blue-900 mb-1">Visual</h4>
                    <p className="text-xs text-gray-600">Interactive heatmaps and flowcharts.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-emerald-500">
                    <h4 className="font-bold text-emerald-900 mb-1">Aural</h4>
                    <p className="text-xs text-gray-600">AI-generated audio summaries of market moves.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-yellow-400">
                    <h4 className="font-bold text-yellow-400 mb-1">Read/Write</h4>
                    <p className="text-xs text-gray-600">Detailed whitepapers and guided journals.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-purple-500">
                    <h4 className="font-bold text-purple-900 mb-1">Kinesthetic</h4>
                    <p className="text-xs text-gray-600">Hands-on "Sandbox" simulations.</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400/5 blur-3xl rounded-full scale-150"></div>
                <div className="relative z-10 bg-slate-900 rounded-3xl p-8 shadow-2xl border border-white/10 overflow-hidden">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40 font-mono italic">Adaptive_Engine_v4.0</span>
                  </div>
                  <div className="space-y-6">
                    <div className="h-4 bg-white/5 rounded w-3/4"></div>
                    <div className="h-4 bg-white/5 rounded w-full"></div>
                    <div className="h-20 bg-yellow-400/10 rounded-xl border border-yellow-400/20 flex items-center justify-center">
                      <MechanicaGear size="lg" color="brass" speed="medium" />
                    </div>
                    <div className="h-4 bg-white/5 rounded w-5/6"></div>
                    <div className="h-4 bg-white/5 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ / Guarantee ─── */}
        <section className="py-24 max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-mechanica-moonlight-blue mb-16 font-serif">The &ldquo;Safe &amp; Smart&rdquo; Guarantee</h2>
          
          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mr-4 text-sm">?</span>
                Is my real money safe?
              </h3>
              <p className="text-gray-600 leading-relaxed pl-12">
                Yes. We are an EdTech platform, not a brokerage. Our &ldquo;Broker Sync&rdquo; feature is <strong>Read-Only</strong>. 
                We can see your data to help you learn from it, but we can never move your money or execute trades. 
                You remain in 100% control at your brokerage.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mr-4 text-sm">?</span>
                Which plan is right for me?
              </h3>
              <p className="text-gray-600 leading-relaxed pl-12">
                If you&rsquo;re brand new, start with <strong>The Apprentice</strong>. If you have a strategy but aren&rsquo;t 
                sure it&rsquo;s &ldquo;recession-proof,&rdquo; <strong>The Strategist</strong> is your best bet. 
                If you already have money in the market and want to understand why it&rsquo;s moving, 
                <strong>The Analyst</strong> is built for you.
              </p>
            </div>
          </div>
        </section>
      </div>
    </MechanicaLayout>
  );
};

export default MembershipPage;
