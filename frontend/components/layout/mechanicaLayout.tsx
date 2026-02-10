import React, { useState } from 'react';
import Link from 'next/link';
import NudgeChatWidget from '../NudgeChatWidget';
import { MechanicaFooter } from './mechanicaFooter';
import { NAV_LINKS } from '../NavBar';

interface MechanicaLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const MechanicaLayout: React.FC<MechanicaLayoutProps> = ({
  children,
  title,
  description
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  React.useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Skip to main content for accessibility */}
      <a href="#main" className="sr-only focus:not-sr-only">
        Skip to main content
      </a>

      {/* Primary Navigation */}
      <nav aria-label="Primary navigation" className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-mechanica-moonlight-blue font-serif">
                  BeginnerInvestorHub
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <ul className="flex space-x-8">
                {NAV_LINKS.slice(0, 6).map((item) => (
                  <li key={item.href}>
                    <Link 
                      href={item.href}
                      className={`text-gray-600 hover:text-mechanica-moonlight-blue px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentPath === item.href ? 'bg-mechanica-moonlight-blue text-white' : ''
                      }`}
                      aria-current={currentPath === item.href ? 'page' : undefined}
                    >
                      {item.label === 'My Journey' ? 'My Dashboard' : 
                       item.label === 'Learn' ? 'Learning Paths' : 
                       item.label === 'Practice' ? 'Practice Simulations' : 
                       item.label === 'Explore' ? 'Demo / Tour' : 
                       item.label === 'Dashboard' ? 'Simulations' : 
                       item.label}
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
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-b border-gray-200">
              <ul className="px-2 py-2 space-y-1">
                {NAV_LINKS.slice(0, 6).map((item) => (
                  <li key={item.href}>
                    <Link 
                      href={item.href}
                      className={`block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-mechanica-moonlight-blue ${
                        currentPath === item.href ? 'bg-mechanica-moonlight-blue text-white' : ''
                      }`}
                      aria-current={currentPath === item.href ? 'page' : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label === 'My Journey' ? 'My Dashboard' : 
                       item.label === 'Learn' ? 'Learning Paths' : 
                       item.label === 'Practice' ? 'Practice Simulations' : 
                       item.label === 'Explore' ? 'Demo / Tour' : 
                       item.label === 'Dashboard' ? 'Simulations' : 
                       item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>

      <main id="main" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Back to top anchor */}
      <a 
        href="#top" 
        className="fixed bottom-4 right-4 bg-mechanica-moonlight-blue text-white p-2 rounded-full shadow-lg hover:bg-mechanica-moonlight-blue-dark transition-colors z-40"
        aria-label="Back to top"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7" />
        </svg>
      </a>

      <MechanicaFooter />
      <NudgeChatWidget />
    </div>
  );
};
