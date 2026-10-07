// Original 32×32 pixel-style icons drawn for this site. Not traced from any system icon set.

export type IconKind = 'folder' | 'document' | 'mail' | 'trash' | 'disk' | 'alert'

const common = {
  viewBox: '0 0 32 32',
  shapeRendering: 'crispEdges' as const,
  'aria-hidden': true,
  focusable: false,
}

export function Icon({ kind, size = 32 }: { kind: IconKind; size?: number }) {
  switch (kind) {
    case 'folder':
      return (
        <svg {...common} width={size} height={size}>
          <path d="M2 8h10l2 2h16v17H2z" fill="#9c9cff" stroke="#000" />
          <path d="M3 13h26v1H3z" fill="#ccccff" />
          <path d="M3 11h9l1 1H3z" fill="#ccccff" />
          <path d="M3 26h26v1H3z" fill="#6666cc" />
        </svg>
      )
    case 'document':
      return (
        <svg {...common} width={size} height={size}>
          <path d="M7 3h13l6 6v20H7z" fill="#fff" stroke="#000" />
          <path d="M20 3v6h6" fill="#ddd" stroke="#000" />
          <path d="M10 13h12v1H10zM10 16h12v1H10zM10 19h12v1H10zM10 22h8v1h-8z" fill="#666" />
        </svg>
      )
    case 'mail':
      return (
        <svg {...common} width={size} height={size}>
          <path d="M3 8h26v17H3z" fill="#fff" stroke="#000" />
          <path d="M3 8l13 10L29 8" fill="none" stroke="#000" />
          <path d="M22 11h5v5h-5z" fill="#cc3333" />
        </svg>
      )
    case 'trash':
      return (
        <svg {...common} width={size} height={size}>
          <path d="M7 9h18l-2 20H9z" fill="#ddd" stroke="#000" />
          <path d="M5 6h22v3H5zM13 3h6v3h-6z" fill="#bbb" stroke="#000" />
          <path d="M12 12h1v14h-1zM16 12h1v14h-1zM20 12h1v14h-1z" fill="#888" />
        </svg>
      )
    case 'disk':
      return (
        <svg {...common} width={size} height={size}>
          <path d="M2 11h28v11H2z" fill="#ddd" stroke="#000" />
          <path d="M3 21h26v1H3z" fill="#888" />
          <path d="M5 17h6v2H5z" fill="#33cc33" />
          <path d="M20 16h7v1h-7zM20 18h7v1h-7z" fill="#666" />
        </svg>
      )
    case 'alert':
      return (
        <svg {...common} width={size} height={size}>
          <path d="M16 3l14 25H2z" fill="#ffcc00" stroke="#000" />
          <path d="M15 11h2v9h-2zM15 22h2v2h-2z" fill="#000" />
        </svg>
      )
  }
}

/** A generic extension puzzle piece, tinted per extension. */
export function ExtensionIcon({ color }: { color: string }) {
  return (
    <svg {...common} width={32} height={32}>
      <path
        d="M5 9h7V7a3 3 0 0 1 6 0v2h7v7h-2a3 3 0 0 0 0 6h2v7H5v-7h2a3 3 0 0 0 0-6H5z"
        fill={color}
        stroke="#000"
        shapeRendering="geometricPrecision"
      />
    </svg>
  )
}

/** The menu-bar glyph where the system menu lived: an original pixel sparkle, not anyone's logo. */
export function SparkleGlyph() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} shapeRendering="crispEdges" aria-hidden="true" focusable="false">
      <path d="M6 1h4v5h5v4h-5v5H6v-5H1V6h5z" fill="#000" />
      <path d="M7 2h2v5h5v2H9v5H7V9H2V7h5z" fill="#9c9cff" />
      <path d="M2 2h2v2H2zM12 2h2v2h-2zM2 12h2v2H2zM12 12h2v2h-2z" fill="#3333cc" />
    </svg>
  )
}
