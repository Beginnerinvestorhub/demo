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

  // Feature flags are now passed via pageProps from server-side
  const featureFlags = pageProps.featureFlags || {
    newFeature: false,
    betaAccess: false,
    enableTrading: false,
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
          <Component {...pageProps} />
        </FeatureFlagContext.Provider>
      </div>

      {/* Loading overlay for route changes */}
      {pageLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-xl">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mechanica-moonlight-blue"></div>
            <span className="ml-2 text-gray-600">Loading...</span>
          </div>
        </div>
      )}
      
      {/* Vercel Analytics and SpeedInsights */}
      <Analytics />
      <SpeedInsights />
    </>
  )
}

// Fetch feature flags server-side using getInitialProps
MyApp.getInitialProps = async () => {
  try {
    // Use absolute URL in production, localhost in development
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://beginnerinvestorhub-demo.vercel.app' 
      : 'http://localhost:3000';
    
    const res = await fetch(`${baseUrl}/api/feature-flags`);
    
    if (!res.ok) {
      console.error('Failed to fetch feature flags:', res.statusText);
      return {
        pageProps: {
          featureFlags: {
            newFeature: false,
            betaAccess: false,
            enableTrading: false,
          }
        }
      };
    }

    const featureFlags = await res.json();
    
    return {
      pageProps: {
        featureFlags
      }
    };
  } catch (error) {
    console.error('Error fetching feature flags:', error);
    return {
      pageProps: {
        featureFlags: {
          newFeature: false,
          betaAccess: false,
          enableTrading: false,
        }
      }
    };
  }
};

export default MyApp
