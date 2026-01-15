export default function Countdown({ currentSeconds, totalSeconds, isPaused }) {
  
  const progress = currentSeconds / totalSeconds

  return (
    <div
      className={`countdown-wrapper ${isPaused ? 'paused' : ''}`}
      style={{ '--t-total': totalSeconds }}
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
      <div className="timer-text">{progress}s</div>
    </div>
  )
}
