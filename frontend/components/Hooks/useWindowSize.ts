import { useState, useEffect } from 'react'

type WindowSize = {
  width: number
  height: number
}

const useWindowSize = (
  initialWidth = Infinity,
  initialHeight = Infinity,
): WindowSize => {
  const isClient = typeof window === 'object'

  const getSize = (): WindowSize => {
    return {
      width: isClient ? window.innerWidth : initialWidth,
      height: isClient ? window.innerHeight : initialHeight,
    }
  }

  const [windowSize, setWindowSize] = useState<WindowSize>(getSize)

  useEffect((): (() => void) | void => {
    if (!isClient) return

    function handleResize() {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

export default useWindowSize
