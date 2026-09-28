import { fireEvent, render } from '@testing-library/react'
import { createElement } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { CursorGlow } from '@/components/portfolio/CursorGlow'

describe('CursorGlow', () => {
  let paint: FrameRequestCallback

  beforeEach(() => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) => ({
        addEventListener: vi.fn(),
        matches: query.includes('hover: hover'),
        media: query,
        onchange: null,
        removeEventListener: vi.fn(),
      })),
    )
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn((callback: FrameRequestCallback) => {
        paint = callback
        return 1
      }),
    )
    vi.stubGlobal('cancelAnimationFrame', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('follows a fine pointer and hides when it leaves the page', () => {
    const { container } = render(createElement(CursorGlow))
    const glow = container.querySelector<HTMLElement>('.cursor-glow')!

    fireEvent.pointerMove(window, { clientX: 320, clientY: 240 })
    paint(0)

    expect(glow.dataset.visible).toBe('true')
    expect(glow.style.getPropertyValue('--cursor-x')).toBe('320px')
    expect(glow.style.getPropertyValue('--cursor-y')).toBe('240px')

    fireEvent.pointerLeave(document.documentElement)
    expect(glow.dataset.visible).toBe('false')
  })
})
