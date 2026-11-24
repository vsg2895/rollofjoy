import { ImageResponse } from 'next/og'
import { SHARE_IMAGE_ALT } from '@/lib/seo'

/**
 * Dynamic Open Graph / Twitter card image.
 *
 * Until now no og:image existed anywhere while twitter:card was set to
 * `summary_large_image`, so every share of these pages rendered as an empty
 * card — the single most visible SEO/social gap on the site. Generating it here
 * means it can never drift out of sync with the site name, and needs no binary
 * asset committed to the repo.
 *
 * Next.js links this file automatically on the home page only. Every other
 * page sets its own `openGraph`, which REPLACES the layout's (metadata
 * merges shallowly) and drops this card — so those pages restate it via
 * `SHARE_IMAGES` in lib/seo, which also holds the alt text below.
 */
export const alt = SHARE_IMAGE_ALT
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** A die face at card size: which of the nine slots carry a pip. */
const FIVE = [0, 2, 4, 6, 8]

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          background: '#f7f2ea',
          color: '#1d1a2f',
          fontFamily: 'sans-serif',
        }}
      >
        {/* A single die, tilted, standing on its blue drop — the brand's one
            idea at the only size a share card gets read. Satori has no
            `box-shadow` for a rotated box, so the drop is a SECOND DIE behind
            it, offset; that is also how the logo itself is drawn. */}
        <div style={{ display: 'flex', position: 'absolute', left: 92, top: 196, width: 150, height: 150, borderRadius: 38, background: '#0078bf', transform: 'rotate(12deg)' }} />
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            position: 'absolute',
            left: 78,
            top: 182,
            width: 150,
            height: 150,
            borderRadius: 38,
            background: '#ffe14d',
            border: '5px solid #1d1a2f',
            transform: 'rotate(12deg)',
            padding: 18,
          }}
        >
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} style={{ display: 'flex', width: '33.333%', height: '33.333%', alignItems: 'center', justifyContent: 'center' }}>
              {FIVE.includes(i) ? <div style={{ display: 'flex', width: 20, height: 20, borderRadius: 10, background: '#1d1a2f' }} /> : null}
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 24,
            letterSpacing: 4,
            textTransform: 'uppercase',
            background: '#ff5a36',
            color: '#1d1a2f',
            border: '3px solid #1d1a2f',
            borderRadius: 999,
            padding: '12px 30px',
            fontWeight: 800,
          }}
        >
          Happy casinos, honest bonuses
        </div>
        {/* Satori needs an EXPLICIT display on any element with more than one
            child — the wordmark is three coloured spans, so this one says flex
            rather than relying on the browser default it never sees. */}
        <div style={{ display: 'flex', fontSize: 104, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 26, padding: '0 60px' }}>
          {/* Three colours, so the spans must touch exactly. All three are the
              DEEP values: the bright pink is 2.78:1 on this paper and could
              not carry a letter, where #C62A08 is 5.04 and #0062A0 is 5.79. */}
          <span>roll</span><span style={{ color: '#0062a0' }}>of</span><span style={{ color: '#c62a08' }}>joy</span>
        </div>
        <div style={{ display: 'flex', fontSize: 26, marginTop: 26, color: '#4a4560', fontWeight: 600 }}>
          18+ · Gamble responsibly
        </div>
      </div>
    ),
    size,
  )
}
