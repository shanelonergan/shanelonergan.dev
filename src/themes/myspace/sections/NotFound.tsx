import { Link } from 'react-router'
import { PAGE_TITLE_ID } from '../../../shared/hooks'

/** MySpace's most famous error page, more or less. */
export function NotFound() {
  return (
    <section className="ms-box ms-error">
      <h1 id={PAGE_TITLE_ID} tabIndex={-1} className="ms-box-head">
        Invalid Friend ID.
      </h1>
      <div className="ms-box-body">
        <p>This user has either cancelled their membership, or their account has been deleted.</p>
        <p className="ms-small">(In other words: page not found.)</p>
        <p>
          <Link to="/">Back to Shane&apos;s profile</Link>
        </p>
      </div>
    </section>
  )
}
