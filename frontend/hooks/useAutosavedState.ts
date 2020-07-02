import React from 'react'

export default function useAutosavedState<T>(
  initialValue: T,
  opts = { key: 'default', debounceTime: 1000 },
): [T, (value: T) => void, () => void] {
  const storage: any = (typeof window !== 'undefined' && window.localStorage) || {}
  const storageKey = `autsave[${opts.key || 'default'}]`

  const [value, setValue] = React.useState<T>(initialValue)
  const valueRef = React.useRef({ savePending: false, value })

  React.useEffect(() => {
    if (storageKey in storage) {
      console.info('Restoring value from storage')
      const restoredInitialValue = JSON.parse(storage[storageKey])
      setValue(restoredInitialValue)
    }
  }, [])

  React.useEffect(() => {
    valueRef.current.value = value

    if (!valueRef.current.savePending) {
      valueRef.current.savePending = true

      setTimeout(() => {
        storage[storageKey] = JSON.stringify(valueRef.current.value)
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
