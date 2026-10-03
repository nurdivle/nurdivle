import { NextRequest } from 'next/server'
import { describe, expect, it } from 'vitest'

import { proxy } from '../../src/proxy'

describe('default locale', () => {
  it('always redirects the site root to Turkish', () => {
    const request = new NextRequest('https://nurdivle.com/', {
      headers: { cookie: 'portfolio-locale=en' },
    })

    const response = proxy(request)

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('https://nurdivle.com/tr')
  })
})
