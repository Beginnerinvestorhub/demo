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

// Initial three modules with placeholder lessons
export const modules: Module[] = [
  {
    id: 'stocks-101',
    title: 'What Is a Stock?',
    description:
      'A simple introduction to what it means to own a piece of a company.',
    badgeId: 'bootcamp_starter',
    lessons: [
      {
        slug: 'stocks-overview',
        title: 'Stocks Overview',
        videoUrl: '',
        summary:
          'Learn what a stock is and why people buy them.',
        points: 50,
      },
    ],
  },
  {
    id: 'compound-interest',
    title: 'The Magic of Time',
    description: 'See how small, consistent habits can grow your money safely over time.',
    badgeId: 'compound_pro',
    lessons: [
      {
        slug: 'compound-basics',
        title: 'Compound Interest Basics',
        videoUrl: '',
        summary: 'Understanding how your money can make its own money.',
        points: 50,
      },
    ],
  },
  {
    id: 'risk-vs-reward',
    title: 'Balancing Risk & Comfort',
    description: 'Learn how to invest in a way that lets you sleep well at night.',
    badgeId: 'risk_master',
    lessons: [
      {
        slug: 'risk-basics',
        title: 'Risk Basics',
        videoUrl: '',
        summary: 'Simple ways to stay safe while your money grows.',
        points: 50,
      },
    ],
  },
];
