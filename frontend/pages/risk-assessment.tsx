import React, { useState } from 'react';
import RiskAssessmentForm from '../components/RiskAssessmentForm';
import RiskAssessmentResult from '../components/RiskAssessmentResult';
import { MechanicaLayout } from '../components/layout/mechanicaLayout';
import Head from 'next/head';
import { MechanicaCard } from '../components/ui/mechanicaCard';
import { MechanicaGear } from '../components/ui/mechanicaGear';

// Define interface for risk data
interface RiskData {
  risk_score: number;
  risk_label: string;
  recommended_allocation: Record<string, number>;
}

export default function RiskAssessmentPage() {
  const [result, setResult] = useState<RiskData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <MechanicaLayout>
      <Head>
        <title>Risk Assessment Tool | BeginnerInvestorHub</title>
        <meta name="description" content="Discover your risk profile and construct a personalized investment allocation blueprint with precision. Get your assembly instructions instantly." />
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
                  Risk <span className="text-yellow-400">Assessment</span> Tool
                </h1>
                <MechanicaGear size="xl" color="brass" speed="reverse" />
              </div>

              <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto font-light">
                Discover your risk profile and construct a personalized investment allocation blueprint with precision.
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50" />
        </section>

        <div className="container mx-auto px-4 relative z-10 py-12 flex flex-col items-center">

          {/* Error Display */}
          {error && (
            <MechanicaCard variant="default" className="mb-8 border-l-4 border-red-600 bg-red-50">
              <div className="p-6 flex items-start">
                <div className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5">✕</div>
                <div>
                  <h3 className="font-semibold text-red-900 mb-1 mechanica-heading-professional">
                    Assessment Error
                  </h3>
                  <p className="text-red-800 mechanica-text-technical">{error}</p>
                </div>
              </div>
            </MechanicaCard>
          )}

          {/* Form or Result */}
          {!result ? (
            <MechanicaCard variant="wood" animated className="bg-gradient-to-br from-blue-50 to-white mechanica-hum">
              <div className="p-8">
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <MechanicaGear size="md" color="steel" speed="medium" />
                    <h2 className="text-2xl font-bold mechanica-heading-professional text-mechanica-moonlight-blue">
                      🔧 Build Your Risk Profile
                    </h2>
                  </div>
                  <p className="text-gray-600 mechanica-text-technical">
                    Complete the component assembly below to construct your
                    personalized investment blueprint.
                  </p>
                </div>
                <RiskAssessmentForm
                  onSubmit={async formData => {
                    setLoading(true);
                    setError(null);
                    try {
                      const res = await fetch('/api/risk-assessment-proxy', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData),
                      });
                      if (!res.ok) throw new Error(await res.text());
                      const data: RiskData = await res.json();
                      setResult(data);
                    } catch (e: unknown) {
                      const errorMessage = e instanceof Error ? e.message : 'Failed to assess risk. Please verify all components and try again.';
                      setError(errorMessage);
                    } finally {
                      setLoading(false);
                    }
                  }}
                  loading={loading}
                  error={error}
                />
              </div>
            </MechanicaCard>
          ) : (
            <MechanicaCard variant="default" animated className="bg-gray-900 border-gray-800 mechanica-hum">
              <div className="p-8">
                <div className="mb-6 pb-6 border-b border-gray-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <MechanicaGear size="md" color="brass" speed="slow" />
                    <h2 className="text-2xl font-bold mechanica-heading-professional text-white">
                      ⚙️ Your Constructed Risk Profile
                    </h2>
                  </div>
                  <p className="text-blue-100 mechanica-text-technical">
                    Assembly complete. Review your personalized specifications
                    below.
                  </p>
                </div>
                <RiskAssessmentResult
                  result={result}
                  onReset={() => {
                    setResult(null);
                    setError(null);
                  }}
                />
              </div>
            </MechanicaCard>
          )}

          {/* Assembly Instructions Footer */}
          <div className="mt-12 text-center">
            <MechanicaCard variant="mechanical" className="inline-flex items-center px-6 py-3">
              <div className="flex items-center space-x-3">
                <MechanicaGear size="sm" color="steel" speed="medium" />
                <span className="text-sm text-gray-700 font-medium mechanica-text-technical">
                  All assessments are processed securely with enterprise-grade encryption
                </span>
              </div>
            </MechanicaCard>
          </div>
        </div>
      </div>
    </MechanicaLayout>
  );
}
