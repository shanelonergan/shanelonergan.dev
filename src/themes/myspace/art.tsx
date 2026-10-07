// Original art for the MySpace-era theme. No logos, no traced artwork.

/** The profile pic: a guitar in a spotlight on an empty stage. TODO(shane): swap in a real photo? */
export function ProfilePic() {
  return (
    <svg viewBox="0 0 160 160" className="ms-pic" role="img" aria-label="A guitar in a spotlight on an empty stage">
      <defs>
        <radialGradient id="ms-spot" cx="50%" cy="78%" r="55%">
          <stop offset="0" stopColor="#fff6c8" stopOpacity="0.95" />
          <stop offset="0.6" stopColor="#ffcc66" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffcc66" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ms-curtain" x1="0" x2="1">
          <stop offset="0" stopColor="#5a0010" />
          <stop offset="0.5" stopColor="#a0102a" />
          <stop offset="1" stopColor="#5a0010" />
        </linearGradient>
      </defs>
      <rect width="160" height="160" fill="#140010" />
      <path d="M40 0h80L100 140H60z" fill="url(#ms-spot)" />
      <ellipse cx="80" cy="136" rx="46" ry="10" fill="url(#ms-spot)" />
      <rect y="140" width="160" height="20" fill="#3a1a08" />
      <path d="M0 0h28c-4 40 4 90-6 160H0z" fill="url(#ms-curtain)" />
      <path d="M160 0h-28c4 40-4 90 6 160h22z" fill="url(#ms-curtain)" />
      {/* the guitar */}
      <g transform="rotate(-18 80 96)">
        <rect x="77" y="40" width="6" height="44" fill="#6b3a12" />
        <rect x="75" y="34" width="10" height="9" rx="2" fill="#2a1406" />
        <path d="M80 80c-14 0-22 8-20 20c1 7 6 10 6 15c0 10-10 13-8 21c2 8 12 10 22 10s20-2 22-10c2-8-8-11-8-21c0-5 5-8 6-15c2-12-6-20-20-20z" fill="#d9822b" stroke="#2a1406" strokeWidth="2" />
        <circle cx="80" cy="112" r="6" fill="#2a1406" />
        <rect x="74" y="128" width="12" height="3" fill="#2a1406" />
      </g>
    </svg>
  )
}

const avatarColors = [
  ['#ff3399', '#ffcc00'],
  ['#33ccff', '#9933ff'],
  ['#99ff33', '#00a0a0'],
  ['#ff9933', '#ff3366'],
  ['#cc66ff', '#3366ff'],
  ['#ffff66', '#ff6600'],
]

/** A Top 8 "photo" for a project: a glossy tile with its initials. */
export function FriendAvatar({ name, index }: { name: string; index: number }) {
  const [a, b] = avatarColors[index % avatarColors.length]
  const words = name.replace(/\..*$/, '').split(/\s+/)
  // "MTG Match Tracker" → MM; one-word names get two letters so "Seen" and "shanelonergan.com" differ
  const initials = (words.length > 1 ? words.map((w) => w[0]).join('') : words[0]).slice(0, 2).toUpperCase()
  return (
    <svg viewBox="0 0 90 90" className="ms-avatar" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`ms-av-${index}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width="90" height="90" fill={`url(#ms-av-${index})`} />
      <rect width="90" height="40" fill="#fff" opacity="0.18" />
      <text x="45" y="58" textAnchor="middle" fontFamily="Trebuchet MS, Verdana, sans-serif" fontSize="34" fontWeight="bold" fill="#000" opacity="0.8">
        {initials}
      </text>
    </svg>
  )
}

/** The little "Online Now!" figure. */
export function OnlineIcon() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} className="ms-online-icon" aria-hidden="true" focusable="false">
      <circle cx="8" cy="5" r="3.5" fill="#66ff33" stroke="#003300" />
      <path d="M2 15c0-4 3-6 6-6s6 2 6 6z" fill="#66ff33" stroke="#003300" />
    </svg>
  )
}
