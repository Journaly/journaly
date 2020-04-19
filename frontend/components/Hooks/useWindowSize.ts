import { useState, useEffect } from 'react'

interface WindowSize {
  height: number
  width: number
}

const useWindowSize = (): WindowSize => {
  const isClient = typeof window === 'object'

  const getSize = () => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    }
  }

  const [windowSize, setWindowSize] = useState<WindowSize>(getSize)

  useEffect(() => {
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
