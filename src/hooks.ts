import { useEffect, useRef, useState } from 'react'

export function useReducedMotion() {
  const [reduce, setReduce] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduce(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return reduce
}

export function useAnimatedNumber(target: number) {
  const reduce = useReducedMotion()
  const [value, setValue] = useState(target)
  const valueRef = useRef(target)

  useEffect(() => {
    if (reduce) {
      valueRef.current = target
      setValue(target)
      return
    }
    const from = valueRef.current
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 450)
      const eased = 1 - (1 - progress) ** 3
      const next = Math.round(from + (target - from) * eased)
      valueRef.current = next
      setValue(next)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, reduce])

  return value
}
