import React from 'react';
import Link from 'next/link';
import { MechanicaLayout } from '../components/layout/mechanicaLayout';
import Head from 'next/head';
import { MechanicaCard } from '../components/ui/mechanicaCard';
import { MechanicaGear } from '../components/ui/mechanicaGear';
import { useAuth } from '../hooks/useAuth';
import AuthForm from '../components/AuthForm';

export default function SignupPage() {
  const { user, loading } = useAuth();

  // Don't show signup form if already authenticated
  if (loading || user) {
    return (
      <MechanicaLayout title="Loading | Beginner Investor Hub">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <MechanicaGear size="large" color="steel" speed="medium" />
            <p className="mechanica-text-technical text-gray-600">Loading...</p>
          </div>
        </div>
      </MechanicaLayout>
    );
  }

  return (
    <MechanicaLayout title="Sign Up | Beginner Investor Hub">
      <Head>
        <meta name="description" content="Create your BeginnerInvestorHub account and begin your precision-engineered investment education journey. Master portfolio assembly today." />
      </Head>
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 max-w-6xl w-full">

          {/* Left Panel - Professional Branding */}
          <MechanicaCard variant="wood" className="p-12 flex items-center justify-center">
            <div className="text-center space-y-6">
              <div className="flex justify-center items-center space-x-4">
                <MechanicaGear size="large" color="brass" speed="slow" />
                <div className="text-3xl font-bold mechanica-heading-professional text-mechanica-moonlight-blue">
                  BeginnerInvestorHub
                </div>
                <MechanicaGear size="large" color="brass" speed="reverse" />
              </div>

              <h2 className="text-2xl font-bold mechanica-heading-professional">
                Start Your Investment Journey
              </h2>
              <p className="text-gray-600 mechanica-text-technical">
                Join thousands of investors mastering the art of portfolio management
                with our precision-engineered learning platform.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MechanicaGear size="small" color="steel" />
                  <span className="mechanica-text-technical">Real-time market simulations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MechanicaGear size="small" color="copper" />
                  <span className="mechanica-text-technical">AI-powered behavioral coaching</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MechanicaGear size="small" color="brass" />
                  <span className="mechanica-text-technical">Professional risk analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MechanicaGear size="small" color="steel" />
                  <span className="mechanica-text-technical">Personalized learning paths</span>
                </div>
              </div>
            </div>
          </MechanicaCard>

          {/* Right Panel - Signup Form */}
          <MechanicaCard variant="mechanical" className="p-12 flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mechanica-heading-professional mb-2">
                  Create Account
                </h2>
                <p className="text-gray-600 mechanica-text-technical">
                  Start your precision investment education journey today
                </p>
              </div>

              <AuthForm mode="signup" />

              <div className="mt-6 text-center text-sm">
                <p className="text-gray-700 mechanica-text-technical">
                  Already have an account?{' '}
                  <Link
                    href="/login"
                    className="text-mechanica-moonlight-blue font-semibold hover:text-mechanica-moonlight-blue-dark transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-500">
                    or
                  </span>
                </div>
              </div>

              <Link
                href="/"
                className="block text-center text-sm text-gray-500 hover:text-mechanica-moonlight-blue transition-colors mechanica-text-technical"
              >
                ← Back to home
              </Link>

              <div className="terms-notice">
                <p>
                  By signing up, you agree to our{' '}
                  <Link href="/terms">Terms of Service</Link> and{' '}
                  <Link href="/privacy">Privacy Policy</Link>
                </p>
              </div>
            </div>
          </MechanicaCard>
        </div>
      </div>
    </MechanicaLayout>
  );
}
