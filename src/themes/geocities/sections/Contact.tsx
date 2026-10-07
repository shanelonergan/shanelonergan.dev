import { site } from '../../../content/site'
import { PAGE_TITLE_ID } from '../../../shared/hooks'

const guestbook = `mailto:${site.email}?subject=${encodeURIComponent('Signing your guestbook!')}`

export function Contact() {
  return (
    <>
      <h1 id={PAGE_TITLE_ID} tabIndex={-1}>
        E-mail Me!
      </h1>
      <p className="gc-center gc-big">
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
      <p className="gc-center">Write me anytime!</p>

      <h2>Sign my guestbook!</h2>
      <p>
        Say hi, tell me how you found this page, or just tell me your favorite showtune.{' '}
        <a href={guestbook}>Sign the guestbook</a> (it opens your e-mail).
      </p>

      <h2>Find me elsewhere</h2>
      <ul className="gc-stars">
        <li>
          <a href={site.github}>GitHub</a>: all my code
        </li>
        <li>
          <a href={site.linkedin}>LinkedIn</a>: the serious version of me
        </li>
      </ul>
    </>
  )
}
