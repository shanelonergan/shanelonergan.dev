import { useState } from 'react'
import { safeGet, safeSet } from '../../shared/storage'

const COUNT_KEY = 'gc-visits'
const SESSION_KEY = 'gc-counted'

/**
 * An honest hit counter: it counts *your* visits, from this browser.
 * One visit per browser session, not per page view.
 */
function readVisits(): number | null {
  const stored = Number(safeGet(COUNT_KEY) ?? '0')
  const previous = Number.isFinite(stored) ? stored : 0
  if (safeGet(SESSION_KEY, 'session')) return previous || null
  const next = previous + 1
  if (!safeSet(COUNT_KEY, String(next))) return null
  safeSet(SESSION_KEY, '1', 'session')
  return next
}

export function HitCounter() {
  // Computed once on mount; StrictMode's second render reuses the initializer result.
  const [visits] = useState(readVisits)
  const digits = visits === null ? '?????' : String(visits).padStart(5, '0')

  return (
    <p className="gc-counter">
      You are visitor{' '}
      <span className="gc-odometer" aria-hidden="true">
        #
        {digits.split('').map((d, i) => (
          <span key={i} className="gc-digit">
            {d}
          </span>
        ))}
      </span>
      <span className="sr-only">{visits === null ? 'number unknown' : `number ${visits}`}</span>{' '}
      {visits === null ? '(your browser keeps secrets)' : '(from this browser)'}
    </p>
  )
}
