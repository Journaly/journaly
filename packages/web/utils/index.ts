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
