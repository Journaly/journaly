import { useEffect } from 'react'

type Options = {
  // The element that we want to keep focus within
  rootElement: HTMLElement
  // Callback for hitting the escape key
  onClose: () => void
  // Once the focus trap is done with, focus should return to the element that initiated it
  returnFocusElementId?: string
  // Class to add to the body while focus trapped
  bodyClass?: string
}

const ESCAPE_KEY = 27
const TAB_KEY = 9

/*
 * Focus trap is used to keep a user's focus on a particular subset of the website.
 *
 * For example, when a user opens a modal, tabbing should cycle through only the elements in the modal,
 * and not the rest of the site. This pattern is an accessibility best practice, see
 * https://www.w3.org/TR/wai-aria-practices/#dialog_modal for more detail.
 */
function useFocusTrap(options: Options) {
  const { rootElement, onClose, returnFocusElementId, bodyClass } = options

  const handleTabKey = (event: KeyboardEvent): void => {
    const focusableModalElements = rootElement.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select',
    )
    const firstElement = focusableModalElements[0] as HTMLElement
    const lastElement = focusableModalElements[focusableModalElements.length - 1] as HTMLElement

    // Make sure the first element is focused
    if (![...focusableModalElements].includes(document.activeElement as HTMLElement)) {
      firstElement.focus()
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      // Tabbing forwards on the last element focuses the first element
      firstElement.focus()
      event.preventDefault()
    } else if (event.shiftKey && document.activeElement === firstElement) {
      // Tabbing backwards with Shift + Tab on the first element focuses the last element
      lastElement.focus()
      event.preventDefault()
    }
  }

  const keyListenersMap = new Map([
    [ESCAPE_KEY, onClose],
    [TAB_KEY, handleTabKey],
  ])

  useEffect(() => {
    function keyListener(event: KeyboardEvent): void {
      const listener = keyListenersMap.get(event.keyCode)
      return listener && listener(event)
    }
    document.addEventListener('keydown', keyListener)

    return () => {
      document.removeEventListener('keydown', keyListener)
    }
  })

  useEffect(() => {
    if (bodyClass) {
      document.body.classList.add(bodyClass)
    }

    return () => {
      if (bodyClass) {
        document.body.classList.remove(bodyClass)
      }

      if (returnFocusElementId) {
        const elementToFocus = document.getElementById(returnFocusElementId)
        if (elementToFocus) elementToFocus.focus()
      }
    }
  }, [])
}

export default useFocusTrap
