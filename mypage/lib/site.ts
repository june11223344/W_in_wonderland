/**
 * Personal intro site — edit this file to change all English copy and links.
 */
export const site = {
  meta: {
    title: "June — Alice-themed personal site",
    description:
      "A small wonderland in the browser: who I am, what I build, and how to reach me.",
  },

  brand: {
    navTitle: "June",
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
      "Jump to the garden. Suits group everything into four tracks: hard skills, soft skills, international experience, and just-for-fun experiments.",
    linkedinDescription: "Public LinkedIn profile.",
    githubDescription: "Code and projects on GitHub.",
  },

  hero: {
    eyebrow: "Welcome to a little wonderland",
    line1: "Hello — I'm",
    nameLine: "Wonjun.",
    subHtml:
      "I build for the web, chase side projects down rabbit holes,<br/>and believe the best work starts with honest curiosity.",
    primaryCta: "Say hello",
    secondaryCta: "Explore the garden →",
  },

  processIntro: {
    eyebrow: "About me",
    titleHtml: "I study Data Science — the way Alice <em>followed the rabbit.</em>",
    /** Main intro (HTML: line breaks, emphasis). */
    subHtml:
      "I'm learning how to turn noisy questions into clean data, honest models, and stories people can actually use.<br/><br/>Alice didn't know where the White Rabbit would lead — only that she was curious. If you follow this rabbit for a minute, you'll see how I work, what I'm practicing, and what I'm chasing next.<br/><br/><em>Want to come down the hole with me?</em>",
  },

  /**
   * EAT ME / DRINK ME — “what I want to grow” vs “what I want to shrink” (not ego size, but intentions).
   * Sits between the About block and the three steps.
   */
  aliceScale: {
    sectionEyebrow: "EAT ME · DRINK ME",
    sectionTitleHtml: "What I want to grow — and what I want to <em>shrink</em>.",
    growLabel: "EAT ME",
    growTitle: "What I want to grow",
    growBodyHtml:
      "<p><strong>Curiosity</strong> — following questions even when the path isn’t clear.</p><p><strong>New experiences</strong> — places, tools, and problems I haven’t met yet.</p><p><strong>Meeting many kinds of people</strong> — conversations that widen how I see the work.</p><p><strong>Ease</strong> — leaving enough slack to think clearly instead of running on fumes.</p>",
    growImageSrc: "/eattme.png",
    growImageAlt: "EAT ME cake",
    shrinkLabel: "DRINK ME",
    shrinkTitle: "What I want to shrink",
    shrinkBodyHtml:
      "<p><strong>Hesitation</strong> — the pause that turns into never shipping.</p><p><strong>Second-guessing in circles</strong> — re-reading the same tab instead of taking the next small step.</p><p><strong>Impatience</strong> — the jittery rush that trades care for speed and leaves me less proud of the result.</p>",
    shrinkImageSrc: "/drink-removebg-preview.png",
    shrinkImageAlt: "DRINK ME bottle",
  },

  steps: [
    {
      num: "I.",
      title: "Curiosity first.",
      desc: "I start with questions, sketches, and messy prototypes — not polished decks. The goal is to understand before building.",
      imageSrc: "/alice_door.png",
      imageAlt: "Alice at the door",
      imageWidth: 160,
    },
    {
      num: "II.",
      title: "Build, then refine.",
      desc: "I ship early, listen to feedback, and iterate. Tools and frameworks change; the habit of shipping is what stays.",
      imageSrc: "/cata.png",
      imageAlt: "The Caterpillar",
      imageWidth: 200,
    },
    {
      num: "III.",
      title: "Share the table.",
      desc: "Good ideas get better in conversation. I like collaborating, reviewing code, and learning from people who see the world differently.",
      imageSrc: "/tea-party.png",
      imageAlt: "The Mad Tea-Party",
      imageWidth: 240,
    },
  ],

  /**
   * Playing-card grid — grouped by suit.
   * Spades: KEY AI products + coursework ML/data · Hearts: HUSS, capstone, D&A leadership · Diamonds: Netherlands · Clubs: X:AI base
   */
  spotlight: [
    {
      title: "eLe — news into level-matched dialogue",
      category: "Hard skills · AI product",
      score: 92,
      trend: "Mar 2026",
      tag: "Featured",
      suit: "spade",
      detailHtml:
        "<p><strong>KEY AI PRODUCT · eLe</strong> — An English-learning AI platform that turns live news into dialogues matched to the learner’s level.</p><p>Focused on automating teaching-material generation to cut manual work, and on keeping the product feeling like content that never goes stale.</p>",
    },
    {
      title: "Point — presentation coaching agent",
      category: "Hard skills · real-time AI",
      score: 91,
      trend: "Mar 2026 →",
      tag: "Hot",
      suit: "spade",
      detailHtml:
        "<p><strong>KEY AI PRODUCT · Point</strong> — A real-time coaching tool that gives feedback on speech and non-verbal cues during practice talks.</p><p>Designed around <strong>client-side processing</strong> to keep latency low so the experience feels like an immediate, in-the-room coach.</p>",
    },
    {
      title: "ML & data pipelines from study & class",
      category: "Hard skills · ML & analytics",
      score: 87,
      trend: "2025",
      tag: "Building",
      suit: "spade",
      detailHtml:
        "<p><strong>Deep learning course</strong> — Framed a smart fish-farm object-detection idea to think through domain-specific DL.</p><p><strong>X:AI Adv</strong> — End-to-end STT shopping-cart flow and voice-model fine-tuning.</p><p><strong>Text analytics</strong> — Airline reviews with word clouds and topic modeling.</p><p><strong>Shinhan Card project</strong> — Analysis into a Streamlit site wired to GitHub for a shipped, web-facing result.</p>",
    },
    {
      title: "HUSS hackathon — vision, roadmap, stage",
      category: "Soft skills · leadership",
      score: 90,
      trend: "Aug 2025",
      tag: "Featured",
      suit: "heart",
      detailHtml:
        "<p><strong>HUSS Idea Hackathon (environmental data app)</strong> — Led the platform <strong>vision</strong> and pitched a complex <strong>technical roadmap</strong> to an audience of 200+.</p><p><strong>Grand Prize</strong> — what stuck most was practice turning dense tech into a story people could follow in one sitting.</p>",
    },
    {
      title: "Capstone — problem to solution with the team",
      category: "Soft skills · collaboration",
      score: 82,
      trend: "Spring 2025",
      tag: "Growing",
      suit: "heart",
      detailHtml:
        "<p>Airbnb lodging-data capstone: ran the <strong>full arc from problem framing to solution</strong> with a student team.</p><p>Worked across different majors, split roles, and synced often — the messy human part of shipping, not just the notebook.</p>",
    },
    {
      title: "D&A — big-data society ops & seminars",
      category: "Soft skills · lead",
      score: 85,
      trend: "Jan–Nov 2025",
      tag: "Open",
      suit: "heart",
      detailHtml:
        "<p><strong>PROFESSIONAL · D&amp;A (Big Data Analysis Society)</strong> — Set a <strong>roadmap</strong> for 50+ members and <strong>ran seminars</strong> on advanced topics like RNNs and LSTMs.</p><p>Aimed to lift the society’s technical floor while tightening my own understanding by teaching structure, not only using it.</p>",
    },
    {
      title: "Netherlands exchange — web with locals",
      category: "International",
      score: 84,
      trend: "Fall 2024",
      tag: "Steady",
      suit: "diamond",
      detailHtml:
        "<p><strong>Netherlands Exchange Program (Fall 2024)</strong> — Built a community website with local stakeholders, negotiating needs in English day to day.</p><p>A stretch season for communication and rapport — the kind of growth that only really shows up when you leave your default context.</p>",
    },
    {
      title: "Global Climate Change Response — Georgia & Uzbekistan",
      category: "International · field research",
      score: 87,
      trend: "Jul 2025",
      tag: "Growing",
      suit: "diamond",
      detailHtml:
        "<p><strong>Global Climate Change Response Program</strong> (Kookmin University) — Field research and expert interviews in <strong>Georgia and Uzbekistan</strong> to compare how different regions approach international climate response.</p><p><strong>Regional expert interviews</strong> — Met climate advisors at the National Centre for Climate Change (Tashkent) and traced environmental initiatives across the Caucasus and Central Asia.</p><p><strong>Global collaboration</strong> — Worked with a GGGI manager to help convene discussions at the Ministry of Ecology.</p><p><strong>Strategic insight</strong> — Turned varied regional voices into one report on partner relations and climate project management.</p><p><em>Skills:</em> English and interviewing.</p>",
    },
    {
      title: "Global PBL — Irvine, CA",
      category: "International · study abroad",
      score: 89,
      trend: "Mar–Aug 2026",
      tag: "Featured",
      suit: "diamond",
      detailHtml:
        "<p><strong>Global PBL Program</strong> (Kookmin University) — <strong>Six months in Irvine, California</strong>, focused on advanced coursework and building in a US startup ecosystem.</p><p>Current emphasis: <strong>applied AI</strong>; <strong>full-stack service development</strong>; <strong>cloud-based product building</strong>; <strong>startup dynamics and venture ecosystems</strong>.</p><p><em>Skills:</em> AI agents, Amazon Web Services (AWS).</p>",
    },
    {
      title: "X:AI base — paper-reading circle",
      category: "Just for fun · curiosity",
      score: 74,
      trend: "Spring 2025",
      tag: "New",
      suit: "club",
      detailHtml:
        "<p><strong>X:AI Base (Spring 2025)</strong> — Read and presented AI papers; explored how to skim, dig in, and ask the right questions of research writing.</p><p>Low-pressure, curiosity-led learning — the stack I park under “just for fun” on purpose.</p>",
    },
  ],

  garden: {
    cardRabbitSrc: "/card-rabbit.png",
    cardRabbitAlt: "White Rabbit herald with trumpet and scroll",
    /** White Rabbit voice above the suit buttons */
    rabbitCalloutHtml:
      "<strong>Pick the thread you want.</strong> Hard skills, soft skills, international stories, and just-for-fun experiments — each suit deals a different hand. Tap a card to read it on a dimmed stage.",
    rabbitSignoff: "— The White Rabbit (in a hurry)",
    suitPickerTitle: "Pick a suit",
    suitPickerHint:
      "Four tracks: hard skills, soft skills, international experience, and just for fun. Tap a card to open the full note on a dimmed backdrop.",
    changeSuit: "Change suit",
    suits: [
      {
        id: "spade",
        glyph: "♠",
        label: "Spades",
        sub: "Hard skills",
        desc: "Languages, runtimes, APIs — the concrete stack and the reps of shipping real products. Everything here lives on the “building” side.",
      },
      {
        id: "heart",
        glyph: "♥",
        label: "Hearts",
        sub: "Soft skills",
        desc: "Design sense, writing, feedback, and teamwork — the human layer that perfect code alone never fills.",
      },
      {
        id: "diamond",
        glyph: "♦",
        label: "Diamonds",
        sub: "International",
        desc: "Language, collaborating across borders, or life abroad — stories from when your default context is no longer the default.",
      },
      {
        id: "club",
        glyph: "♣",
        label: "Clubs",
        sub: "Just for fun",
        desc: "Experiments and side quests where curiosity beats polish — the things you build because you like building, full stop.",
      },
    ] as const,
  },

  cheshire: {
    quote: "“We're all mad here.”",
    attribution: "— The Cheshire Cat",
    bodyHtml:
      "The best projects always sound a little impossible at first.<br/>That's exactly why I like building them anyway.",
    cta: "Get in touch",
  },

  footer: {
    colophonLine1: "This garden is tended by hand in spare evenings",
    colophonName: "June",
    copyright: "© 2026 June",
  },

  /** Labels inside the playing-card UI */
  cardUi: {
    barLabel: "depth",
    backMetricTitle: "Focus",
    backMetricSuffix: "/ 100",
    hintClosed: "Click to open",
    hintBack: "Click the rose to cultivate",
    hintModalClose: "Click outside or press Esc to close",
    closeDetail: "Close",
    inBloom: "in bloom",
  },
} as const;

export type SpotlightItem = (typeof site.spotlight)[number];
