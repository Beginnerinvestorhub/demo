import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NudgeChatWidget from '../NudgeChatWidget';
import { MechanicaFooter } from './mechanicaFooter';
import { NAV_LINKS } from '../NavBar';
import { useAuth } from '../../hooks/useAuth';
import { MechanicaGear } from '../ui/mechanicaGear';

interface MechanicaLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  fullBleed?: boolean;
}

export const MechanicaLayout: React.FC<MechanicaLayoutProps> = ({
  children,
  title,
  description,
  fullBleed = false,
}) => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const currentPath = router.pathname;

  // Check if current page is not a main navigation page (needs back button)
  const needsBackButton =
    currentPath !== '/' &&
    currentPath !== '/dashboard' &&
    currentPath !== '/tools' &&
    currentPath !== '/login' &&
    !currentPath.startsWith('/community');

  const handleBack = () => {
    router.back();
  };

  return (
    <div id="top" className="min-h-screen bg-gray-50">
      {/* Document Head */}
      {title && (
        <Head>
          <title>{title} | BeginnerInvestorHub</title>
          {description && <meta name="description" content={description} />}

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content={`https://beginnerinvestorhub.vercel.app${router.asPath}`}
          />
          <meta
            property="og:title"
            content={`${title} | BeginnerInvestorHub`}
          />
          <meta
            property="og:description"
            content={
              description ||
              'Precision-engineered educational platform for mastering investment strategies.'
            }
          />
          <meta
            property="og:image"
            content="https://beginnerinvestorhub.vercel.app/og-image.png"
          />

          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content={`https://beginnerinvestorhub.vercel.app${router.asPath}`}
          />
          <meta
            property="twitter:title"
            content={`${title} | BeginnerInvestorHub`}
          />
          <meta
            property="twitter:description"
            content={
              description ||
              'Precision-engineered educational platform for mastering investment strategies.'
            }
          />
          <meta
            property="twitter:image"
            content="https://beginnerinvestorhub.vercel.app/og-image.png"
          />

          {/* Additional Meta */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      )}

      {/* Skip to main content for accessibility */}
      <a href="#main" className="sr-only focus:not-sr-only">
        Skip to main content
      </a>

      {/* Primary Navigation */}
      <nav
        aria-label="Primary navigation"
        className="bg-white border-b border-gray-200 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Back Button */}
            {needsBackButton && (
              <div className="flex-shrink-0">
                <button
                  onClick={handleBack}
                  className="flex items-center space-x-2 text-gray-600 hover:text-mechanica-moonlight-blue px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  aria-label="Go back"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span>Back</span>
                </button>
              </div>
            )}

            {/* Logo */}
            <div
              className={`flex-shrink-0 ${needsBackButton ? 'mx-auto' : ''}`}
            >
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-bold text-mechanica-moonlight-blue font-serif">
                  BeginnerInvestorHub
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <ul className="flex space-x-8">
                {NAV_LINKS.slice(0, 6)
                  .filter(item => user || item.label !== 'My Dashboard')
                  .map(item => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`text-gray-600 hover:text-mechanica-moonlight-blue px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          currentPath === item.href
                            ? 'bg-mechanica-moonlight-blue text-white'
                            : ''
                        }`}
                        aria-current={
                          currentPath === item.href ? 'page' : undefined
                        }
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-mechanica-moonlight-blue p-2 rounded-md"
                aria-label="Open menu"
                aria-expanded={mobileMenuOpen}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-b border-gray-200 animate-in slide-in-from-top-2 duration-300">
              <ul className="px-4 py-4 space-y-3">
                {NAV_LINKS.slice(0, 6)
                  .filter(item => user || item.label !== 'My Dashboard')
                  .map(item => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-lg font-bold transition-all ${
                          currentPath === item.href
                            ? 'bg-mechanica-moonlight-blue text-white shadow-md'
                            : 'text-gray-600 hover:bg-blue-50 hover:text-mechanica-moonlight-blue'
                        }`}
                        aria-current={
                          currentPath === item.href ? 'page' : undefined
                        }
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                          <MechanicaGear
                            size="small"
                            color={
                              currentPath === item.href ? 'brass' : 'steel'
                            }
                            speed="slow"
                          />
                        </span>
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </nav>

      <main
        id="main"
        className={
          fullBleed ? 'w-full' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'
        }
      >
        {children}
      </main>

      {/* Back to top anchor */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 bg-mechanica-moonlight-blue text-white p-2 rounded-full shadow-lg hover:bg-mechanica-moonlight-blue-dark transition-colors z-40"
        aria-label="Back to top"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7"
          />
        </svg>
      </button>

      <MechanicaFooter />
      <NudgeChatWidget />
    </div>
  );
};
