import type { Education, Role } from './types'

// TODO(shane): review all of this against your real résumé
export const experience: Role[] = [
  {
    company: 'Freelance',
    role: 'Web developer',
    start: '2023',
    end: 'Present',
    summary: 'I work directly with clients on everything from personal sites to onboarding flows.',
    highlights: [
      "I'm the webmaster for the annual Shakespeare's Birthday Sonnet Slam, and I maintain the Rails app that runs its registration.",
      'I rebuilt the onboarding flow for Celebrities Unlimited with a new React front end.',
      'I design and build personal sites for actors and other professionals.',
    ],
  },
  {
    company: 'Digital Solutions Co.', // TODO(shane): confirm the real company name
    role: 'Full-stack developer',
    start: '2020',
    end: '2023',
    summary:
      'I worked across ten-plus internal and customer-facing apps, and was release manager for releases that spanned several teams and stacks.',
    highlights: [
      'Rewrote a Rails-rendered front end in React and Redux, so the app felt fast instead of page-by-page.',
      'Turned a full-stack Rails app into a pure API for a third-party vendor to build on.',
      "Moved display logic out of a Rails app and into SQL, then handed it to another team's new API, which made the original app much simpler.",
    ],
  },
]

export const education: Education[] = [
  { school: 'Flatiron School', program: 'Software engineering immersive', year: '2019' },
]

export const skills: string[] = [
  'React',
  'Ruby on Rails',
  'JavaScript',
  'TypeScript',
  'PostgreSQL',
  'REST APIs',
  'Redux',
  'Redis',
  'RSpec',
  'Jest',
  'Git',
]
