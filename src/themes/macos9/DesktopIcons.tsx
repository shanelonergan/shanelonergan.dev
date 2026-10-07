import { useState, type KeyboardEvent, type PointerEvent } from 'react'
import { Icon } from './icons'
import { desktopIcons, winMeta, type WinId } from './windows'

interface Props {
  onOpen: (id: WinId) => void
  onTrash: () => void
}

/**
 * Finder-style icons down the right edge. Click selects, double-click opens,
 * Enter or Space opens, and on touch a single tap opens.
 */
export function DesktopIcons({ onOpen, onTrash }: Props) {
  const [selected, setSelected] = useState<string | null>(null)

  const handlers = (key: string, open: () => void) => ({
    onClick: () => setSelected(key),
    onDoubleClick: open,
    onPointerUp: (e: PointerEvent) => {
      if (e.pointerType === 'touch') open()
    },
    onKeyDown: (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        open()
      }
    },
    onBlur: () => setSelected((s) => (s === key ? null : s)),
  })

  return (
    <nav className="mac-icons" aria-label="Desktop">
      <ul>
        {desktopIcons.map(({ id, label }) => (
          <li key={id}>
            <button
              type="button"
              id={`icon-${id}`}
              className={`mac-icon${selected === id ? ' is-selected' : ''}`}
              {...handlers(id, () => onOpen(id))}
            >
              <Icon kind={winMeta[id].icon} />
              <span className="mac-icon-label">{label}</span>
            </button>
          </li>
        ))}
        <li className="mac-trash-slot">
          <button
            type="button"
            id="icon-trash"
            className={`mac-icon${selected === 'trash' ? ' is-selected' : ''}`}
            {...handlers('trash', onTrash)}
          >
            <Icon kind="trash" />
            <span className="mac-icon-label">Trash</span>
          </button>
        </li>
      </ul>
    </nav>
  )
}
