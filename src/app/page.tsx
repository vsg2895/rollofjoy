import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBonusArea, getCategories, getCategory, getSpecialOffers } from '@/lib/api'
import type { BonusSection } from '@/lib/api'
import { buildItemListSchema, buildWebPageSchema, jsonLdScript, buildFaqSchema, SHARE_IMAGES } from '@/lib/seo'
import { COPY } from '@/constants/copy'
import { FAQ_ITEMS } from '@/constants/faq'
import CasinoCard, { CASINO_LIST, Stars } from '@/components/CasinoCard'
import BonusCategoryNav from '@/components/BonusCategoryNav'
import BonusGroups from '@/components/BonusGroups'
import CategoryNav from '@/components/CategoryNav'
import FaqAccordion from '@/components/FaqAccordion'
import SpecialOfferCard, { OFFER_GRID } from '@/components/SpecialOfferCard'
import type { Category } from '@shared/types/category'
import type { CasinoWithAttachment } from '@shared/types/casino'
import type { SpecialOffer } from '@shared/types/specialOffer'
import { SITE_URL } from '@/lib/config'
import { casinosHeading } from '@/lib/categories'

/** Offers shown per bonus type in the home page's Bonuses section — one row. */
const HOME_BONUSES_PER_CATEGORY = 3


/**
 * Which of the nine slots on a die face are filled, by rank.
 *
 * The numbering runs left-to-right, top-to-bottom, so slot 5 is the centre and
 * 3 / 7 are the two opposite corners — the arrangement a real die uses, which
 * is the mockup's own `PIPS` map.
 *
 * This is CONTENT, not styling: the pip count IS the rank, which is why it is
 * computed from the position here rather than drawn by a `:nth-child` rule
 * alongside the angles and the drop colours. The face is `aria-hidden` and the
 * rank is never announced — the list order already carries it.
 */
const DIE_PIPS: readonly (readonly number[])[] = [[5], [3, 7], [3, 5, 7]]

/** The three toy tints, in the order the card faces and the type discs use
 *  them. An array rather than a `:nth-child` cycle because this list is
 *  exactly three long and these are POSITIONS: a cycle would keep going if the
 *  slice ever grew, and the fourth tint it reached for does not exist. */
const STEP_TINT = ['bg-tint-pink', 'bg-tint-blue', 'bg-tint-yellow'] as const

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? ''
const YEAR = new Date().getFullYear()

type Props = { searchParams: Promise<{ category?: string; page?: string }> }

// Resolve the selected category (default = first/highest-priority) for the home casinos section.
async function resolveCategory(searchParams: Props['searchParams']) {
  const sp = await searchParams
  const categories = (await getCategories()).data
  const selected =
    sp.category && categories.some((c) => c.slug === sp.category) ? sp.category : categories[0]?.slug
  return { categories: categories as Category[], selected }
}

export async function generateMetadata(): Promise<Metadata> {
  const title = `${COPY.home.homeTitle} ${YEAR} | ${SITE_NAME}`
  const description = COPY.home.metaDescription
  return {
    title,
    description,
    alternates: { canonical: '/' },
    openGraph: { type: 'website', url: '/', siteName: SITE_NAME, title, description, images: SHARE_IMAGES },
    twitter: { card: 'summary_large_image', title, description, images: SHARE_IMAGES },
  }
}

