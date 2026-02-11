// pages/_app.tsx

import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import Head from 'next/head'
// Import Google Font Inter
import { Inter } from 'next/font/google';
// Import Vercel Analytics and SpeedInsights
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
// Import AuthProvider
import { AuthProvider } from '../hooks/useAuth'

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

// Feature Flags Interface
interface FeatureFlags {
  newFeature: boolean;
  betaAccess: boolean;
  enableTrading: boolean;
}

// Create Feature Flag Context
const FeatureFlagContext = createContext<FeatureFlags>({
  newFeature: false,
  betaAccess: false,
  enableTrading: false,
});

// Custom hook to use feature flags
export const useFeatureFlags = () => useContext(FeatureFlagContext);

// Import critical CSS immediately
import '../styles/critical.css'

import '../styles/mechanica-design-system.css'

// Default feature flags (no server fetch needed for demo)
const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  newFeature: true,
  betaAccess: false,
  enableTrading: true,
};

function MyApp({
  Component,
  pageProps
}: AppProps) {
  const router = useRouter()
  const [pageLoading, setPageLoading] = useState(false)

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

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0070f3" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>

      {/* Wrap with AuthProvider and FeatureFlagContext.Provider */}
      <div style={fontVariables as React.CSSProperties}>
        <AuthProvider>
          <FeatureFlagContext.Provider value={DEFAULT_FEATURE_FLAGS}>
            <Component {...pageProps} />
          </FeatureFlagContext.Provider>
        </AuthProvider>
      </div>

      {/* Loading overlay for route changes */}
      {pageLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-xl flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mechanica-moonlight-blue"></div>
            <span className="text-gray-600">Loading...</span>
          </div>
        </div>
      )}

      {/* Vercel Analytics and SpeedInsights with error handling */}
      {process.env.NODE_ENV === 'production' && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}
    </>
  )
}

export default MyApp
