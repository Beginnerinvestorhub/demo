// components/NudgeChatWidget.tsx
'use client';

import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const FINANCIAL_FACTS = [
  "Compound interest is the 8th wonder of the world. He who understands it, earns it... he who doesn't... pays it.",
  'The stock market is a device for transferring money from the impatient to the patient.',
  'On average, the stock market has returned about 10% annually over the long term.',
  'The first paper money was created in China over 1,000 years ago.',
  "A 'bull market' is when prices are rising, while a 'bear market' is when they are falling.",
  "Diversification is the only 'free lunch' in investing.",
  'The best time to start investing was 20 years ago. The second best time is today.',
  'Inflation means your money buys less over time. Investing helps stay ahead of it.',
];

const NudgeChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFact, setCurrentFact] = useState<string | null>(null);
  const { user, loading } = useAuth();

  const showRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * FINANCIAL_FACTS.length);
    setCurrentFact(FINANCIAL_FACTS[randomIndex]);
  };

  // Only show widget if user is authenticated
  if (loading) {
    return null; // Still loading, don't show anything
  }

  if (!user) {
    return null; // User not authenticated, don't show widget
  }

  return (
    <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-mechanica-moonlight-blue hover:bg-mechanica-moonlight-blue-dark text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-mechanica-moonlight-blue focus:ring-offset-2 flex items-center justify-center"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        aria-expanded={isOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-8 w-[calc(100vw-2rem)] sm:w-80 h-[450px] bg-white rounded-xl shadow-2xl z-50 border border-gray-200 flex flex-col transition-all duration-300 animate-in slide-in-from-bottom-5">
          <div className="p-4 border-b border-gray-200 bg-mechanica-moonlight-blue text-white rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <h3 className="text-lg font-semibold">Nudge Coach</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white"
                aria-label="Close chat"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-4 flex-1 overflow-y-auto">
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Welcome back,{' '}
                <span className="font-semibold text-mechanica-moonlight-blue">
                  {user.displayName || user.email || 'Investor'}
                </span>
                !
              </p>
              <p className="text-xs text-gray-500 mt-1 italic">
                Your personal behavioral precision coach is active.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 shadow-sm">
                <p className="text-sm text-gray-700">
                  Ready to optimize your investment execution?
                </p>
              </div>

              {currentFact && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 animate-in fade-in zoom-in duration-300">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">💡</span>
                    <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                      Financial Insight
                    </span>
                  </div>
                  <p className="text-sm text-amber-900 leading-relaxed font-medium italic">
                    &ldquo;{currentFact}&rdquo;
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl space-y-3">
            <button
              onClick={showRandomFact}
              className="w-full bg-mechanica-polished-brass hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors shadow-sm active:transform active:scale-95 flex items-center justify-center space-x-2"
            >
              <span>✨ Get Random Fact</span>
            </button>

            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-mechanica-moonlight-blue focus:border-transparent bg-white"
              />
              <button className="bg-mechanica-moonlight-blue text-white px-3 py-2 rounded-lg text-sm hover:bg-mechanica-moonlight-blue-dark focus:outline-none transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NudgeChatWidget;
