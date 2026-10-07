import type { SectionId } from '../../content/types'

// Original 24×24 icons in the style of 1995 link-list GIFs: a small beveled
// gray tile with a glyph. Decorative only; the link text carries the meaning.

const tile = (
  <>
    <path d="M0 0h24v24H0z" fill="#c0c0c0" />
    <path d="M0 0h24v1H1v23H0z" fill="#fff" />
    <path d="M23 1h1v23H1v-1h22z" fill="#404040" />
  </>
)

const glyphs: Partial<Record<SectionId, React.JSX.Element>> = {
  projects: (
    <>
      <path d="M4 7h6l1 2h9v9H4z" fill="#ffcc33" stroke="#000" />
      <path d="M5 11h14v1H5z" fill="#ffee99" />
    </>
  ),
  resume: (
    <>
      <path d="M6 3h9l4 4v14H6z" fill="#fff" stroke="#000" />
      <path d="M8 9h8v1H8zM8 12h8v1H8zM8 15h8v1H8zM8 18h5v1H8z" fill="#000080" />
    </>
  ),
  bio: (
    <>
      <path d="M12 4a3 3 0 1 1 0 6a3 3 0 1 1 0-6z" fill="#ffcc99" stroke="#000" />
      <path d="M6 20c0-5 3-8 6-8s6 3 6 8z" fill="#0000ee" stroke="#000" />
    </>
  ),
  contact: (
    <>
      <path d="M3 7h18v11H3z" fill="#fff" stroke="#000" />
      <path d="M3 7l9 7 9-7" fill="none" stroke="#000" />
    </>
  ),
}

export function LinkIcon({ id }: { id: SectionId }) {
  return (
    <svg
      className="ns-icon"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      {tile}
      {glyphs[id]}
    </svg>
  )
}

/** The banner's crest: an original monogram seal, standing in for 1995's clip-art logos. */
export function Seal() {
  return (
    <svg className="ns-seal" viewBox="0 0 48 48" width={48} height={48} aria-hidden="true" focusable="false">
      <circle cx="24" cy="24" r="22" fill="#000080" stroke="#000" />
      <circle cx="24" cy="24" r="17" fill="none" stroke="#ffcc33" strokeWidth="2" />
      <text x="24" y="30" textAnchor="middle" fontFamily="Times New Roman, Times, serif" fontSize="17" fontWeight="bold" fill="#fff">
        SL
      </text>
    </svg>
  )
}
