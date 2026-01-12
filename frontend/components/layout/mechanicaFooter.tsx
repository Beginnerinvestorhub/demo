import React from 'react';
import Link from 'next/link';
import { MechanicaGear } from '../ui/mechanicaGear';

export const MechanicaFooter: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-t border-gray-700">
      {/* Mechanical background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255, 255, 255, 0.1) 30px, rgba(255, 255, 255, 0.1) 60px),
              repeating-linear-gradient(-45deg, transparent, transparent 30px, rgba(255, 255, 255, 0.05) 30px, rgba(255, 255, 255, 0.05) 60px)
            `
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 text-center md:text-left">

          {/* Left Column: Quick Links */}
          <div className="flex-1 order-2 md:order-1">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-500 mb-6">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-4">
              <Link href="/tools" className="text-gray-400 hover:text-white transition-all duration-300 text-sm font-medium hover:translate-x-1 inline-block">
                Investment Tools
              </Link>
              <Link href="/dashboard" className="text-gray-400 hover:text-white transition-all duration-300 text-sm font-medium hover:translate-x-1 inline-block">
                Dashboard
              </Link>
              <Link href="/signup" className="text-gray-400 hover:text-white transition-all duration-300 text-sm font-medium hover:translate-x-1 inline-block">
                Get Started
              </Link>
            </nav>
          </div>

          {/* Center Column: Branding */}
          <div className="flex-[2] order-1 md:order-2 text-center py-4">
            <div className="flex justify-center items-center space-x-4 mb-6">
              <MechanicaGear size="lg" color="brass" speed="slow" className="opacity-80" />
              <h3 className="text-3xl font-extrabold tracking-tighter text-white font-serif">
                Beginner<span className="text-yellow-500">Investor</span>Hub
              </h3>
              <MechanicaGear size="lg" color="brass" speed="reverse" className="opacity-80" />
            </div>
            <p className="text-gray-400 text-base leading-relaxed max-w-md mx-auto font-light italic">
              "Precision investment education with engineering-grade tools and structured learning paths."
            </p>
          </div>

          {/* Right Column: Legal & Support */}
          <div className="flex-1 order-3 text-center md:text-right">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-500 mb-6 font-serif">
              Legal & Support
            </h4>
            <nav className="flex flex-col space-y-4">
              <Link href="/terms" className="text-gray-400 hover:text-white transition-all duration-300 text-sm font-medium hover:-translate-x-1 inline-block">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-all duration-300 text-sm font-medium hover:-translate-x-1 inline-block">
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-all duration-300 text-sm font-medium hover:-translate-x-1 inline-block">
                Contact Us
              </Link>
            </nav>
          </div>

        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center justify-center space-x-3 w-full">
              <MechanicaGear size="sm" color="steel" speed="medium" />
              <p className="text-gray-400 text-sm font-mono tracking-wider">
                © 2025 BeginnerInvestorHub. All rights reserved.
              </p>
              <MechanicaGear size="sm" color="steel" speed="reverse" />
            </div>

            {/* Centered legal links */}
            <div className="flex items-center justify-center space-x-8 text-xs text-gray-400 uppercase tracking-widest">
              <Link
                href="/terms"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                Terms
              </Link>
              <span className="text-gray-600">•</span>
              <Link
                href="/privacy"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                Privacy
              </Link>
              <span className="text-gray-600">•</span>
              <Link
                href="/contact"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
