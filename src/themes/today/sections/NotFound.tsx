import { Link } from 'react-router'
import { PAGE_TITLE_ID } from '../../../shared/hooks'

export function NotFound() {
  return (
    <>
      <h1 id={PAGE_TITLE_ID} tabIndex={-1} className="td-title">
        Page not found
      </h1>
      <p className="td-lede">There&apos;s nothing at this address. It may have moved, or the link has a typo.</p>
      <p>
        <Link className="td-button" to="/">
          Go to the home page
        </Link>
      </p>
    </>
  )
}
