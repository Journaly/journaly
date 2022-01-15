import { useState, useEffect } from 'react'

/**
 * A simple hook to get dimensions of window.
 * Handles tracking and returning updated values on resizing.
 *
 * Example Usage:
 * const windowSize = useGetWindowSize()
 *
 * if (windowSize.width === someBreakpoint) {
 *  // Show mobile view
 * }
 */

type WindowSize = {
  width: number | null
  height: number | null
}

const useWindowSize = () => {
  // Make sure we're client-side / not server-side
  const isClient = typeof window === 'object'

  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: isClient ? window.innerWidth : null,
    height: isClient ? window.innerHeight : null,
  })

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEffect(() => {
    if (!isClient) return
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

export default useWindowSize
