import { useSyncExternalStore } from 'react'
import { Link } from 'react-router'
import { PAGE_TITLE_ID } from '../../../shared/hooks'

const noSubscribe = () => () => {}

/** Styled after the bare server error pages of the era. */
export function NotFound() {
  // 404.html is prerendered once for every missing URL, so the path is only
  // known in the browser. The server snapshot (null) keeps hydration matching.
  const path = useSyncExternalStore(
    noSubscribe,
    () => window.location.pathname,
    () => null,
  )
  return (
    <>
      <h1 id={PAGE_TITLE_ID} tabIndex={-1}>
        Not Found
      </h1>
      <p>
        The requested URL {path && <code>{path}</code>} was not found on this server.
      </p>
      <p>
        Try the <Link to="/">home page</Link> instead.
      </p>
    </>
  )
}
