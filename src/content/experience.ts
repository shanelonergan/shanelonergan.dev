import type { Education, Role } from './types'

// Source: Shane Lonergan Technical Resume 2025 (public/shane-lonergan-resume.pdf)
export const experience: Role[] = [
  {
    company: 'Freelance',
    role: 'Full-stack web developer',
    start: 'May 2023',
    end: 'Present',
    summary: 'I work directly with clients on everything from personal sites to onboarding flows.',
    highlights: [
      "I'm the webmaster for the annual Shakespeare's Birthday Sonnet Slam. I took over its Rails app, ship UI changes in HAML and SCSS with the producers, and run its MySQL data and Heroku deploys from year to year.",
      'I rebuilt the onboarding flow for Celebrities Unlimited with a new React front end.',
      'I design and build personal sites in React and Gatsby.',
      'I tutored students with no coding experience through their first projects with Crimson Education.',
    ],
  },
  {
    company: 'Church Pension Group',
    role: 'Software developer I',
    start: 'Jan 2021',
    end: 'May 2023',
    highlights: [
      'Turned a full-stack Rails app into a pure API for a third-party vendor to build on.',
      "Moved display logic out of a Rails app and into SQL, then helped hand it to another team's new API, which made the original app much simpler.",
      'Was release manager for an overhaul of several apps at once: I wrote the release plan and coordinated live deploys across teams and vendors.',
      'Wrote end-to-end tests with Capybara, plus integration and unit tests to raise coverage.',
      'Paired often, and helped rework our agile process so tickets were easier to write and ship.',
    ],
  },
  {
    company: 'Church Pension Group',
    role: 'Software engineer (contract)',
    start: 'Jul 2020',
    end: 'Jan 2021',
    highlights: [
      'Rewrote a Rails-rendered front end in React and Redux.',
      'Worked across 10+ apps: full-stack Rails, Rails APIs and React front ends.',
      'Wrote and extended RSpec suites for new features, and worked with QA and UAT to catch bugs before release.',
      "Documented the SQL queries behind our apps so the next person wouldn't have to reverse-engineer them.",
    ],
  },
]

export const education: Education[] = [
  { school: 'Flatiron School', program: 'Full-stack web development (Rails and JavaScript)', year: '2019' },
  { school: 'Oberlin College', program: 'BA in biology and theater', year: '2017' },
]

export const skills: string[] = [
  'React',
  'Ruby on Rails',
  'JavaScript',
  'TypeScript',
  'Ruby',
  'PostgreSQL',
  'MySQL',
  'SQL',
  'REST APIs',
  'Redux',
  'RSpec',
  'Capybara',
  'Jest',
  'Git',
]
