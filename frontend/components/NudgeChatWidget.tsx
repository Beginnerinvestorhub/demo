// components/NudgeChatWidget.tsx
'use client';

import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const NudgeChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useAuth();

  // Only show widget if user is authenticated
  if (loading) {
    return null; // Still loading, don't show anything
  }

  if (!user) {
    return null; // User not authenticated, don't show widget
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-mechanica-moonlight-blue hover:bg-mechanica-moonlight-blue-dark text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-mechanica-moonlight-blue focus:ring-offset-2"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        aria-expanded={isOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
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
        <div className="fixed bottom-24 right-8 w-80 h-96 bg-white rounded-xl shadow-2xl z-50 border border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-mechanica-moonlight-blue text-white rounded-t-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Nudge Coach
              </h3>
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

          <div className="p-4 h-80 overflow-y-auto flex-1">
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Welcome back,{' '}
                <span className="font-medium text-mechanica-moonlight-blue">
                  {user.displayName || user.email || 'Investor'}
                </span>
                !
              </p>
              <p className="text-sm text-gray-500 mt-1">
                I am your personal behavioral coach.
              </p>
            </div>

            {/* Chat messages would go here */}
            <div className="space-y-3">
              <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                <p className="text-sm text-gray-700">
                  Ready to analyze your latest portfolio moves?
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-mechanica-moonlight-blue focus:border-transparent"
              />
              <button className="bg-mechanica-moonlight-blue text-white px-4 py-2 rounded-lg text-sm hover:bg-mechanica-moonlight-blue-dark focus:outline-none focus:ring-2 focus:ring-mechanica-moonlight-blue focus:ring-offset-2">
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
