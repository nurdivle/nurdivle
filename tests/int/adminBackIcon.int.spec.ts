import { fireEvent, render, screen } from '@testing-library/react'
import { createElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { AdminBackIcon } from '@/components/admin/AdminBackIcon'

vi.mock('@payloadcms/ui', () => ({
  useTranslation: () => ({ i18n: { language: 'en' } }),
}))

describe('AdminBackIcon', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('turns the header icon link into a back control', async () => {
    window.history.pushState(null, '', '/admin')
    window.history.pushState(null, '', '/admin/collections/users')
    const goBack = vi.spyOn(window.history, 'back').mockImplementation(() => undefined)

    render(
      createElement(
        'a',
        { className: 'step-nav__home', href: '/admin' },
        createElement('span', { title: 'Dashboard' }, createElement(AdminBackIcon)),
      ),
    )

    const backControl = await screen.findByRole('link', { name: 'Go back' })
    expect(backControl.querySelector('span')?.getAttribute('title')).toBe('Go back')

    fireEvent.click(backControl)
    expect(goBack).toHaveBeenCalledOnce()
  })
})
