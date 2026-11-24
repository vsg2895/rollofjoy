type Item = { readonly question: string; readonly answer: string }

/**
 * The home FAQ, from sites/rollofjoy.html (`.faq` / `.fq`): one column of
 * outlined cards, each opening on a YELLOW plus mark in a rounded square that
 * rotates 45° into a cross and turns PINK — and the card itself grows a blue
 * drop while its answer is open.
 *
 * THE DROP IS THE OPEN STATE, which is this design's own idea and worth
 * keeping: on a page where everything already stands on a coloured shadow, the
 * one card that has just gained one reads as lifted off the stack without
 * needing a colour change behind the text.
 *
 * One column, not two: the mockup puts this section in its `.narrow` 820px
 * track, and these answers run to four or five lines each — two columns of
 * them at 1200px would set a wall of small text across the full width, which
 * is the one place on the page that wants to be read rather than scanned.
 *
 * The question is set in BRICOLAGE at 800, not the display face. Bagel Fat One
 * is a fat rounded display type: it carries a four-word heading and defeats a
 * nine-word question, and the mockup makes the same exception here
 * (`.fq summary h3{font-family:var(--body)}`).
 *
 * The mark is drawn from two pseudo-elements rather than a "+" character.
 * A glyph's cross-bar sits off-centre in most faces, which is invisible until
 * it rotates 45° and the × comes out lopsided. The rotation and the fill are
 * `.pm` in globals.css, driven by `details[open]`.
 *
 * Native `<details>`, no client state: every answer is in the server HTML,
 * open or closed — which the FAQPage schema built from the same array needs.
 * `[&::-webkit-details-marker]:hidden` and `list-none` drop the browser's own
 * triangle so only this mark shows.
 */
export default function FaqAccordion({ items }: { items: readonly Item[] }) {
  return (
    <div className="grid max-w-[860px] grid-cols-1 gap-3.5">
      {items.map((item, i) => (
        <details key={item.question} open={i === 0} className="fq group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-[18px] px-6 py-[22px] [&::-webkit-details-marker]:hidden">
            <h3 className="text-[18px] font-extrabold leading-[1.3] text-ink transition-colors [overflow-wrap:anywhere] group-hover:text-brand sm:text-[20px]">
              {item.question}
            </h3>
            {/* Decoration: the <summary> already announces its own state. */}
            <span
              aria-hidden
              className="pm relative grid h-10 w-10 flex-none place-items-center rounded-xl text-ink
                before:absolute before:h-[2px] before:w-4 before:rounded-sm before:bg-current before:content-['']
                after:absolute after:h-[2px] after:w-4 after:rotate-90 after:rounded-sm after:bg-current after:content-['']"
            />
          </summary>
          <p className="px-6 pb-6 text-[16.5px] font-medium leading-[1.7] text-ink-soft sm:text-[17px]">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
