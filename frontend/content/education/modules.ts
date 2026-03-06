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

// Five-level structure based on the updated curriculum
export const modules: Module[] = [
  {
    id: 'foundational-basics',
    title: 'Level 1: Foundational Basics',
    description:
      'Money fundamentals, budgeting (50/30/20), banking, credit, and saving strategies.',
    badgeId: 'bootcamp_starter',
    lessons: [
      {
        slug: 'money-fundamentals',
        title: 'Money Fundamentals',
        summary: 'Learn what money is and the concept of time value.',
        points: 50,
      },
      {
        slug: 'personal-finance-basics',
        title: 'Personal Finance Basics',
        summary: 'Creating your first budget and tracking habits.',
        points: 50,
      },
    ],
  },
  {
    id: 'intermediate-management',
    title: 'Level 2: Intermediate Management',
    description: 'Debt management, insurance fundamentals, and introduction to investing.',
    badgeId: 'compound_pro',
    lessons: [
      {
        slug: 'debt-management',
        title: 'Debt Management',
        summary: 'Strategic methods to pay down debt safely.',
        points: 50,
      },
      {
        slug: 'insurance-fundamentals',
        title: 'Insurance Fundamentals',
        summary: 'Protecting your assets and earning power.',
        points: 50,
      },
    ],
  },
  {
    id: 'advanced-investing',
    title: 'Level 3: Advanced Investing',
    description: 'Stock market deep dive, retirement planning, real estate, and taxes.',
    badgeId: 'risk_master',
    lessons: [
      {
        slug: 'stock-market-deep-dive',
        title: 'Stock Market Deep Dive',
        summary: 'How exchanges work and different order types.',
        points: 50,
      },
      {
        slug: 'retirement-planning',
        title: 'Retirement Planning',
        summary: '401(k), IRA, and calculating your needs.',
        points: 50,
      },
    ],
  },
  {
    id: 'expert-strategies',
    title: 'Level 4: Expert Strategies',
    description: 'Options, technical analysis, portfolio theory, and estate planning.',
    badgeId: 'expert_architect',
    lessons: [
      {
        slug: 'advanced-vehicles',
        title: 'Advanced Vehicles',
        summary: 'Introduction to options, futures, and alternatives.',
        points: 50,
      },
      {
        slug: 'advanced-portfolio-management',
        title: 'Advanced Portfolio Management',
        summary: 'Modern Portfolio Theory and factor investing.',
        points: 50,
      },
    ],
  },
  {
    id: 'institutional-mastery',
    title: 'Level 5: Institutional Mastery',
    description: 'Quantitative finance, international finance, and wealth preservation.',
    badgeId: 'market_master',
    lessons: [
      {
        slug: 'quantitative-finance',
        title: 'Quantitative Finance',
        summary: 'Monte Carlo simulations and risk modeling.',
        points: 50,
      },
      {
        slug: 'international-finance',
        title: 'International Finance',
        summary: 'Global allocation and currency management.',
        points: 50,
      },
    ],
  },
];
