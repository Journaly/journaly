import { filterXSS, whiteList } from 'xss'
export * from './css'
export * from './date'
export * from './dom'

// Polyfill Object.fromEntries
export function fromEntries<V>(iterable: Iterable<[string, V]>) {
  return [...iterable].reduce((obj, [key, val]) => {
    obj[key] = val
    return obj
  }, {} as { [k: string]: V })
}

export const sanitize = (html: string): string => {
  return filterXSS(html, {
    whiteList: {
      ...whiteList,
      a: ['href', 'target', 'rel'],
      table: ['style'],
      col: ['style'],
      tr: ['style'],
    },
  })
}

export const iOS = () => {
  return (
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(
      navigator.platform,
    ) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  )
}

export const wait = (timeout: number) => {
  return new Promise((res) => setTimeout(res, timeout))
}

// Provide upper bound (a) and lower bound (c) and you get back a val that is either b or clamped witin the range of a & c.
// If b is between a & c, we return b.
// If b is outside that range, we return the closest number to b within the range, which will be either a or c.
// a: 3, b: 10, c: 6 returns c
export const clamp = (a: number, b: number, c: number) => {
  return Math.max(a, Math.min(b, c))
}
