/**
 * Get an element’s position relative to the document
 * @see https://stackoverflow.com/a/26230989/3610495
 */
export const getCoords = (htmlElement: HTMLElement) => {
  const box = htmlElement.getBoundingClientRect()

  const body = document.body
  const docEl = document.documentElement

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft

  const clientTop = docEl.clientTop || body.clientTop || 0
  const clientLeft = docEl.clientLeft || body.clientLeft || 0

  const top = box.top + scrollTop - clientTop
  const left = box.left + scrollLeft - clientLeft

  return { y: Math.round(top), x: Math.round(left) }
}
