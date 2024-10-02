import { useEffect, useState } from 'react'

export interface TimerProps {
  createdAt: string
  onTimeUp: () => void
}

export const Timer: React.FC<TimerProps> = ({ createdAt, onTimeUp }) => {
  const calculateTimeLeft = () => {
    const createdTime = new Date(createdAt)
    const now = new Date()
    const difference = 10 * 60 * 1000 - (now.getTime() - createdTime.getTime())
    return Math.max(Math.floor(difference / 1000), 0)
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeUp])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <div>
      <span>Tiempo restante: {formatTime(timeLeft)}</span>
    </div>
  )
}
