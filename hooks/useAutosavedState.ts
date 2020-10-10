import React from 'react'

export default function useAutosavedState<T>(
  initialValue: T,
  opts = {
    key: 'default',
    debounceTime: 1000,
    initialTimestamp: 0,
  },
): [T, (value: T) => void, () => void] {
  const storage: any = (typeof window !== 'undefined' && window.localStorage) || {}
  const storageKey = `autosave[${opts.key || 'default'}]`

  const [value, setValue] = React.useState<T>(initialValue)
  const valueRef = React.useRef({ savePending: false, value })

  React.useEffect(() => {
    if (storageKey in storage) {
      const { value, timestamp } = JSON.parse(storage[storageKey])

      if (timestamp > opts.initialTimestamp) {
        console.info('Restoring value from storage')
        setValue(value)
      }
    }
  }, [])

  React.useEffect(() => {
    valueRef.current.value = value

    if (!valueRef.current.savePending) {
      valueRef.current.savePending = true

      setTimeout(() => {
        storage[storageKey] = JSON.stringify({
          value: valueRef.current.value,
          timestamp: Date.now(),
        })
        valueRef.current.savePending = false
        console.info(`Saved value on key ${storageKey}`)
      }, opts.debounceTime)
    }
  }, [value])

  const reset = () => {
    delete storage[storageKey]
    setValue(initialValue)
  }

  return [value, setValue, reset]
}
