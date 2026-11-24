import Image from 'next/image'
import Link from 'next/link'
import { resolveImageUrl } from '@/lib/images'
import { COPY } from '@/constants/copy'
import type { CasinoWithAttachment } from '@shared/types/casino'

/** How many region chips a card shows before collapsing the rest into a count. */
const REGIONS_SHOWN = 3

/**
 * Exported so the home page's picks list shows the same stars as a card.
 *
 * The deep pink #C62A08, not the mockup's #FF5A36, which is 3.05:1 on a card —
 * a filled star and an empty one would read as the same shape at the same
 * weight, which is the only thing a star rating has to do. The exact figure is
 * printed beside the stars everywhere they appear, so the colour is never the
 * only carrier.
 */
export function Stars({ rating, onDark = false }: { rating: number; onDark?: boolean }) {
  // `Math.round` rather than a partial star: the ratings are whole or half
  // numbers and a half-filled glyph at 16px reads as a rendering fault.
  const filled = Math.round(rating)
  const on = onDark ? 'text-night-accent' : 'text-gold'
  const off = onDark ? 'text-night-line' : 'text-line'

  return (
    <span
      className="inline-flex items-center tracking-[2px] text-[16px] leading-none"
      role="img"
      aria-label={`${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < filled ? on : off} aria-hidden>
          ★
        </span>
      ))}
    </span>
  )
}

/**
 * The grid the cards sit in — the mockup's `.list`: THREE across on a wide
 * screen, two on a tablet, one on a phone. Callers render
 * `<ol className={CASINO_LIST}>`; the order of the list is the ranking.
 *
 * `casino-list` drives the three-colour cycle on the cards' DROPS and their
 * FACE tints together (globals.css), so a row of three is pink / blue / green
 * and never repeats a pairing. It is on the LIST rather than inside the card
 * because `:nth-child` can only be written where the siblings are.
 *
 * The gap is bigger than the siblings' because every card here stands on a 7px
 * diagonal shadow: at a tighter gap the drop of one card touches the outline of
 * the next and the row reads as a single smeared block.
 */
export const CASINO_LIST = 'casino-list grid grid-cols-1 gap-[26px] min-[42.5rem]:grid-cols-2 min-[67.5rem]:grid-cols-3'

/**
 * A casino as a DICE TILE — `.cc` in sites/rollofjoy.html: an outlined card
 * standing on a hard diagonal drop in a toy colour, opening on a tinted FACE
 * with a pip punched into each corner and the logo on a plate in the middle.
 * A "Top roll" tab leans off the top edge on the leader and a rank pill is
 * knocked 8° over at the bottom right of the face.
 *
 * The card moves UP AND LEFT into its own shadow on hover, which is the
 * opposite of what the buttons do — a button presses into the page, a card
 * lifts off it. That inversion is how a reader tells the card from the
 * controls inside it.
 *
 * THE RANK PILL IS `aria-hidden`. The list order already IS the ranking, and a
 * screen reader hearing a bare "2" before every name learns nothing it did not
 * already have from the list. It is on the card because the mockup draws it
 * there and because a die face wants a number, not because the number is
 * information the page was missing.
 *
 * The mockup's `.facts` pair — MIN. DEPOSIT and PAYOUT — is NOT shipped: no
 * column in the API holds either, and a payout time is the one figure this
 * site has promised not to invent. The regions take that slot, which are real.
 */
export default function CasinoCard({
  casino,
  rank,
}: {
  casino: CasinoWithAttachment
  rank?: number
}) {
  // The casino's "Image" (logo), NOT the wide "Banner Image" used big on the
  // casino page. Falls back to the banner if there is no Image.
  const image = resolveImageUrl(casino.image_path ?? casino.banner_image)

  const regions = casino.countries ?? []
  const shownRegions = regions.slice(0, REGIONS_SHOWN)
  const extraRegions = regions.length - shownRegions.length
  const isLeader = rank === 1

  return (
    /* `pt-3.5` on the <li>, not the card: the "Top roll" tab hangs 14px above
       the card's top edge, and without room reserved for it on the list item
       the tab is clipped by the row above or overlaps it. */
    <li className="flex pt-3.5">
      <div className="rw relative flex w-full flex-col rounded-[28px]">
        {isLeader && (
          <span className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 -rotate-3 whitespace-nowrap rounded-full border-2 border-ink bg-accent px-3.5 py-[5px] text-[12.5px] font-extrabold uppercase tracking-[0.06em] text-ink">
            {COPY.casinos.topPick}
          </span>
        )}

        {/* The face. Its tint cycles with the card's drop — see CASINO_LIST. */}
        <div className="cc-face relative mx-3.5 mt-3.5 grid h-[156px] place-items-center rounded-[18px]">
          {/* The four corner pips. Decorative: this is the die face, not data. */}
          <span aria-hidden className="pointer-events-none absolute inset-3">
            <i className="absolute left-0 top-0 block h-3 w-3 rounded-full bg-ink/85" />
            <i className="absolute right-0 top-0 block h-3 w-3 rounded-full bg-ink/85" />
            <i className="absolute bottom-0 left-0 block h-3 w-3 rounded-full bg-ink/85" />
            <i className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-ink/85" />
          </span>

          {/* The plate. A FIXED height at every breakpoint, never `auto`:
              operator artwork ranges from square to wide banner, and an auto
              box sizes itself to whichever it happens to get. White because
              operator logos carry their own ground — see `.clogo`. */}
          <span className="clogo grid h-[84px] w-[min(210px,75%)] place-items-center overflow-hidden rounded-[16px] p-2 text-center">
            {image ? (
              <Image src={image} alt={`${casino.name} logo`} width={320} height={160} sizes="210px" className="max-h-16 w-full object-contain" />
            ) : (
              <span className="font-display text-[18px] leading-[1.05] text-ink [overflow-wrap:anywhere]">{casino.name}</span>
            )}
          </span>

          {rank !== undefined && (
            <span aria-hidden className="font-display absolute -bottom-4 right-4 grid h-[46px] w-[46px] rotate-[8deg] place-items-center rounded-[14px] bg-ink text-[20px] text-cream">
              {rank}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3.5 px-[22px] pb-[22px] pt-6">
          <h3 className="font-display text-[24px] text-ink [overflow-wrap:anywhere] sm:text-[28px]">{casino.name}</h3>

          <p className="flex items-center gap-2.5">
            <Stars rating={casino.rating} />
            <span aria-hidden className="text-[14.5px] font-extrabold text-ink tabular-nums">{casino.rating.toFixed(1)}</span>
          </p>

          {/* The welcome bonus. Dropped entirely when the operator has none,
              rather than left as an empty line. */}
          {casino.bonuses && (
            <p className="text-[17px] font-extrabold leading-[1.3] text-ink [overflow-wrap:anywhere] sm:text-[18.5px]">
              <small className="mb-[3px] block text-[12.5px] font-extrabold uppercase tracking-[0.08em] text-sea">Welcome bonus</small>
              {casino.bonuses}
            </p>
          )}

          {shownRegions.length > 0 && (
            <ul className="flex flex-wrap gap-2" aria-label="Accepts players from">
              {shownRegions.map((country) => (
                <li key={country.id} className="rounded-full bg-cream px-3 py-1 text-[13px] font-bold text-ink-soft">
                  {country.name}
                </li>
              ))}
              {extraRegions > 0 && (
                /* A count, not a tooltip: the full list is on the review page,
                   and a hover affordance is invisible on a phone. */
                <li className="rounded-full bg-win-bg px-3 py-1 text-[13px] font-bold text-win">+{extraRegions} more</li>
              )}
            </ul>
          )}

          {/* The actions. `mt-auto` ends every card in a row on its buttons,
              but it is NOT the gap above them — it is whatever slack the card
              has left, which is zero on the tallest card in the row. The
              `pt-2` is the floor, and `mt-auto` only ever adds to it. */}
          <div className="mt-auto grid gap-2.5 pt-2">
            <a
              href={casino.attachment.affiliate_url}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="btn-or btn-flat min-h-12 w-full px-5 text-[15px]"
            >
              {COPY.casinos.visitCasino}
            </a>
            <Link href={`/casinos/${casino.slug}`} className="inline-flex min-h-11 items-center justify-center text-center text-[15px] font-bold text-sea transition-colors hover:text-brand">
              {COPY.casinos.readReview} <span aria-hidden className="ml-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </li>
  )
}
