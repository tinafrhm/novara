import Lottie from 'lottie-react'
import { useReducedMotion } from '../hooks'

type Props = {
  data: object
  className?: string
}

export function LottiePlayer({ data, className }: Props) {
  const reduce = useReducedMotion()
  return (
    <div className={className} aria-hidden="true">
      <Lottie animationData={data} loop={!reduce} autoplay={!reduce} renderer="svg" />
    </div>
  )
}
