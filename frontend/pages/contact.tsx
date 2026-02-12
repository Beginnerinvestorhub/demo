import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { MechanicaLayout } from '../components/layout/mechanicaLayout';
import { MechanicaCard } from '../components/ui/mechanicaCard';
import { MechanicaGear } from '../components/ui/mechanicaGear';
import { MechanicaButton } from '../components/ui/mechanicaButton';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: 'general', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        'Failed to send message. Please try emailing us directly.'
      );
    }
  };

  return (
    <MechanicaLayout
      title="Contact Us | Beginner Investor Hub"
      description="Get in touch with our support team. We're here to help with questions about portfolio simulation, AI coaching, and platform features."
    >
      <Head>
        <title>Get in Touch | BeginnerInvestorHub</title>
        <meta
          name="description"
          content="Contact our support team for questions about investment simulations, AI coaching, and precision-engineered platform features."
        />
      </Head>
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
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-white">
                  Contact <span className="text-yellow-400">Us</span>
                </h1>
                <MechanicaGear size="xl" color="brass" speed="reverse" />
              </div>

              <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto font-light leading-relaxed">
                Have questions? We're here to help you start your investment
                journey with confidence.
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50" />
        </section>

        {/* Content Area - The "Wall" */}
        <div className="relative bg-gray-50 min-h-screen">
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

          <div className="container mx-auto px-4 relative z-10 py-20">
            {/* Status Bar / Badges - Small Note Scrolls */}
            <div className="mb-16 flex flex-wrap items-center justify-center gap-6">
              {[
                { icon: '📧', label: 'Direct support@', variant: 'wood' },
                { icon: '⚡', label: '24/7 Response', variant: 'wood' },
                { icon: '📍', label: 'Global Connect', variant: 'wood' },
              ].map((badge, i) => (
                <MechanicaCard
                  key={i}
                  variant="wood"
                  className={`inline-flex items-center px-6 py-3 shadow-md transform ${i % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
                >
                  <div className="w-6 h-6 mr-3 text-xl">{badge.icon}</div>
                  <span className="text-sm text-mechanica-moonlight-blue font-black uppercase tracking-widest">
                    {badge.label}
                  </span>
                </MechanicaCard>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
              {/* Contact Information - The Side Scroll */}
              <div className="space-y-12">
                <MechanicaCard
                  variant="wood"
                  animated
                  gearDecoration
                  className="shadow-2xl transform -rotate-1"
                >
                  <div className="p-10">
                    <div className="flex items-center space-x-3 mb-8 pb-8 border-b border-mechanica-moonlight-blue/10">
                      <MechanicaGear size="md" color="brass" speed="slow" />
                      <h2 className="text-3xl font-black text-mechanica-moonlight-blue uppercase tracking-tighter">
                        Ways to Reach Us
                      </h2>
                    </div>

                    <div className="space-y-8">
                      <div className="flex items-start space-x-6 p-6 hover:bg-mechanica-moonlight-blue/5 rounded-2xl transition-all border-2 border-transparent hover:border-mechanica-moonlight-blue/20 group">
                        <div className="w-14 h-14 bg-white border border-mechanica-moonlight-blue/10 rounded-xl shadow-inner flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                          📧
                        </div>
                        <div>
                          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">
                            General Help
                          </h3>
                          <div className="text-lg font-black text-mechanica-moonlight-blue uppercase tracking-tight mb-1">
                            Support Team
                          </div>
                          <a
                            href="mailto:info@beginnerinvestorhub.com"
                            className="text-mechanica-moonlight-blue font-black hover:underline font-mono text-sm"
                          >
                            info@beginnerinvestorhub.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start space-x-6 p-6 hover:bg-mechanica-moonlight-blue/5 rounded-2xl transition-all border-2 border-transparent hover:border-mechanica-moonlight-blue/20 group">
                        <div className="w-14 h-14 bg-white border border-mechanica-moonlight-blue/10 rounded-xl shadow-inner flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                          💼
                        </div>
                        <div>
                          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">
                            Business & Partnerships
                          </h3>
                          <div className="text-lg font-black text-mechanica-moonlight-blue uppercase tracking-tight mb-1">
                            Growing Together
                          </div>
                          <a
                            href="mailto:info@beginnerinvestorhub.com"
                            className="text-mechanica-moonlight-blue font-black hover:underline font-mono text-sm"
                          >
                            info@beginnerinvestorhub.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start space-x-6 p-6 hover:bg-mechanica-moonlight-blue/5 rounded-2xl transition-all border-2 border-transparent hover:border-mechanica-moonlight-blue/20 group">
                        <div className="w-14 h-14 bg-white border border-mechanica-moonlight-blue/10 rounded-xl shadow-inner flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                          📍
                        </div>
                        <div>
                          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">
                            Visit Us
                          </h3>
                          <div className="text-lg font-black text-mechanica-moonlight-blue uppercase tracking-tight mb-2">
                            Our Office
                          </div>
                          <p className="text-gray-600 font-black font-mono text-xs leading-relaxed uppercase">
                            Precision Sector 4<br />
                            Raleigh, United States
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </MechanicaCard>

                {/* Response Metrics Scroll */}
                <MechanicaCard
                  variant="wood"
                  animated
                  gearDecoration
                  className="shadow-xl transform rotate-1"
                >
                  <div className="p-10">
                    <div className="flex items-center space-x-3 mb-8">
                      <MechanicaGear size="sm" color="steel" speed="medium" />
                      <h3 className="font-black text-mechanica-moonlight-blue uppercase tracking-widest text-sm">
                        When You'll Hear Back
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      {[
                        {
                          label: 'General',
                          time: '< 24h',
                          color: 'text-mechanica-moonlight-blue',
                        },
                        {
                          label: 'Technical',
                          time: '< 12h',
                          color: 'text-mechanica-moonlight-blue',
                        },
                        {
                          label: 'Emergency',
                          time: 'Priority',
                          color: 'text-red-800',
                        },
                        {
                          label: 'Global',
                          time: 'Online',
                          color: 'text-emerald-800',
                        },
                      ].map((metric, i) => (
                        <div
                          key={i}
                          className="p-6 bg-mechanica-moonlight-blue/5 rounded-2xl border border-mechanica-moonlight-blue/10 shadow-sm"
                        >
                          <div className="text-[10px] font-black text-gray-500 uppercase mb-2">
                            {metric.label}
                          </div>
                          <div
                            className={`text-2xl font-black font-mono ${metric.color}`}
                          >
                            {metric.time}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </MechanicaCard>
              </div>

              {/* Transmission Form - The Master Protocol Scroll */}
              <MechanicaCard
                variant="wood"
                animated
                gearDecoration
                className="shadow-2xl border-t-8 border-t-mechanica-moonlight-blue transform rotate-1"
              >
                <div className="p-10">
                  <div className="flex items-center space-x-3 mb-10 pb-8 border-b border-mechanica-moonlight-blue/10">
                    <MechanicaGear size="md" color="brass" speed="slow" />
                    <h2 className="text-4xl font-black text-mechanica-moonlight-blue uppercase tracking-tighter">
                      Send a Message
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Standard Identifier"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-6 py-5 bg-white border-2 border-mechanica-moonlight-blue/10 rounded-2xl focus:ring-4 focus:ring-mechanica-moonlight-blue/20 focus:border-mechanica-moonlight-blue outline-none transition-all font-black text-gray-900 placeholder-gray-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="name@architecture.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-6 py-5 bg-white border-2 border-mechanica-moonlight-blue/10 rounded-2xl focus:ring-4 focus:ring-mechanica-moonlight-blue/20 focus:border-mechanica-moonlight-blue outline-none transition-all font-black text-gray-900 placeholder-gray-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">
                        Transmission Subject
                      </label>
                      <div className="relative">
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-6 py-5 bg-white border-2 border-mechanica-moonlight-blue/10 rounded-2xl focus:ring-4 focus:ring-mechanica-moonlight-blue/20 focus:border-mechanica-moonlight-blue outline-none transition-all font-black text-gray-900 appearance-none cursor-pointer"
                          required
                        >
                          <option value="general">General Inquiries</option>
                          <option value="technical">
                            Technical Calibration
                          </option>
                          <option value="account">Account Access</option>
                          <option value="feature">Component Request</option>
                          <option value="bug">Anomaly Report</option>
                          <option value="partnership">Ecosystem Scaling</option>
                          <option value="feedback">System Feedback</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-mechanica-moonlight-blue">
                          ▼
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-6 py-5 bg-white border-2 border-mechanica-moonlight-blue/10 rounded-2xl focus:ring-4 focus:ring-mechanica-moonlight-blue/20 focus:border-mechanica-moonlight-blue outline-none transition-all font-bold text-gray-900 min-h-[180px] placeholder-gray-400"
                        required
                        placeholder="Detail your request for processing..."
                      />
                    </div>

                    {status === 'success' && (
                      <div className="p-6 bg-emerald-950/5 text-emerald-900 rounded-2xl border-2 border-emerald-600/20 flex items-center shadow-inner">
                        <span className="text-2xl mr-4">✓</span>
                        <span className="text-sm font-black uppercase tracking-tight">
                          Transmission complete. Response pending calibration.
                        </span>
                      </div>
                    )}

                    {status === 'error' && (
                      <div className="p-6 bg-red-950/5 text-red-900 rounded-2xl border-2 border-red-600/20 flex items-center shadow-inner">
                        <span className="text-2xl mr-4">✕</span>
                        <span className="text-sm font-black uppercase tracking-tight">
                          {errorMessage}
                        </span>
                      </div>
                    )}

                    <MechanicaButton
                      variant="wood"
                      className="w-full py-8 text-xl font-black uppercase tracking-widest shadow-xl hover:shadow-2xl transform transition-all active:scale-95 border-2 border-mechanica-moonlight-blue/30"
                      disabled={status === 'sending'}
                    >
                      {status === 'sending' ? (
                        <div className="flex items-center justify-center">
                          <MechanicaGear
                            size="small"
                            color="brass"
                            speed="fast"
                            className="mr-4"
                          />
                          Transmitting...
                        </div>
                      ) : (
                        'Initialize Transmission'
                      )}
                    </MechanicaButton>
                  </form>
                </div>
              </MechanicaCard>
            </div>

            {/* Technical Footer */}
            <div className="pt-24 text-center pb-12 w-full max-w-4xl mx-auto">
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
                  Back to Home
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MechanicaLayout>
  );
}
