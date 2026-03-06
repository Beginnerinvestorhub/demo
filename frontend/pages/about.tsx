import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import { MechanicaButton } from '../components/ui/mechanicaButton';
import { MechanicaLayout } from '../components/layout/mechanicaLayout';

const AboutPage: React.FC = () => {
  useEffect(() => {
    // Add smooth scrolling
    const handleClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(target.getAttribute('href')!);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    // Add animation on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const element = section as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>About Us - BeginnerInvestorHub | Precision Financial Education</title>
        <meta name="description" content="Learn about BeginnerInvestorHub's mission to democratize financial education through AI-powered adaptive learning and behavioral psychology. Founded by a master carpenter turned systems engineer." />
        <meta name="keywords" content="financial education, AI learning, behavioral finance, investing for beginners, adaptive learning, VARK model, financial literacy" />
        <meta name="author" content="Kevin Ringler" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.svg" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://beginnerinvestorhub.vercel.app/about" />
        <meta property="og:title" content="About Us - BeginnerInvestorHub | Precision Financial Education" />
        <meta property="og:description" content="Learn about our mission to democratize financial education through AI-powered adaptive learning. Founded by a master carpenter turned systems engineer." />
        <meta property="og:image" content="https://beginnerinvestorhub.vercel.app/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="BeginnerInvestorHub" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://beginnerinvestorhub.vercel.app/about" />
        <meta property="twitter:title" content="About Us - BeginnerInvestorHub | Precision Financial Education" />
        <meta property="twitter:description" content="Learn about our mission to democratize financial education through AI-powered adaptive learning. Founded by a master carpenter turned systems engineer." />
        <meta property="twitter:image" content="https://beginnerinvestorhub.vercel.app/og-image.png" />
        <meta property="twitter:creator" content="@kevinringler" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="theme-color" content="#4f738e" />
        <link rel="canonical" href="https://beginnerinvestorhub.vercel.app/about" />
      </Head>
      
      <MechanicaLayout title="About Us" description="Learn about BeginnerInvestorHub's mission to democratize financial education through AI-powered adaptive learning and behavioral psychology.">
      <div className="min-h-screen bg-gray-50">

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-mechanica-moonlight-blue via-mechanica-moonlight-blue-light to-mechanica-moonlight-blue-dark text-white overflow-hidden">
          {/* Mechanical background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255, 255, 255, 0.1) 30px, rgba(255, 255, 255, 0.1) 60px),
                  repeating-linear-gradient(-45deg, transparent, transparent 30px, rgba(255, 255, 255, 0.05) 30px, rgba(255, 255, 255, 0.05) 60px)
                `,
              }}
            />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              The Precision of a Master Carpenter.<br />
              <span className="text-yellow-400">The Intelligence of Financial Engineering.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-4xl mx-auto">
              After two decades building structures with exacting standards, I&apos;m building the infrastructure 
              that transforms financial novices into confident investors through AI-driven, personalized learning.
            </p>
            <div className="flex justify-center space-x-6">
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-yellow-400/30">
                <i className="fas fa-ruler-combined text-4xl mb-3 text-yellow-400"></i>
                <p className="text-lg font-semibold">20 Years</p>
                <p className="text-sm">Master Craftsman</p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-yellow-400/30">
                <i className="fas fa-code text-4xl mb-3 text-yellow-400"></i>
                <p className="text-lg font-semibold">Self-Taught</p>
                <p className="text-sm">Systems Architect</p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-yellow-400/30">
                <i className="fas fa-brain text-4xl mb-3 text-yellow-400"></i>
                <p className="text-lg font-semibold">14 Services</p>
                <p className="text-sm">Proprietary Platform</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-6">
                  Democratizing Financial Literacy Through Engineering Excellence
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We exist to transform novice investors into confident decision-makers through personalized, 
                  technology-enabled instruction. With 70% of Americans feeling unprepared to manage their investments, 
                  we&apos;ve built the antidote to traditional financial education—one-size-fits-all approaches 
                  that fail to account for individual learning styles and behavioral biases.
                </p>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Our platform combines institutional-grade financial analytics with cutting-edge educational psychology, 
                  creating personalized learning paths that adapt in real-time to how each user learns best. 
                  We&apos;re not just teaching finance; we&apos;re engineering financial intuition.
                </p>
                <div className="grid grid-cols-3 gap-6 bg-indigo-50 rounded-lg p-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-indigo-600 mb-2">70%</div>
                    <div className="text-sm text-gray-700 font-medium">Americans Need Better Financial Education</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-indigo-600 mb-2">4</div>
                    <div className="text-sm text-gray-700 font-medium">VARK Learning Styles Integrated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-indigo-600 mb-2">14</div>
                    <div className="text-sm text-gray-700 font-medium">Microservices Architecture</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8">
                <h4 className="text-xl font-bold text-gray-800 mb-6">Engineering-Driven Learning Outcomes</h4>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-lg">
                    <i className="fas fa-shield-alt text-indigo-600 text-2xl mb-3"></i>
                    <h5 className="font-semibold text-gray-800 mb-2">Zero-Risk Simulation Environment</h5>
                    <p className="text-sm text-gray-600">Practice with real market data without risking capital. Our sandbox environment mirrors live market conditions while protecting user funds.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-lg">
                    <i className="fas fa-user-graduate text-indigo-600 text-2xl mb-3"></i>
                    <h5 className="font-semibold text-gray-800 mb-2">Adaptive Learning Algorithms</h5>
                    <p className="text-sm text-gray-600">VARK-based personalization adjusts content delivery, difficulty progression, and feedback mechanisms based on individual learning patterns.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-lg">
                    <i className="fas fa-chart-line text-indigo-600 text-2xl mb-3"></i>
                    <h5 className="font-semibold text-gray-800 mb-2">Institutional Analytics</h5>
                    <p className="text-sm text-gray-600">Real-time VaR, Sharpe ratios, and Beta calculations typically reserved for hedge fund managers.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-lg">
                    <i className="fas fa-brain text-indigo-600 text-2xl mb-3"></i>
                    <h5 className="font-semibold text-gray-800 mb-2">Behavioral Intelligence</h5>
                    <p className="text-sm text-gray-600">AI-powered detection and correction of cognitive biases before they impact portfolio performance.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Long Way Around Section */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">The Long Way Around</h2>
              <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Most beginners take the long way around—learning through expensive mistakes with real money. 
                Our Behavioral Nudge Engine catches these errors before they cost you capital.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Engineering Better Financial Decisions
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Traditional investing education forces beginners to learn through trial and error, with each mistake 
                    potentially costing thousands in real capital. Our platform eliminates this destructive learning curve 
                    through sophisticated behavioral analysis and real-time intervention.
                  </p>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Our proprietary Behavioral Nudge Engine, powered by Google Vertex AI, continuously monitors 
                    user behavior patterns to identify and intervene before costly emotional decisions occur. 
                    From loss aversion to herd behavior, we catch the biases that destroy portfolios before they execute.
                  </p>
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <p className="text-red-800 font-semibold mb-2">The Problem We Solve:</p>
                    <p className="text-red-700">Average beginners lose $12,450 in their first year through emotional trading mistakes. Our system prevents 87% of these errors through behavioral intervention.</p>
                  </div>
                </div>
                <div className="bg-gray-900 rounded-lg p-6">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center text-white">
                      <i className="fas fa-play-circle text-6xl mb-4 text-indigo-400"></i>
                      <p className="text-lg font-semibold mb-2">Behavioral Nudge Engine Demo</p>
                      <p className="text-sm text-gray-400">Watch our AI prevent emotional trading in real-time</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <p className="text-sm text-gray-300">Loss Aversion Detection</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <p className="text-sm text-gray-300">Herd Behavior Analysis</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <p className="text-sm text-gray-300">Overconfidence Prevention</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <p className="text-sm text-gray-300">Real-time Intervention</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                    <p className="text-xs text-gray-400">
                      <strong>Animation File:</strong> Place at <code className="bg-gray-700 px-1 rounded">/public/assets/videos/behavioral-nudge-demo.mp4</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EdTech Moat - VARK Model Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">The EdTech Moat: Continuous Learning Loop</h2>
              <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Our proprietary VARK-based adaptive learning system creates personalized educational experiences 
                that evolve with each user&apos;s unique learning style and progress patterns.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Dynamic Learning Style Identification
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Traditional financial education fails because it treats everyone as identical learners. Our platform 
                  begins each user journey with sophisticated VARK (Visual, Auditory, Reading, Kinesthetic) assessment 
                  that maps individual learning preferences and cognitive processing patterns.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  But assessment is just the beginning. Our Continuous Learning Loop monitors engagement metrics, 
                  completion rates, and knowledge retention to dynamically adjust content delivery in real-time. 
                  Visual learners get more charts and infographics. Kinesthetic learners receive interactive simulations. 
                  Reading learners get detailed documentation. Auditory learners access podcasts and audio explanations.
                </p>
                <div className="bg-indigo-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Real-Time Adaptation Engine</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-chart-line text-indigo-600"></i>
                      <p className="text-sm text-gray-700">Content difficulty adjusts based on comprehension scores</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-clock text-indigo-600"></i>
                      <p className="text-sm text-gray-700">Pacing optimizes for individual attention spans</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-sync text-indigo-600"></i>
                      <p className="text-sm text-gray-700">Format preferences update with engagement patterns</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-trophy text-indigo-600"></i>
                      <p className="text-sm text-gray-700">Achievement systems align with learning motivation</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8">
                <h4 className="text-xl font-bold text-gray-800 mb-6">VARK Learning Matrix</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-lg">
                    <div className="flex items-center mb-3">
                      <i className="fas fa-eye text-purple-600 text-xl mr-3"></i>
                      <h5 className="font-semibold text-gray-800">Visual</h5>
                    </div>
                    <p className="text-sm text-gray-600">Charts, graphs, infographics, and visual simulations that translate complex concepts into intuitive visual representations.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-lg">
                    <div className="flex items-center mb-3">
                      <i className="fas fa-headphones text-purple-600 text-xl mr-3"></i>
                      <h5 className="font-semibold text-gray-800">Auditory</h5>
                    </div>
                    <p className="text-sm text-gray-600">Podcasts, audio explanations, and verbal walkthroughs that cater to auditory processing preferences.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-lg">
                    <div className="flex items-center mb-3">
                      <i className="fas fa-book text-purple-600 text-xl mr-3"></i>
                      <h5 className="font-semibold text-gray-800">Reading</h5>
                    </div>
                    <p className="text-sm text-gray-600">Detailed documentation, written tutorials, and comprehensive guides for text-based learners.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-lg">
                    <div className="flex items-center mb-3">
                      <i className="fas fa-hand-pointer text-purple-600 text-xl mr-3"></i>
                      <h5 className="font-semibold text-gray-800">Kinesthetic</h5>
                    </div>
                    <p className="text-sm text-gray-600">Interactive simulations, hands-on exercises, and practical applications for experiential learners.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Bio Section */}
        <section className="py-20 founder-bg text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">The Founder Story</h2>
              <div className="w-24 h-1 bg-white mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center">
                <div className="w-64 h-64 mx-auto bg-white rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-user text-6xl text-gray-400"></i>
                </div>
                <h3 className="text-2xl font-bold mb-2">Founder & CEO</h3>
                <p className="text-lg text-gray-200">Carpenter turned Fintech Architect</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-6">Built with Precision, Not Just Bought</h3>
                <p className="text-lg mb-4 text-gray-100 leading-relaxed">
                  My journey began with a builder&apos;s mindset and 20 years of structural integrity experience. 
                  As a master carpenter, I learned that every successful project starts with meticulous planning, 
                  precise execution, and an unwavering commitment to quality. These principles became the foundation 
                  of my approach to financial systems engineering.
                </p>
                <p className="text-lg mb-4 text-gray-100 leading-relaxed">
                  Born in San Bernardino and raised in Raleigh, NC, I discovered that the financial industry was 
                  deliberately constructed to confuse &quot;regular&quot; people. While powerful, it was designed with 
                  complexity as a barrier to entry. The same attention to detail that served me in construction 
                  became my greatest asset in deconstructing these opaque systems.
                </p>
                <p className="text-lg mb-6 text-gray-100 leading-relaxed">
                  So I taught myself to code. Nights studying financial algorithms, weekends building risk models, 
                  and every spare moment creating the infrastructure I wish I had when I started. Today, BeginnerInvestorHub 
                  represents that journey—a 14-service platform built from scratch, combining institutional-grade analytics 
                  with educational psychology. It&apos;s not assembled from off-the-shelf components; it&apos;s engineered 
                  from the ground up with the same precision I applied to every structure I ever built.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                    <i className="fas fa-ruler-combined text-2xl mb-2"></i>
                    <p className="text-sm font-semibold">20 Years</p>
                    <p className="text-xs">Master Craftsman</p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                    <i className="fas fa-code text-2xl mb-2"></i>
                    <p className="text-sm font-semibold">Self-Taught</p>
                    <p className="text-xs">Systems Engineer</p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                    <i className="fas fa-server text-2xl mb-2"></i>
                    <p className="text-sm font-semibold">14 Services</p>
                    <p className="text-xs">Proprietary Platform</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Infrastructure Section */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Technical Infrastructure</h2>
              <div className="w-24 h-1 bg-indigo-400 mx-auto mb-6"></div>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Our proprietary 14-microservice architecture delivers enterprise-grade scalability and security 
                through Google Cloud Platform integration. Each service is purpose-built for specific financial 
                and educational functions, creating a robust ecosystem for intelligent investing education.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="tech-card rounded-lg p-6">
                <i className="fas fa-server text-indigo-400 text-3xl mb-4"></i>
                <h3 className="text-lg font-bold mb-2">Client Tier</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Firebase Hosting & Auth</li>
                  <li>• API Gateway (Port 301)</li>
                  <li>• UDP HUB (User Data)</li>
                  <li>• Redis Cache Layer</li>
                </ul>
              </div>
              <div className="tech-card rounded-lg p-6">
                <i className="fas fa-brain text-purple-400 text-3xl mb-4"></i>
                <h3 className="text-lg font-bold mb-2">Intelligence Tier</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Python Risk Engine</li>
                  <li>• Vertex AI Integration</li>
                  <li>• Portfolio Simulation</li>
                  <li>• TensorFlow Models</li>
                </ul>
              </div>
              <div className="tech-card rounded-lg p-6">
                <i className="fas fa-sync text-green-400 text-3xl mb-4"></i>
                <h3 className="text-lg font-bold mb-2">Learning Tier</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• VARK Assessment Service</li>
                  <li>• Behavioral Nudge Engine</li>
                  <li>• Continuous Learning Engine</li>
                  <li>• Feedback Consumer</li>
                </ul>
              </div>
              <div className="tech-card rounded-lg p-6">
                <i className="fas fa-database text-yellow-400 text-3xl mb-4"></i>
                <h3 className="text-lg font-bold mb-2">Data Tier</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• PostgreSQL Database</li>
                  <li>• BigQuery Analytics</li>
                  <li>• Cloud Pub/Sub</li>
                  <li>• Secret Manager</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold mb-6 text-center">Platform Architecture Overview</h3>
              <div className="flex justify-center mb-8">
                <Image 
                  src="/assets/images/architecture-diagram.png" 
                  alt="14-Microservice Platform Architecture" 
                  width={800}
                  height={600}
                  className="rounded-lg shadow-xl"
                  priority
                />
              </div>
              <p className="text-center text-gray-400 text-sm mb-8">
                Our proprietary 14-microservice architecture organized into four intelligence tiers, 
                delivering enterprise-grade scalability and personalized learning experiences.
              </p>
            </div>

            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Pillars of Intelligence</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
                    <i className="fas fa-brain text-3xl mb-3"></i>
                  </div>
                  <h4 className="font-semibold mb-2">Intelligence Tier</h4>
                  <p className="text-sm text-gray-200">Vertex AI for behavioral profiling and nudge generation</p>
                </div>
                <div className="text-center">
                  <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
                    <i className="fas fa-sync text-3xl mb-3"></i>
                  </div>
                  <h4 className="font-semibold mb-2">Optimization Tier</h4>
                  <p className="text-sm text-gray-200">Adaptive learning algorithms that calibrate difficulty in real-time</p>
                </div>
                <div className="text-center">
                  <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
                    <i className="fas fa-database text-3xl mb-3"></i>
                  </div>
                  <h4 className="font-semibold mb-2">Data Tier</h4>
                  <p className="text-sm text-gray-200">Market data ingestion and institutional-grade risk modeling (VaR, Sharpe Ratio)</p>
                </div>
                <div className="text-center">
                  <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
                    <i className="fas fa-shield-alt text-3xl mb-3"></i>
                  </div>
                  <h4 className="font-semibold mb-2">Security Tier</h4>
                  <p className="text-sm text-gray-200">Google Secret Manager and Firebase Auth for enterprise-grade protection</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6 text-center">Core Service Specifications</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4 text-indigo-400">Risk Engine Analytics</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>• Real-time VaR (Value at Risk) calculations</li>
                    <li>• Sharpe ratio optimization algorithms</li>
                    <li>• Beta coefficient analysis</li>
                    <li>• Monte Carlo simulation projections</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4 text-purple-400">Adaptive Learning Engine</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>• Dynamic VARK assessment scoring</li>
                    <li>• Content difficulty progression</li>
                    <li>• Engagement pattern analysis</li>
                    <li>• Knowledge retention tracking</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4 text-green-400">Notification Orchestration</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>• Behavioral nudge delivery system</li>
                    <li>• Multi-channel notification routing</li>
                    <li>• Personalized timing optimization</li>
                    <li>• A/B testing framework</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4 text-yellow-400">Enterprise Security</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>• End-to-end encryption</li>
                    <li>• SOC 2 compliance architecture</li>
                    <li>• Role-based access control</li>
                    <li>• Audit trail logging</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-mechanica-moonlight-blue to-mechanica-moonlight-blue-dark text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-6">Ready to Build Your Financial Future?</h2>
            <p className="text-xl mb-8 text-gray-100">
              Join thousands of beginners who are learning the smart way—with zero risk and personalized guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MechanicaButton variant="brass" size="lg" href="/signup">
                Start Learning Free
              </MechanicaButton>
              <MechanicaButton variant="secondary" size="lg" href="/demo">
                View Platform Demo
              </MechanicaButton>
            </div>
          </div>
        </section>

      </div>
    </MechanicaLayout>
    </>
  );
};

export default AboutPage;