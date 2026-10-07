import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'

export interface MenuItem {
  label: string
  onSelect?: () => void
  disabled?: boolean
  /** Renders as menuitemradio with a check mark */
  checked?: boolean
  separatorBefore?: boolean
  /** Shown on the right, like ⌘-key hints */
  hint?: string
}

export interface Menu {
  id: string
  /** Visible title */
  label: ReactNode
  /** Accessible name when the visible title is a glyph */
  ariaLabel?: string
  items: MenuItem[]
}

/**
 * A WAI-ARIA menubar: ←/→ between menus, ↓/Enter/Space to open, ↑/↓ inside,
 * Enter/Space to choose, Esc to close and return focus, Tab to leave.
 */
export function MenuBar({ menus, label }: { menus: Menu[]; label: string }) {
  const [open, setOpen] = useState<number | null>(null)
  const [active, setActive] = useState(0)
  const barRef = useRef<HTMLUListElement>(null)
  const topRefs = useRef<(HTMLButtonElement | null)[]>([])
  const itemRefs = useRef<(HTMLButtonElement | null)[][]>([])

  // Click anywhere else closes the open menu
  useEffect(() => {
    if (open === null) return
    const onDown = (e: PointerEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setOpen(null)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  const enabledItems = (m: number) =>
    (itemRefs.current[m] ?? []).filter((el, i) => el && !menus[m].items[i]?.disabled) as HTMLButtonElement[]

  const openMenu = (m: number, focus: 'first' | 'last' | 'none' = 'first') => {
    setOpen(m)
    setActive(m)
    if (focus === 'none') return
    requestAnimationFrame(() => {
      const items = enabledItems(m)
      ;(focus === 'first' ? items[0] : items[items.length - 1])?.focus()
    })
  }

  const focusTop = (m: number) => {
    const n = (m + menus.length) % menus.length
    setActive(n)
    topRefs.current[n]?.focus()
    return n
  }

  const close = (returnFocus: boolean) => {
    const m = open
    setOpen(null)
    if (returnFocus && m !== null) topRefs.current[m]?.focus()
  }

  const choose = (item: MenuItem) => {
    if (item.disabled) return
    setOpen(null)
    item.onSelect?.()
  }

  const onTopKey = (e: KeyboardEvent, m: number) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowLeft': {
        e.preventDefault()
        const n = focusTop(m + (e.key === 'ArrowRight' ? 1 : -1))
        if (open !== null) openMenu(n, 'none')
        break
      }
      case 'ArrowDown':
      case 'Enter':
      case ' ':
        e.preventDefault()
        openMenu(m, 'first')
        break
      case 'ArrowUp':
        e.preventDefault()
        openMenu(m, 'last')
        break
      case 'Escape':
        if (open !== null) {
          e.stopPropagation()
          close(true)
        }
        break
    }
  }

  const onItemKey = (e: KeyboardEvent, m: number) => {
    const items = enabledItems(m)
    const i = items.indexOf(e.currentTarget as HTMLButtonElement)
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        items[(i + 1) % items.length]?.focus()
        break
      case 'ArrowUp':
        e.preventDefault()
        items[(i - 1 + items.length) % items.length]?.focus()
        break
      case 'Home':
        e.preventDefault()
        items[0]?.focus()
        break
      case 'End':
        e.preventDefault()
        items[items.length - 1]?.focus()
        break
      case 'ArrowRight':
      case 'ArrowLeft': {
        e.preventDefault()
        const n = focusTop(m + (e.key === 'ArrowRight' ? 1 : -1))
        openMenu(n, 'first')
        break
      }
      case 'Escape':
        e.preventDefault()
        e.stopPropagation()
        close(true)
        break
      case 'Tab':
        setOpen(null)
        break
    }
  }

  return (
    <ul className="mac-menubar-list" role="menubar" aria-label={label} ref={barRef}>
      {menus.map((menu, m) => (
        <li key={menu.id} role="none" className="mac-menu">
          <button
            ref={(el) => {
              topRefs.current[m] = el
            }}
            type="button"
            role="menuitem"
            className="mac-menu-title"
            aria-haspopup="menu"
            aria-expanded={open === m}
            aria-label={menu.ariaLabel}
            tabIndex={active === m ? 0 : -1}
            onClick={() => (open === m ? setOpen(null) : openMenu(m, 'none'))}
            onPointerEnter={() => {
              if (open !== null && open !== m) openMenu(m, 'none')
            }}
            onKeyDown={(e) => onTopKey(e, m)}
          >
            {menu.label}
          </button>
          {open === m && (
            <ul role="menu" className="mac-menu-list" aria-label={menu.ariaLabel ?? String(menu.label)}>
              {menu.items.map((item, i) => (
                <li key={item.label} role="none" className={item.separatorBefore ? 'has-separator' : undefined}>
                  <button
                    ref={(el) => {
                      ;(itemRefs.current[m] ??= [])[i] = el
                    }}
                    type="button"
                    role={item.checked === undefined ? 'menuitem' : 'menuitemradio'}
                    aria-checked={item.checked}
                    aria-disabled={item.disabled || undefined}
                    tabIndex={-1}
                    className="mac-menu-item"
                    onClick={() => choose(item)}
                    onKeyDown={(e) => onItemKey(e, m)}
                  >
                    <span className="mac-check" aria-hidden="true">
                      {item.checked ? '✓' : ''}
                    </span>
                    <span className="mac-menu-label">{item.label}</span>
                    {item.hint && (
                      <span className="mac-menu-hint" aria-hidden="true">
                        {item.hint}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}
