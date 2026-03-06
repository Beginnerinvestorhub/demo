export interface Lesson {
  slug: string;
  title: string;
  videoUrl?: string;
  summary: string;
  points: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  badgeId: string;
  lessons: Lesson[];
}

// Five-level structure based on the updated curriculum (30 Chapters Total, 6 per Level)
export const modules: Module[] = [
  {
    id: 'foundational-basics',
    title: 'Level 1: Foundational Basics',
    description:
      'Money fundamentals, budgeting (50/30/20), banking, credit, and saving strategies.',
    badgeId: 'bootcamp_starter',
    lessons: [
      { slug: 'chapter-1', title: 'Chapter 1: Money Fundamentals', summary: '1.1-1.5: What is Money, TVM, Inflation, Interest.', points: 50 },
      { slug: 'chapter-2', title: 'Chapter 2: Personal Finance Basics', summary: '2.1-2.5: Income/Expenses, Creating a Budget, 50/30/20 Rule.', points: 50 },
      { slug: 'chapter-3', title: 'Chapter 3: Banking Fundamentals', summary: '3.1-3.6: Account Types, Opening Accounts, Fees, FDIC.', points: 50 },
      { slug: 'chapter-4', title: 'Chapter 4: Credit Basics', summary: '4.1-4.6: Credit vs Debit, Scores, History, APR.', points: 50 },
      { slug: 'chapter-5', title: 'Chapter 5: Saving Money', summary: '5.1-5.6: HYSA, CDs, Automation, Emergency Funds.', points: 50 },
      { slug: 'chapter-6', title: 'Chapter 6: Advanced Budgeting', summary: '6.1-6.6: Zero-Based, Envelope Method, Sinking Funds.', points: 50 },
    ],
  },
  {
    id: 'intermediate-management',
    title: 'Level 2: Intermediate Management',
    description: 'Debt management, insurance fundamentals, and introduction to investing.',
    badgeId: 'compound_pro',
    lessons: [
      { slug: 'chapter-7', title: 'Chapter 7: Debt Management', summary: '7.1-7.7: Snowball/Avalanche, Consolidation, Bankruptcy.', points: 50 },
      { slug: 'chapter-8', title: 'Chapter 8: Credit Mastery', summary: '8.1-8.7: FICO vs Vantage, Report Reading, Disputes.', points: 50 },
      { slug: 'chapter-9', title: 'Chapter 9: Insurance Fundamentals', summary: '9.1-9.7: Health, Auto, Life, Disability, Deductibles.', points: 50 },
      { slug: 'chapter-10', title: 'Chapter 10: Intro to Investing', summary: '10.1-10.9: Risk/Return, Compounding, Stocks/Bonds/ETFs.', points: 50 },
      { slug: 'chapter-11', title: 'Chapter 11: Stock Market Deep Dive', summary: '11.1-11.8: Exchanges, Orders, Quotes, Dividends.', points: 50 },
      { slug: 'chapter-12', title: 'Chapter 12: Investment Strategies', summary: '12.1-12.9: DCA, Value/Growth, Rebalancing, Buy & Hold.', points: 50 },
    ],
  },
  {
    id: 'advanced-investing',
    title: 'Level 3: Advanced Investing',
    description: 'Retirement planning, real estate, taxes, and advanced analysis.',
    badgeId: 'risk_master',
    lessons: [
      { slug: 'chapter-13', title: 'Chapter 13: Retirement Planning', summary: '13.1-13.10: 401(k), IRA, SS, RMDs, Withdrawal.', points: 50 },
      { slug: 'chapter-14', title: 'Chapter 14: Real Estate Investing', summary: '14.1-14.9: Ownership, REITs, ROI, Tax Benefits.', points: 50 },
      { slug: 'chapter-15', title: 'Chapter 15: Tax Optimization', summary: '15.1-15.10: Brackets, Deductions, Capital Gains, Harvesting.', points: 50 },
      { slug: 'chapter-16', title: 'Chapter 16: Advanced Vehicles', summary: '16.1-16.9: Options, Futures, Forex, Private Equity, VC.', points: 50 },
      { slug: 'chapter-17', title: 'Chapter 17: Technical & Fundamental', summary: '17.1-17.9: Financials, Ratios, Chart Patterns, RSI/MACD.', points: 50 },
      { slug: 'chapter-18', title: 'Chapter 18: Advanced Portfolio Mgmt', summary: '18.1-18.8: MPT, Efficient Frontier, Sharpe, Alpha/Beta.', points: 50 },
    ],
  },
  {
    id: 'expert-strategies',
    title: 'Level 4: Expert Strategies',
    description: 'Business finance, estate planning, and institutional modeling.',
    badgeId: 'expert_architect',
    lessons: [
      { slug: 'chapter-19', title: 'Chapter 19: Business & Entrepreneurship', summary: '19.1-19.10: LLC/Corp, Funding, Cash Flow, Valuation.', points: 50 },
      { slug: 'chapter-20', title: 'Chapter 20: Estate Planning', summary: '20.1-20.10: Wills, Trusts, POA, Wealth Transfer.', points: 50 },
      { slug: 'chapter-21', title: 'Chapter 21: Derivatives & Risk', summary: '21.1-21.9: Greeks, Hedging, Swaps, CDS, VaR.', points: 50 },
      { slug: 'chapter-22', title: 'Chapter 22: Quantitative Finance', summary: '22.1-22.9: Monte Carlo, Black-Scholes, Algo Trading, ML.', points: 50 },
      { slug: 'chapter-23', title: 'Chapter 23: Fixed Income Advanced', summary: '23.1-23.9: Duration, Convexity, Yield Curve, ABS/CDO.', points: 50 },
      { slug: 'chapter-24', title: 'Chapter 24: International Finance', summary: '24.1-24.9: FX, Emerging Markets, Cross-Border Tax.', points: 50 },
    ],
  },
  {
    id: 'institutional-mastery',
    title: 'Level 5: Institutional Mastery',
    description: 'Macroeconomics, behavioral finance, and wealth preservation.',
    badgeId: 'market_master',
    lessons: [
      { slug: 'chapter-25', title: 'Chapter 25: Institutional Mgmt', summary: '25.1-25.9: Pensions, Endowments, SWFs, Attribution.', points: 50 },
      { slug: 'chapter-26', title: 'Chapter 26: Crypto & Digital Assets', summary: '26.1-26.10: Blockchain, DeFi, NFTs, Regulation.', points: 50 },
      { slug: 'chapter-27', title: 'Chapter 27: Behavioral Finance', summary: '27.1-27.10: Biases, Market Bubbles, Discipline.', points: 50 },
      { slug: 'chapter-28', title: 'Chapter 28: Economic Theory', summary: '28.1-28.10: Macro, Fed, Fiscal/Monetary, Crises.', points: 50 },
      { slug: 'chapter-29', title: 'Chapter 29: Advanced Tax Strategies', summary: '29.1-29.10: Trusts, 1031, Offshore, Audit Defense.', points: 50 },
      { slug: 'chapter-30', title: 'Chapter 30: Wealth & Legacy', summary: '30.1-30.10: Multi-Gen Planning, Family Office, ESG.', points: 50 },
    ],
  },
];
