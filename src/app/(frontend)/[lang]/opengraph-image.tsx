import { ImageResponse } from 'next/og'

export const alt = 'Developer portfolio'
export const contentType = 'image/png'
export const size = { height: 630, width: 1200 }

export default function OpenGraphImage() {
  const siteName = process.env.SITE_NAME || 'Nurdivle'

  return new ImageResponse(
    <div
      style={{
        alignItems: 'center',
        background: '#15171a',
        color: '#f0f1f2',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        padding: '80px',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '980px' }}>
        <div style={{ color: '#adb3ba', display: 'flex', fontSize: 34, letterSpacing: '0.16em' }}>
          PORTFOLIO
        </div>
        <div style={{ display: 'flex', fontSize: 82, fontWeight: 700, letterSpacing: '-0.04em' }}>
          {siteName}
        </div>
        <div style={{ color: '#9a9ea3', display: 'flex', fontSize: 32 }}>
          Software · Systems · Products
        </div>
      </div>
    </div>,
    size,
  )
}
