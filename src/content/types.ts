export type SectionId = 'home' | 'projects' | 'resume' | 'hobbies' | 'contact'

export interface Section {
  id: SectionId
  path: string
  /** Short nav label */
  label: string
  /** Page <title> and heading */
  title: string
  description: string
}

export interface Site {
  name: string
  tagline: string
  /** Two sentences, first person */
  intro: string[]
  location: string
  email: string
  github: string
  linkedin: string
  /** null until the file exists in /public */
  resumePdf: string | null
  url: string
  /** Lines for the Netscape ".plan" box */
  plan: string[]
}

export interface Project {
  name: string
  oneLiner: string
  /** Mac OS 9 Finder "Kind" column */
  kind: string
  stack: string[]
  year: number
  liveUrl?: string
  repoUrl?: string
  /** Shown instead of links when there are none, e.g. "Private beta" */
  note?: string
}

export interface Role {
  company: string
  role: string
  start: string
  end: string
  summary?: string
  highlights: string[]
}

export interface Education {
  school: string
  program: string
  year: string
}

export interface Hobby {
  id: 'guitar' | 'theatre' | 'keyboards'
  title: string
  body: string[]
}

export interface Hobbies {
  items: Hobby[]
  /** Titles only, never lyrics */
  showtunes: string[]
}

export interface HotlistLink {
  title: string
  url: string
  note: string
}
