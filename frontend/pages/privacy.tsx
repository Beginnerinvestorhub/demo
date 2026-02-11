import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { MechanicaLayout } from '../components/layout/mechanicaLayout';
import { MechanicaCard } from '../components/ui/mechanicaCard';
import { MechanicaGear } from '../components/ui/mechanicaGear';

export default function PrivacyPolicy() {
  return (
    <MechanicaLayout
      title="Privacy Policy | BeginnerInvestorHub"
      description="Read our Privacy Policy - Learn how we protect your personal information and data on BeginnerInvestorHub."
    >
      <Head>
        <title>Privacy Policy | BeginnerInvestorHub</title>
        <meta name="description" content="Read our Privacy Policy to understand how we safeguard your personal information and investment data with precision engineering and secure infrastructure." />
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
                  Privacy <span className="text-yellow-400">Policy</span>
                </h1>
                <MechanicaGear size="xl" color="brass" speed="reverse" />
              </div>

              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
                Data encryption protocols and information safeguarding architectures for the modern investor.
              </p>

              <div className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500/80">
                Last Calibration: January 2025
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50" />
        </section>

        {/* Content Area - The "Wall" */}
        <div className="relative bg-slate-100 min-h-screen">
          {/* Subtle Mechanical Wall Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(90deg, #000, #000 1px, transparent 1px, transparent 40px),
                  repeating-linear-gradient(0deg, #000, #000 1px, transparent 1px, transparent 40px)
                `
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10 py-20 flex flex-col items-center space-y-16">
            {/* Master Security Scroll */}
            <MechanicaCard variant="wood" animated gearDecoration className="w-full max-w-4xl shadow-2xl transform rotate-1">
              <div className="p-10">
                <div className="flex items-center space-x-3 mb-6">
                  <MechanicaGear size="md" color="brass" speed="slow" />
                  <h2 className="text-3xl font-black text-amber-900 uppercase tracking-tighter">
                    Security Architecture
                  </h2>
                </div>
                <p className="text-amber-950 text-xl font-medium italic border-l-4 border-amber-600 pl-8 py-2">
                  &quot;At BeginnerInvestorHub, we are committed to protecting your privacy and ensuring the security of your tactical information.&quot;
                </p>
              </div>
            </MechanicaCard>

            {/* Information Collection Scroll */}
            <MechanicaCard variant="wood" animated gearDecoration className="w-full max-w-4xl shadow-2xl transform -rotate-1">
              <div className="p-10">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-800/60 mb-8 flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Information We Collect
                </h3>

                <div className="space-y-10">
                  <div className="p-8 bg-amber-900/5 rounded-2xl border border-amber-600/10 shadow-inner">
                    <h4 className="text-xs font-black uppercase tracking-widest text-amber-800 mb-6">Personal Identifiers</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Name and email address",
                        "Profile transmission data",
                        "Notification path settings",
                        "Risk tolerance metrics",
                        "Portfolio simulation logs",
                        "AI coaching interaction patterns"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center text-sm font-black text-amber-950">
                          <span className="w-2 h-2 bg-amber-600 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-8 bg-amber-900/5 rounded-2xl border border-amber-600/10 shadow-inner">
                    <h4 className="text-xs font-black uppercase tracking-widest text-amber-800 mb-6">System Usage Data</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Navigation telemetry",
                        "Device architecture specs",
                        "Connection pathway (IP)",
                        "Tracking cookie tokens",
                        "Educational achievement logs",
                        "Search query parameters"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center text-sm font-black text-amber-950">
                          <span className="w-2 h-2 bg-amber-700/60 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </MechanicaCard>

            {/* Operational Usage Scroll */}
            <MechanicaCard variant="wood" animated gearDecoration className="w-full max-w-4xl shadow-2xl transform rotate-1">
              <div className="p-10">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-800/60 mb-8 flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Operational Usage
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  {[
                    { label: "Service Provision", text: "Deliver personalized simulations and coaching" },
                    { label: "Account Management", text: "Processing authentication via secure sub-systems" },
                    { label: "System Analytics", text: "Optimizing platform architecture based on telemetry" },
                    { label: "Transmission Security", text: "Detecting anomalies and preventing unauthorized access" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center p-6 bg-amber-900/5 rounded-xl border border-amber-600/10 group hover:border-amber-600 transition-all shadow-sm">
                      <div className="w-12 h-12 bg-white border border-amber-600/20 rounded-xl flex items-center justify-center mr-6 shadow-sm group-hover:scale-110 transition-transform">
                        <span className="text-xs font-black text-amber-800">{i + 1}</span>
                      </div>
                      <div>
                        <div className="text-[11px] font-black uppercase tracking-widest text-amber-900">{item.label}</div>
                        <div className="text-md font-black text-amber-800/70 italic">&quot;{item.text}&quot;</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </MechanicaCard>

            {/* Information Disclosure Scroll */}
            <MechanicaCard variant="wood" animated gearDecoration className="w-full max-w-4xl shadow-2xl transform -rotate-1">
              <div className="p-10">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-800/60 mb-8 flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Information Disclosure
                </h3>
                <div className="bg-amber-900/5 border-l-4 border-amber-600 p-8 rounded-r-2xl shadow-inner mb-10">
                  <p className="text-amber-950 font-black uppercase tracking-tight text-lg">
                    CORE PROTOCOL: WE DO NOT TRADE, SELL, OR RENT YOUR DATA TRANSMISSIONS TO EXTERNAL ENTITIES.
                  </p>
                </div>

                <div className="p-10 bg-amber-900/5 rounded-3xl border-2 border-dashed border-amber-600/30">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-800 mb-6">Trusted Sub-Systems</h4>
                  <div className="flex flex-wrap gap-3">
                    {["Vercel", "Firebase", "PostgreSQL", "Redis", "OpenAI", "Alpha Vantage", "Finnhub"].map((tool) => (
                      <span key={tool} className="px-5 py-2.5 bg-white border border-amber-600/20 rounded-xl text-xs font-black font-mono text-amber-900 shadow-sm hover:scale-110 transition-transform">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </MechanicaCard>

            {/* Data Security Scroll */}
            <MechanicaCard variant="wood" animated gearDecoration className="w-full max-w-4xl shadow-2xl transform rotate-1">
              <div className="p-10">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-800/60 mb-8 flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Data Security Architecture
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { title: "Encryption", desc: "SSL/TLS protocols for all transmissions" },
                    { title: "Infrastructure", desc: "Enterprise-grade cloud with auditing" },
                    { title: "Access Control", desc: "Multi-factor authentication enabled" },
                    { title: "Monitoring", desc: "24/7 intrusion detection telemetry" }
                  ].map((item, i) => (
                    <div key={i} className="p-8 bg-slate-900 rounded-3xl border-4 border-slate-800 relative overflow-hidden group shadow-xl">
                      <div className="relative z-10">
                        <div className="text-[11px] font-black uppercase tracking-widest text-amber-400 mb-2">{item.title}</div>
                        <div className="text-md font-black text-blue-100">{item.desc}</div>
                      </div>
                      <div className="absolute -right-6 -bottom-6 opacity-20 transform group-hover:rotate-45 transition-transform duration-1000">
                        <MechanicaGear size="lg" color="brass" speed="slow" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </MechanicaCard>

            {/* Contact Information Scroll */}
            <MechanicaCard variant="wood" animated gearDecoration className="w-full max-w-4xl shadow-2xl transform -rotate-1">
              <div className="p-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                  <div className="flex items-center space-x-8">
                    <div className="w-20 h-20 bg-amber-700/10 rounded-3xl flex items-center justify-center shadow-inner border border-amber-600/10">
                      <span className="text-4xl text-amber-800">📧</span>
                    </div>
                    <div>
                      <div className="text-[11px] font-black text-amber-800/60 uppercase tracking-widest mb-1">Privacy Transmission</div>
                      <div className="text-lg font-black font-mono text-amber-900">privacy@beginnerinvestorhub.com</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-8">
                    <div className="w-20 h-20 bg-amber-700/10 rounded-3xl flex items-center justify-center shadow-inner border border-amber-600/10">
                      <span className="text-4xl text-amber-800">📍</span>
                    </div>
                    <div>
                      <div className="text-[11px] font-black text-amber-800/60 uppercase tracking-widest mb-1">Central Station</div>
                      <div className="text-lg font-black font-mono text-amber-900">Charlotte, NC, US</div>
                    </div>
                  </div>
                </div>
              </div>
            </MechanicaCard>

            {/* Technical Footer */}
            <div className="pt-20 text-center pb-12 w-full max-w-4xl">
              <Link href="/" className="inline-flex items-center space-x-4 px-10 py-5 bg-white border-2 border-gray-200 rounded-2xl hover:bg-gray-50 transition-all shadow-premium group">
                <MechanicaGear size="sm" color="steel" speed="slow" className="group-hover:rotate-180 transition-transform duration-700" />
                <span className="text-sm font-black uppercase tracking-widest text-gray-600">Return to Command Center</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MechanicaLayout>
  );
}
