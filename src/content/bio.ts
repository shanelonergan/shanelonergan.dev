import type { Bio } from './types'

// TODO(shane): review the whole bio; it's drafted from your résumé and old About copy
export const bio: Bio = {
  paragraphs: [
    "I'm a full-stack engineer in Brooklyn. I work mostly in React and Ruby on Rails, and I've spent the last five-plus years building web apps and untangling old ones: first at Church Pension Group, where I rewrote a Rails front end in React and turned a full-stack app into an API, and now as a freelancer.",
    'I came to code sideways. I studied biology and theater at Oberlin, then spent years acting, directing and working in customer service, looking for work that used both halves of my brain. I found it at Flatiron School in 2019.',
    "I'm still a working actor and musician. I perform musical theatre, and I've taught myself guitar over more than a decade; lately I'm learning theory so I can improvise on purpose.",
    'The two jobs have more in common than you would think. Rehearsal is iteration with an audience: you try something, you get notes, you try it again. I bring the same habit to code reviews, and the same care about the person on the other side of the screen.',
  ],
  facts: [
    { label: 'Lives in', value: 'Brooklyn, NY' },
    { label: 'Builds with', value: 'React, Rails, TypeScript, PostgreSQL' },
    { label: 'Studied', value: 'Biology and theater, Oberlin College' },
    { label: 'Learned to code', value: 'Flatiron School, 2019' },
    { label: 'Plays', value: 'Guitar, self-taught for 10+ years' },
    { label: 'Performs', value: 'Musical theatre' },
  ],
}