export default async function HomePage({ searchParams }: Props) {
  /*
   * THE HOME PAGE HAS ONE PAGE, so `?page=2` is a page past the end.
   *
   * Nothing here is paginated (the full list is /casinos), yet `/?page=2` and
   * every other number a crawler guessed answered 200 with the whole home page
   * and an `index` robots tag: a duplicate of `/` at a URL of its own. A 404
   * says it is not a page at all, the rule every paginated listing here applies
   * past its last page. `?page=1` never reaches this: proxy.ts 301s it to `/`.
   */
  if (Math.max(1, Number((await searchParams).page) || 1) > 1) notFound()

  const { categories, selected } = await resolveCategory(searchParams)

  const [categoryRes, offersRes, anyOffersRes, bonusRes] = await Promise.allSettled([
    selected ? getCategory(selected) : Promise.resolve(null),
    getSpecialOffers(selected, 6),
    // Site-wide, unfiltered, limit 1 — just "does a visible offer exist at all?".
    // Runs alongside the others, so it costs no extra round-trip of latency, and
    // the public endpoint already excludes offers whose visibility is off.
    getSpecialOffers(undefined, 1),
    // The bonus TYPES: the chip row under the hero AND the per-type Bonuses
    // section further down, so each type brings its first
    // HOME_BONUSES_PER_CATEGORY offers (one full row of the three-up grid).
    // The chips only read names, marks and counts, which the server counts
    // over the unlimited set. allSettled means a site without the Bonus area
    // renders neither, and falls back to the plain Special offers grid.
    getBonusArea(HOME_BONUSES_PER_CATEGORY),
  ])

  // Empty when the site does not publish the Bonus area, or when the
  // request failed — the strip renders nothing either way.
  const bonusSections: BonusSection[] = bonusRes.status === 'fulfilled' ? bonusRes.value : []

  const catData =
    categoryRes.status === 'fulfilled' && categoryRes.value ? categoryRes.value.data : null
  const casinos: CasinoWithAttachment[] = catData?.casinos ?? []
  const activeCategory = catData?.category ?? null
  // "See More" is only an affordance when there is actually more: compare the
  // category's full count against the rows this page received, rather than
  // hard-coding the page size on both sides where the two could drift apart.
  const hasMoreCasinos = (catData?.meta?.total ?? 0) > casinos.length
  // Offers are already scoped to the selected category and capped by the backend (?category=&limit=).
  const topOffers: SpecialOffer[] = offersRes.status === 'fulfilled' ? offersRes.value.data : []

  // Whether ANY special offer is visible on this site. Drives the hero CTA:
  // a button leading to an empty page is worse than no button. On a failed
  // request this stays false, so the CTA hides rather than promising content
  // that may not be there.
  const anyOffersVisible: boolean =
    anyOffersRes.status === 'fulfilled' && anyOffersRes.value.data.length > 0

  // Organization schema is emitted site-wide from the root layout; the home
  // page only adds its page-specific ItemList of top casinos.
  //
  // The list is the SELECTED category, not the whole catalogue, so it is named
  // and addressed as that category — it previously claimed the generic name
  // "Top Casinos at <brand>" and pointed at /casinos, describing neither the
  // rows below it nor a URL that renders them.
  const listSchema = buildItemListSchema(
    activeCategory ? `${activeCategory.name} — ${COPY.home.topCasinosTitle}` : COPY.home.topCasinosTitle,
    selected ? `${SITE_URL}/categories/${selected}` : `${SITE_URL}/casinos`,
    casinos.map((c, i) => ({ position: i + 1, name: c.name, url: `${SITE_URL}/casinos/${c.slug}` })),
  )

  const graph = [
    buildWebPageSchema({
      // Mirrors the actual <title>. The previous "Best Online Casinos <year>"
      // was generic boilerplate shipped identically by the sibling domains and
      // matched neither this page's title nor its H1.
      name: `${COPY.home.homeTitle} ${YEAR}`,
      url: SITE_URL,
      description: COPY.home.metaDescription,
    }),
    listSchema,
    // Same array the section below renders — markup-only FAQ is a violation.
    buildFaqSchema(SITE_URL, FAQ_ITEMS),
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(graph) }} />

      <main>
        {/* Hero — the mockup's opening: the page itself (no ground of its own,
            just the 2px ink rule that closes it) with the claim at the left and
            the week's three best rolls at the right as DICE CARDS — three
            outlined rows at three different angles on three different coloured
            drops, the second one nudged right so the set reads as thrown
            rather than stacked.

            `.slab` keeps its name so the shared class vocabulary holds across
            the network; here it is nothing but that closing rule. */}
        <section className="slab overflow-hidden py-12 sm:py-[76px] lg:pb-[90px]">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-[22px]">
            <div className="grid grid-cols-1 items-center gap-12 min-[56.25rem]:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] min-[56.25rem]:gap-14">
              <div>
                {/* The mockup's `.chip`: a yellow pill with a tiny die face
                    punched into its left end. BLUE on the dot, which is this
                    site's colour for a fact. */}
                <p className="live inline-flex items-center gap-2.5 rounded-full border-2 border-ink bg-accent py-1.5 pl-2 pr-4 text-[14px] font-bold text-ink [&::before]:ml-1.5 [&::before]:bg-sea">
                  {COPY.home.heroEyebrow}
                </p>
                <h1 className="font-display mt-6 text-[clamp(44px,7.6vw,108px)] text-balance text-ink">
                  {COPY.home.heroHeadline}{' '}
                  {/* The mockup sets this word in its bright pink under a 4px
                      blue text-shadow. The shadow is OFFSET, not an outline —
                      it adds nothing to the glyph's own contrast, and the
                      bright pink is 2.78:1 on this paper, under even the 3:1 a
                      display size needs. The deep pink is 5.04:1 and keeps the
                      shadow, which is what the effect was actually for. */}
                  <span className="text-brand [text-shadow:4px_4px_0_var(--color-blue)]">{COPY.home.heroHighlight}</span>
                  {COPY.home.heroHeadlineTail && <> {COPY.home.heroHeadlineTail}</>}
                </h1>
                <p className="mt-6 max-w-[540px] text-[17px] font-medium text-ink-soft sm:text-[20px]">{COPY.home.heroSubtitle}</p>
                <div className="mt-[34px] flex flex-wrap gap-3.5">
                  <Link href="/casinos" className="btn-or min-h-14 px-[30px] text-[16.5px]">
                    {COPY.home.featuredCasinos}
                  </Link>
                  {anyOffersVisible && (
                    <Link href="/special-offers" className="btn-ln min-h-14 px-[30px] text-[16.5px]">
                      {COPY.home.specialOffers}
                    </Link>
                  )}
                </div>
              </div>

              {/* The three best rolls. Each row carries a REAL DIE FACE — one,
                  two, three pips — and the die is the rank, which is why the
                  pip count is computed here from the position rather than
                  drawn in CSS: it is content.

                  The angles, the drop colours and the second row's nudge are
                  a cycle of three and live in `.picks` (globals.css), where
                  `:nth-child` can be written against the siblings.

                  The mockup's right-hand column prints a MIN. DEPOSIT per row.
                  Nothing in the API holds one, so that slot carries the
                  rating, which is real — and it is the mockup's own `.t3d`
                  shape, an ink pill with yellow numerals at 13.00:1. */}
              {casinos.length >= 3 && (
                <aside aria-labelledby="podium-heading" className="min-w-0">
                  <h2 id="podium-heading" className="sr-only">{COPY.home.podiumTitle}</h2>
                  <ol className="picks grid gap-4 pr-2.5 sm:pr-[30px]">
                    {casinos.slice(0, 3).map((c, i) => (
                      <li key={c.id}>
                        <Link
                          href={`/casinos/${c.slug}`}
                          className="pick hard-gold grid grid-cols-[52px_minmax(0,1fr)] items-center gap-3 rounded-[22px] p-3 text-ink min-[26rem]:grid-cols-[64px_minmax(0,1fr)_auto] min-[26rem]:gap-4 min-[26rem]:py-4 min-[26rem]:pl-4 min-[26rem]:pr-5"
                        >
                          <span aria-hidden className="die h-[52px] w-[52px] rounded-[16px] p-[7px] min-[26rem]:h-16 min-[26rem]:w-16 min-[26rem]:p-[9px]">
                            {DIE_PIPS[i].map((slot) => (
                              <i
                                key={slot}
                                className="block h-2 w-2 min-[26rem]:h-2.5 min-[26rem]:w-2.5"
                                style={{ gridArea: `${Math.ceil(slot / 3)} / ${((slot - 1) % 3) + 1}` }}
                              />
                            ))}
                          </span>
                          <span className="min-w-0">
                            {/* WRAPS rather than truncating: at 320px this
                                column has about 150px, enough to turn "7 Bit
                                Casino" into "7 Bit Casi…", and a list of picks
                                whose names are cut off identifies nothing. */}
                            <b className="font-display block text-[20px] leading-[1.05] text-ink [overflow-wrap:anywhere] min-[26rem]:text-[24px]">{c.name}</b>
                            <span className="mt-1 flex items-center gap-2">
                              <Stars rating={c.rating} />
                            </span>
                          </span>
                          {/* Hidden below 26rem, as the mockup hides its own
                              third column: at that width the row has already
                              given it up to keep the name readable. */}
                          <span className="hidden whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-[14px] font-extrabold text-accent tabular-nums min-[26rem]:inline">
                            <span className="sr-only">{COPY.home.podiumRatingLabel} </span>{c.rating.toFixed(1)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                  <Link href="/casinos" className="mt-5 inline-flex min-h-11 items-center text-[15.5px] font-bold text-sea transition-colors hover:text-brand">
                    {COPY.home.podiumAll} <span aria-hidden className="ml-1">→</span>
                  </Link>
                </aside>
              )}
            </div>
          </div>
        </section>

        {/* 1 — the rankings. Category tabs, then the casinos as cards. */}
        <section className="pt-[68px] sm:pt-24" aria-labelledby="top-casinos-heading">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-[22px]">
            <SectionHead
              id="top-casinos-heading"
              title={COPY.home.topCasinosTitle}
              subtitle={COPY.home.topCasinosSubtitle}
              more={casinos.length > 0 ? { href: '/casinos', label: COPY.home.viewAll, sr: ' casinos' } : undefined}
            />

            {categories.length > 0 && selected && (
              <CategoryNav categories={categories} selected={selected} />
            )}

            {casinos.length === 0 ? (
              /* The mockup's `.empty`: a dashed box in the hairline tan,
                 which is decoration around a sentence rather than a boundary
                 anything depends on — so it stays at the mockup's own value
                 while the tabs above it take `line-strong`. */
              <p className="rounded-[28px] border-2 border-dashed border-line-strong p-11 text-center text-[16px] font-semibold text-muted">
                {COPY.casinos.noResults}
              </p>
            ) : (
              <ol className={CASINO_LIST}>
                {casinos.map((casino, i) => (
                  <CasinoCard key={casino.id} casino={casino} rank={i + 1} />
                ))}
              </ol>
            )}

            {activeCategory && hasMoreCasinos && (
              <div className="mt-7 flex justify-center">
                <Link href={`/categories/${selected}`} className="btn-ln min-h-14 px-[30px] text-[16.5px]">
                  See more casinos<span className="sr-only"> — {casinosHeading(activeCategory.name)}</span> <span aria-hidden>→</span>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* 2 — the bonus types, as arched cards. Nothing at all without a
            Bonus area. */}
        {bonusSections.length > 0 && (
          <section className="pt-[68px] sm:pt-24" aria-labelledby="bonus-types-heading">
            <div className="mx-auto max-w-[1200px] px-4 sm:px-[22px]">
              <SectionHead id="bonus-types-heading" title={COPY.home.bonusTypesTitle} />
              <BonusCategoryNav sections={bonusSections} />
            </div>
          </section>
        )}

        {/* 3 — the offers, as fortune slips under a serif subhead per type. */}
        {bonusSections.length > 0 ? (
          <section className="pt-[68px] sm:pt-24" aria-labelledby="bonus-heading">
            <div className="mx-auto max-w-[1200px] px-4 sm:px-[22px]">
              <SectionHead
                id="bonus-heading"
                title={COPY.home.bonus}
                subtitle={COPY.home.bonusesSubtitle}
                more={{ href: '/special-offers', label: COPY.home.seeAllBonuses, sr: '' }}
              />
              <BonusGroups sections={bonusSections} />
            </div>
          </section>
        ) : topOffers.length > 0 && (
          <section className="pt-[68px] sm:pt-24" aria-labelledby="offers-heading">
            <div className="mx-auto max-w-[1200px] px-4 sm:px-[22px]">
              <SectionHead
                id="offers-heading"
                title={COPY.home.specialOffers}
                more={{ href: '/special-offers', label: COPY.home.viewAll, sr: ' special offers' }}
              />
              <div className={OFFER_GRID}>
                {topOffers.map((offer) => (
                  <SpecialOfferCard key={offer.id} offer={offer} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 4 — how a casino earns its place. Not in the mockup, which ends at
            the FAQ; kept because it is the page's only account of where the
            ranking comes from, and an affiliate site that ranks operators
            without publishing its method is asking to be taken on trust. */}
        <section className="pt-[68px] sm:pt-24" aria-labelledby="method-heading">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-[22px]">
            <SectionHead id="method-heading" title={COPY.home.methodTitle} subtitle={COPY.home.methodSubtitle} />
            <ol className="grid grid-cols-1 gap-[26px] sm:grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
              {COPY.home.methodSteps.map((step, i) => (
                <li key={step.no} className="step rounded-[28px] p-[26px]">
                  <p className="flex items-center gap-3.5 text-[13px] font-extrabold uppercase tracking-[0.08em] text-sea">
                    {/* The same tint cycle as the card faces and the type
                        discs, so the three bands of the page agree. */}
                    <span aria-hidden className={`font-display grid h-12 w-12 place-items-center rounded-[16px] border-2 border-ink text-[20px] text-ink ${STEP_TINT[i % STEP_TINT.length]}`}>
                      {step.no.replace(/^0/, '')}
                    </span>
                    {step.verb}
                  </p>
                  <h3 className="font-display mt-[18px] text-[22px] text-ink">{step.title}</h3>
                  <p className="mt-2.5 text-[15.5px] font-medium text-ink-soft">{step.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-7 flex items-center gap-3 text-[15px] font-semibold text-muted">
              <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-sea)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.5 6.2L3 16M3 21v-5h5" />
              </svg>
              <span>{COPY.home.methodLoop}</span>
            </p>
          </div>
        </section>

        {/* 5 — the FAQ, two across as the mockup lays it out. Every answer is
            in the HTML, open or closed, which the FAQPage schema requires. */}
        <section className="pt-[68px] sm:pt-24" aria-labelledby="faq-heading">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-[22px]">
            <SectionHead id="faq-heading" title={COPY.home.faqTitle} subtitle={COPY.home.faqSubtitle} />
            <FaqAccordion items={FAQ_ITEMS} />
          </div>
        </section>
      </main>
    </>
  )
}

/**
 * The mockup's `.sec-head`: the heading with its LAST WORD IN BLUE, its line
 * underneath, and an optional link to the full list pushed to the right edge.
 *
 * The two-tone heading is this design's whole section marker — there is no
 * rule, no numeral and no kicker, because the display face at 36-62px is
 * already the loudest thing on the page and anything beside it competes. The
 * split is done here rather than in the copy so the strings stay plain text,
 * readable in a <title> and in JSON-LD, with no markup to strip.
 *
 * It splits on the LAST SPACE, so a one-word heading ("Bonuses") goes entirely
 * blue and a longer one keeps its tail coloured. An empty or single-word
 * string is handled rather than left to produce an undefined.
 *
 * A local component rather than one in components/: every site in the network
 * heads its sections differently, and this shape is this design's own. Nothing
 * else renders it, so it lives where it is used.
 */
function SectionHead({
  id,
  title,
  subtitle,
  more,
}: {
  id: string
  title: string
  subtitle?: string
  more?: { href: string; label: string; sr: string }
}) {
  const cut = title.lastIndexOf(' ')
  const head = cut === -1 ? '' : title.slice(0, cut)
  const tail = cut === -1 ? title : title.slice(cut + 1)

  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-x-5 gap-y-3">
      <div className="min-w-0">
        <h2 id={id} className="font-display text-[34px] text-ink sm:text-[clamp(36px,5vw,62px)]">
          {head && <>{head} </>}
          <span className="text-sea">{tail}</span>
        </h2>
        {subtitle && <p className="mt-2.5 max-w-[620px] text-[17.5px] font-medium text-ink-soft">{subtitle}</p>}
      </div>
      {more && (
        <Link href={more.href} className="inline-flex min-h-11 items-center text-[16px] font-bold text-sea transition-colors hover:text-brand">
          {more.label}{more.sr && <span className="sr-only">{more.sr}</span>} <span aria-hidden className="ml-1">→</span>
        </Link>
      )}
    </div>
  )
}
