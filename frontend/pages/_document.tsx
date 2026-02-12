import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* Preload critical resources */}
                <link
                    rel="preload"
                    href="/favicon.svg"
                    as="image"
                    type="image/svg+xml"
                />
                {/* Preload critical CSS for better performance */}
                <link
                    rel="preload"
                    href="/_next/static/css/critical.css"
                    as="style"
                    onLoad="this.onload=null;this.rel='stylesheet'"
                />
                <noscript>
                    {/* Fallback for critical CSS when JavaScript is disabled */}
                </noscript>
                {/* Preconnect to external domains */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                {/* DNS prefetch for analytics */}
                <link rel="dns-prefetch" href="//www.google-analytics.com" />
                <link rel="dns-prefetch" href="//www.googletagmanager.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&family=Source+Code+Pro:wght@400;600;700&family=Playfair+Display:wght@400;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
