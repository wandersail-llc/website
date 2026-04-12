export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
  initials: string;
  links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export const team: TeamMember[] = [
  {
    name: 'Matt McKenna',
    role: 'Founder',
    bio: 'Building tools for builders.',
    photo: '',
    initials: 'MM',
    links: {
      github: 'https://github.com/mmckenna',
    },
  },
];
