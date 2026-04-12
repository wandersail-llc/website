export interface Project {
  name: string;
  description: string;
  category: string;
  status: 'active' | 'coming_soon';
  featured: boolean;
  url: string;
}

export const projects: Project[] = [
  {
    name: 'Surchin',
    description: 'The context engineering platform for AI native teams',
    category: 'AI/ML',
    status: 'active',
    featured: true,
    url: 'https://getsurch.in',
  },
  {
    name: 'Prism',
    description: 'A developer tool that helps teams ship better code. Clean interfaces, powerful internals.',
    category: 'Developer Tools',
    status: 'active',
    featured: true,
    url: '',
  },
  {
    name: 'Harbor',
    description: 'Secure deployment platform for small teams. Simple setup, reliable hosting.',
    category: 'B2B SaaS',
    status: 'active',
    featured: true,
    url: '',
  },
  {
    name: 'Compass',
    description: 'A personal productivity tool that adapts to how you actually work.',
    category: 'Consumer',
    status: 'coming_soon',
    featured: false,
    url: '',
  },
  {
    name: 'Drift',
    description: 'Intelligent data pipeline management. Watch this space.',
    category: 'AI/ML',
    status: 'coming_soon',
    featured: false,
    url: '',
  },
];
