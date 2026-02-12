import React from 'react';
import PortfolioMonitor from '../components/PortfolioMonitor';
import { MechanicaLayout } from '../components/layout/mechanicaLayout';
import Head from 'next/head';
import { MechanicaCard } from '../components/ui/mechanicaCard';
import { MechanicaGear } from '../components/ui/mechanicaGear';
import { MechanicaTicker } from '../components/ui/MechanicaTicker';

export default function PortfolioMonitorPage() {
  return (
    <MechanicaLayout
      title="Portfolio Monitoring | BeginnerInvestorHub"
      description="Real-time assembly monitor for visualizing portfolio allocation, performance metrics, and investment architecture. Track your component details in real time."
    >
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
                <h1 className="text-4xl md:text-5xl lg:text-5xl font-black font-serif uppercase tracking-tighter mechanica-title-gold-chrome mechanica-float">
                  Portfolio <span className="text-yellow-400">Inventory</span> Monitor
                </h1>
                <MechanicaGear size="xl" color="brass" speed="reverse" />
              </div>

              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
                Real-time architectural visualization of your asset distribution and performance telemetrics.
              </p>

              <div className="flex justify-center">
                <div className="inline-flex items-center space-x-3 px-6 py-2 bg-black/30 backdrop-blur-xl border border-yellow-500/30 rounded-full">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-100/90">
                    STATUS: Telemetry Stream Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50" />
          <div className="absolute bottom-0 left-0 right-0">
            <MechanicaTicker />
          </div>
        </section>

        <div className="container mx-auto px-4 relative z-10 py-12 flex flex-col items-center">
          {/* Dashboard Status Bar */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
            <MechanicaCard variant="mechanical" className="inline-flex items-center px-4 py-2">
              <div className="w-5 h-5 text-green-600 mr-2">✓</div>
              <span className="text-sm text-gray-700 font-medium mechanica-text-technical">
                System Operational
              </span>
            </MechanicaCard>
            <MechanicaCard variant="default" className="inline-flex items-center px-4 py-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm text-gray-700 font-medium mechanica-text-technical">
                Live Data Stream
              </span>
            </MechanicaCard>
            <MechanicaCard variant="wood" className="inline-flex items-center px-4 py-2">
              <div className="w-5 h-5 text-mechanica-polished-brass mr-2">🔒</div>
              <span className="text-sm text-gray-700 font-medium mechanica-text-technical">
                Secure Connection
              </span>
            </MechanicaCard>
          </div>

          {/* Main Dashboard Card */}
          <MechanicaCard variant="wood" animated className="bg-gradient-to-br from-blue-50 to-white mechanica-hum w-full max-w-5xl">
            <div className="p-8">
              {/* Tool Header */}
              <div className="mb-8 pb-6 border-b border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <MechanicaGear size="md" color="brass" speed="slow" />
                  <h2 className="text-2xl font-bold mechanica-heading-professional text-mechanica-moonlight-blue">
                    🔧 Component Assembly Status
                  </h2>
                </div>
                <p className="text-gray-600 mechanica-text-technical">
                  Monitor all portfolio components and performance metrics in your investment mechanism with engineering-grade precision.
                </p>
              </div>

              {/* Portfolio Monitor Component */}
              <PortfolioMonitor />
            </div>
          </MechanicaCard>

          {/* Technical Specifications Footer */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <MechanicaCard variant="default" hover>
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <MechanicaGear size="lg" color="steel" speed="medium" />
                </div>
                <div className="text-lg font-bold mechanica-heading-professional text-mechanica-moonlight-blue mb-2">
                  📊 Real-Time Analytics
                </div>
                <div className="text-sm text-gray-600 mechanica-text-technical">
                  Performance tracking engine
                </div>
              </div>
            </MechanicaCard>
            <MechanicaCard variant="wood" hover>
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <MechanicaGear size="lg" color="brass" speed="slow" />
                </div>
                <div className="text-lg font-bold mechanica-heading-professional text-mechanica-moonlight-blue mb-2">
                  🔔 Alert Mechanisms
                </div>
                <div className="text-sm text-gray-600 mechanica-text-technical">
                  Automated notification system
                </div>
              </div>
            </MechanicaCard>
            <MechanicaCard variant="mechanical" hover>
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <MechanicaGear size="lg" color="copper" speed="reverse" />
                </div>
                <div className="text-lg font-bold mechanica-heading-professional text-mechanica-moonlight-blue mb-2">
                  🔧 Precision Engineering
                </div>
                <div className="text-sm text-gray-600 mechanica-text-technical">
                  Enterprise-grade accuracy
                </div>
              </div>
            </MechanicaCard>
          </div>
        </div>
      </div>
    </MechanicaLayout>
  );
}
