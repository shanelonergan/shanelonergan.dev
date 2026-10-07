// Storage can throw (private mode, blocked site data), so every access is guarded.
type Area = 'local' | 'session'

function area(which: Area): Storage | null {
  try {
    return which === 'local' ? window.localStorage : window.sessionStorage
  } catch {
    return null
  }
}

export function safeGet(key: string, which: Area = 'local'): string | null {
  try {
    return area(which)?.getItem(key) ?? null
  } catch {
    return null
  }
}

export function safeSet(key: string, value: string, which: Area = 'local'): boolean {
  try {
    const store = area(which)
    if (!store) return false
    store.setItem(key, value)
    return true
  } catch {
    return false
  }
}
