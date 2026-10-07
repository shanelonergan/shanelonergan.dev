declare const __BUILD_DATE__: string

/** ISO timestamp of the build; the same value in the prerender and client bundles. */
export const buildDate = new Date(__BUILD_DATE__)

/**
 * Netscape's "Document Info" style: `Tue Oct 06 14:02:11 2026 EDT`.
 * Formatted in a fixed timezone so server and client render the same string.
 */
export function netscapeDate(date: Date = buildDate): string {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      year: 'numeric',
      timeZoneName: 'short',
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  )
  return `${parts.weekday} ${parts.month} ${parts.day} ${parts.hour}:${parts.minute}:${parts.second} ${parts.year} ${parts.timeZoneName}`
}
