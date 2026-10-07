import { useState, type ReactNode } from 'react'

/**
 * A CSS stand-in for <marquee>. Moving content needs a way to stop it (WCAG 2.2.2),
 * so there's a stop/start toggle; reduced motion stops it entirely.
 */
export function Marquee({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false)
  return (
    <div className={`gc-marquee${paused ? ' is-paused' : ''}`}>
      <div className="gc-marquee-track">
        <span className="gc-marquee-text">{children}</span>
      </div>
      <button type="button" className="gc-marquee-toggle" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
        {paused ? 'Scroll' : 'Stop'}
        <span className="sr-only"> the scrolling message</span>
      </button>
    </div>
  )
}
