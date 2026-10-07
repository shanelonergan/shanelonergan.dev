import { useEffect, useRef, useState } from 'react'
import { playSong } from './song'

/** The profile song box. Plays only when asked, never on load. */
export function ProfileSong() {
  const [playing, setPlaying] = useState(false)
  const stopRef = useRef<(() => void) | null>(null)

  // Stop the music when the visitor leaves the theme or the page
  useEffect(() => () => stopRef.current?.(), [])

  const toggle = () => {
    if (playing) {
      stopRef.current?.()
      stopRef.current = null
      setPlaying(false)
      return
    }
    try {
      stopRef.current = playSong(() => {
        stopRef.current = null
        setPlaying(false)
      })
      setPlaying(true)
    } catch {
      setPlaying(false)
    }
  }

  return (
    <section className="ms-box ms-player" aria-labelledby="ms-song-title">
      <h2 className="ms-box-head" id="ms-song-title">
        Profile Song
      </h2>
      <div className="ms-player-body">
        <button type="button" className="ms-play" aria-pressed={playing} onClick={toggle}>
          <span aria-hidden="true">{playing ? '■' : '▶'}</span>
          <span className="sr-only">{playing ? 'Stop' : 'Play'} the profile song</span>
        </button>
        <div className="ms-track">
          <p className="ms-track-title">Give My Regards to Broadway</p>
          <p className="ms-track-meta">
            George M. Cohan, 1904 · public domain · 8-bit arrangement · never autoplays
          </p>
        </div>
        <span className={`ms-eq${playing ? ' is-playing' : ''}`} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </span>
      </div>
    </section>
  )
}
