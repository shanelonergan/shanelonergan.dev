import { site } from '../../../content/site'
import { PAGE_TITLE_ID } from '../../../shared/hooks'

export function Contact() {
  return (
    <>
      <h1 id={PAGE_TITLE_ID} tabIndex={-1} className="td-title">
        Contact
      </h1>
      <p className="td-lede">Email is the best way to reach me.</p>
      <p>
        <a className="td-email" href={`mailto:${site.email}`}>
          {site.email}
        </a>
      </p>
      <ul className="td-plain-list">
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
