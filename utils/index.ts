import xss from 'xss'
export * from './breakpoints'
export * from './colors'
export * from './css'
export * from './date'

// Polyfill Object.fromEntries
export function fromEntries<V>(iterable: Iterable<[string, V]>) {
  return [...iterable].reduce((obj, [key, val]) => {
    obj[key] = val
    return obj
  }, {} as { [k: string]: V })
}

export const sanitize = (html: string): string => {
  return xss.filterXSS(html)
}
