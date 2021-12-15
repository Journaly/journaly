/* Takes an event and a predicate. Traverses up the DOM evaluating the
 * prediacte on every ancestor element of the event target, whatever "target"
 * means in the context of the browser specific event. Use and modify with
 * caution, the type system is of little help here.
 */
const findEventTargetParent = (
  event: any,
  pred: (el: HTMLElement) => boolean
) => {
  if (event.path) {
    return event.path.find(pred)
  } else if (event.srcElement || event.target) {
    let currentEl: HTMLElement | null = (event.srcElement || event.target)
    while (currentEl) {
      if (pred(currentEl))
        return currentEl

      currentEl = currentEl.parentElement
    }
  }
}

export {
  findEventTargetParent
}
