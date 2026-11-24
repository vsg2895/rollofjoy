/**
 * All user-facing and SEO-facing wording for this site.
 *
 * The KEY STRUCTURE is identical across every site in the network — same
 * groups, same keys, same order — so the apps stay interchangeable and a
 * component written for one works on all of them.
 *
 * The WORDS are deliberately unique to this site. That is not decoration: the
 * brands are separate domains serving the same catalogue, and if they shipped
 * the same titles, descriptions and headings, Google would treat them as
 * duplicate content and suppress all but one. Every string that reaches a
 * <title>, a meta description, an <h1>/<h2> or a JSON-LD field must therefore
 * read differently here than on the sibling sites.
 *
 * rollofjoy's angle: THE POINT IS THE PLAYING. An evening at a casino is
 * entertainment you buy, and the stake is its price — not an investment, not a
 * plan. Which means the thing worth ranking is not the size of the welcome
 * offer at all: it is FRICTION. Everything an operator can do to turn an
 * evening into admin — wagering that makes a bonus a second job, a withdrawal
 * that takes three emails, verification demanded only once you are ahead, a
 * cap that quietly reduces a win to a token. A casino earns its place here by
 * having as little of that as it can, and nothing else about it compensates.
 *
 * Its siblings answer the neighbouring questions — affliliate decodes an offer
 * in MONEY, slottering reads the SLOT rules, bettingbetway ranks CASINOS on
 * their terms, bonanzasmile names the CATCH, gladjackpot asks how the money
 * gets OUT, luckycatsmile argues LUCK IS THE WRONG WORD, spinsunny moves the
 * small print INTO DAYLIGHT, starspinly puts every operator on ONE SCALE — and
 * none of them may be echoed. Every one of those is about the NUMBERS; this
 * one is about what the numbers cost you in an evening, which is the only
 * question none of them asks.
 *
 * ── Three lines this file does not cross ────────────────────────────────────
 * 1. The mockup's lead says "we sign up, deposit, play and cash out at every
 *    casino we list", its chip says "tested every week", its offers section
 *    says "offers we'd happily claim", and its FAQ promises "the times we
 *    observed". NONE OF IT SHIPS, in any wording: nothing in this project
 *    records a funded account, a played bonus or a timed withdrawal, and a
 *    review site inventing its own test results is the one failure that cannot
 *    be walked back. Friction is read from what each operator COMMITS TO in
 *    writing, which is checkable — and that is what the copy says.
 * 2. The mockup also sells "casinos and sportsbooks". The API serves casinos,
 *    so every line here says casinos.
 * 3. The mockup prints a "Min. deposit" and a "Payout" per casino and per
 *    picks row. There is no column for either, so no wording promises one;
 *    those slots carry the rating and the regions, which are real.
 */
