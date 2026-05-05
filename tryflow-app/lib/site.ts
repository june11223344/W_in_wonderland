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
    contactMailto: "mailto:you@example.com",
    github: "https://github.com/june11223344",
  },

  nav: {
    contact: "Contact",
    github: "GitHub",
  },

  hero: {
    eyebrow: "A little wonderland in the browser",
    line1: "Hello — I'm",
    nameLine: "June.",
    subHtml:
      "I build for the web, chase side projects down rabbit holes,<br/>and believe the best work starts with honest curiosity.",
    primaryCta: "Say hello",
    secondaryCta: "Explore the garden →",
  },

  processIntro: {
    eyebrow: "Follow the rabbit",
    titleHtml: "How I <em>think.</em>",
    sub: "I learn in public, ship in small steps, and leave breadcrumbs for anyone who falls in after me.",
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

  queenSection: {
    eyebrow: "At a glance",
    titleLine1: "The Queen's",
    titleItalic: "Garden of skills.",
    bodyHtml:
      "A few things I reach for often — languages, stacks, and habits.<br/>Hover the cards; flip them if you're curious.",
  },

  /** Playing-card grid — same shape as before: title, category, score (0–100), trend, tag (rose stage hint) */
  spotlight: [
    {
      title: "TypeScript & React",
      category: "Frontend",
      score: 88,
      trend: "Daily",
      tag: "Featured",
    },
    {
      title: "Design systems & UI polish",
      category: "Product craft",
      score: 76,
      trend: "Growing",
      tag: "Emerging",
    },
    {
      title: "Node & APIs",
      category: "Backend",
      score: 72,
      trend: "Building",
      tag: "Hot",
    },
    {
      title: "Side projects & experiments",
      category: "Play",
      score: 90,
      trend: "Always",
      tag: "Featured",
    },
    {
      title: "Writing & documentation",
      category: "Communication",
      score: 70,
      trend: "Steady",
      tag: "New",
    },
    {
      title: "Open source & collaboration",
      category: "Community",
      score: 78,
      trend: "Open",
      tag: null,
    },
  ],

  garden: {
    linkBack: "Back to the garden",
  },

  /** Board-game style project strip — appears above the Cheshire section */
  boardGame: {
    eyebrow: "Side quest log",
    titleLine1: "The Queen's table —",
    titleItalic: "projects I've played for real.",
    sub: "Each space is something I designed, built, or shipped. Treat it like a board: read the tile, follow the link if you want the full rules.",
    footnote: "House rules: curiosity required; perfection optional.",
    linkLabel: "Open box (repo)",
    projects: [
      {
        title: "Wonderland intro site",
        year: "2026",
        tag: "Next.js · Tailwind",
        blurb: "This very page — Alice mood, static deploy, no backend rabbit holes.",
        href: "https://github.com/june11223344/alice_in",
        linkLabel: "Open box (repo)",
      },
      {
        title: "Tea-party API experiment",
        year: "2025",
        tag: "Node · TypeScript",
        blurb: "A small service for scheduling absurdly long tea breaks. (Placeholder — swap for your project.)",
        href: "https://example.com",
        linkLabel: "Try a round (demo)",
      },
      {
        title: "Croquet scoreboard UI",
        year: "2025",
        tag: "React · motion",
        blurb: "Prototype score tracker with mercilessly strict Queen animations. (Placeholder.)",
        href: null,
      },
      {
        title: "Rabbit-hole CLI",
        year: "2024",
        tag: "Rust / Go / Python",
        blurb: "Pick your stack — replace this line with a real one-liner about your tool.",
        href: null,
      },
    ],
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
    hintClosed: "click to reveal",
    hintBack: "click to cultivate",
    inBloom: "in bloom",
  },
} as const;

export type SpotlightItem = (typeof site.spotlight)[number];
