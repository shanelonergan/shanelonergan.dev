import type { Bio } from './types'

// Drawn from Shane's résumé, old About copy and cover letters
export const bio: Bio = {
  paragraphs: [
    "I love building things. Over the years that's meant skateboards, the perfect pen for spinning through my fingers, theater and, since 2019, software. I'm a full-stack engineer in Brooklyn, working mostly in React and Ruby on Rails: first at Church Pension Group, where I rewrote a Rails front end in React and turned a full-stack app into an API, and now as a freelancer.",
    'My acting teacher says actors are bricklayers: you build a character one carefully considered brick at a time, and if you are lucky you step back and see a house standing. I studied biology and theater at Oberlin, and when I learned to code at Flatiron School, I found out programmers are bricklayers too.',
    "I'm still a working actor and musician. I perform musical theatre and have taught myself guitar over more than a decade. Theater and software are both about building an experience for an audience, and I bring the same care to the person on the other side of the screen.",
  ],
  facts: [
    { label: 'Lives in', value: 'Brooklyn, NY' },
    { label: 'Builds with', value: 'React, Rails, TypeScript, PostgreSQL + whatever else gets the job done' },
    { label: 'Studied', value: 'Biology and theater, Oberlin College' },
    { label: 'Learned to code', value: 'Flatiron School, 2019' },
    { label: 'Plays', value: 'Guitar, self-taught for 10+ years' },
    { label: 'Performs', value: 'Musical theatre' },
  ],
  interests: [
    { label: 'General', value: 'Building things, from skateboards and pens to websites' },
    { label: 'Music', value: 'Guitar: self-taught for 10+ years, now learning theory and improvisation' },
    { label: 'Theater', value: 'Musical theatre, onstage and off' },
  ],
  // TODO(shane): is this who you'd like to meet?
  wantToMeet: 'Teams who care about the person on the other side of the screen, and anyone who wants to talk shop about React, Rails or a good cast album.',
}
