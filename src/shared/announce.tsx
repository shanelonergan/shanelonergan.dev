import { useEffect, useState } from 'react'

const EVENT = 'site:announce'

/** Speak a short message to screen readers via the shared live region. */
export function announce(message: string) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: message }))
}

export function Announcer() {
  const [message, setMessage] = useState('')
  useEffect(() => {
    let clear: number | undefined
    const onAnnounce = (e: Event) => {
      // Clear first so repeating the same message is still spoken.
      setMessage('')
      window.clearTimeout(clear)
      clear = window.setTimeout(() => setMessage((e as CustomEvent<string>).detail), 50)
    }
    window.addEventListener(EVENT, onAnnounce)
    return () => {
      window.removeEventListener(EVENT, onAnnounce)
      window.clearTimeout(clear)
    }
  }, [])
  return (
    <div className="sr-only" role="status" aria-live="polite">
      {message}
    </div>
  )
}
