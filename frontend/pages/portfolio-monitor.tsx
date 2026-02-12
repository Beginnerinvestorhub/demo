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
      title="Portfolio Tracking | BeginnerInvestorHub"
      description="A clear visual overview of your investment distribution and performance. Track your stocks and assets in real time."
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
                  Portfolio <span className="text-yellow-400">Asset</span> Tracker
                </h1>
                <MechanicaGear size="xl" color="brass" speed="reverse" />
              </div>

              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
                A clear visual overview of your investment distribution and performance.
              </p>

              <div className="flex justify-center">
                <div className="inline-flex items-center space-x-3 px-6 py-2 bg-black/30 backdrop-blur-xl border border-yellow-500/30 rounded-full">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-100/90">
                    STATUS: Live Data Connected
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
                    📊 Your Investment Overview
                  </h2>
                </div>
                <p className="text-gray-600 mechanica-text-technical">
                  Track all your investments and how they are performing in one simple view.
                </p>
              </div>

              {/* Portfolio Monitor Component */}
              <PortfolioMonitor />
            </div>
          </MechanicaCard>

          {/* Educational "Why This Matters" Module */}
          <div className="mt-20 w-full max-w-5xl">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-extrabold text-mechanica-moonlight-blue font-serif mb-4 uppercase tracking-tighter">
                💡 Why Track Your Portfolio?
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto font-medium">
                Understanding your investment "blueprint" is the key to long-term success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <MechanicaCard variant="mechanical" className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="text-4xl">🎯</div>
                  <div>
                    <h4 className="text-lg font-black text-mechanica-moonlight-blue uppercase tracking-tight mb-2">Avoid Over-Concentration</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      If all your money is in one "component" (like tech stocks), your whole machine could stop if that sector has a bad day. Tracking helps you spread your risk.
                    </p>
                  </div>
                </div>
              </MechanicaCard>

              <MechanicaCard variant="wood" className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="text-4xl">📉</div>
                  <div>
                    <h4 className="text-lg font-black text-mechanica-moonlight-blue uppercase tracking-tight mb-2">Monitor Performance</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Seeing how your assets change over time helps you stay calm during market dips and realize your growth during peaks.
                    </p>
                  </div>
                </div>
              </MechanicaCard>
            </div>
          </div>

          {/* Technical Specifications Footer */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <MechanicaCard variant="default" hover>
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <MechanicaGear size="lg" color="steel" speed="medium" />
                </div>
                <div className="text-lg font-bold mechanica-heading-professional text-mechanica-moonlight-blue mb-2">
                  📈 Live Tracking
                </div>
                <div className="text-sm text-gray-600 mechanica-text-technical">
                  See your growth as it happens.
                </div>
              </div>
            </MechanicaCard>
            <MechanicaCard variant="wood" hover>
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <MechanicaGear size="lg" color="brass" speed="slow" />
                </div>
                <div className="text-lg font-bold mechanica-heading-professional text-mechanica-moonlight-blue mb-2">
                  🔔 Smart Alerts
                </div>
                <div className="text-sm text-gray-600 mechanica-text-technical">
                  Get notified of important changes.
                </div>
              </div>
            </MechanicaCard>
            <MechanicaCard variant="mechanical" hover>
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <MechanicaGear size="lg" color="copper" speed="reverse" />
                </div>
                <div className="text-lg font-bold mechanica-heading-professional text-mechanica-moonlight-blue mb-2">
                  🛡️ Reliable Data
                </div>
                <div className="text-sm text-gray-600 mechanica-text-technical">
                  Data you can trust for your decisions.
                </div>
              </div>
            </MechanicaCard>
          </div>
        </div>
      </div>
    </MechanicaLayout>
  );
}
