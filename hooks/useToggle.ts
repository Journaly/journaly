import { useCallback, useState } from 'react'

/**
 * A simple custom React hook to simply and securely
 * implement a boolean toggle.
 * @param initialValue
 */

export default function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue((v) => !v)
  }, [])

  return [value, toggle]
}
