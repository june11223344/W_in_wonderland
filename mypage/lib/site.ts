/**
 * Personal intro site — edit this file to change all English copy and links.
 *
 * Narrative north star: the visitor is Alice; this site is Wonjun’s world to explore.
 * Keep curiosity-first tone while the garden stays the clear “evidence” trail.
 */
export const site = {
  meta: {
    title: "A little wonderland",
    description:
      "Wonjun — Data Science & full-stack builder: AI products (eLe, Point), leadership (D&A, hackathons), and international programs. Garden cards = proof.",
  },

  brand: {
    navTitle: "Wonjun",
    rabbitAlt: "White Rabbit",
  },

  links: {
    contactMailto: "mailto:wj0103230806@gmail.com",
    linkedin: "https://www.linkedin.com/in/wonjun-wonjun/",
    github: "https://github.com/june11223344",
  },

  nav: {
    board: "Garden",
    email: "Email",
    linkedin: "LinkedIn",
    github: "GitHub",
  },

  /** Short lines inside NavReveal panels (edit anytime) */
  navReveal: {
    boardDescription:
      "Under the hero: tap ♠ ♥ ♦ ♣ to filter proof — hard skills, soft skills, international, and side experiments.",
    linkedinDescription: "Public LinkedIn profile.",
    githubDescription: "Code and projects on GitHub.",
  },

  hero: {
    /** Optional small caps above the main headline (leave empty to skip). */
    eyebrow: "",
    /** Hero line 1 — stays visible; line 2 morphs from wonderlandMorph into nameLine. */
    introLine1: "Welcome to the little wonderland",
    /** Line 2 opens here (“I’m Wonderland…”), then backspaces toward morphStem, then finishes nameLine. */
    wonderlandMorph: "I'm Wonderland",
    /** After deletions stop (must be a prefix of wonderlandMorph). Then the rest of the name is typed. */
    morphStem: "I'm W",
    /** Final surname line (capital W); shared “W” with morphStem is not re-typed. */
    nameLine: "Wonjun.",
    /** Appended after nameLine (e.g. space + greeting). */
    helloTyping: " Hello!",
    subHtml: "Curious? Follow the rabbit — the garden and cards carry the rest.",
  },

  processIntro: {
    eyebrow: "About me",
    titleHtml: "You followed a rabbit — <em>the way Alice did.</em>",
    /** Main intro (HTML: line breaks, emphasis). Visitor = Alice; site = hole; author = rabbit. */
    subHtml:
      "You got here the way Alice did — a little curiosity, a few clicks. I'm the rabbit: Data Science, messy questions into clean models, proof in the garden.<br/><br/><em>Stay for a minute?</em>",
  },

  /**
   * EAT ME / DRINK ME — “what I want to grow” vs “what I want to shrink” (not ego size, but intentions).
   * Sits below the About block on the landing section.
   */
  aliceScale: {
    sectionEyebrow: "EAT ME · DRINK ME",
    sectionTitleHtml: "What I want to grow — and what I want to <em>shrink</em>.",
    growLabel: "EAT ME",
    growTitle: "What I want to grow",
    growBodyHtml:
      "<p><strong>Logic, consistency, solidity</strong> — clear reasoning, the same bar on day ten as day one, work that survives reviews and edge cases.</p><p>When trade-offs hit, my reasoning stays <strong>legible to me first</strong> — my own metric, sharpened over time.</p>",
    growImageSrc: "/eattme.png",
    growImageAlt: "EAT ME cake",
    shrinkLabel: "DRINK ME",
    shrinkTitle: "What I want to shrink",
    shrinkBodyHtml:
      "<p><strong>Thinking that grabs my ankles</strong> — every branch in my head until even small moves feel risky.</p><p>Some lessons only land <strong>mid-dive</strong>; I want cheaper first tries instead of waiting for a perfect map.</p>",
    shrinkImageSrc: "/drink-removebg-preview.png",
    shrinkImageAlt: "DRINK ME bottle",
  },

  /**
   * Playing-card grid — grouped by suit.
   * Spades: KEY AI products + coursework ML/data · Hearts: HUSS, capstone, D&A leadership · Diamonds: Netherlands · Clubs: X:AI base
   */
  spotlight: [
    {
      title: "eLe — news into level-matched dialogue",
      category: "Hard skills · AI product",
      trend: "Mar 2026",
      tag: "Featured",
      suit: "spade",
      roleLine: "Product direction; news-to-dialogue teaching pipeline",
      impactLine: "Less manual prep; fresher, level-matched English practice",
      detailHtml:
        "<p><strong>KEY AI PRODUCT · eLe</strong> — An English-learning AI platform that turns live news into dialogues matched to the learner’s level.</p><p>Focused on automating teaching-material generation to cut manual work, and on keeping the product feeling like content that never goes stale.</p>",
    },
    {
      title: "Point — presentation coaching agent",
      category: "Hard skills · real-time AI",
      trend: "Mar 2026 →",
      tag: "Hot",
      suit: "spade",
      roleLine: "Real-time coaching UX; client-side processing focus",
      impactLine: "Snappier feedback loop without heavy server round-trips",
      detailHtml:
        "<p><strong>KEY AI PRODUCT · Point</strong> — A real-time coaching tool that gives feedback on speech and non-verbal cues during practice talks.</p><p>Designed around <strong>client-side processing</strong> to keep latency low so the experience feels like an immediate, in-the-room coach.</p>",
    },
    {
      title: "ML & data pipelines from study & class",
      category: "Hard skills · ML & analytics",
      trend: "2025",
      tag: "Building",
      suit: "spade",
      roleLine: "Course & project work across DL, voice, text, and analytics",
      impactLine: "Shipped artifacts: STT flow, Streamlit, topic models",
      detailHtml:
        "<p><strong>Deep learning course</strong> — Framed a smart fish-farm object-detection idea to think through domain-specific DL.</p><p><strong>X:AI Adv</strong> — End-to-end STT shopping-cart flow and voice-model fine-tuning.</p><p><strong>Text analytics</strong> — Airline reviews with word clouds and topic modeling.</p><p><strong>Shinhan Card project</strong> — Analysis into a Streamlit site wired to GitHub for a shipped, web-facing result.</p>",
    },
    {
      title: "HUSS hackathon — vision, roadmap, stage",
      category: "Soft skills · leadership",
      trend: "Aug 2025",
      tag: "Featured",
      suit: "heart",
      roleLine: "Platform vision, technical roadmap, main-stage pitch",
      impactLine: "Grand Prize; dense tech translated for 200+ listeners",
      detailHtml:
        "<p><strong>HUSS Idea Hackathon (environmental data app)</strong> — Led the platform <strong>vision</strong> and pitched a complex <strong>technical roadmap</strong> to an audience of 200+.</p><p><strong>Grand Prize</strong> — what stuck most was practice turning dense tech into a story people could follow in one sitting.</p>",
    },
    {
      title: "Capstone — problem to solution with the team",
      category: "Soft skills · collaboration",
      trend: "Spring 2025",
      tag: "Growing",
      suit: "heart",
      roleLine: "Problem framing → solution with a cross-major student team",
      impactLine: "Full delivery arc, not only analysis in a notebook",
      detailHtml:
        "<p>Airbnb lodging-data capstone: ran the <strong>full arc from problem framing to solution</strong> with a student team.</p><p>Worked across different majors, split roles, and synced often — the messy human part of shipping, not just the notebook.</p>",
    },
    {
      title: "D&A — big-data society ops & seminars",
      category: "Soft skills · lead",
      trend: "Jan–Nov 2025",
      tag: "Open",
      suit: "heart",
      roleLine: "Society ops: roadmap + advanced seminar program",
      impactLine: "50+ members; raised the bar on RNNs, LSTMs, and practice",
      detailHtml:
        "<p><strong>PROFESSIONAL · D&amp;A (Big Data Analysis Society)</strong> — Set a <strong>roadmap</strong> for 50+ members and <strong>ran seminars</strong> on advanced topics like RNNs and LSTMs.</p><p>Aimed to lift the society’s technical floor while tightening my own understanding by teaching structure, not only using it.</p>",
    },
    {
      title: "Netherlands exchange — web with locals",
      category: "International",
      trend: "Fall 2024",
      tag: "Steady",
      suit: "diamond",
      roleLine: "Community website with local stakeholders (English day-to-day)",
      impactLine: "Shipped site + rapport outside my default context",
      detailHtml:
        "<p><strong>Netherlands Exchange Program (Fall 2024)</strong> — Built a community website with local stakeholders, negotiating needs in English day to day.</p><p>A stretch season for communication and rapport — the kind of growth that only really shows up when you leave your default context.</p>",
    },
    {
      title: "Global Climate Change Response — Georgia & Uzbekistan",
      category: "International · field research",
      trend: "Jul 2025",
      tag: "Growing",
      suit: "diamond",
      roleLine: "Field research, regional expert interviews, report synthesis",
      impactLine: "One strategic report; supported ministry convening (GGGI)",
      detailHtml:
        "<p><strong>Global Climate Change Response Program</strong> (Kookmin University) — Field research and expert interviews in <strong>Georgia and Uzbekistan</strong> to compare how different regions approach international climate response.</p><p><strong>Regional expert interviews</strong> — Met climate advisors at the National Centre for Climate Change (Tashkent) and traced environmental initiatives across the Caucasus and Central Asia.</p><p><strong>Global collaboration</strong> — Worked with a GGGI manager to help convene discussions at the Ministry of Ecology.</p><p><strong>Strategic insight</strong> — Turned varied regional voices into one report on partner relations and climate project management.</p><p><em>Skills:</em> English and interviewing.</p>",
    },
    {
      title: "Global PBL — Irvine, CA",
      category: "International · study abroad",
      trend: "Mar–Aug 2026",
      tag: "Featured",
      suit: "diamond",
      roleLine: "Six-month exchange: applied AI, AWS, full-stack, startup ecosystem",
      impactLine: "US coursework + building inside a venture-heavy region",
      detailHtml:
        "<p><strong>Global PBL Program</strong> (Kookmin University) — <strong>Six months in Irvine, California</strong>, focused on advanced coursework and building in a US startup ecosystem.</p><p>Current emphasis: <strong>applied AI</strong>; <strong>full-stack service development</strong>; <strong>cloud-based product building</strong>; <strong>startup dynamics and venture ecosystems</strong>.</p><p><em>Skills:</em> AI agents, Amazon Web Services (AWS).</p>",
    },
    {
      title: "X:AI base — paper-reading circle",
      category: "Just for fun · curiosity",
      trend: "Spring 2025",
      tag: "New",
      suit: "club",
      roleLine: "Presenter in a paper-reading circle",
      impactLine: "Faster skim → deep read; better questions on research writing",
      detailHtml:
        "<p><strong>X:AI Base (Spring 2025)</strong> — Read and presented AI papers; explored how to skim, dig in, and ask the right questions of research writing.</p><p>Low-pressure, curiosity-led learning — the stack I park under “just for fun” on purpose.</p>",
    },
  ],

  garden: {
    cardRabbitSrc: "/card-rabbit.png",
    cardRabbitAlt: "White Rabbit herald with trumpet and scroll",
    /** Small caps above the gate line — signals a scene change from the hero. */
    sectionGateEyebrow: "The path shifts",
    /** One beat: you’ve crossed into a new “page” of the site. */
    sectionGateTitle: "This is the garden — the story turns here.",
    /** Short bridge before the White Rabbit callout. */
    sectionGateSub: "Proof ahead — suit by suit. Follow the rabbit when you’re ready.",
    /** White Rabbit voice above the suit buttons */
    rabbitCalloutHtml:
      "<strong>Pick a track.</strong> Each suit is a different slice — tap a card for the full note.",
    rabbitSignoff: "— The White Rabbit (in a hurry)",
    suitPickerTitle: "Pick a suit",
    suitPickerHint: "Tap a suit, then a card — details open on a dimmed stage.",
    /** Shown under the hint while no suit is selected — makes the glyphs the obvious target */
    tapSuitsCue: "Tap a suit symbol",
    changeSuit: "Change suit",
    suits: [
      {
        id: "spade",
        glyph: "♠",
        label: "Spades",
        sub: "Hard skills",
        desc: "Stack, shipping, products — the building side.",
      },
      {
        id: "heart",
        glyph: "♥",
        label: "Hearts",
        sub: "Soft skills",
        desc: "Design, writing, feedback, teamwork.",
      },
      {
        id: "diamond",
        glyph: "♦",
        label: "Diamonds",
        sub: "International",
        desc: "Abroad, language, work across borders.",
      },
      {
        id: "club",
        glyph: "♣",
        label: "Clubs",
        sub: "Just for fun",
        desc: "Side quests and experiments — curiosity over polish.",
      },
    ] as const,
  },

  /**
   * Caterpillar shelf — four book-spine “moves”; opening one reveals that category.
   */
  shelf: {
    sectionEyebrow: "The Caterpillar's shelf",
    sectionTitle: "Four spines, four stacks",
    sectionSub: "Four spines on one shelf — each opens a different stack. Tap one to browse that shelf.",
    spineRowCue: "Four stacks — tap a spine",
    caterpillarSrc: "/caterpillar-tenniel.png",
    caterpillarAlt: "The Caterpillar on a mushroom (Tenniel)",
    backToShelf: "← Back to shelf",
    emptyShelfTitle: "This stack is still growing",
    emptyShelfBody:
      "Books and music are next on the shelf — same format as films and drama when they're ready.",
    /**
     * Order: films → music → books → drama.
     * spineFoot = category · spineBlurb = what’s inside · spineTitle = vertical spine label.
     */
    categories: [
      {
        id: "films",
        spineTitle: "Movies",
        spineFoot: "Films",
        spineBlurb: "Posters · one-line notes",
        spineClass: "from-[#6e2434] to-[#3a121c]",
      },
      {
        id: "music",
        spineTitle: "Sound",
        spineFoot: "Music",
        spineBlurb: "Albums · tracks",
        spineClass: "from-[#3d2f66] to-[#1f1538]",
      },
      {
        id: "books",
        spineTitle: "Reading",
        spineFoot: "Books",
        spineBlurb: "Reads · quotes",
        spineClass: "from-[#2d4a38] to-[#152018]",
      },
      {
        id: "dramas",
        spineTitle: "Series",
        spineFoot: "Drama",
        spineBlurb: "Series · picks",
        spineClass: "from-[#244a72] to-[#102840]",
      },
    ] as const,
    films: [
      {
        title: "The Florida Project",
        year: 2017,
        director: "Sean Baker",
        posterSrc: "/shelf/the-florida-project.png",
        lineEn: "In hard light, tenderness and truth feel almost the same.",
        lineKo: "A heart laid bare in the glare of the day.",
      },
      {
        title: "Little Miss Sunshine",
        year: 2006,
        director: "Jonathan Dayton & Valerie Faris",
        posterSrc: "/shelf/little-miss-sunshine.png",
        lineEn: "Solidarity forged in the gaps — a family held together by what they lack.",
        lineKo: "Bonds that tighten where something is always missing.",
      },
      {
        title: "Monster",
        year: 2023,
        director: "Hirokazu Kore-eda",
        posterSrc: "/shelf/monster-2023.png",
        lineEn: "The moment self-centred stories collide — and everyone thinks they’re the victim.",
        lineKo: "자기중심성이 서로를 해치는 순간",
      },
    ],
    dramas: [
      {
        title: "The Pitt",
        year: 2025,
        director: "R. Scott Gemmill",
        posterSrc: "/shelf/the-pitt.png",
        lineEn: "One long shift reads like a cross-section of the whole world.",
        lineKo: "Twelve hours that feel like a cut through everything at once.",
      },
      {
        title: "Succession",
        year: 2023,
        director: "Jesse Armstrong",
        posterSrc: "/shelf/succession.png",
        lineEn: "Petty hearts rattling inside tailored shoulders.",
        lineKo: "Power suits hiding small, restless egos.",
      },
      {
        title: "The White Lotus",
        year: 2021,
        director: "Mike White",
        posterSrc: "/shelf/the-white-lotus.png",
        lineEn: "A bitter satire of who serves whom.",
        lineKo: "Class and service, sharpened into dark comedy.",
      },
      {
        title: "Severance",
        year: 2022,
        director: "Dan Erickson",
        posterSrc: "/shelf/severance.png",
        lineEn: "Maybe the cut wasn’t escape — it was a wish for harmony that split the wrong way.",
        lineKo: "Perhaps they wanted wholeness — and got a fault line instead.",
      },
      {
        title: "Shrinking",
        year: 2023,
        director: "Bill Lawrence · Jason Segel · Brett Goldstein",
        posterSrc: "/shelf/shrinking.png",
        lineEn: "Slow, clumsy steps toward recovery — but unmistakable footprints forward.",
        lineKo: "Healing that stumbles — yet still moves in one direction.",
      },
    ],
  },

  cheshire: {
    quote: "“We're all mad here.”",
    attribution: "— The Cheshire Cat",
    bodyHtml: "The best ideas sound impossible first — that's why I build them.",
    cta: "Get in touch",
  },

  footer: {
    colophonLine1: "This garden is tended by hand in spare evenings",
    colophonName: "Wonjun",
    copyright: "© 2026 Wonjun",
  },

  /** Labels inside the playing-card UI */
  cardUi: {
    roleLabel: "Role",
    impactLabel: "Impact",
    hintClosed: "Click to open",
    hintBack: "Click the rose to cultivate",
    hintModalClose: "Click outside or press Esc to close",
    closeDetail: "Close",
    inBloom: "in bloom",
  },
} as const;

export type SpotlightItem = (typeof site.spotlight)[number];
