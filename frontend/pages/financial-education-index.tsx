import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { MechanicaLayout } from '../components/layout/mechanicaLayout';
import { MechanicaCard } from '../components/ui/mechanicaCard';
import { MechanicaButton } from '../components/ui/mechanicaButton';
import { MechanicaGear } from '../components/ui/mechanicaGear';

export default function FinancialEducationIndexPage() {
  return (
    <MechanicaLayout>
      <Head>
        <title>Full Financial Education Index | BeginnerInvestorHub</title>
        <meta
          name="description"
          content="Explore our complete 5-level financial education curriculum, from money fundamentals to institutional investing strategies."
        />
      </Head>

      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header Section */}
        <section className="relative py-20 bg-mechanica-moonlight-blue text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.1) 30px, rgba(255,255,255,0.1) 60px)',
              }}
            />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
            {/* Brand Header with Animation */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-12 text-white mechanica-float">
              <div className="hidden sm:block">
                <MechanicaGear
                  size="large"
                  color="brass"
                  speed="medium"
                  aria-hidden="true"
                />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-serif uppercase tracking-tighter mechanica-title-gold-chrome">
                Global Curriculum
              </h1>
              <div className="hidden sm:block">
                <MechanicaGear
                  size="large"
                  color="brass"
                  speed="reverse"
                  aria-hidden="true"
                />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">
              Financial <span className="text-yellow-500">Curriculum Index</span>
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              At BeginnerInvestorHub, we offer full financial education to empower beginners—from money basics to institutional strategies. 
              Our 5-level journey uses zero-risk simulations for investing practice, ensuring you build confidence safely.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-20">
          <MechanicaCard variant="mechanical" className="p-8 md:p-12 shadow-2xl">
            <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-mechanica-moonlight-blue prose-headings:border-b prose-headings:pb-2 prose-headings:mb-8 prose-p:text-gray-600 prose-li:text-gray-600">
              
              <div className="mb-16 text-center">
                <h2 className="text-3xl font-bold text-mechanica-moonlight-blue uppercase tracking-widest border-yellow-500 border-b-4 inline-block mx-auto">LEVEL 1: FOUNDATIONAL BASICS</h2>
                <div className="grid md:grid-cols-2 gap-8 mt-8 text-left">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-center">Chapter 1: Money Fundamentals</h3>
                    <ul className="list-none space-y-2 pl-0">
                      <li>1.1 What is Money?</li>
                      <li>1.2 Forms of Money (Cash, Digital, Crypto)</li>
                      <li>1.3 Time Value of Money Concept</li>
                      <li>1.4 Inflation and Purchasing Power</li>
                      <li>1.5 Interest Rates Basics</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-center">Chapter 2: Personal Finance Basics</h3>
                    <ul className="list-none space-y-2 pl-0">
                      <li>2.1 Income vs. Expenses</li>
                      <li>2.2 Creating Your First Budget</li>
                      <li>2.3 Tracking Spending Habits</li>
                      <li>2.4 The 50/30/20 Rule</li>
                      <li>2.5 Emergency Fund Essentials</li>
                    </ul>
                  </div>
                  <div className="md:col-span-2 flex flex-wrap justify-center gap-x-12 gap-y-8">
                    <div className="max-w-xs w-full">
                      <h3 className="text-xl font-bold mb-4 text-center">Chapter 3: Banking Fundamentals</h3>
                      <ul className="list-none space-y-2 pl-0 text-left">
                        <li>3.1 Types of Bank Accounts</li>
                        <li>3.2 How to Open a Bank Account</li>
                        <li>3.3 Understanding Bank Fees</li>
                        <li>3.4 ATMs and Debit Cards</li>
                        <li>3.5 Online Banking Basics</li>
                        <li>3.6 FDIC Insurance</li>
                      </ul>
                    </div>
                    <div className="max-w-xs w-full">
                      <h3 className="text-xl font-bold mb-4 text-center">Chapter 4: Credit Basics</h3>
                      <ul className="list-none space-y-2 pl-0 text-left">
                        <li>4.1 What is Credit?</li>
                        <li>4.2 Credit Cards vs. Debit Cards</li>
                        <li>4.3 How Credit Scores Work</li>
                        <li>4.4 Building Credit History</li>
                        <li>4.5 Understanding APR</li>
                        <li>4.6 Avoiding Credit Card Debt</li>
                      </ul>
                    </div>
                    <div className="max-w-xs w-full">
                      <h3 className="text-xl font-bold mb-4 text-center">Chapter 5: Saving Money</h3>
                      <ul className="list-none space-y-2 pl-0 text-left">
                        <li>5.1 Why Saving Matters</li>
                        <li>5.2 Pay Yourself First Principle</li>
                        <li>5.3 High-Yield Savings Accounts</li>
                        <li>5.4 Certificates of Deposit (CDs)</li>
                        <li>5.5 Money Market Accounts</li>
                        <li>5.6 Automating Your Savings</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-16 text-center">
                <h2 className="text-3xl font-bold text-mechanica-moonlight-blue uppercase tracking-widest border-amber-400 border-b-4 inline-block mx-auto">LEVEL 2: INTERMEDIATE MANAGEMENT</h2>
                <div className="grid md:grid-cols-2 gap-8 mt-8 text-left">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-center">Chapter 6: Advanced Budgeting</h3>
                    <ul className="list-none space-y-2 pl-0">
                      <li>6.1 Zero-Based Budgeting</li>
                      <li>6.2 Envelope Method</li>
                      <li>6.3 Budgeting Apps and Tools</li>
                      <li>6.4 Variable vs. Fixed Expenses</li>
                      <li>6.5 Sinking Funds Strategy</li>
                      <li>6.6 Annual Budget Planning</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-center">Chapter 7: Debt Management</h3>
                    <ul className="list-none space-y-2 pl-0">
                      <li>7.1 Types of Debt (Good vs. Bad)</li>
                      <li>7.2 Debt Snowball Method</li>
                      <li>7.3 Debt Avalanche Method</li>
                      <li>7.4 Student Loan Strategies</li>
                      <li>7.5 Mortgage Basics</li>
                      <li>7.6 Debt Consolidation Options</li>
                      <li>7.7 Bankruptcy Consequences</li>
                    </ul>
                  </div>
                  <div className="md:col-span-2 flex flex-wrap justify-center gap-x-12 gap-y-8">
                    <div className="max-w-xs w-full">
                      <h3 className="text-xl font-bold mb-4 text-center">Chapter 8: Credit Mastery</h3>
                      <ul className="list-none space-y-2 pl-0 text-left">
                        <li>8.1 FICO vs. VantageScore</li>
                        <li>8.2 Credit Report Reading</li>
                        <li>8.3 Disputing Credit Errors</li>
                        <li>8.4 Credit Utilization Ratio</li>
                        <li>8.5 Credit Inquiries</li>
                        <li>8.6 Credit Building Strategies</li>
                        <li>8.7 Rewards Optimization</li>
                      </ul>
                    </div>
                    <div className="max-w-xs w-full">
                      <h3 className="text-xl font-bold mb-4 text-center">Chapter 9: Insurance Fundamentals</h3>
                      <ul className="list-none space-y-2 pl-0 text-left">
                        <li>9.1 Why Insurance Matters</li>
                        <li>9.2 Health Insurance Basics</li>
                        <li>9.3 Auto Insurance Essentials</li>
                        <li>9.4 Renters vs. Homeowners</li>
                        <li>9.5 Life Insurance Types</li>
                        <li>9.6 Disability Insurance</li>
                        <li>9.7 Deductibles and Premiums</li>
                      </ul>
                    </div>
                    <div className="max-w-xs w-full">
                      <h3 className="text-xl font-bold mb-4 text-center">Chapter 10: Introduction to Investing</h3>
                      <ul className="list-none space-y-2 pl-0 text-left">
                        <li>10.1 What is Investing?</li>
                        <li>10.2 Risk vs. Return</li>
                        <li>10.3 Compound Interest Power</li>
                        <li>10.4 Investment Account Types</li>
                        <li>10.5 Stocks and Bonds Basics</li>
                        <li>10.6 Index Funds & ETFs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-16 text-center">
                <h2 className="text-3xl font-bold text-mechanica-moonlight-blue uppercase tracking-widest border-amber-400 border-b-4 inline-block mx-auto">LEVEL 3: ADVANCED INVESTING & WEALTH BUILDING</h2>
                <div className="grid md:grid-cols-2 gap-8 mt-8 text-left">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-center">Chapter 11: Stock Market Deep Dive</h3>
                    <ul className="list-none space-y-2 pl-0">
                      <li>11.1 How Stock Markets Work</li>
                      <li>11.2 Stock Exchanges (NYSE, NASDAQ)</li>
                      <li>11.3 Market Orders vs. Limit Orders</li>
                      <li>11.4 Reading Stock Quotes</li>
                      <li>11.5 Bull vs. Bear Markets</li>
                      <li>11.6 Market Capitalization</li>
                      <li>11.7 Dividends & Reinvestment</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-center">Chapter 12: Investment Strategies</h3>
                    <ul className="list-none space-y-2 pl-0">
                      <li>12.1 Dollar-Cost Averaging</li>
                      <li>12.2 Value vs. Growth Principles</li>
                      <li>12.3 Dividend Investing Strategy</li>
                      <li>12.4 Asset Allocation</li>
                      <li>12.5 Portfolio Diversification</li>
                      <li>12.6 Rebalancing Your Portfolio</li>
                      <li>12.7 Buy and Hold Strategy</li>
                    </ul>
                  </div>
                  <div className="md:col-span-2 flex flex-wrap justify-center gap-x-12 gap-y-8">
                    <div className="max-w-xs w-full">
                      <h3 className="text-xl font-bold mb-4 text-center">Chapter 13: Retirement Planning</h3>
                      <ul className="list-none space-y-2 pl-0 text-left">
                        <li>13.1 Retirement Planning Timeline</li>
                        <li>13.2 401(k) Plans Explained</li>
                        <li>13.3 Traditional vs. Roth IRA</li>
                        <li>13.4 SEP IRA and Solo 401(k)</li>
                        <li>13.5 Employer Match Strategies</li>
                        <li>13.6 Calculating Retirement Needs</li>
                        <li>13.7 Social Security Basics</li>
                      </ul>
                    </div>
                    <div className="max-w-xs w-full">
                      <h3 className="text-xl font-bold mb-4 text-center">Chapter 14: Real Estate Investing</h3>
                      <ul className="list-none space-y-2 pl-0 text-left">
                        <li>14.1 Primary Residence as Investment</li>
                        <li>14.2 Rental Property Basics</li>
                        <li>14.3 REITs Explained</li>
                        <li>14.4 House Flipping Fundamentals</li>
                        <li>14.5 Real Estate Crowdfunding</li>
                        <li>14.6 Calculating Real Estate ROI</li>
                        <li>14.7 Tax Benefits of Real Estate</li>
                      </ul>
                    </div>
                    <div className="max-w-xs w-full">
                      <h3 className="text-xl font-bold mb-4 text-center">Chapter 15: Tax Optimization</h3>
                      <ul className="list-none space-y-2 pl-0 text-left">
                        <li>15.1 Tax Filing Basics</li>
                        <li>15.2 Tax Brackets and Marginal Rates</li>
                        <li>15.3 Standard vs. Itemized Deductions</li>
                        <li>15.4 Tax Credits vs. Deductions</li>
                        <li>15.5 Capital Gains Taxes</li>
                        <li>15.6 Tax Loss Harvesting</li>
                        <li>15.7 Tax-Efficient Investing</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-16 text-center">
                <h2 className="text-3xl font-bold text-mechanica-moonlight-blue uppercase tracking-widest border-amber-400 border-b-4 inline-block mx-auto">LEVEL 4: EXPERT STRATEGIES</h2>
                <div className="grid md:grid-cols-2 gap-8 mt-8 text-left">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-center">Chapter 16: Advanced Vehicles</h3>
                    <ul className="list-none space-y-2 pl-0">
                      <li>16.1 Options Trading Basics</li>
                      <li>16.2 Futures Contracts</li>
                      <li>16.3 Forex Trading Fundamentals</li>
                      <li>16.4 Commodities Investing</li>
                      <li>16.5 Private Equity & Hedge Funds</li>
                      <li>16.6 Venture Capital & Angel Investing</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-center">Chapter 17: Technical & Fundamental Analysis</h3>
                    <ul className="list-none space-y-2 pl-0">
                      <li>17.1 Fundamental Analysis Principles</li>
                      <li>17.2 Reading Financial Statements</li>
                      <li>17.3 P/E Ratios and Valuation Metrics</li>
                      <li>17.4 Technical Analysis & Chart Patterns</li>
                      <li>17.5 Moving Averages</li>
                      <li>17.6 RSI and MACD Indicators</li>
                    </ul>
                  </div>
                  <div className="md:col-span-2 flex flex-wrap justify-center gap-x-12 gap-y-8">
                    <div className="max-w-xs w-full">
                      <h3 className="text-xl font-bold mb-4 text-center">Chapter 18: Advanced Portfolio Management</h3>
                      <ul className="list-none space-y-2 pl-0 text-left">
                        <li>18.1 Modern Portfolio Theory</li>
                        <li>18.2 Efficient Frontier</li>
                        <li>18.3 Sharpe Ratio and Risk Metrics</li>
                        <li>18.4 Alpha and Beta Explained</li>
                        <li>18.5 Strategic vs. Tactical Allocation</li>
                        <li>18.6 Hedging Strategies</li>
                      </ul>
                    </div>
                    <div className="max-w-xs w-full">
                      <h3 className="text-xl font-bold mb-4 text-center">Chapter 19: Business & Entrepreneurship</h3>
                      <ul className="list-none space-y-2 pl-0 text-left">
                        <li>19.1 Business Structure (LLC, S-Corp, C-Corp)</li>
                        <li>19.2 Business Plan Financials</li>
                        <li>19.3 Startup Funding Options</li>
                        <li>19.4 Cash Flow Management</li>
                        <li>19.5 Business Credit Building</li>
                        <li>19.6 Valuation Methods</li>
                      </ul>
                    </div>
                    <div className="max-w-xs w-full">
                      <h3 className="text-xl font-bold mb-4 text-center">Chapter 20: Estate Planning</h3>
                      <ul className="list-none space-y-2 pl-0 text-left">
                        <li>20.1 Wills and Testament Basics</li>
                        <li>20.2 Living vs. Testamentary Trusts</li>
                        <li>20.3 Power of Attorney</li>
                        <li>20.4 Healthcare Directives</li>
                        <li>20.5 Beneficiary Designations</li>
                        <li>20.6 Estate Tax Planning</li>
                        <li>20.7 Trust Fund Structures</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-16 text-center">
                <h2 className="text-3xl font-bold text-mechanica-moonlight-blue uppercase tracking-widest border-amber-400 border-b-4 inline-block mx-auto">LEVEL 5: INSTITUTIONAL MASTERY</h2>
                <div className="grid md:grid-cols-2 gap-8 mt-8 text-left">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-center">Chapter 21: Advanced Derivatives</h3>
                    <ul className="list-none space-y-2 pl-0">
                      <li>21.1 Options Greeks (Delta, Theta, etc.)</li>
                      <li>21.2 Futures Hedging Mechanics</li>
                      <li>21.3 Interest Rate & Currency Swaps</li>
                      <li>21.4 Credit Default Swaps (CDS)</li>
                      <li>21.5 Volatility Modeling (VIX)</li>
                      <li>21.6 Value at Risk (VaR) Modeling</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-center">Chapter 22: Quantitative Finance</h3>
                    <ul className="list-none space-y-2 pl-0">
                      <li>22.1 Monte Carlo Simulations</li>
                      <li>22.2 Black-Scholes Model</li>
                      <li>22.3 Algorithmic Trading Basics</li>
                      <li>22.4 Machine Learning in Finance</li>
                      <li>22.5 Risk Parity Strategies</li>
                    </ul>
                  </div>
                  <div className="md:col-span-2 flex flex-wrap justify-center gap-x-12 gap-y-8">
                    <div className="max-w-xs w-full">
                      <h3 className="text-xl font-bold mb-4 text-center">Chapter 23: Fixed Income Advanced</h3>
                      <ul className="list-none space-y-2 pl-0 text-left">
                        <li>23.1 Bond Duration and Convexity</li>
                        <li>23.2 Yield Curve Analysis</li>
                        <li>23.3 Bond Laddering Strategies</li>
                        <li>23.4 Mortgage-Backed Securities</li>
                        <li>23.5 Asset-Backed Securities</li>
                        <li>23.6 Credit Analysis and Ratings</li>
                      </ul>
                    </div>
                    <div className="max-w-xs w-full">
                      <h3 className="text-xl font-bold mb-4 text-center">Chapter 24: International Finance</h3>
                      <ul className="list-none space-y-2 pl-0 text-left">
                        <li>24.1 Currency Exchange Fundamentals</li>
                        <li>24.2 Global Asset Allocation</li>
                        <li>24.3 Emerging Markets Investing</li>
                        <li>24.4 Geopolitical Risk Assessment</li>
                        <li>24.5 Cross-Border Tax Considerations</li>
                      </ul>
                    </div>
                    <div className="max-w-xs w-full">
                      <h3 className="text-xl font-bold mb-4 text-center">Chapter 25+: Wealth Preservation</h3>
                      <ul className="list-none space-y-2 pl-0 text-left">
                        <li>25.1 Institutional Portfolio Management</li>
                        <li>26.1 Blockchain & Digital Assets</li>
                        <li>27.1 Behavioral Finance & Psychology</li>
                        <li>28.1 Economic Theory & Markets</li>
                        <li>29.1 Advanced Tax Strategies</li>
                        <li>30.1 Multi-Generational Wealth</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-20 p-8 bg-gray-100 rounded-xl border-l-4 border-yellow-500 text-center">
                <h2 className="text-2xl font-bold mb-4 border-none pb-0">Ready to Begin Your Journey?</h2>
                <p className="mb-6">
                  Join the first 1000 Founderlings to get early access to our full curriculum and AI-powered simulation tools.
                </p>
                <div className="flex justify-center">
                  <Link href="/signup">
                    <MechanicaButton variant="brass" size="lg">
                      Begin Your Apprenticeship
                    </MechanicaButton>
                  </Link>
                </div>
              </div>

            </div>
          </MechanicaCard>
        </div>
      </div>
    </MechanicaLayout>
  );
}
