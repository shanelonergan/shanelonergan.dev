import { site } from '../../../content/site'
import { PAGE_TITLE_ID } from '../../../shared/hooks'

export function Contact() {
  return (
    <>
      <h1 id={PAGE_TITLE_ID} tabIndex={-1}>
        Contact
      </h1>
      <p>Email is the best way to reach me. I read everything.</p>
      <dl className="ns-contact">
        <dt>Email</dt>
        <dd>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </dd>
        <dt>GitHub</dt>
        <dd>
          <a href={site.github}>{site.github.replace('https://', '')}</a>
        </dd>
        <dt>LinkedIn</dt>
        <dd>
          <a href={site.linkedin}>{site.linkedin.replace('https://', '')}</a>
        </dd>
      </dl>
    </>
  )
}
