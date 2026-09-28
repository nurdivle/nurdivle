'use client'

import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!glow || !finePointer.matches || reducedMotion.matches) return

    let animationFrame = 0
    let pointerX = -1000
    let pointerY = -1000

    const paint = () => {
      glow.style.setProperty('--cursor-x', `${pointerX}px`)
      glow.style.setProperty('--cursor-y', `${pointerY}px`)
      glow.dataset.visible = 'true'
      animationFrame = 0
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
      if (!animationFrame) animationFrame = window.requestAnimationFrame(paint)
    }

    const hide = () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame)
        animationFrame = 0
      }
      glow.dataset.visible = 'false'
    }

    window.addEventListener('blur', hide)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', hide)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('blur', hide)
      window.removeEventListener('pointermove', handlePointerMove)
      document.documentElement.removeEventListener('pointerleave', hide)
    }
  }, [])

  return <div aria-hidden="true" className="cursor-glow" ref={glowRef} />
}
