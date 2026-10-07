import type { Section, Site } from './types'

export const site: Site = {
  name: 'Shane Lonergan',
  tagline: 'Full-stack engineer in Brooklyn. React and Rails.', // TODO(shane): refine
  intro: [
    // TODO(shane): review copy
    "I'm a full-stack engineer with about five years of building web apps, mostly React on the front and Ruby on Rails on the back.",
    "I like taking a messy app and making it simple again, and I'm also a working actor and musician, which keeps me honest about how people actually use things.",
  ],
  location: 'Brooklyn, NY',
  email: 'sptlonergan@gmail.com',
  github: 'https://github.com/shanelonergan',
  linkedin: 'https://linkedin.com/in/shane-lonergan',
  resumePdf: null, // TODO(shane): add /public/shane-lonergan-resume.pdf, then set to '/shane-lonergan-resume.pdf'
  url: 'https://shanelonergan.dev',
  plan: [
    // TODO(shane): keep this current
    'Building: Seen, an audition tracker for my own iPhone.',
    'Practicing: modes and improvising over changes.',
    'Looking for: a full-stack role on a small, kind team.', // TODO(shane): is this true right now?
  ],
}

export const sections: Section[] = [
  {
    id: 'home',
    path: '/',
    label: 'Home',
    title: 'Shane Lonergan',
    description: 'Shane Lonergan is a full-stack engineer in Brooklyn who works in React and Ruby on Rails.',
  },
  {
    id: 'projects',
    path: '/projects',
    label: 'Projects',
    title: 'Projects',
    description: "Things Shane Lonergan has built with React, Rails, TypeScript and PostgreSQL.",
  },
  {
    id: 'resume',
    path: '/resume',
    label: 'Résumé',
    title: 'Résumé',
    description: "Shane Lonergan's experience and skills as a full-stack engineer.",
  },
  {
    id: 'hobbies',
    path: '/hobbies',
    label: 'Hobbies',
    title: 'Hobbies',
    description: 'Guitar, musical theatre and other things Shane Lonergan does away from the keyboard.',
  },
  {
    id: 'contact',
    path: '/contact',
    label: 'Contact',
    title: 'Contact',
    description: 'How to reach Shane Lonergan: email, GitHub and LinkedIn.',
  },
]

export function sectionForPath(pathname: string): Section | undefined {
  const clean = pathname.replace(/\/+$/, '') || '/'
  return sections.find((s) => s.path === clean)
}
