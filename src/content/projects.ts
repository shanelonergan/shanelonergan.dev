import type { Project } from './types'

// TODO(shane): review every one-liner, and reorder so your favourite is first
export const projects: Project[] = [
  {
    name: 'Seen',
    oneLiner: 'An iPhone app for logging every audition I go to, built so capture takes zero typing.',
    kind: 'iOS app',
    stack: ['React Native', 'Expo', 'TypeScript', 'Rails API', 'PostgreSQL'],
    year: 2026,
    note: 'Private beta', // TODO(shane): OK to list a private project?
  },
  {
    name: 'shanelonergan.com',
    oneLiner: 'My acting site, with a scroll-driven hero and a photo gallery that never shifts as it loads.',
    kind: 'Website',
    stack: ['Next.js', 'TypeScript', 'GSAP'],
    year: 2026,
    liveUrl: 'https://shanelonergan.com',
    repoUrl: 'https://github.com/shanelonergan/acting-website',
  },
  {
    name: 'MTG Match Tracker',
    oneLiner: 'Logs Magic: The Gathering matches and shows win rates by deck and format.',
    kind: 'Web app',
    stack: ['React', 'Vite', 'Firebase', 'Chart.js'],
    year: 2025,
    repoUrl: 'https://github.com/shanelonergan/mtg-match-tracker-final',
  },
  {
    name: 'Typing Royale',
    oneLiner: 'A retro typing game where two players race head to head over the web.',
    kind: 'Web app',
    stack: ['React', 'Ruby on Rails', 'PostgreSQL', 'Action Cable'],
    year: 2019,
    liveUrl: 'https://typingroyale.pro',
    repoUrl: 'https://github.com/wukrit/typing-royale-frontend',
  },
  {
    name: 'Indigo',
    oneLiner: 'A resale marketplace just for denim, with filters for mill, weight and wash.',
    kind: 'Web app',
    stack: ['React', 'Redux', 'Ruby on Rails', 'PostgreSQL', 'Stripe'],
    year: 2019,
    liveUrl: 'https://indigo-resale.store',
    repoUrl: 'https://github.com/shanelonergan/indigo',
  },
  {
    name: 'Crypto Hero',
    oneLiner: 'A crypto trading simulator with live prices for the top 100 coins.',
    kind: 'Web app',
    stack: ['Ruby on Rails', 'PostgreSQL', 'CoinCap API'],
    year: 2019,
    repoUrl: 'https://github.com/shanelonergan/crypto-hero',
  },
]
