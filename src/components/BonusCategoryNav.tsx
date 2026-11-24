import Link from 'next/link'
import { resolveImageUrl } from '@/lib/images'
import { COPY } from '@/constants/copy'
import type { BonusSection } from '@/lib/api'

/**
 * The catch-all heading, which the mix deliberately leaves out.
 *
 * Every offer not filed under a real type lands under "Special Offers", so it
 * is not a type at all — it is the whole area, already reachable from the nav
 * and the offers page. Hidden here rather than in the admin: the admin's
 * "Shown" switch would also remove it from the menu and the sections.
 */
export const CATCH_ALL_SLUG = 'special-offers'

/**
 * "Browse by bonus type", from sites/rollofjoy.html (`.btypes` / `.btype`):
 * a grid of full PILLS. Each is an outlined 999px capsule carrying the type's
 * icon on a tinted disc at one end, its name over its offer count in the
 * middle, and an arrow in a ring at the other — and it fills YELLOW and tilts
 * a degree when you point at it.
 *
 * Separate pills rather than one ruled block, which is what a sibling does
 * with the same section: this design's unit is the capsule, every control on
 * the page is one, and a rectangular block ruled into cells would be the only
 * square thing here. It also sidesteps the arithmetic that block needs — with
 * pills there is no internal rule to kill, so any number of types lays out
 * correctly at any column count with nothing to keep in step.
 *
 * THE DISC TAKES A TINT, NOT A SATURATED FILL. The mockup draws its own line
 * icons in ink or cream on a solid pink, blue or green disc; the icons here
 * arrive from the admin as full-colour artwork, and a saturated disc behind an
 * arbitrary colour is a clash nobody can predict. The three tints read under
 * anything and keep the cycle — and ink is over 13:1 on all three.
 *
 * This component renders NO HEADING. The section's head — its title and "view
 * all" — is drawn by the page's own `SectionHead`, and a second <h2> carrying
 * the same id as that one is a duplicate id, not a heading.
 *
 * Each pill opens that type's own page. The counts are the SITE's — active,
 * claimable, owned by a casino attached here — resolved server-side. Renders
 * nothing when the site has no Bonus area or every type is empty.
 */
export default function BonusCategoryNav({ sections }: { sections: BonusSection[] }) {
  const types = sections.filter((section) => section.slug !== CATCH_ALL_SLUG)
  if (types.length === 0) return null

  return (
    <ul className="btypes-grid grid grid-cols-1 gap-4 min-[46rem]:grid-cols-2 min-[67.5rem]:grid-cols-3" role="list">
      {types.map((section) => (
        <li key={section.id} className="min-w-0">
          <Link
            href={`/bonuses/${section.slug}`}
            className="btype flex h-full items-center gap-[18px] py-5 pl-[22px] pr-5 text-ink"
          >
            <span aria-hidden className="btype-plate grid h-14 w-14 shrink-0 place-items-center rounded-full">
              {/* The type's own icon, as in the Bonus menu. A plain <img>:
                  next/image refuses SVG. alt="" because the label names it. */}
              {section.icon_path && (
                <img src={resolveImageUrl(section.icon_path)!} alt="" width={26} height={26} className="h-[26px] w-[26px]" />
              )}
            </span>
            <span className="min-w-0">
              <b className="block text-[17px] font-extrabold leading-[1.2] [overflow-wrap:anywhere] sm:text-[18px]">
                {section.name}
              </b>
              <span className="text-[14px] font-semibold text-muted">
                {section.offers_count} {section.offers_count === 1 ? COPY.bonusCategory.countOne : COPY.bonusCategory.countMany}
              </span>
            </span>
            <span aria-hidden className="ml-auto grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full border-2 border-ink font-extrabold">
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
