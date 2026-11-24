/**
 * Frequently asked questions for this site.
 *
 * Rendered VISIBLY on the home page and emitted as FAQPage structured data from
 * this same array. Google requires the two to match; markup-only FAQ is a
 * guidelines violation, which is why the page maps over this constant rather
 * than duplicating the text.
 *
 * The wording is unique to this site: these answers are indexable page content,
 * and they are exactly the kind of text an answer engine quotes. Here they
 * argue one thing — that an evening at a casino is entertainment you buy, so
 * the thing worth ranking is not the size of the offer but how much of the
 * evening the operator takes back in admin. Its siblings answer the
 * neighbouring questions (affliliate: what an offer is worth in money;
 * slottering: the slot rules; bettingbetway: which casino to trust;
 * bonanzasmile: the catch in a bonus; gladjackpot: how the money gets out;
 * luckycatsmile: that luck is the wrong word; spinsunny: when you get to read
 * the small print; starspinly: one scale for every operator) and none of them
 * may be echoed.
 *
 * NOTHING BELOW CLAIMS A FIGURE THIS SITE CANNOT SHOW. The mockup's FAQ opens
 * with "we open real accounts, deposit, claim the bonus and request a
 * withdrawal" and closes with "we publish the times we observed". Neither
 * ships, in any wording: nothing in this project records a funded account or a
 * timed payment. The second question below is asked precisely so the answer can
 * say so outright, and the last one answers the payout question honestly, by
 * naming whose commitment the figure actually is.
 */
export const FAQ_ITEMS = [
  {
    question: 'How do you rank casinos?',
    answer:
      'On friction, not on the size of the welcome offer. Three things decide it, asked of every operator in the same order: what it takes to get in — which regulator the licence names and what the terms ask before you have an account; what the bonus costs you — the multiplier, what it applies to, the games that do not count and the days you have; and what happens once you are ahead — the withdrawal caps, the window the cashier page commits to, and when verification is demanded. An operator that gets out of the way on all three ranks above one with a louder banner.',
  },
  {
    question: 'Do you actually play at these casinos?',
    answer:
      'No, and we will not print a figure we did not measure. Everything here is read from what the operator publishes — the terms page, the cashier page, the licence — and quoted so it can be checked against the source. We would rather be checkable than impressive, and a site that claims its own deposits and withdrawals is asking to be believed about the one thing nobody can verify.',
  },
  {
    question: 'Why rank on friction instead of the bonus?',
    answer:
      'Because the bonus is the part designed to be compared and the friction is the part that decides how the evening actually goes. A 400% offer behind 50x wagering on deposit plus bonus, capped at £100, with seven days to clear it and verification demanded the first time you withdraw, is not a bigger gift than a 100% offer at 25x with ninety days and ID taken at sign-up. It is a longer obligation wearing a bigger number. We rank the obligation.',
  },
  {
    question: 'What makes one wagering requirement worse than another?',
    answer:
      'The multiplier is only half of it. 30x on the bonus alone and 30x on deposit plus bonus are different obligations behind the same number, and a requirement that excludes the games with the best published returns is harder than it looks. A low multiplier beside a seven-day expiry can be worse than a high one with ninety days. We record the multiplier, what it applies to, which games count and how long you have, because the combination is the offer.',
  },
  {
    question: 'Why does the licence decide so much here?',
    answer:
      'Because it decides what happens when something goes wrong. A licence names the body you can complain to, the rules the operator agreed to follow and, in most jurisdictions, a free dispute service that can order a payment. Without one there is no route at all beyond the operator’s own support desk — and an evening that ends in an unanswerable email is the worst friction there is. We name the regulator on every review so the claim can be checked rather than taken on trust.',
  },
  {
    question: 'Do you earn money from these links?',
    answer:
      'Yes. We may earn a commission when someone signs up through a link on this site, and that is how it is funded. It does not buy a position: every operator is measured the same three ways, and a casino that quietly tightens its terms slides down the board whether or not it pays us.',
  },
] as const
