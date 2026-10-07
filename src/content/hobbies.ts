import type { Hobbies, HotlistLink } from './types'

export const hobbies: Hobbies = {
  items: [
    {
      id: 'guitar',
      title: 'Guitar',
      body: [
        "I've taught myself guitar over more than a decade of playing.",
        "Lately I'm digging into theory and improvisation, so I can tell why something works instead of just knowing that it does.",
      ],
    },
    {
      id: 'theatre',
      title: 'Musical theatre',
      body: [
        "I'm a working actor and musician, and I perform musical theatre.", // TODO(shane): add specifics (recent shows, roles)
      ],
    },
    {
      id: 'keyboards',
      title: 'Mechanical keyboards',
      body: ['I build and tinker with mechanical keyboards.'], // TODO(shane): keep this?
    },
  ],
  showtunes: [
    // TODO(shane): titles only, never lyrics
  ],
}

// TODO(shane): swap in your real favourites
export const hotlist: HotlistLink[] = [
  {
    title: 'shanelonergan.com',
    url: 'https://shanelonergan.com',
    note: 'my acting site, for the other half of my life',
  },
  {
    title: 'The Sonnet Slam',
    url: 'https://github.com/shanelonergan/temp-sonnet-slam-rails', // TODO(shane): link the live site
    note: 'Shakespeare, but everybody reads one',
  },
  {
    title: 'Typing Royale',
    url: 'https://typingroyale.pro',
    note: 'still the fastest way to lose a friend',
  },
]
