import Link from 'next/link'

/**
 * Roll of Joy brand mark, from sites/rollofjoy.html: two dice caught
 * mid-throw. A blue one behind, a YELLOW one in front showing five pips, both
 * knocked 12° over, with three motion lines trailing off to the left and a
 * small pink spark at the top right. A die in the air, which is the name.
 *
 * Inlined SVG rather than an image: it renders instantly with no extra request
 * and stays crisp at any size. The artwork is aria-hidden; the Link's name is
 * its visible text.
 *
 * THE WORDMARK IS ONE WORD IN THREE COLOURS — ink, blue, pink — which is the
 * mockup's own `roll<i>of</i><b>joy</b>`. All three are the deep values: the
 * bright pink is 2.78:1 on this paper and could not carry a letter, where
 * #C62A08 is 5.04 and #0062A0 is 5.79. The bright pink stays in the artwork
 * beside it, where it is a fill.
 *
 * The footer needs no second set: it is the ink ground, and there both the
 * yellow and the cream read at over 13:1, so `onDark` swaps the whole wordmark
 * to the page cream with the yellow accent rather than deepening anything.
 *
 * `taglineClassName` lets a caller hide the tagline where the header runs out
 * of room, rather than shipping a second, shorter logo.
 */
export default function Logo({
  className = '',
  taglineClassName = '',
  onDark = false,
}: {
  className?: string
  taglineClassName?: string
  onDark?: boolean
}) {
  return (
    <Link
      href="/"
      className={`inline-flex min-h-11 shrink-0 items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
        onDark ? 'focus-visible:ring-offset-navy' : 'focus-visible:ring-offset-cream'
      } ${className}`.trim()}
    >
      <svg viewBox="0 0 52 52" className="h-11 w-11 shrink-0 sm:h-[52px] sm:w-[52px]" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
        {/* The motion lines, trailing left. */}
        <g stroke="#0078bf" strokeWidth="3" strokeLinecap="round">
          <path d="M3 22h7M1.5 30h9M4 38h6" />
        </g>
        {/* The blue die behind. */}
        <rect x="15" y="9" width="34" height="34" rx="9" fill="#0078bf" transform="rotate(12 32 26)" />
        {/* The yellow die in front, showing five. */}
        <rect x="12" y="7" width="34" height="34" rx="9" fill="#ffe14d" stroke="#1d1a2f" strokeWidth="2.5" transform="rotate(12 29 24)" />
        <g fill="#1d1a2f" transform="rotate(12 29 24)">
          <circle cx="22.5" cy="18" r="2.6" />
          <circle cx="35.5" cy="18" r="2.6" />
          <circle cx="20.5" cy="27" r="2" />
          <circle cx="24.2" cy="31.2" r="2" />
          <circle cx="29" cy="32.6" r="2" />
          <circle cx="33.8" cy="31.2" r="2" />
          <circle cx="37.5" cy="27" r="2" />
        </g>
        {/* The spark. */}
        <circle cx="45" cy="9" r="3" fill="#ff5a36" stroke="#1d1a2f" strokeWidth="2" />
      </svg>

      <span className="flex flex-col leading-none">
        <span className={`font-display text-[25px] sm:text-[30px] ${onDark ? 'text-cream' : 'text-ink'}`}>
          roll<i className={`not-italic ${onDark ? 'text-night-accent' : 'text-sea'}`}>of</i>
          <b className={`font-normal ${onDark ? 'text-night-accent' : 'text-brand'}`}>joy</b>
        </span>
        <span className={`mt-[7px] text-[11.5px] font-bold tracking-[0.06em] ${onDark ? 'text-night-faint' : 'text-muted'} ${taglineClassName}`.trim()}>
          Happy casinos, honest bonuses
        </span>
        {/* The link's name is its visible text plus this — no aria-label that
            could disagree with what is on screen. */}
        <span className="sr-only"> home</span>
      </span>
    </Link>
  )
}
