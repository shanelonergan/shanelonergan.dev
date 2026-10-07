import { useEffect } from 'react'
import { ExtensionIcon } from './icons'

const DURATION_MS = 1800

// Labelled in text only; the icons are generic puzzle pieces, not anyone's logo.
const extensions = [
  { label: 'React Kit', color: '#ff9966' },
  { label: 'Rails Extension', color: '#cc3333' },
  { label: 'PostgreSQL Driver', color: '#3399cc' },
  { label: 'TypeScript Enabler', color: '#9966cc' },
  { label: 'REST Manager', color: '#66cc66' },
]

/**
 * "Welcome to Shane OS" with an extensions parade along the bottom.
 * Purely visual (aria-hidden): the desktop behind it is already in the
 * accessibility tree. Any key, click or tap skips it. Never shown under
 * prefers-reduced-motion (the caller checks).
 */
export function StartupScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, DURATION_MS)
    const skip = () => onDone()
    window.addEventListener('keydown', skip, { capture: true, once: true })
    window.addEventListener('pointerdown', skip, { capture: true, once: true })
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', skip, { capture: true })
      window.removeEventListener('pointerdown', skip, { capture: true })
    }
  }, [onDone])

  return (
    <div className="mac-startup" aria-hidden="true">
      <div className="mac-welcome">
        <p className="mac-welcome-logo">Shane OS</p>
        <p className="mac-welcome-text">Welcome to Shane OS</p>
        <div className="mac-progress">
          <span />
        </div>
      </div>
      <ul className="mac-parade">
        {extensions.map((ext, i) => (
          <li key={ext.label} style={{ animationDelay: `${200 + i * 250}ms` }}>
            <ExtensionIcon color={ext.color} />
            <span>{ext.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
