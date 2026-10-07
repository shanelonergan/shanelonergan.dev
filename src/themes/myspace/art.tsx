// Art for the MySpace-era theme: Shane's photo, plus original SVGs. No logos, no traced artwork.
import shanePhoto from './shane.jpg'

/** The profile pic: Shane's photo, cropped 3:4 and re-encoded without metadata. */
export function ProfilePic() {
  return (
    <img
      src={shanePhoto}
      className="ms-pic"
      width={150}
      height={200}
      alt="Shane in a rust corduroy blazer and cream sweater, holding a mechanical keyboard with pastel keycaps"
    />
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
