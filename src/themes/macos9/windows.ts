import type { SectionId } from '../../content/types'
import type { IconKind } from './icons'

/** Every window the desktop can show. Section windows map 1:1 to routes. */
export type WinId = SectionId | 'about' | 'help' | 'notfound'

export interface WinMeta {
  title: string
  icon: IconKind
  /** Route for section windows; utility windows don't change the URL */
  path?: string
  width: number
}

export const winMeta: Record<WinId, WinMeta> = {
  home: { title: 'Read Me', icon: 'document', path: '/', width: 480 },
  projects: { title: 'Projects', icon: 'folder', path: '/projects', width: 580 },
  resume: { title: 'Résumé', icon: 'document', path: '/resume', width: 560 },
  bio: { title: 'Bio', icon: 'person', path: '/bio', width: 480 },
  contact: { title: 'Mail', icon: 'mail', path: '/contact', width: 460 },
  about: { title: 'About This Shane', icon: 'disk', width: 380 },
  help: { title: 'Keyboard Help', icon: 'document', width: 420 },
  notfound: { title: 'Alert', icon: 'alert', width: 360 },
}

/** Desktop icons, top to bottom down the right edge, in Mac fashion. */
export const desktopIcons: { id: WinId; label: string }[] = [
  { id: 'home', label: 'Read Me' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Résumé' },
  { id: 'bio', label: 'Bio' },
  { id: 'contact', label: 'Mail' },
]

export interface Win {
  id: WinId
  open: boolean
  shaded: boolean
  zoomed: boolean
  z: number
  x: number
  y: number
}

export interface WmState {
  wins: Partial<Record<WinId, Win>>
  /** Front-most open window, or null for an empty desktop */
  front: WinId | null
  topZ: number
  /** How many windows have been placed, for cascading new ones */
  placed: number
  projectsView: 'list' | 'icons'
}

export type WmAction =
  | { type: 'open'; id: WinId; viewport: { w: number; h: number } }
  | { type: 'focus'; id: WinId }
  | { type: 'close'; id: WinId }
  | { type: 'shade'; id: WinId }
  | { type: 'zoom'; id: WinId }
  | { type: 'move'; id: WinId; x: number; y: number }
  | { type: 'cleanUp' }
  | { type: 'reset' }
  | { type: 'projectsView'; view: 'list' | 'icons' }

export const initialWm: WmState = { wins: {}, front: null, topZ: 10, placed: 0, projectsView: 'list' }

/** Cascade like the Finder: each new window a little down and to the right. */
function cascade(index: number, width: number, viewport: { w: number; h: number }) {
  const step = index % 6
  const iconColumn = 120
  const maxX = Math.max(8, viewport.w - width - iconColumn)
  return { x: Math.min(24 + step * 28, maxX), y: 16 + step * 26 }
}

function frontMost(wins: WmState['wins'], except?: WinId): WinId | null {
  let best: Win | null = null
  for (const w of Object.values(wins)) {
    if (w && w.open && w.id !== except && (!best || w.z > best.z)) best = w
  }
  return best?.id ?? null
}

export function wmReducer(state: WmState, action: WmAction): WmState {
  switch (action.type) {
    case 'open': {
      const existing = state.wins[action.id]
      const z = state.topZ + 1
      if (existing) {
        return {
          ...state,
          topZ: z,
          front: action.id,
          wins: { ...state.wins, [action.id]: { ...existing, open: true, shaded: false, z } },
        }
      }
      const pos = cascade(state.placed, winMeta[action.id].width, action.viewport)
      return {
        ...state,
        topZ: z,
        front: action.id,
        placed: state.placed + 1,
        wins: {
          ...state.wins,
          [action.id]: { id: action.id, open: true, shaded: false, zoomed: false, z, ...pos },
        },
      }
    }
    case 'focus': {
      const win = state.wins[action.id]
      if (!win || state.front === action.id) return state
      const z = state.topZ + 1
      return { ...state, topZ: z, front: action.id, wins: { ...state.wins, [action.id]: { ...win, z } } }
    }
    case 'close': {
      const win = state.wins[action.id]
      if (!win) return state
      const wins = { ...state.wins, [action.id]: { ...win, open: false, zoomed: false } }
      return { ...state, wins, front: state.front === action.id ? frontMost(wins) : state.front }
    }
    case 'shade': {
      const win = state.wins[action.id]
      if (!win) return state
      return { ...state, wins: { ...state.wins, [action.id]: { ...win, shaded: !win.shaded } } }
    }
    case 'zoom': {
      const win = state.wins[action.id]
      if (!win) return state
      return { ...state, wins: { ...state.wins, [action.id]: { ...win, zoomed: !win.zoomed, shaded: false } } }
    }
    case 'move': {
      const win = state.wins[action.id]
      if (!win) return state
      return { ...state, wins: { ...state.wins, [action.id]: { ...win, x: action.x, y: action.y } } }
    }
    case 'cleanUp': {
      const open = Object.values(state.wins)
        .filter((w): w is Win => !!w?.open)
        .sort((a, b) => a.z - b.z)
      const wins = { ...state.wins }
      open.forEach((w, i) => {
        wins[w.id] = { ...w, zoomed: false, x: 24 + i * 28, y: 16 + i * 26 }
      })
      return { ...state, wins, placed: open.length }
    }
    case 'reset':
      return initialWm
    case 'projectsView':
      return { ...state, projectsView: action.view }
  }
}
