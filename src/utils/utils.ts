import { useState, useEffect } from 'react';

export const useDebounceFunction = <F extends (...args: any[]) => void>(
  func: F,
  delay: number
): F => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    }
  }, [timer])

  const debouncedFunction = (...args: Parameters<F>) => {
    if (timer) clearTimeout(timer)
    const newTimer = setTimeout(() => {
      func(...args)
    }, delay)
    setTimer(newTimer)
  }

  return debouncedFunction as F
}
