import { useRef, useCallback } from 'react'

/**
 * Returns a memoized function that will only call the passed function when it hasn't been called for the wait period
 * @param callback The function to be called
 * @param wait Wait period after function hasn't been called for
 * @returns A memoized function that is debounced
 */
const useDebouncedCallback = <CallbackArgs extends any[]>(
  callback: (...args: CallbackArgs) => void,
  wait: number,
) => {
  // Use a ref to store the timeout between renders
  // and prevent changes to it from causing re-renders
  const timeout = useRef()

  return useCallback(
    (...args) => {
      const later = () => {
        clearTimeout(timeout.current)
        callback(...args)
      }

      clearTimeout(timeout.current)
      timeout.current = setTimeout(later, wait)
    },
    [callback, wait],
  )
}

export default useDebouncedCallback
