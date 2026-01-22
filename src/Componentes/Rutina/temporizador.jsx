export default function Countdown({ currentSeconds, totalSeconds, isPaused }) {
  // Evitar división por cero
  const safeTotal = totalSeconds > 0 ? totalSeconds : 1

  // Progreso (0 → 1)
  const progress = currentSeconds / safeTotal

  // Tiempo restante
  const remainingSeconds = Math.max(Math.ceil(safeTotal - currentSeconds), 0)

  // Formato mm:ss
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${min}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <div
      className={`countdown-wrapper ${isPaused ? 'paused' : ''}`}
      style={{ '--t-total': safeTotal }}
    >
      <svg className="timer-svg" viewBox="-50 -50 100 100">
        <circle className="circle-bg" r="45" />
        <circle
          className="circle-prog"
          r="45"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - progress}
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>

      <div className="timer-text">{formatTime(remainingSeconds)}</div>
    </div>
  )
}
