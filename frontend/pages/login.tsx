import React, { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MechanicaLayout } from '../components/layout/mechanicaLayout';
import { MechanicaCard } from '../components/ui/mechanicaCard';
import { MechanicaGear } from '../components/ui/mechanicaGear';
import { useAuth } from '../hooks/useAuth';
import AuthForm from '../components/AuthForm';

// --- Extracted Components ---
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      // Use router.push('/') if you want to allow back button
      // But router.replace('/dashboard') is correct for authentication flow
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  // Show loading spinner if user status is being checked or is already logged in
  if (loading || user) {
    return (
      <LoadingSpinner
        title="Loading"
        metaDescription="Checking authentication status..."
      />
    );
  }

  return (
    <MechanicaLayout title="Sign In | Beginner Investor Hub">
      <Head>
        <meta
          name="description"
          content="Sign in to your BeginnerInvestorHub account to access your portfolio assembly, mastery tools, and AI behavioral coach."
        />
      </Head>
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 max-w-6xl w-full">
          {/* Left Panel - Professional Branding */}
          <MechanicaCard
            variant="wood"
            className="p-12 flex items-center justify-center"
          >
            <div className="text-center space-y-6">
              <div className="flex justify-center items-center space-x-4">
                <MechanicaGear size="large" color="brass" speed="slow" />
                <div className="text-3xl font-bold mechanica-heading-professional text-mechanica-moonlight-blue">
                  BeginnerInvestorHub
                </div>
                <MechanicaGear size="large" color="brass" speed="reverse" />
              </div>

              <h2 className="text-2xl font-bold mechanica-heading-professional">
                Precision Investment Education
              </h2>
              <p className="text-gray-600 mechanica-text-technical">
                Master investing with our mechanically-engineered platform
                featuring real-time simulations and AI-powered coaching.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MechanicaGear size="small" color="steel" />
                  <span className="mechanica-text-technical">
                    Real-time market simulations
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MechanicaGear size="small" color="copper" />
                  <span className="mechanica-text-technical">
                    AI-powered behavioral coaching
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MechanicaGear size="small" color="brass" />
                  <span className="mechanica-text-technical">
                    Professional risk analytics
                  </span>
                </div>
              </div>
            </div>
          </MechanicaCard>

          {/* Right Panel - Login Form */}
          <MechanicaCard
            variant="mechanical"
            className="p-12 flex items-center justify-center"
          >
            <div className="w-full max-w-md">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mechanica-heading-professional mb-2">
                  Sign In
                </h2>
                <p className="text-gray-600 mechanica-text-technical">
                  Enter your credentials to access your investment dashboard
                </p>
              </div>

              <AuthForm mode="login" />

              <div className="mt-6 text-center text-sm">
                <p className="text-gray-700 mechanica-text-technical">
                  New to Beginner Investor Hub?{' '}
                  <Link
                    href="/signup"
                    className="text-mechanica-moonlight-blue font-semibold hover:text-mechanica-moonlight-blue-dark transition-colors"
                  >
                    Create an account
                  </Link>
                </p>
              </div>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-500">or</span>
                </div>
              </div>

              <Link
                href="/"
                className="block text-center text-sm text-gray-500 hover:text-mechanica-moonlight-blue transition-colors mechanica-text-technical"
              >
                ← Back to home
              </Link>
            </div>
          </MechanicaCard>
        </div>
      </div>
    </MechanicaLayout>
  );
}
