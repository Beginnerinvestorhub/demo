import React from 'react';
import FractionalShareCalculator from '../components/FractionalShareCalculator';
import { MechanicaLayout } from '../components/layout/mechanicaLayout';
import { MechanicaCard } from '../components/ui/mechanicaCard';
import { MechanicaGear } from '../components/ui/mechanicaGear';
import { MechanicaTicker } from '../components/ui/MechanicaTicker';

export default function FractionalShareCalculatorPage() {
  return (
    <MechanicaLayout
      title="Fractional Share Calculator | BeginnerInvestorHub"
      description="Calculate how much of a stock you can buy with any amount."
    >
      <div className="min-h-screen">
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

          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-center items-center space-x-6 mb-8">
                <MechanicaGear size="xl" color="brass" speed="slow" />
                <h1 className="text-4xl md:text-5xl lg:text-5xl font-black font-serif uppercase tracking-tighter mechanica-title-gold-chrome mechanica-float">
                  Fractional <span className="text-yellow-400">Share</span>{' '}
                  Calculator
                </h1>
                <MechanicaGear size="xl" color="brass" speed="reverse" />
              </div>

              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
                See exactly how many pieces (fractions) of a stock you can
                afford with any budget. Even $5 can get you started.
              </p>

              <div className="flex justify-center">
                <div className="inline-flex items-center space-x-3 px-6 py-2 bg-black/30 backdrop-blur-xl border border-yellow-500/30 rounded-full">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-100/90">
                    PROTOCOL: Budget Flexibility v1.0
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
          {/* Beginner Educational Bridge */}
          <div className="max-w-4xl w-full mb-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <MechanicaCard
              variant="default"
              className="p-8 bg-blue-50/50 border-blue-100 flex flex-col justify-center"
            >
              <h3 className="text-lg font-black text-mechanica-moonlight-blue uppercase tracking-tighter mb-4">
                What is a &quot;Fractional&quot; Share?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Imagine a single stock like a high-end luxury watch. You might
                not have $5,000 for the whole watch, but with
                &quot;Fractionals,&quot; you can buy just the{' '}
                <span className="text-mechanica-moonlight-blue font-bold">
                  gears or the hands
                </span>
                .
              </p>
              <p className="text-sm text-slate-600 leading-relaxed font-medium mt-4">
                This tool shows you exactly how much of that &quot;watch&quot;
                you own based on the money you have right now.
              </p>
            </MechanicaCard>

            <MechanicaCard
              variant="mechanical"
              className="p-8 flex flex-col justify-center border-l-4 border-l-yellow-500"
            >
              <h3 className="text-lg font-black text-mechanica-moonlight-blue uppercase tracking-tighter mb-4">
                The Power of $5
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-xs font-bold text-slate-700">
                  <span className="text-yellow-500 font-black">✓</span>
                  <span>
                    Buy the best companies in the world with pocket change.
                  </span>
                </li>
                <li className="flex items-start gap-2 text-xs font-bold text-slate-700">
                  <span className="text-yellow-500 font-black">✓</span>
                  <span>
                    Build your &quot;Ownership Machine&quot; one dollar at a
                    time.
                  </span>
                </li>
                <li className="flex items-start gap-2 text-xs font-bold text-slate-700">
                  <span className="text-yellow-500 font-black">✓</span>
                  <span>
                    Never wait to &quot;afford&quot; a full share again.
                  </span>
                </li>
              </ul>
            </MechanicaCard>
          </div>

          {/* Main Calculator Card */}
          <MechanicaCard
            variant="wood"
            animated
            className="bg-gradient-to-br from-blue-50 to-white mechanica-hum w-full max-w-4xl"
          >
            <div className="p-8">
              {/* Tool Header */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <MechanicaGear size="md" color="steel" speed="medium" />
                  <h2 className="text-2xl font-bold mechanica-heading-professional text-mechanica-moonlight-blue">
                    Investment Value Calculator
                  </h2>
                </div>
                <p className="text-gray-600 mechanica-text-technical">
                  Enter your investment details below to calculate exactly how
                  many shares you can own.
                </p>
              </div>

              <FractionalShareCalculator />
            </div>
          </MechanicaCard>

          {/* Educational Content / Instructions */}
          <div className="mt-20 w-full max-w-6xl">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-extrabold text-mechanica-moonlight-blue font-serif mb-4 uppercase tracking-tighter">
                How It Works
              </h3>
              <div className="w-20 h-1 bg-yellow-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <MechanicaCard
                variant="default"
                animated
                className="border-t-4 border-t-mechanica-moonlight-blue bg-white"
              >
                <div className="p-8 text-center">
                  <div className="w-12 h-12 bg-mechanica-moonlight-blue text-white rounded-2xl flex items-center justify-center text-xl font-black mx-auto mb-6 shadow-lg">
                    1
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider">
                    Enter Details
                  </h4>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed">
                    Input how much money you want to invest and the current
                    stock price.
                  </p>
                </div>
              </MechanicaCard>

              <MechanicaCard
                variant="mechanical"
                animated
                className="border-t-4 border-t-yellow-500 bg-white"
              >
                <div className="p-8 text-center">
                  <div className="w-12 h-12 bg-yellow-500 text-mechanica-moonlight-blue rounded-2xl flex items-center justify-center text-xl font-black mx-auto mb-6 shadow-lg">
                    2
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider">
                    Calculate Shares
                  </h4>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed">
                    We automatically calculate exactly how many shares (or
                    partial shares) you&apos;ll own.
                  </p>
                </div>
              </MechanicaCard>

              <MechanicaCard
                variant="wood"
                animated
                className="border-t-4 border-t-mechanica-polished-brass bg-white"
              >
                <div className="p-8 text-center">
                  <div className="w-12 h-12 bg-mechanica-polished-brass text-white rounded-2xl flex items-center justify-center text-xl font-black mx-auto mb-6 shadow-lg">
                    3
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider">
                    View Results
                  </h4>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed">
                    See your estimated shares and compare fees across different
                    brokers.
                  </p>
                </div>
              </MechanicaCard>
            </div>
          </div>

          {/* Technical Specs Footer */}
          <div className="mt-12 text-center">
            <MechanicaCard
              variant="mechanical"
              className="inline-flex items-center px-6 py-3"
            >
              <div className="flex items-center space-x-3">
                <MechanicaGear size="sm" color="steel" speed="medium" />
                <span className="text-sm text-gray-700 font-medium mechanica-text-technical">
                  Calculations based on real-time stock prices and broker fees.
                </span>
              </div>
            </MechanicaCard>
          </div>
        </div>
      </div>
    </MechanicaLayout>
  );
}
// Note: You would need to create the AnimatedGrid and DecorativeGear components
// in the specified paths for this file to run without errors.
