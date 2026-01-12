import { useEffect, useRef } from 'react'

export default function TypewriterText({ text }) {
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!ref.current) return

    if (hasAnimated.current) return
    hasAnimated.current = true

    const p = ref.current
    p.textContent = ''

    let i = 0
    const speed = 25

    const type = () => {
      if (i < text.length) {
        p.textContent += text.charAt(i)
        i++
        setTimeout(type, speed)
      }
    }

    type()
  }, [text])

  return <p ref={ref} />
}
