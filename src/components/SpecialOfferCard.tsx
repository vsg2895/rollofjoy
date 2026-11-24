import Image from 'next/image'
import Link from 'next/link'
import { resolveImageUrl } from '@/lib/images'
import type { SpecialOffer } from '@shared/types/specialOffer'

/**
 * The bonus type whose cards carry a Claim button.
 *
 * WHY A TYPE AND NOT THE LINK. Claim used to appear on any offer that happened
 * to carry an affiliate URL, which made the card's primary action a property of
 * the data rather than an editorial decision: filing a bonus under "Free Spins"
 * or "Cashback" still produced a Claim button, because those offers have links
 * too. Claim now means one thing — this is a Special Offer — and whether the
 * offer has a link of its own no longer decides it.
 */
export const CLAIMABLE_BONUS_CATEGORY = 'special-offers'

/**
 * The grid offer cards sit in — the mockup's `.offers`:
 * `minmax(min(100%,320px),1fr)`.
 *
 * `offer-grid` drives BOTH `:nth-child` cycles on the stickers: the alternating
 * TILT (odd leans left, even leans right) and the three-tone type chip. A CSS
 * cycle is right HERE and wrong on the bonus types: a tilt and a chip colour
 * carry no meaning, so repainting when the set changes costs nothing.
 *
 * The gap is 24px because every sticker is rotated a degree: at a tighter gap
 * the corners of two neighbours cross.
 */
export const OFFER_GRID = 'offer-grid grid grid-cols-1 gap-6 sm:grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))]'

/** Up to two initials, for a casino with no logo artwork. */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

/**
 * An offer card for the listing grids — `.offer` in sites/rollofjoy.html: a
 * STICKER. An outlined card tilted a degree with its bottom-right corner
 * FOLDED BACK, which straightens and grows slightly when you point at it.
 *
 * The fold is one pseudo-element (see `.offer` in globals.css) and it is the
 * reason this card reserves padding on its right: the fold is 54px of opaque
 * paper over the bottom-right corner, and anything laid under it disappears.
 * The amount and the footer row both stop short of it.
 *
 * `logo` is ACCEPTED AND UNUSED, on purpose. A casino page passes its own logo
 * down because the offers it lists arrive without their casino attached, and
 * every sibling's card paints that mark somewhere. This one does not: the
 * mockup's sticker names the operator in words and spends its space on the
 * amount. The prop stays in the signature so a caller written against any site
 * in the network still compiles.
 */