export const COPY = {
  // SEO identity. These three reach the <title>, the meta description and the
  // keywords tag on EVERY page that does not set its own — which is most of
  // them — so they are the strings most likely to be read as duplicate content
  // if a sibling domain ships the same words.
  site: {
    titleTail: 'Casinos Ranked On The Fun',
    description:
      'ranks casinos on how little they get in the way — the wagering, the withdrawal, the verification and the caps — because an evening out should not turn into admin.',
    keywords: [
      'casinos with easy withdrawals',
      'low wagering casino bonuses',
      'casino bonus wagering compared',
      'licensed online casinos ranked',
      'best online casinos for players',
    ],
  },
  nav: {
    casinos: 'Casinos',
    // The page lists every visible bonus, flat and ungrouped, so the menu says
    // what is behind it. winpalack keeps "Special Offers": its page is the
    // grouped bonus-area view and is a different thing.
    specialOffers: 'Bonuses',
    categories: 'Categories',
    // First row inside the header and footer dropdowns: the parent's own page.
    allCasinos: 'All Casinos',
    allOffers: 'All Offers',
  },
  home: {
    bonus: 'Bonuses',
    // The line under the Bonuses heading. The mockup calls these cards
    // "postcards from our favourite offers", which is what they are shaped
    // like — so the line keeps the postcard and drops the favouritism.
    bonusesSubtitle: 'A sticker sheet of offers, with the catch printed on each one.',
    seeMore: 'See more',
    seeAllBonuses: 'See All Bonuses',
    /**
     * The VISIBLE heading over the bonus-type row.
     *
     * The row used to carry no heading at all — the chips were taken to
     * speak for themselves. They do not: arriving mid-page at a band of
     * unlabelled buttons between the hero and the casino list, there is
     * nothing saying what the set IS, and nothing a screen reader can
     * announce for the landmark beyond a generic label nobody wrote for
     * this page.
     *
     * Worded differently on every domain, like every other <h2> here:
     * eleven sites serve one catalogue, and a shared heading is
     * duplicate content.
     */
    bonusTypesTitle: 'Browse by bonus type',
    // The mockup's eyebrow is "Tested in the sunshine, weekly". There is no
    // testing here, so this says the part that is true: the terms are re-read
    // every week, and that is what the dot beside it is claiming.
    heroEyebrow: 'Terms re-read every week',
    // Split in three so the JSX can set the middle phrase in the display
    // face's outlined treatment, which is the hero's whole device.
    heroHeadline: 'Every roll should bring',
    heroHighlight: 'joy.',
    heroHeadlineTail: '',
    heroSubtitle:
      'An evening at a casino is entertainment you buy, and the stake is what it costs. So we do not rank on the size of the welcome offer — we rank on friction: the wagering that turns a bonus into a second job, the withdrawal that takes three emails, the verification demanded only once you are ahead. A casino earns its place here by getting out of the way.',
    // The badge above the picks card, and the line under it. Both are the
    // mockup's own; the badge carries the live dot.
    podiumBadge: 'Updated weekly',
    podiumTitle: 'This week’s best rolls',
    // The mockup says "three casinos that paid out fastest in our latest
    // tests". There are no tests and no payout times here, so this says what
    // the list actually is: the top of the current ranking.
    podiumSubtitle: 'The three highest-placed casinos in this week’s ranking.',
    // The label over the picks card's right-hand column. The mockup's is
    // "Min. deposit"; nothing in the API holds one, so the slot carries the
    // rating.
    podiumRatingLabel: 'Rating',
    podiumAll: 'See the whole board',
    topCasinosTitle: 'Casinos that stay out of the way',
    topCasinosSubtitle: 'Ranked on friction — what each operator asks of you before, during and after a win. Filter by category.',
    featuredCasinos: 'See top casinos',
    specialOffers: 'Browse bonuses',
    viewAll: 'View all',
    // Leads the home <title>; the year and brand are appended in page.tsx.
    homeTitle: 'Online Casinos Ranked On Friction, Not Bonus Size',
    faqTitle: 'Frequently asked questions',
    faqSubtitle: 'What we measure, what we will not claim, and how a casino earns its place here.',
    metaDescription:
      'Online casinos ranked on friction rather than bonus size — the wagering, the withdrawal window, the verification and the caps each operator commits to in writing.',
    // ── The "How a casino earns its place" band ───────────────────────────
    // Three steps, numbered, because they ARE a sequence: each one happens
    // after the one before it. Numbering a set that is not ordered is
    // decoration; numbering this one is information.
    methodTitle: 'How a casino earns a good roll',
    methodSubtitle: 'Three questions, asked of every operator in the same order.',
    methodSteps: [
      {
        no: '01',
        verb: 'Before',
        title: 'What it asks to let you in',
        body:
          'Which regulator the licence names, what that authority requires, and whether there is a free dispute service behind it. Then the sign-up itself: how much has to go in before anything happens, and whether the terms sit on a page you can reach without an account. An operator that names no regulator does not get a roll at all.',
      },
      {
        no: '02',
        verb: 'During',
        title: 'What the bonus costs you in evenings',
        body:
          'The multiplier and what it applies to, the games that do not count, the maximum stake allowed while clearing, and the days you have. The question is not how big the offer is — it is how many evenings it takes to turn it into money you own, and whether those are evenings you would have chosen.',
      },
      {
        no: '03',
        verb: 'After',
        title: 'What happens once you are ahead',
        body:
          'The ceiling on a single withdrawal and on a month, the processing window the cashier page commits to in writing, and when verification is asked for — at sign-up, or the first time you try to take money out. That last one is the most reliable sign there is of how an evening ends.',
      },
    ],
    methodLabel: 'How it works',
    // Under the three stages: the cycle closes back on the first.
    methodLoop: 'And round again whenever an operator rewrites its terms',
    // ── The hero monitor: what one pass covers ──────────────────────────
    // The same things the FAQ and the method name — no figure this site does
    // not hold. Kept in the shared key structure though this design has no
    // monitor panel; see the file header.
    monitorTitle: 'What each roll covers',
    monitorStatus: 'Weekly',
    monitorReads: [
      { label: '01 · Before', text: 'The licence, and what it takes to get in' },
      { label: '02 · During', text: 'The wagering, and how long it really takes' },
      { label: '03 · After', text: 'The cap, the window, and when ID is asked for' },
    ],
    monitorNote: 'Lapsed bonuses come off the board. A casino moves when its own pages move.',
    rankingLabel: 'The rankings',
    bonusTypesKicker: 'By type',
    bonusesLabel: 'The offers',
    faqLabel: 'Answered',
  },
  casinos: {
    pageTitle: 'The Whole Board',
    pageDescription:
      'The full list, each casino shown with the bonus it is running, what that bonus asks of you, and where it lands once friction is counted.',
    // H2 over the offers block on a casino page. The literal 'Special Offers'
    // was hardcoded in the component on all six sites — an identical H2 on
    // every review page in the network.
    offersHeading: 'Bonuses Running Here',
    // Tail of the summary-panel H2: `{casino.name} at a glance`.
    glanceHeadingTail: 'at a glance',
    moreHeading: 'Other good rolls',
    reviewTitleTail: 'Wagering, Withdrawals And Licence',
    reviewSignature: 'Every figure here quoted from this operator’s own terms and cashier pages.',
    reviewSummary: 'with the things that decide whether an evening here stays an evening — the wagering, the withdrawal window, the caps and the regulator — quoted from the operator’s own pages rather than its banner.',
    // The ribbon on the leading casino card. A WORD, not a numeral: the list
    // order already is the ranking, and a "1" on every card invites reading it
    // as a score.
    topPick: 'Top roll',
    visitCasino: 'Open Casino',
    readReview: 'Read review',
    rating: 'Joy score',
    noResults: 'No casinos match this filter yet. Try another category.',
  },
  /**
   * The page behind one bonus type (/bonuses/[slug]).
   *
   * `metaSuffix` is appended to the type's name when the admin wrote no
   * description, so the meta line is still specific to the page rather than
   * boilerplate shared by eight of them.
   */
  bonusCategory: {
    metaSuffix: 'every bonus of this kind on the board right now, with whose offer it is and what it asks of you before the money is yours.',
    countOne: 'offer',
    countMany: 'offers',
  },

  specialOffers: {
    pageTitle: 'The Sticker Sheet',
    pageDescription:
      'Every bonus in one place, each with the casino behind it and the catch printed on it — the wagering, the cap and the expiry, wherever the operator states them.',
    // Appended to an offer's (shared) bonus text so the sibling sites do not
    // ship an identical meta description for the same offer.
    offerMetaSuffix: 'Read from the operator’s own terms page before it went on the board.',
    claim: 'Claim Bonus',
    noResults: 'No bonuses to show right now.',
  },
  categories: {
    pageTitle: 'Casinos By Category',
    pageDescription: 'The same three questions behind every list — pick the category you came for.',
    // Meta-description tail for a single category page. Category records are
    // shared master data, so this is what keeps the nine sites distinct there.
    categoryMetaSuffix: 'ordered by friction — what each operator asks of you before you join, while a bonus clears, and once you are ahead.',
    noResults: 'Nothing to show here yet.',
  },
  newsletter: {
    title: 'Joy mail.',
    subtitle: 'One email a week: what moved on the board, and whose terms moved under it.',
    placeholder: 'Your email address',
    button: 'Subscribe',
    // The two halves of the line beside the TOP BAR's field — the mockup's
    // own "Sunny alerts: new casinos and hot bonuses, once a week." Split so
    // the lead can take the sun yellow while the rest stays readable grey.
    barLead: 'Joy mail:',
    barTail: 'fresh casinos and lucky bonuses, every Friday.',
    // The mint band above the footer — the site's second capture point, so its
    // heading is a real <h2> rather than the form's own label.
    bandTitle: 'One good roll a week.',
    bandSubtitle: 'New reviews, the bonuses actually worth claiming, and every move on the board — one short email, no filler.',
    // Shown while the address is being checked. The subscribe request waits on
    // a live address-validation call, so the button has to say so rather than
    // just dimming for a second or two.
    checking: 'Checking…',
    // The spam line is NOT optional wording. This is a double opt-in list: an
    // unconfirmed subscriber never receives anything again, and the verify mail
    // is the single most likely message to be filtered — new sender, one link,
    // no history. Telling people where to look is the difference between a
    // signup and a dead row.
    success:
      'Nearly there — check your inbox and confirm your address to finish. '
      + 'If nothing arrives, it may be sitting in spam or junk.',
    // Shown when the API reports email_sent=false — the site is still
    // collecting addresses but its sending is switched off in the admin.
    // Promising an inbox (and a spam folder to search) for mail that will
    // never arrive is worse than not collecting the address at all.
    successNoEmail:
      'You’re on the list. We are not sending confirmation emails from this site at the moment.',
    error: 'That did not send. Please try again.',
  },
  footer: {
    // Short brand blurb in the footer's first column. The mockup gives that
    // column 1.6fr of a four-track grid — roughly 360px — so this runs to two
    // or three lines there by design, unlike the two-column siblings where the
    // same string had to stay on one.
    tagline:
      'Independent casino reviews and rankings, measured on friction rather than the size of a welcome offer. We may earn a commission from links on this site; it never changes a score or a position.',
    // Registered postal address, shown beside the copyright line. A physical
    // address in the footer is what mailbox providers and the gambling
    // affiliate compliance checks both look for, and it must match the address
    // used in the email templates.
    //
    // Supplied 2026-11-23, and written to this site's `registered_address`
    // in the same change (`php artisan sites:set-legal-identity <slug>
    // --address=...`). THE TWO MUST STAY IDENTICAL: that column is what the
    // legal pages and the email templates print, and two different addresses
    // for one brand is a compliance problem, not a typo. The footer omits the
    // whole <address> element while this is blank.
    postalAddress: '21 Primrose Lane, Reading, RG6 5QW, United Kingdom',
    disclaimer:
      'Gambling is for adults aged 18 or over and carries real financial risk. Set deposit limits, never chase losses, and only stake what you can afford to lose.',
  },
  errors: {
    notFound: 'That page is not here.',
    apiError: 'Could not load this content. Please try again in a moment.',
  },
  reviews: {
    heading: 'What Players Report',
    empty: 'No reports yet — be the first to say how it went.',
    formTitle: 'Add Your Report',
    formIntro: 'Your report appears on this page as soon as you post it.',
    nameLabel: 'Your name',
    emailLabel: 'Email (optional, never published)',
    ratingLabel: 'Rating',
    titleLabel: 'Headline (optional)',
    bodyLabel: 'Your report',
    namePlaceholder: 'First name or nickname',
    emailPlaceholder: 'you@example.com',
    titlePlaceholder: 'One line on whether it stayed fun',
    bodyPlaceholder: 'How did it actually go — wagering, cap, verification, withdrawal?',
    submit: 'Post Report',
    // Two outcomes, because the site can run pre- or post-moderation
    // (Sites -> Publish reviews immediately). The API reports which one
    // applied; promising the wrong one is a promise the page then breaks.
    success: 'Thanks — your report is now live. Scroll up to see it.',
    successPending: 'Thanks — your report has been submitted and will appear once approved.',
    error: 'That did not send. Please check the form and try again.',
    ratingSummary: (avg: number, total: number) =>
      `${avg.toFixed(1)} out of 5 from ${total} ${total === 1 ? 'report' : 'reports'}`,
  },
  // Labels on the phone-only hide / show toggle above each chip list.
  collapse: {
    casinoCategories: 'Casino categories',
    bonusTypes: 'Bonus types',
  },
} as const
