import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { MechanicaLayout } from '../components/layout/mechanicaLayout';
import { MechanicaCard } from '../components/ui/mechanicaCard';
import { MechanicaGear } from '../components/ui/mechanicaGear';

export default function TermsOfService() {
  return (
    <MechanicaLayout
      title="Terms of Service | BeginnerInvestorHub"
      description="Read the Terms of Service for BeginnerInvestorHub-Educational investment tools and portfolio simulation platform."
    >
      <Head>
        <title>Terms of Service | BeginnerInvestorHub</title>
        <meta
          name="description"
          content="Read our Terms of Service to understand the rules and guidelines for using BeginnerInvestorHub’s educational investment tools and portfolio simulation platform."
        />
      </Head>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-mechanica-moonlight-blue via-mechanica-moonlight-blue-light to-mechanica-moonlight-blue-dark text-white overflow-hidden">
          {/* Steam Vents for Hero */}
          <div className="absolute top-0 right-1/4 w-px h-32 bg-gradient-to-b from-white/20 to-transparent mechanica-steam"></div>
          <div
            className="absolute top-0 left-1/4 w-px h-48 bg-gradient-to-b from-white/20 to-transparent mechanica-steam"
            style={{ animationDelay: '1.5s' }}
          ></div>
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

          <div className="relative z-10 text-center px-4 sm: px-6 lg: px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-center items-center space-x-6 mb-8">
                <MechanicaGear size="xl" color="brass" speed="slow" />
                <h1 className="text-4xl md: text-5xl lg: text-6xl font-bold font-serif text-white uppercase tracking-tighter">
                  Terms of <span className="text-yellow-400"> Service</span>
                </h1>
                <MechanicaGear size="xl" color="brass" speed="reverse" />
              </div>

              <p className="text-xl md: text-2xl text-blue-100 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
                Platform governance frameworks and operational protocols for
                precision-guided educational tools.
              </p>

              <div className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500/80">
                Last Calibration: October 6, 2025
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50" />
        </section>

        {/* Content Area-The"Wall"*/}
        <div className="relative bg-slate-100 min-h-screen">
          {/* Subtle Mechanical Wall Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(90deg, #000, #000 1px, transparent 1px, transparent 40px),
                  repeating-linear-gradient(0deg, #000, #000 1px, transparent 1px, transparent 40px)
                `,
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10 py-20 flex flex-col items-center space-y-16">
            {/* Main governance intro card-The Master Scroll */}
            <MechanicaCard
              variant="wood"
              animated
              gearDecoration
              className="w-full max-w-4xl shadow-2xl transform-rotate-1"
            >
              <div className="p-10">
                <div className="flex items-center space-x-3 mb-6">
                  <MechanicaGear size="md" color="brass" speed="slow" />
                  <h2 className="text-3xl font-black text-amber-900 uppercase tracking-tighter">
                    Governance Blueprint
                  </h2>
                </div>
                <p className="text-amber-950 text-xl font-medium italic border-l-4 border-amber-600 pl-8 py-2">
                  &quot;By initializing transmission with our platform, you
                  acknowledge and adhere to the following architecture of
                  engagement.&quot;
                </p>
              </div>
            </MechanicaCard>

            {/* Service Description Scroll */}
            <MechanicaCard
              variant="wood"
              animated
              gearDecoration
              className="w-full max-w-4xl shadow-2xl transform rotate-1"
            >
              <div className="p-10">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-800/60 mb-8 flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Service Description
                </h3>
                <div className="space-y-8">
                  <p className="text-amber-950 leading-relaxed font-bold text-xl">
                    BeginnerInvestorHub provides educational financial tools
                    including risk assessment, portfolio simulation, AI-powered
                    behavioral coaching, and investment monitoring.
                  </p>
                  <div className="bg-amber-900/5 border-2 border-amber-600/20 p-8 rounded-2xl shadow-inner">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-amber-700 font-black text-[10px] uppercase tracking-widest">
                        ⚠️ Critical Note
                      </span>
                    </div>
                    <p className="text-amber-900 text-sm font-black italic leading-relaxed">
                      All simulations are for learning purposes only.This system
                      does not facilitate real market transactions.Always
                      consult with qualified financial professionals before
                      making investment decisions.
                    </p>
                  </div>
                </div>
              </div>
            </MechanicaCard>

            {/* User Responsibilities Scroll */}
            <MechanicaCard
              variant="wood"
              animated
              gearDecoration
              className="w-full max-w-4xl shadow-2xl transform-rotate-1"
            >
              <div className="p-10">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-800/60 mb-8 flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  User Responsibilities
                </h3>
                <div className="grid grid-cols-1 md: grid-cols-2 gap-6">
                  {[
                    'Provide accurate information for results',
                    'Understand tools are educational only',
                    'Consult professionals for real decisions',
                    'Maintain account security',
                    'Comply with applicable laws',
                    'No reverse engineering of the platform',
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center p-6 bg-amber-900/5 rounded-xl border border-amber-600/10 group hover: border-amber-600 transition-all shadow-sm"
                    >
                      <div className="w-3 h-3 bg-amber-600 rounded-full mr-4 group-hover: scale-125 transition-transform"></div>
                      <span className="text-sm font-black text-amber-900 uppercase tracking-tight">
                        {' '}
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </MechanicaCard>

            {/* Important Disclaimers Scroll */}
            <MechanicaCard
              variant="wood"
              animated
              gearDecoration
              className="w-full max-w-4xl shadow-2xl transform rotate-1"
            >
              <div className="p-10">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-800/60 mb-8 flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Important Disclaimers
                </h3>
                <div className="bg-orange-950/5 border-2 border-orange-600/20 p-10 rounded-2xl shadow-inner space-y-10">
                  {[
                    {
                      label: 'No Financial Advice',
                      text: 'Nothing here is professional financial advice.We provide educational simulations only.',
                    },
                    {
                      label: 'Past Performance',
                      text: 'Simulated past performance does not guarantee future success in the actual markets.',
                    },
                    {
                      label: 'AI Limitations',
                      text: 'Behavioral insights are algorithmic and intended for educational self-reflection.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-6">
                      <span className="text-orange-700 text-2xl filter drop-shadow-sm">
                        ⚙️
                      </span>
                      <div>
                        <div className="text-[11px] font-black uppercase tracking-[0.2em] text-orange-800 mb-2">
                          {item.label}
                        </div>
                        <div className="text-lg font-black text-amber-950 italic leading-snug">
                          &quot;{item.text}&quot;
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </MechanicaCard>

            {/* Data Usage Scroll */}
            <MechanicaCard
              variant="wood"
              animated
              gearDecoration
              className="w-full max-w-4xl shadow-2xl transform-rotate-1"
            >
              <div className="p-10">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-800/60 mb-8 flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Data Usage & Privacy
                </h3>
                <div className="p-10 bg-amber-900/5 border-2 border-dashed border-amber-600/30 rounded-3xl text-center">
                  <p className="text-amber-950 leading-relaxed font-bold text-xl mb-10 max-w-2xl mx-auto">
                    We take your privacy seriously and handle your data
                    transmissions with pharmaceutical-grade precision.
                  </p>
                  <Link
                    href="/privacy"
                    className="inline-flex items-center px-10 py-5 bg-amber-800 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-amber-700 hover:scale-105 active:scale-95 transition-all"
                  >
                    Access Privacy Protocol{' '}
                    <span className="ml-3 text-xl">→</span>
                  </Link>
                </div>
              </div>
            </MechanicaCard>

            {/* Limitation of Liability Scroll */}
            <MechanicaCard
              variant="wood"
              animated
              gearDecoration
              className="w-full max-w-4xl shadow-2xl transform rotate-1"
            >
              <div className="p-10">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-800/60 mb-8 flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Limitation of Liability
                </h3>
                <div className="p-10 bg-slate-900 rounded-3xl border-4 border-slate-800 relative overflow-hidden group shadow-2xl">
                  <div className="absolute top-0 right-0 p-6 opacity-20 scale-[2.5] rotate-12 group-hover: rotate-45 transition-transform duration-1000">
                    <MechanicaGear size="xl" color="brass" speed="slow" />
                  </div>
                  <p className="text-amber-100 font-mono text-xs leading-relaxed relative z-10 font-bold uppercase tracking-wider">
                    SYSTEM_NOTICE: THE PLATFORM AND ITS OPERATORS ARE NOT LIABLE
                    FOR INVESTMENT LOSSES, DATA ANOMALIES, OR EXTERNAL MARKET
                    VOLATILITY.ALL TOOLS ARE DEPLOYED &quot;AS-IS&quot; FOR
                    EDUCATIONAL ARCHITECTURE ONLY.BY USING THE SYSTEM, YOU WAIVE
                    ALL CLAIMS RELATED TO FINANCIAL OUTCOMES.
                  </p>
                </div>
              </div>
            </MechanicaCard>

            {/* Contact Information Scroll */}
            <MechanicaCard
              variant="wood"
              animated
              gearDecoration
              className="w-full max-w-4xl shadow-2xl transform -rotate-1"
            >
              <div className="p-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                  <div className="flex items-center space-x-8">
                    <div className="w-20 h-20 bg-amber-700/10 rounded-3xl flex items-center justify-center shadow-inner border border-amber-600/10">
                      <span className="text-4xl text-amber-800">📧</span>
                    </div>
                    <div>
                      <div className="text-[11px] font-black text-amber-800/60 uppercase tracking-widest mb-1">
                        Support Transmission
                      </div>
                      <div className="text-lg font-black font-mono text-amber-900">
                        info@beginnerinvestorhub.com
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-8">
                    <div className="w-20 h-20 bg-amber-700/10 rounded-3xl flex items-center justify-center shadow-inner border border-amber-600/10">
                      <span className="text-4xl text-amber-800">📍</span>
                    </div>
                    <div>
                      <div className="text-[11px] font-black text-amber-800/60 uppercase tracking-widest mb-1">
                        Central Station
                      </div>
                      <div className="text-lg font-black font-mono text-amber-900">
                        Raleigh, North Carolina, US
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </MechanicaCard>

            {/* Technical Footer */}
            <div className="pt-20 text-center pb-12 w-full max-w-4xl">
              <Link
                href="/"
                className="inline-flex items-center space-x-4 px-10 py-5 bg-white border-2 border-gray-200 rounded-2xl hover:bg-gray-50 transition-all shadow-premium group"
              >
                <MechanicaGear
                  size="sm"
                  color="steel"
                  speed="slow"
                  className="group-hover:rotate-180 transition-transform duration-700"
                />
                <span className="text-sm font-black uppercase tracking-widest text-gray-600">
                  Return to Command Center
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MechanicaLayout>
  );
}
