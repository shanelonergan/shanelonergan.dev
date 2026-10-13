import { site } from '../../../content/site'
import { PAGE_TITLE_ID } from '../../../shared/hooks'

export function Contact() {
  return (
    <>
      <h1 id={PAGE_TITLE_ID} tabIndex={-1} className="st-title">
        Contact
      </h1>
      <p className="st-lede">Email is the best way to reach me. I read everything, and I write back.</p>
      <p>
        <a className="st-email is-big" href={`mailto:${site.email}`}>
          {site.email}
        </a>
      </p>
      <ul className="st-links-list">
        <li>
          <a href={site.github}>GitHub</a>
        </li>
        <li>
          <a href={site.linkedin}>LinkedIn</a>
        </li>
        {site.resumePdf && (
          <li>
            <a href={site.resumePdf}>Résumé (PDF)</a>
          </li>
        )}
      </ul>
    </>
  )
}
