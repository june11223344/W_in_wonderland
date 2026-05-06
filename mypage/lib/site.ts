/**
 * Personal intro site — edit this file to change all English copy and links.
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
      "The garden sits right under the hero. Suits group proof into four tracks: hard skills, soft skills, international experience, and just-for-fun experiments.",
    linkedinDescription: "Public LinkedIn profile.",
    githubDescription: "Code and projects on GitHub.",
  },

  hero: {
    eyebrow: "Welcome to a little wonderland",
    line1: "Hello — I'm",
    nameLine: "Wonjun.",
    subHtml:
      "I build for the web, chase side projects down rabbit holes,<br/>and believe the best work starts with honest curiosity.",
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
   * Sits below the About block on the landing section.
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
