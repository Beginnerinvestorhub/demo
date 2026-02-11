// components/NavBar/navConfig.ts
export interface NavItem {
  href: string;
  label: string;
  subItems?: NavItem[];
}

export const NAV_LINKS: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'My Dashboard' },
  {
    href: '/tools',
    label: 'Tools',
    subItems: [
      {
        href: '/fractional-share-calculator',
        label: 'Fractional Share Calculator',
      },
      { href: '/risk-assessment', label: 'Risk Assessment' },
      { href: '/esg-screener', label: 'ESG Screener' },
    ],
  },
  { href: '/login', label: 'Login' },
];
