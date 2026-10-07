import { useRef, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react'
import { PAGE_TITLE_ID } from '../../shared/hooks'
import type { Win, WinId } from './windows'

interface WindowProps {
  win: Win
  title: string
  width: number
  isFront: boolean
  /** The front window's title doubles as the page's focus target (the desktop has an sr-only h1) */
  isPageTitle: boolean
  canDrag: boolean
  info?: ReactNode
  children: ReactNode
  onFocus: (id: WinId) => void
  onClose: (id: WinId) => void
  onShade: (id: WinId) => void
  onZoom: (id: WinId) => void
  onMove: (id: WinId, x: number, y: number) => void
}

/** A Platinum Finder window: pinstriped title bar, close box left, zoom and collapse boxes right. */
export function Window({
  win,
  title,
  width,
  isFront,
  isPageTitle,
  canDrag,
  info,
  children,
  onFocus,
  onClose,
  onShade,
  onZoom,
  onMove,
}: WindowProps) {
  const titleId = `win-title-${win.id}`
  const bodyId = `win-body-${win.id}`
  const ref = useRef<HTMLElement>(null)
  const drag = useRef<{ dx: number; dy: number; pointer: number } | null>(null)

  const onTitlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (!canDrag || win.zoomed || e.button !== 0 || (e.target as HTMLElement).closest('button')) return
    const rect = ref.current!.getBoundingClientRect()
    const parent = ref.current!.offsetParent!.getBoundingClientRect()
    drag.current = { dx: e.clientX - rect.left + parent.left, dy: e.clientY - rect.top + parent.top, pointer: e.pointerId }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onTitlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d || d.pointer !== e.pointerId) return
    const parent = ref.current!.offsetParent!.getBoundingClientRect()
    // Keep at least the title bar reachable
    const x = Math.min(Math.max(e.clientX - d.dx, 60 - width), parent.width - 60)
    const y = Math.min(Math.max(e.clientY - d.dy, 0), parent.height - 24)
    onMove(win.id, Math.round(x), Math.round(y))
  }

  const endDrag = () => {
    drag.current = null
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      onClose(win.id)
    }
  }

  return (
    <section
      ref={ref}
      role="dialog"
      aria-modal="false"
      aria-labelledby={isPageTitle ? PAGE_TITLE_ID : titleId}
      className={`mac-window${isFront ? ' is-front' : ''}${win.shaded ? ' is-shaded' : ''}${win.zoomed ? ' is-zoomed' : ''}`}
      style={{ left: win.x, top: win.y, zIndex: win.z, width, '--y': `${win.y}px` } as CSSProperties}
      onPointerDownCapture={() => onFocus(win.id)}
      onFocusCapture={() => onFocus(win.id)}
      onKeyDown={onKeyDown}
    >
      <div
        className="mac-titlebar"
        onPointerDown={onTitlePointerDown}
        onPointerMove={onTitlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={(e) => {
          if (!(e.target as HTMLElement).closest('button')) onShade(win.id)
        }}
      >
        <button type="button" className="mac-box mac-closebox" onClick={() => onClose(win.id)}>
          <span className="sr-only">Close {title}</span>
        </button>
        <span className="mac-stripes" aria-hidden="true" />
        <h2 id={isPageTitle ? PAGE_TITLE_ID : titleId} tabIndex={-1} className="mac-wintitle">
          {title}
        </h2>
        <span className="mac-stripes" aria-hidden="true" />
        <button type="button" className="mac-box mac-zoombox" aria-pressed={win.zoomed} onClick={() => onZoom(win.id)}>
          <span className="sr-only">Zoom {title}</span>
        </button>
        <button
          type="button"
          className="mac-box mac-collapsebox"
          aria-expanded={!win.shaded}
          aria-controls={bodyId}
          onClick={() => onShade(win.id)}
        >
          <span className="sr-only">Collapse {title}</span>
        </button>
      </div>
      <div className="mac-winbody" id={bodyId} hidden={win.shaded}>
        {info && <div className="mac-infobar">{info}</div>}
        {/* Focusable so keyboard users can scroll a window with no links in it */}
        <div className="mac-content" tabIndex={0} role="region" aria-label={`${title} contents`}>
          {children}
        </div>
      </div>
    </section>
  )
}
