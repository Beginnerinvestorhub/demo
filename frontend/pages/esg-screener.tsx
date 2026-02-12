import React from 'react';
import ESGScreener from '../components/ESGScreener';
import Head from 'next/head';
import { MechanicaLayout } from '../components/layout/mechanicaLayout';
import { MechanicaCard } from '../components/ui/mechanicaCard';
import { MechanicaGear } from '../components/ui/mechanicaGear';
import { MechanicaTicker } from '../components/ui/MechanicaTicker';

export default function ESGScreenerPage() {
  return (
    <MechanicaLayout>

      <Head>
        <title>ESG Strategy Screener | BeginnerInvestorHub</title>
        <meta name="description" content="Precision investment filter for screening components based on Environmental, Social, and Governance criteria. Detect red flags and verify component integrity." />
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
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-white">
                  ESG <span className="text-yellow-400">Strategy</span> Screener
                </h1>
                <MechanicaGear size="xl" color="brass" speed="reverse" />
              </div>

              <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto font-light leading-relaxed">
                Precision investment filter for screening components based on Environmental, Social, and Governance criteria.
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50" />
          <div className="absolute bottom-0 left-0 right-0">
            <MechanicaTicker />
          </div>
        </section>

        <div className="container mx-auto px-4 relative z-10 py-12 flex flex-col items-center">
          {/* ESG Criteria Badges */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
            <MechanicaCard variant="default" className="inline-flex items-center px-4 py-2">
              <div className="w-5 h-5 text-green-600 mr-2">🌍</div>
              <span className="text-sm text-gray-700 font-medium mechanica-text-technical">
                Environmental
              </span>
            </MechanicaCard>
            <MechanicaCard variant="mechanical" className="inline-flex items-center px-4 py-2">
              <div className="w-5 h-5 text-mechanica-moonlight-blue mr-2">👥</div>
              <span className="text-sm text-gray-700 font-medium mechanica-text-technical">Social</span>
            </MechanicaCard>
            <MechanicaCard variant="wood" className="inline-flex items-center px-4 py-2">
              <div className="w-5 h-5 text-mechanica-polished-brass mr-2">🏛️</div>
              <span className="text-sm text-gray-700 font-medium mechanica-text-technical">
                Governance
              </span>
            </MechanicaCard>
          </div>

          {/* Main Screener Card */}
          <MechanicaCard variant="wood" animated className="bg-gradient-to-br from-blue-50 to-white mechanica-hum w-full max-w-6xl">
            <div className="p-8">
              {/* Tool Header */}
              <div className="mb-8 pb-6 border-b border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <MechanicaGear size="md" color="brass" speed="slow" />
                  <h2 className="text-2xl font-bold mechanica-heading-professional text-mechanica-moonlight-blue">
                    🔧 Component Integrity Scanner
                  </h2>
                </div>
                <p className="text-gray-600 mechanica-text-technical">
                  Configure sustainability filters to screen investment components and detect greenwashing mechanisms.
                </p>
              </div>

              <ESGScreener />
            </div>
          </MechanicaCard>

          {/* Methodology Section */}
          <div className="mt-20 w-full max-w-6xl">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-extrabold text-mechanica-moonlight-blue font-serif mb-4 uppercase tracking-tighter">
                📐 Screening Methodology
              </h3>
              <div className="w-20 h-1 bg-yellow-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <MechanicaCard variant="default" animated className="bg-white border-t-4 border-t-mechanica-moonlight-blue p-8 text-center">
                <div className="w-12 h-12 bg-mechanica-moonlight-blue text-white rounded-2xl flex items-center justify-center text-xl font-black mx-auto mb-6 shadow-lg">1</div>
                <h4 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider">Filter Specs</h4>
                <p className="text-gray-500 text-sm font-medium">Apply ESG parameters and sector specifications.</p>
              </MechanicaCard>

              <MechanicaCard variant="mechanical" animated className="bg-white border-t-4 border-t-yellow-500 p-8 text-center">
                <div className="w-12 h-12 bg-yellow-500 text-white rounded-2xl flex items-center justify-center text-xl font-black mx-auto mb-6 shadow-lg">2</div>
                <h4 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider">Integrity Test</h4>
                <p className="text-gray-500 text-sm font-medium">Scan for red flags and greenwashing indicators.</p>
              </MechanicaCard>

              <MechanicaCard variant="wood" animated className="bg-white border-t-4 border-t-mechanica-polished-brass p-8 text-center">
                <div className="w-12 h-12 bg-mechanica-polished-brass text-white rounded-2xl flex items-center justify-center text-xl font-black mx-auto mb-6 shadow-lg">3</div>
                <h4 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider">Blueprint Data</h4>
                <p className="text-gray-500 text-sm font-medium">Generate technical blueprints and visualizations.</p>
              </MechanicaCard>

              <MechanicaCard variant="default" animated className="bg-white border-t-4 border-t-slate-500 p-8 text-center">
                <div className="w-12 h-12 bg-slate-500 text-white rounded-2xl flex items-center justify-center text-xl font-black mx-auto mb-6 shadow-lg">4</div>
                <h4 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider">Deploy Result</h4>
                <p className="text-gray-500 text-sm font-medium">Export validated components for construction.</p>
              </MechanicaCard>
            </div>
          </div>

          {/* Technical Specs Footer */}
          <div className="mt-12 text-center">
            <MechanicaCard variant="mechanical" className="inline-flex items-center px-6 py-3">
              <div className="flex items-center space-x-3">
                <MechanicaGear size="sm" color="steel" speed="medium" />
                <span className="text-sm text-gray-700 font-medium mechanica-text-technical">
                  All ESG data verified against MSCI and regulatory disclosure standards
                </span>
              </div>
            </MechanicaCard>
          </div>
        </div>
      </div>
    </MechanicaLayout>
  );
}
