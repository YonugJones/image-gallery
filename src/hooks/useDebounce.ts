import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delayMs: 300) {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    // after delayMs, update the debounced value to the latest value
    const timerId = window.setTimeout(() => {
      setDebounceValue(value)
    }, delayMs)

    // cleanup: if value changes before the delay ends, cancel the previous timer
    return () => {
      window.clearTimeout(timerId)
    }
  }, [value, delayMs])

  return debounceValue
}
