import { useEffect, useState, useRef } from 'react'

export default function AnimatedCounter({ value, suffix = '', duration = 800 }) {
  const [display, setDisplay] = useState(0)
  const startRef = useRef(null)
  const initial = useRef(value)

  useEffect(() => {
    if (value === display) return
    initial.current = display
    startRef.current = performance.now()

    const raf = (now) => {
      const elapsed = now - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(
        initial.current + (value - initial.current) * eased
      )
      setDisplay(current)
      if (progress < 1) requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [value, duration])

  return <>{display}{suffix}</>
}
