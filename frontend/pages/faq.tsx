import React from 'react';
import Link from 'next/link';
import { MechanicaLayout } from '../components/layout/mechanicaLayout';
import Head from 'next/head';
import { MechanicaCard } from '../components/ui/mechanicaCard';
import { MechanicaGear } from '../components/ui/mechanicaGear';

export default function FAQ() {
  const faqs = [
    {
      question: 'What is Beginner Investor Hub?',
      answer:
        'Beginner Investor Hub is an educational platform that helps you learn investing through hands-on portfolio simulation, AI-powered coaching, and real-time market insights. We provide institutional-grade tools in an accessible format for beginners.',
    },
    {
      question: 'Is this real investing or just simulation?',
      answer:
        'We focus on simulation and education. You can practice with virtual portfolios using real market data, but no real money is involved. This helps you build confidence and understanding before investing with real funds.',
    },
    {
      question: 'How much does it cost?',
      answer:
        'Basic access to our platform is free. We offer premium features for advanced users who want additional analytics and personalized coaching. You can start learning immediately without any cost.',
    },
    {
      question: 'What markets can I simulate?',
      answer:
        'You can simulate investments in stocks, ETFs, and cryptocurrencies. We provide real-time data from major exchanges including Ordinatus, NASDAQ, and popular crypto exchanges.',
    },
    {
      question: 'How does the AI coaching work?',
      answer:
        'Our AI analyzes your investment decisions and provides personalized feedback on your strategy, risk management, and behavioral patterns. It helps you recognize emotional decision-making and develop disciplined investing habits.',
    },
    {
      question: 'Can I track my progress?',
      answer:
        'Yes! You can monitor your simulated portfolio performance, track your learning progress, and see detailed analytics about your investment decisions and risk management.',
    },
    {
      question: 'Is my data secure?',
      answer:
        'Absolutely. We use industry-standard encryption and security measures. Your personal information and simulated portfolio data are protected with the same level of security used by major financial institutions.',
    },
    {
      question: 'How do I get started?',
      answer:
        'Simply sign up for a free account, complete your investor profile, and start building your first simulated portfolio. Our guided onboarding process will walk you through each step.',
    },
  ];

  return (
    <MechanicaLayout
      title="Frequent Questions | Beginner Investor Hub"
      description="Find answers to common questions about our platform, simulations, and how to get started."
    >
      <Head>
        <title>Frequent Questions | BeginnerInvestorHub</title>
        <meta
          name="description"
          content="Find answers to common questions about our platform, simulations, and how to get started."
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
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-white uppercase tracking-tighter">
                  Frequent <span className="text-yellow-400">Questions</span>
                </h1>
                <MechanicaGear size="xl" color="brass" speed="reverse" />
              </div>

              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
                Everything you need to know about starting your investment
                journey.
              </p>

              <div className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500/80">
                Protocol: Seeking Answers
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50" />
        </section>

        <div className="container mx-auto px-4 relative z-10 py-12 flex flex-col items-center">
          {/* FAQ Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 w-full max-w-6xl">
            {faqs.map((faq, index) => (
              <MechanicaCard
                key={index}
                variant={
                  index % 3 === 0
                    ? 'mechanical'
                    : index % 3 === 1
                      ? 'brass'
                      : 'wood'
                }
                animated
                className="group hover:scale-[1.02] transition-transform"
              >
                <div className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="mt-1">
                      <MechanicaGear
                        size="sm"
                        color={
                          index % 3 === 0
                            ? 'steel'
                            : index % 3 === 1
                              ? 'brass'
                              : 'copper'
                        }
                        speed="medium"
                      />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                        Query {index + 1}
                      </div>
                      <h3 className="font-bold text-xl mb-4 mechanica-heading-professional text-gray-900 group-hover:text-mechanica-moonlight-blue transition-colors">
                        {faq.question}
                      </h3>
                      <div className="w-12 h-0.5 bg-yellow-500/20 mb-4"></div>
                      <p className="text-gray-600 mechanica-text-technical leading-relaxed font-medium">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </MechanicaCard>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="w-full max-w-4xl">
            <MechanicaCard
              variant="wood"
              animated
              className="bg-gradient-to-br from-blue-50 to-white mechanica-hum text-center"
            >
              <div className="p-12">
                <div className="flex justify-center items-center space-x-6 mb-8">
                  <MechanicaGear size="large" color="brass" speed="slow" />
                  <h2 className="text-3xl font-black text-mechanica-moonlight-blue uppercase tracking-tighter">
                    Still have questions?
                  </h2>
                  <MechanicaGear size="large" color="brass" speed="reverse" />
                </div>
                <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto font-medium italic">
                  &ldquo;Our maintenance crew and technical advisors are
                  available 24/7 to calibrate your investment journey.&rdquo;
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-10 py-5 bg-mechanica-moonlight-blue text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-premium hover:scale-105 active:scale-95 transition-all"
                >
                  Message Us <span className="ml-3 text-lg">→</span>
                </Link>
              </div>
            </MechanicaCard>
          </div>

          {/* Technical Footer */}
          <div className="mt-16 text-center pb-8">
            <Link
              href="/"
              className="inline-flex items-center space-x-3 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
            >
              <MechanicaGear size="sm" color="steel" speed="slow" />
              <span className="text-xs font-black uppercase tracking-widest text-gray-500">
                Back to Home
              </span>
            </Link>
          </div>
        </div>
      </div>
    </MechanicaLayout>
  );
}
