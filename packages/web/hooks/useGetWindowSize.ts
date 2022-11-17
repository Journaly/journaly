import { useState, useEffect, useMemo } from 'react'

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

const useWindowSize = () => {
  // Make sure we're client-side / not server-side
  const isClient = typeof window === 'object'

  const [windowWidth, setWindowWidth] = useState(isClient ? window.innerWidth : null)
  const [windowHeight, setWindowHeight] = useState(isClient ? window.innerHeight : null)

  const handleResize = () => {
    setWindowWidth(window.innerWidth)
    setWindowHeight(window.innerHeight)
  }

  useEffect(() => {
    if (!isClient) return
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return useMemo(
    () => ({
      width: windowWidth,
      height: windowHeight,
    }),
    [windowWidth, windowHeight],
  )
}

export default useWindowSize
