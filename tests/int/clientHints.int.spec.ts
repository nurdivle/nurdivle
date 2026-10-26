import { describe, expect, it } from 'vitest'

import nextConfig from '../../next.config'

describe('client hint headers', () => {
  it('limits Payload theme negotiation to the admin panel', async () => {
    const rules = (await nextConfig.headers?.()) ?? []
    const criticalHintRules = rules.filter((rule) =>
      rule.headers.some(
        ({ key, value }) =>
          key.toLowerCase() === 'critical-ch' && value === 'Sec-CH-Prefers-Color-Scheme',
      ),
    )

    expect(criticalHintRules).toHaveLength(1)
    expect(criticalHintRules[0]?.source).toBe('/admin/:path*')
    expect(rules.find((rule) => rule.source === '/(.*)')).toBeDefined()
  })
})
