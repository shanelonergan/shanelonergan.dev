import { Link } from 'react-router'
import { PAGE_TITLE_ID } from '../../../shared/hooks'

export function NotFound() {
  return (
    <>
      <h1 id={PAGE_TITLE_ID} tabIndex={-1}>
        Uh oh! Page not found
      </h1>
      <p className="gc-center">This page moved, or I haven&apos;t built it yet.</p>
      <p className="gc-center">
        <Link to="/">Go back to my home page</Link>
      </p>
    </>
  )
}