export default function SpecialOfferCard({ offer }: { offer: SpecialOffer; logo?: string | null }) {
  const casinoName = offer.casino?.name ?? ''
  const kind = offer.bonus_category_name ?? 'Bonus'
  // Claim is a property of the bonus TYPE, not of whether a link happens
  // to be filled in. See CLAIMABLE_BONUS_CATEGORY.
  const claimable = offer.bonus_category_slug === CLAIMABLE_BONUS_CATEGORY

  return (
    <article className="offer flex flex-col gap-2.5 rounded-[26px] px-6 pb-[22px] pt-6">
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <span className="text-[15px] font-extrabold text-ink [overflow-wrap:anywhere]">
          {casinoName || kind}
        </span>
        {/* The type chip, cycling the three tints — ink reads on all of them
            at over 13:1. */}
        <span className="o-kind rounded-full px-3 py-[5px] text-[12.5px] font-extrabold uppercase tracking-[0.06em] text-ink">
          {kind}
        </span>
      </div>

      {/* `pr-5` keeps the amount clear of the folded corner. */}
      <h3 className="font-display pr-5 text-[26px] leading-[1.05] text-ink [overflow-wrap:anywhere] sm:text-[30px]">
        <Link href={`/special-offers/${offer.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {offer.bonuses || offer.title}
        </Link>
      </h3>
      {/* When the headline above is the AMOUNT, the offer's own name still has
          to appear somewhere — otherwise two different offers of the same size
          are indistinguishable in a grid. */}
      {offer.bonuses && <p className="pr-5 text-[14.5px] font-medium text-ink-soft [overflow-wrap:anywhere]">{offer.title}</p>}

      {/* `pr-[50px]` is the fold again: the mockup's own `.o-foot`. */}
      <div className="relative z-10 mt-1.5 flex flex-wrap items-center justify-between gap-2.5 pr-[50px]">
        <span
          className="text-[15px] leading-none tracking-[2px] text-gold"
          role="img"
          aria-label={`${offer.rating} out of 5`}
        >
          {'★'.repeat(offer.rating)}
          <span className="text-line" aria-hidden>
            {'★'.repeat(5 - offer.rating)}
          </span>
        </span>
        {/*
          * Claim belongs to the Special Offers bonus type and to nothing else.
          *
          *   Special Offers + link   →  Claim → the casino
          *   Special Offers, NO link →  Claim, leading to the offer's own page,
          *                              where the terms and the operator are.
          *   any other bonus type    →  "See offer", the plain way in.
          */}
        {claimable ? (
          offer.affiliate_url ? (
            <a href={offer.affiliate_url} target="_blank" rel="nofollow sponsored noopener" className="btn-or btn-flat min-h-11 whitespace-nowrap px-4 text-sm">Claim</a>
          ) : (
            // No affiliate URL of its own: the offer's page is the only place
            // that can lead to the operator. An internal link, so no sponsored rel.
            <Link href={`/special-offers/${offer.slug}`} className="btn-or btn-flat min-h-11 whitespace-nowrap px-4 text-sm">Claim</Link>
          )
        ) : (
          <Link href={`/special-offers/${offer.slug}`} className="inline-flex min-h-11 items-center whitespace-nowrap text-[14.5px] font-bold text-sea transition-colors hover:text-brand">
            See offer <span aria-hidden className="ml-1">→</span>
          </Link>
        )}
      </div>
    </article>
  )
}

/**
 * An offer as a row inside a group: the logo, whose offer it is, its name and
 * amount, and on the right the way in. The whole row opens the offer (the
 * title link is stretched over it) and takes the deeper cream on hover.
 *
 * The SAME Claim rule as the card: Claim only for the Special Offers type —
 * to the casino when the offer has a link, to its own page when it has none.
 * Any other type shows "Details →".
 *
 * `heading` is the title's level: `h4` under a group card's `h3` (the home
 * page), `h3` where the rows sit straight under a section's `h2`.
 */
export function OfferRow({ offer, logo: logoOverride, heading: Heading = 'h4' }: { offer: SpecialOffer; logo?: string | null; heading?: 'h3' | 'h4' }) {
  const logo = logoOverride ?? resolveImageUrl(offer.casino?.image_path ?? offer.image_path)
  const claimable = offer.bonus_category_slug === CLAIMABLE_BONUS_CATEGORY
  const kicker = offer.casino?.name ?? offer.bonus_category_name ?? ''

  return (
    <li className="of relative grid grid-cols-[52px_minmax(0,1fr)] items-center gap-x-3.5 gap-y-2.5 border-b border-line px-4 py-3.5 last:border-b-0 sm:grid-cols-[52px_minmax(0,1fr)_auto] sm:px-5">
      {/* The plate stays WHITE: operator logos arrive with their own white
          ground baked in, and any other fill behind one shows as a hard
          rectangle inside the circle. */}
      <span aria-hidden className="flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-full border-2 border-ink bg-white p-1.5 text-xs font-extrabold text-ink">
        {logo ? (
          <Image src={logo} alt="" width={104} height={104} sizes="52px" className="h-full w-full object-contain" />
        ) : (
          initials(kicker || offer.title)
        )}
      </span>
      <div className="min-w-0">
        {kicker && <p className="text-[11px] font-extrabold uppercase tracking-[0.06em] text-sea">{kicker}</p>}
        <Heading className="text-[15px] font-bold leading-[1.3] text-ink [overflow-wrap:anywhere]">
          <Link href={`/special-offers/${offer.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {offer.title}
          </Link>
        </Heading>
        {offer.bonuses && <p className="text-sm font-extrabold text-brand [overflow-wrap:anywhere]">{offer.bonuses}</p>}
      </div>
      <div className="relative z-10 col-span-2 flex items-center justify-end gap-3 sm:col-span-1">
        {claimable ? (
          offer.affiliate_url ? (
            <a href={offer.affiliate_url} target="_blank" rel="nofollow sponsored noopener" className="btn-or btn-flat min-h-11 px-4 text-sm">Claim</a>
          ) : (
            // No affiliate URL of its own: the offer's page is the only place
            // that can lead to the operator. An internal link, so no sponsored rel.
            <Link href={`/special-offers/${offer.slug}`} className="btn-or btn-flat min-h-11 px-4 text-sm">Claim</Link>
          )
        ) : (
          <span aria-hidden className="text-[13px] font-extrabold text-sea">Details →</span>
        )}
      </div>
    </li>
  )
}
