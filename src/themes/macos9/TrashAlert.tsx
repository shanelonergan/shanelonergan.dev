import { useEffect, useRef, type KeyboardEvent } from 'react'
import { Icon } from './icons'

/** Special → Empty Trash…: a real modal alert (the rest of the desktop is made inert by the caller). */
export function TrashAlert({ onClose }: { onClose: () => void }) {
  const okRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    okRef.current?.focus()
    return () => opener?.focus?.()
  }, [])

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      onClose()
    }
    // Only one control, so Tab stays on it
    if (e.key === 'Tab') e.preventDefault()
  }

  return (
    <div className="mac-modal-scrim">
      <div
        className="mac-alert"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="trash-title"
        aria-describedby="trash-desc"
        onKeyDown={onKeyDown}
      >
        <Icon kind="alert" />
        <div>
          <h2 id="trash-title" className="mac-alert-title">
            The Trash is empty.
          </h2>
          <p id="trash-desc">It contains 0 abandoned side projects. They&apos;re all still on GitHub, where they belong.</p>
          <div className="mac-buttons is-right">
            <button ref={okRef} type="button" className="mac-button is-default" onClick={onClose}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
