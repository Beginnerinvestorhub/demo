// pages/_app.tsx

import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
// Import Google Font Inter
import { Inter } from 'next/font/google';

// Initialize Inter font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Font variables using Inter
const fontVariables = {
  '--font-inter': inter.style.fontFamily,
};

// Define Feature Flags type
interface FeatureFlags {
  [key: string]: boolean;
}

// Create Feature Flag Context
const FeatureFlagContext = createContext<FeatureFlags>({});

// Custom hook to use feature flags
export const useFeatureFlags = () => useContext(FeatureFlagContext);

// Import critical CSS immediately
import '../styles/critical.css'

import '../styles/mechanica-design-system.css'

function MyApp({
  Component,
  pageProps
}: AppProps) {
  const router = useRouter()
  const [pageLoading, setPageLoading] = useState(false)

  // Load non-critical CSS after initial render
  useEffect(() => {
    // CSS is now statically imported above
  }, [])

  // Handle route changes for loading states
  useEffect(() => {
    const handleStart = () => setPageLoading(true)
    const handleComplete = () => setPageLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>({});
  const [flagsLoading, setFlagsLoading] = useState(true);

  useEffect(() => {
    const fetchFeatureFlags = async () => {
      try {
        const response = await fetch('/api/feature-flags');
        if (response.ok) {
          const data = await response.json();
          setFeatureFlags(data);
        } else {
          console.error('Failed to fetch feature flags:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching feature flags:', error);
      } finally {
        setFlagsLoading(false);
      }
    };

    fetchFeatureFlags();
  }, []);

  if (flagsLoading) {
    return (
      <div className="global-loading">
        <div className="loading-spinner">Loading Feature Flags...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0070f3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Wrap with FeatureFlagContext.Provider */}
      <div style={fontVariables as React.CSSProperties}>
        <FeatureFlagContext.Provider value={featureFlags}>
          {/* Global loading indicator */}
          {pageLoading && (
            <div className="global-loading">
              <div className="loading-spinner">Loading...</div>
            </div>
          )}

          {/* Main app content */}
          <div className={`app-wrapper ${pageLoading ? 'page-transitioning' : ''}`}>
            <Component {...pageProps} />
          </div>

          {/* Portal containers for modals/notifications */}
          <div id="modal-root" />
          <div id="notification-root" />
        </FeatureFlagContext.Provider>
      </div>
    </>
  )
}

export default MyApp
