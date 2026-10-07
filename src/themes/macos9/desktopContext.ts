import { createContext, useContext } from 'react'
import type { WinId } from './windows'

export interface DesktopApi {
  openWindow: (id: WinId) => void
  closeWindow: (id: WinId) => void
  projectsView: 'list' | 'icons'
  isTouch: boolean
}

export const DesktopContext = createContext<DesktopApi | null>(null)

export function useDesktop() {
  const ctx = useContext(DesktopContext)
  if (!ctx) throw new Error('useDesktop must be used inside the Mac OS 9 desktop')
  return ctx
}
