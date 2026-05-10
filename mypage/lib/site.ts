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
      "Under the hero: tap ♠ ♥ ♦ ♣ — hard skills, soft skills, international, and clubs (side quests: broadcast cameo, sport, language streaks, and more to come).",
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
   * Spades: eLe, Point, ML (+ X:AI Base at school in the ML card) · Hearts · Diamonds · Clubs: side quests (extras, sport, habits — expandable)
   */
  spotlight: [
    {
      title: "eLe — news into level-matched dialogue",
      category: "Hard skills · AI product",
      trend: "Mar 2026",
      suit: "spade",
      imageSrc: "/spotlight/ele-english-education.png",
      imageAlt:
        "eLe English education graphic: easy plus live equals english, with try-it cue and QR — Presented by Wonjun Lee",
      projectUrl: "https://juns007-ele-frontend.static.hf.space/",
      roleLine: "Product direction; news-to-dialogue teaching pipeline",
      impactLine: "Less manual prep; fresher, level-matched English practice",
      detailHtml:
        "<p><strong>KEY AI PRODUCT · eLe</strong> — An English-learning AI platform that turns live news into dialogues matched to the learner’s level.</p><p>Focused on automating teaching-material generation to cut manual work, and on keeping the product feeling like content that never goes stale.</p>",
    },
    {
      title: "Point — presentation coaching agent",
      category: "Hard skills · real-time AI",
      trend: "Mar 2026 →",
      suit: "spade",
      imageSrc: "/spotlight/point-landing.png",
      imageAlt: "Point landing page: Your AI presentation coach, lined paper background and Start with Point button",
      projectUrl: "https://pointpresent.com/",
      roleLine: "Real-time coaching UX; client-side processing focus",
      impactLine: "Snappier feedback loop without heavy server round-trips",
      detailHtml:
        "<p><strong>KEY AI PRODUCT · Point</strong> — A real-time coaching tool that gives feedback on speech and non-verbal cues during practice talks.</p><p>Designed around <strong>client-side processing</strong> to keep latency low so the experience feels like an immediate, in-the-room coach.</p>",
    },
    {
      title: "ML & data pipelines + X:AI Base — class & campus reading",
      category: "Hard skills · ML, analytics & school reading",
      trend: "2025",
      suit: "spade",
      imageSrc: "/spotlight/kookmin-university-logo.png",
      /** Letterbox in the card photo slot (official seal is circular). */
      imageFit: "contain",
      imageAlt:
        "Kookmin University circular seal: KMU wordmark with ring text Kookmin University / 국민대학교",
      roleLine: "DL, voice, text & analytics from class; Kookmin X:AI Base — papers, circle read & defend",
      impactLine: "STT & topic-model artifacts; research skim → deep read + sharper ML paper critique",
      detailHtml:
        "<p><strong>Deep learning course</strong> — Framed a smart fish-farm object-detection idea to think through domain-specific DL.</p><p><strong>X:AI Adv</strong> — End-to-end STT shopping-cart flow and voice-model fine-tuning.</p><p><strong>Text analytics</strong> — Airline reviews with word clouds and topic modeling.</p><p><strong>X:AI Base (Spring 2025, Kookmin University)</strong> — An <strong>on-campus paper-reading circle</strong> where I read, presented, and discussed AI research with peers.</p><p>Trained hard skills that carry into coursework and projects: <strong>fast triage vs deep read</strong>, checking methods and assumptions, and asking sharper questions of research writing.</p>",
    },
    {
      title: "HUSS hackathon — vision, roadmap, stage",
      category: "Soft skills · leadership",
      trend: "Aug 2025",
      suit: "heart",
      imageSrc: "/spotlight/huss-convergence-presentation.png",
      imageAlt:
        "HUSS stage pitch: presenter with slide on government macro data versus neighbourhood micro data for an environmental data app",
      roleLine: "Platform vision, technical roadmap, main-stage pitch",
      impactLine: "Grand Prize; dense tech translated for 200+ listeners",
      detailHtml:
        "<p><strong>HUSS Idea Hackathon (environmental data app)</strong> — Led the platform <strong>vision</strong> and pitched a complex <strong>technical roadmap</strong> to an audience of 200+.</p><p><strong>Grand Prize</strong> — what stuck most was practice turning dense tech into a story people could follow in one sitting.</p>",
    },
    {
      title: "Capstone — problem to solution with the team",
      category: "Soft skills · collaboration",
      trend: "Spring 2025",
      suit: "heart",
      imageSrc: "/spotlight/capstone-outlier-accommodations.png",
      imageAlt:
        "Capstone slide: final definition of outlier Airbnb listings — scatter of model-predicted vs actual booking rate with high and low outlier clusters",
      roleLine: "Problem framing → solution with a cross-major student team",
      impactLine: "Full delivery arc, not only analysis in a notebook",
      detailHtml:
        "<p>Airbnb lodging-data capstone: ran the <strong>full arc from problem framing to solution</strong> with a student team.</p><p>Worked across different majors, split roles, and synced often — the messy human part of shipping, not just the notebook.</p><p><strong>Outlier listings</strong> — Compared <strong>model-predicted vs actual booking rates</strong> to flag “superior” stays the model undersold and “underperforming” stays that lagged despite a strong forecast — tightening what the team optimised for next.</p>",
    },
    {
      title: "D&A — big-data society ops & seminars",
      category: "Soft skills · lead",
      trend: "Jan–Nov 2025",
      suit: "heart",
      imageSrc: "/spotlight/da-bagging-seminar.png",
      imageAlt:
        "D&A seminar in session: presenter beside screen explaining Bagging — bootstrap sampling, multiple models, and aggregating predictions (vote or average)",
      roleLine: "Society ops: roadmap + advanced seminar program",
      impactLine: "50+ members; raised the bar on RNNs, LSTMs, and practice",
      detailHtml:
        "<p><strong>PROFESSIONAL · D&amp;A (Big Data Analysis Society)</strong> — Set a <strong>roadmap</strong> for 50+ members and <strong>ran seminars</strong> on advanced topics like RNNs and LSTMs.</p><p>Aimed to lift the society’s technical floor while tightening my own understanding by teaching structure, not only using it.</p><p><strong>Seminar snapshot</strong> — Led sessions that walked through <strong>Bagging</strong> (bootstrap + aggregating): resampled training sets, trained parallel models, then combined outputs with <strong>majority vote</strong> for classification or <strong>averaging</strong> for regression — linking ensemble intuition to how members read models end-to-end.</p>",
    },
    {
      title: "Netherlands exchange — web with locals",
      category: "International",
      trend: "Fall 2024",
      suit: "diamond",
      imageSrc: "/spotlight/netherlands-exchange-team.png",
      imageAlt:
        "Netherlands exchange: team photo on campus with civic-tech project posters (democracy / gamification) in the background",
      roleLine: "Community website with local stakeholders (English day-to-day)",
      impactLine: "Shipped site + rapport outside my default context",
      detailHtml:
        "<p><strong>Netherlands Exchange Program (Fall 2024)</strong> — Built a community website with local stakeholders, negotiating needs in English day to day.</p><p>A stretch season for communication and rapport — the kind of growth that only really shows up when you leave your default context.</p>",
    },
    {
      title: "Global Climate Change Response — Georgia & Uzbekistan",
      category: "International · field research",
      trend: "Jul 2025",
      suit: "diamond",
      imageSrc: "/spotlight/climate-field-meeting.png",
      imageAlt:
        "Climate field program meeting room: round table with Uzbekistan desk flag and partners in discussion",
      roleLine: "Field research, regional expert interviews, report synthesis",
      impactLine: "One strategic report; supported ministry convening (GGGI)",
      detailHtml:
        "<p><strong>Global Climate Change Response Program</strong> (Kookmin University) — Field research and expert interviews in <strong>Georgia and Uzbekistan</strong> to compare how different regions approach international climate response.</p><p><strong>Regional expert interviews</strong> — Met climate advisors at the National Centre for Climate Change (Tashkent) and traced environmental initiatives across the Caucasus and Central Asia.</p><p><strong>Global collaboration</strong> — Worked with a GGGI manager to help convene discussions at the Ministry of Ecology.</p><p><strong>Strategic insight</strong> — Turned varied regional voices into one report on partner relations and climate project management.</p><p><em>Skills:</em> English and interviewing.</p>",
    },
    {
      title: "Global PBL — Irvine, CA",
      category: "International · study abroad",
      trend: "Mar–Aug 2026",
      suit: "diamond",
      imageSrc: "/spotlight/global-pbl-presentation.png",
      imageAlt:
        "Global PBL presentation: full-length photo of speaker in black tee between two projection screens, laptop on stand, classroom lighting",
      roleLine: "Six-month exchange: applied AI, AWS, full-stack, startup ecosystem",
      impactLine: "US coursework + building inside a venture-heavy region",
      detailHtml:
        "<p><strong>Global PBL Program</strong> (Kookmin University) — <strong>Six months in Irvine, California</strong>, focused on advanced coursework and building in a US startup ecosystem.</p><p>Current emphasis: <strong>applied AI</strong>; <strong>full-stack service development</strong>; <strong>cloud-based product building</strong>; <strong>startup dynamics and venture ecosystems</strong>.</p><p><em>Skills:</em> AI agents, Amazon Web Services (AWS).</p>",
    },
    {
      title: "Broadcast extra — tvN crowd scene",
      category: "Clubs · on-camera cameo",
      trend: "Side quest",
      suit: "club",
      imageSrc: "/spotlight/club-tvn-broadcast-extra.png",
      imageAlt:
        "tvN drama still from Boss Project (신사장 프로젝트): night crowd scene; arrows mark background extra in light jacket",
      roleLine: "Walked a real set once — background in a primetime K-drama crowd",
      impactLine: "Proof that curiosity sometimes means standing in frame, not only behind a screen",
      detailHtml:
        "<p><strong>Background extra</strong> — Appeared in a crowd scene for <strong>tvN’s <em>Boss Project</em> (신사장 프로젝트)</strong>. A small <strong>on-set memory</strong>: how a big moment on TV is built from waits, resets, and choreography.</p><p><em>More club-lane notes to add later.</em></p>",
    },
    {
      title: "Fencing — gym club snapshot",
      category: "Clubs · sport",
      trend: "Side quest",
      suit: "club",
      imageSrc: "/spotlight/club-fencing-class.png",
      imageAlt:
        "Fencing club group photo in a gym: white jackets, masks and blades, brick wall and court lines",
      roleLine: "Learned fencing with a club — gear, etiquette, and repetition on the strip",
      impactLine: "Different muscles than typing; same respect for fundamentals",
      detailHtml:
        "<p><strong>Fencing</strong> — Club training with the full kit: masks, foils, and the slow path to <strong>clean footwork</strong>.</p><p><em>Longer write-up coming.</em></p>",
    },
    {
      title: "Spanish on Duolingo — long streak",
      category: "Clubs · daily language",
      trend: "440+ days",
      suit: "club",
      imageSrc: "/spotlight/club-duolingo-spanish-streak.png",
      imageAlt:
        "Duolingo streak share card: 440-day flame streak with Duo mascot and “See you later!”",
      roleLine: "Daily Spanish on Duolingo — past a full year and still checking in",
      impactLine: "Low-stakes consistency that survives busy weeks without a project deadline",
      detailHtml:
        "<p><strong>Spanish · Duolingo</strong> — Over <strong>a year</strong> of daily practice; the screenshot shows a <strong>440-day streak</strong>. A pocket habit — not a substitute for immersion, but a lane I can keep honest.</p><p><em>Room here for more detail when you’re ready.</em></p>",
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
    /** Shown when a suit has no spotlight cards yet (e.g. ♣ with zero items). */
    emptySuitTitle: "This suit is open",
    emptySuitBody:
      "No garden cards in this lane right now — proof lives under ♠, ♥, and ♦. Pick another suit, or come back when a club card is added.",
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
   * Palette anchor (spines + section wash): FERN #768E78 · PISTACHIO #C6C09C · FENNEL #EBDEC0 · PEONY #E79897 · PEACH #FCAC83 · HONEY #FCC88A.
   */
  shelf: {
    sectionEyebrow: "The Caterpillar's shelf",
    sectionTitle: "Four spines, four stacks",
    sectionSub: "Four spines on one shelf — each opens a different stack. Tap one to browse that shelf.",
    spineRowCue: "Four stacks — tap a spine",
    caterpillarSrc: "/caterpillar.png",
    caterpillarAlt: "The Caterpillar on a mushroom (illustration)",
    backToShelf: "← Back to shelf",
    emptyShelfTitle: "This stack is still growing",
    emptyShelfBody:
      "This lane is open for the next stack — same card format when new picks land here.",
    /** Stack card body — two lines of copy shown together */
    stackBodyEnLabel: "English",
    stackBodyKoLabel: "한국어",
    /**
     * Order: films → music → books → drama.
     * spineFoot = category · spineBlurb = what’s inside · spineTitle = vertical spine label.
     * spineClass: solid fills — same herb tones as former gradient endpoints (no gradients).
     */
    categories: [
      {
        id: "films",
        spineTitle: "Movies",
        spineFoot: "Films",
        spineBlurb: "Posters · one-line notes",
        spineClass: "bg-[#c98281]",
      },
      {
        id: "music",
        spineTitle: "Sound",
        spineFoot: "Music",
        spineBlurb: "Albums · tracks",
        spineClass: "bg-[#e88b5c]",
      },
      {
        id: "books",
        spineTitle: "Reading",
        spineFoot: "Books",
        spineBlurb: "Reads · quotes",
        spineClass: "bg-[#627664]",
      },
      {
        id: "dramas",
        spineTitle: "Series",
        spineFoot: "Drama",
        spineBlurb: "Series · picks",
        spineClass: "bg-[#9a8f6e]",
      },
    ] as const,
    films: [
      {
        title: "The Florida Project",
        year: 2017,
        director: "Sean Baker",
        posterSrc: "/shelf/the-florida-project.png",
        lineEn: "In hard light, tenderness and truth feel almost the same.",
        lineKo: "센 빛 아래에서는 다정함과 진실이 거의 같은 얼굴로 다가온다.",
      },
      {
        title: "Little Miss Sunshine",
        year: 2006,
        director: "Jonathan Dayton & Valerie Faris",
        posterSrc: "/shelf/little-miss-sunshine.png",
        lineEn: "Solidarity forged in the gaps — a family held together by what they lack.",
        lineKo: "텅 빈 곳에서 단단해진 연대 — 없는 것으로 버티는 가족.",
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
    music: [
      {
        title: "Ribs",
        year: 2013,
        director: "Lorde · Pure Heroine",
        posterSrc: "/shelf/music-lorde-pure-heroine.png",
        lineEn: "Childhood freedom rushes back — then a quiet ache settles in.",
        lineKo: "이 노래를 들으면 자유롭던 어린 시절이 떠오르면서 마음 어딘가가 울적해져",
      },
      {
        title: "You're On Your Own, Kid",
        year: 2022,
        director: "Taylor Swift · Midnights",
        posterSrc: "/shelf/music-taylor-swift-midnights.png",
        lineEn: "What I owe myself is what makes me stronger.",
        lineKo: "내 책임이라는 것은 나를 강하게 만든다",
      },
      {
        title: "The Maybe Man",
        year: 2023,
        director: "AJR · The Maybe Man",
        posterSrc: "/shelf/music-ajr-the-maybe-man.png",
        lineEn: "Comfort for the version of me that barely knows me — and wants to bolt.",
        lineKo: "나도 나를 모르겠고 도망치고 싶은 나를 위로해주는 노래",
      },
    ],
    books: [
      {
        title: "노랑무늬영원",
        year: 1999,
        director: "한강 · 소설집",
        posterSrc: "/shelf/book-norang-munui-yeongwon.png",
        lineEn: "When fragility becomes mutual comfort.",
        lineKo: "연약함이 서로의 위로가 될 때",
      },
      {
        title: "시선으로부터,",
        year: 2020,
        director: "정세랑 · 장편소설",
        posterSrc: "/shelf/book-siseon-eurobuto.png",
        lineEn: "A smooth way to digest tradition.",
        lineKo: "전통을 매끈하게 소화하는 방법",
      },
      {
        title: "재수사",
        year: 2024,
        director: "장강명 · 장편소설",
        posterSrc: "/shelf/book-jaesusa.png",
        lineEn: "Following the circuitry of being human, step by step.",
        lineKo: "사람이라는 회로를 찬찬히 따라간다",
      },
    ],
    dramas: [
      {
        title: "The Pitt",
        year: 2025,
        director: "R. Scott Gemmill",
        posterSrc: "/shelf/the-pitt.png",
        lineEn: "One long shift reads like a cross-section of the whole world.",
        lineKo: "한 번의 긴 근무가 온 세계의 단면처럼 읽힌다.",
      },
      {
        title: "Succession",
        year: 2023,
        director: "Jesse Armstrong",
        posterSrc: "/shelf/succession.png",
        lineEn: "Petty hearts rattling inside tailored shoulders.",
        lineKo: "맞춤 어깨 안에서 작은 마음이 덜컥거린다.",
      },
      {
        title: "Severance",
        year: 2022,
        director: "Dan Erickson",
        posterSrc: "/shelf/severance.png",
        lineEn: "Maybe the cut wasn’t escape — it was a wish for harmony that split the wrong way.",
        lineKo: "도망이 아니라 완전함을 바랐는데, 잘못 난 단층을 얻었을지도 모른다.",
      },
    ],
    /** Below the shelf — Tenniel tea-party art + contact “on the table”. */
    teaInvite: {
      eyebrow: "After the shelf",
      title: "Why is a raven like a writing-desk?",
      bodyLine1:
        "All that wandering through pictures — small wonder you've worked up an appetite.",
      bodyLine2:
        "Curiouser about my little rabbit-hole? If you'd care to take tea, do send word — I'd be glad to hear from you.",
      imageSrc: "/tea-party-invite.png",
      imageAlt:
        "Mad tea-party engraving: Alice, March Hare, Dormouse, and Mad Hatter at a long table with teacups and plates",
      plateLinkLabel: "LinkedIn",
      cupLinkLabel: "Email",
    },
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
  },
} as const;

export type SpotlightItem = (typeof site.spotlight)[number];
