import {useCallback, useEffect, useRef, useState} from 'react'

export function useOTPTimer(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = useCallback(() => {
    setSeconds(initialSeconds)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [initialSeconds])

  useEffect(() => {
    startTimer()
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [startTimer])

  return {seconds, isResendAvailable: seconds === 0, restartTimer: startTimer}
}
