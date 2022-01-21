import { useEffect, useState } from 'react'

/**
 * A hook to unable using an Intersection Observer.
 *
 * Wraps the logic in a try/catch because some browsers don't support IntersectionObserver
 * and this would throw an error, rendering the app unusable for those users.
 * * Currently only supports observing one node per usage, but could be modified to handle more.
 *
 * @param ref : Current code expects a div element
 * @param rootMargin : String
 *                   : CSS Margin syntax - sets an invisible box around the root
 *                   : Example: '0px 0px 0px 0px'
 * @returns Boolean : true if the DOM element crosses the threshold, otherwise false
 */

type IntersectionObserverOptions = {
  root?: HTMLElement | null
  rootMargin?: string
  threshold?: number
}

const useIntersectionObserver = ({
  root = null,
  rootMargin = '0px',
  threshold = 0,
}: IntersectionObserverOptions) => {
  const [observedElementRef, setObservedElementRef] = useState<HTMLElement | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    try {
      const observer = new IntersectionObserver(
        // Destrucure first entry since we only observe one node at a time
        ([entry]) => {
          setIsIntersecting(entry.isIntersecting)
        },
        { root, rootMargin, threshold },
      )

      if (observedElementRef) {
        observer.observe(observedElementRef)
      }

      return () => {
        if (observedElementRef) {
          observer.disconnect()
        }
      }
    } catch (e) {}
  }, [observedElementRef, root, rootMargin, threshold])

  return [setObservedElementRef, isIntersecting]
}

export default useIntersectionObserver
