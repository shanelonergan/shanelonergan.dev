import { site } from '../../../content/site'
import { PAGE_TITLE_ID } from '../../../shared/hooks'
import { ContactGrid } from './ContactGrid'

export function ContactPage() {
  return (
    <>
      <h1 id={PAGE_TITLE_ID} tabIndex={-1} className="ms-glitter ms-page-title">
        Contacting Shane
      </h1>
      <section className="ms-box" aria-labelledby="ms-send">
        <h2 className="ms-box-head" id="ms-send">
          Send Message
        </h2>
        <div className="ms-box-body">
          <p>
            Email is the best way to reach me:{' '}
            <a className="ms-big-link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
          <ContactGrid />
        </div>
      </section>
      <section className="ms-box ms-url" aria-label="ShaneSpace URL">
        <p>
          <b>ShaneSpace URL:</b>
          <br />
          <a href={site.url}>{site.url.replace('https://', 'http://')}</a>
        </p>
      </section>
    </>
  )
}
