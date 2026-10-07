import { Link, useLocation } from 'react-router'
import { PAGE_TITLE_ID } from '../../../shared/hooks'

/** Styled after the bare server error pages of the era. */
export function NotFound() {
  const { pathname } = useLocation()
  return (
    <>
      <h1 id={PAGE_TITLE_ID} tabIndex={-1}>
        Not Found
      </h1>
      <p>
        The requested URL <code>{pathname}</code> was not found on this server.
      </p>
      <p>
        Try the <Link to="/">home page</Link> instead.
      </p>
    </>
  )
}
