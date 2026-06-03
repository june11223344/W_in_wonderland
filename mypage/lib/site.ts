/**
 * Personal intro site — edit this file to change all English copy and links.
 *
 * Narrative north star: the visitor is Alice; Wonjun hosts the site; the White Rabbit guides;
 * the garden is the evidence trail. Positioning: concept designer (worlds, visuals, story-led product).
 */
export const site = {
  meta: {
    title: "Wonjunland",
    description:
      "Wonjun: concept designer. Product worlds and interfaces (eLe, Point), story-led pitches and teaching visuals, and field projects abroad. Garden cards = proof.",
  },

  brand: {
    navTitle: "Wonjun",
    rabbitAlt: "White Rabbit",
  },

  links: {
    contactMailto: "mailto:wj0103230806@gmail.com",
    linkedin: "https://www.linkedin.com/in/wonjun-wonjun/",
  },

  /** Skip link and other accessibility strings (keep in English for `lang="en"` pages). */
  a11y: {
    skipToMain: "Skip to main content",
    gardenCardStripNav: "Garden cards in this suit",
  },

  nav: {
    board: "Garden",
    email: "Email",
    linkedin: "LinkedIn",
  },

  /** Short lines inside NavReveal panels (edit anytime) */
  navReveal: {
    boardDescription:
      "Under the hero: tap ♠ ♥ ♦ ♣ for concept craft, story & pitch, worlds abroad, and side quests (set cameos, sport, language streaks, and more to come).",
    linkedinDescription: "Public LinkedIn profile.",
    /** Shown above the address in the Email panel (same pattern as LinkedIn). */
    emailDescription: "Tap the address below to compose a message in your mail app.",
  },

  hero: {
    /** Optional small caps above the main headline (leave empty to skip). */
    eyebrow: "",
    /** Line 1 — large headline (fade-in). */
    introLine1: "You in Wonjunland",
    /** Line 2 — first row (fade-in after line 1). */
    line2Prefix: "Hello, ",
    /** Line 2 — second row. */
    line2TypedPhrase: "I'm Wonjun",
    /** Line 2 — optional fixed tail after the typed segment (e.g. punctuation); leave empty to skip. */
    line2AfterTyped: "",
    /** Line 2 — optional fixed second row (empty = single-line hello). */
    line2StaticSuffix: "",
    /** Homophone tagline under the hello line (e.g. or One June.). */
    line2Homophone: "or One June.",
    subHtml: "Curious? Follow the rabbit.<br />The garden and cards carry the rest.",
    /** Tenniel White Rabbit between sub copy and WOW block (pocket-watch pose). */
    rabbitGuide: {
      src: "/rabbit.png",
      alt: "White Rabbit with pocket watch, glancing downward",
    },
    /**
     * Hero proof block: lead line + W·O·W pillars + garden bridge.
     * Rendered as a three-column grid in the hero (see HeroWowSummary in page.tsx).
     */
    wowSummary: {
      sectionEyebrow: "Wonjun in Wonderland",
      leadHtml:
        "<p><strong>Wonjun</strong> is a concept designer. I care about <strong>logic and story</strong> as much as the visuals, then shape the <strong>product world</strong> around the concept.</p>",
      pillars: [
        {
          letter: "W",
          label: "Whole",
          body: "Concept, UI, and technical builds through live products<br />(eLe, Point).",
        },
        {
          letter: "O",
          label: "Open",
          body: "Mixed teams abroad: listen, write, ship<br />(Netherlands, field study).",
        },
        {
          letter: "W",
          label: "Well-structured",
          body: "Dense ideas into one clear stage story<br />(HUSS, Grand Prize).",
        },
      ],
      footHtml:
        "<p>The <strong>garden</strong> below is the proof deck: one card per chapter, sorted by suit.</p>",
    },
  },

  processIntro: {
    eyebrow: "About me",
    titleHtml: "You followed a rabbit, <em>the way Alice did.</em>",
    /** Main intro (HTML: line breaks, emphasis). Visitor = Alice; light invitation to stay. */
    subHtml:
      "You got here the way Alice did: a little curiosity, a few clicks.<br/><br/><em>Stay for a minute?</em>",
  },

  /**
   * EAT ME / DRINK ME — “what I want to grow” vs “what I want to shrink” (not ego size, but intentions).
   * Sits below the About block on the landing section.
   */
  aliceScale: {
    sectionEyebrow: "EAT ME · DRINK ME",
    sectionTitleHtml: "What I want to grow, and what I want to <em>shrink</em>.",
    growLabel: "EAT ME",
    growTitle: "What I want to grow",
    growBodyHtml:
      "<p>I value <strong>clear worlds</strong>: a coherent mood, readable hierarchy, and visuals that still make sense after <strong>feedback and revision</strong>.</p>",
    growImageSrc: "/eattme.png",
    growImageAlt: "EAT ME cake",
    shrinkLabel: "DRINK ME",
    shrinkTitle: "What I want to shrink",
    shrinkBodyHtml:
      "<p>I tend to <strong>overthink before I sketch</strong>. Some lessons only show up when you <strong>put lines on the page</strong>. I want to trust <strong>quick studies</strong> instead of waiting for a <strong>finished concept</strong> in my head.</p>",
    shrinkImageSrc: "/drink-removebg-preview.png",
    shrinkImageAlt: "DRINK ME bottle",
  },

  /**
   * Playing-card grid — grouped by suit.
   * Spades: concept craft (eLe, Point, campus visual study) · Hearts: story & pitch · Diamonds: worlds abroad · Clubs: side quests
   */
  spotlight: [
    {
      title: "eLe: easy English reading from live news",
      category: "Concept craft · product world",
      trend: "Mar 2026",
      suit: "spade",
      imageSrc: "/spotlight/ele-english-education.png",
      imageAlt:
        "eLe product graphic: easy English reading from live news, with try-it cue and QR. Presented by Wonjun Lee",
      projectUrl: "https://juns007-ele-frontend.static.hf.space/",
      roleLine:
        "Shaped the product world: key visual, student-first layout, and chat-style reading that matches level and tone.",
      impactLine:
        "Headlines feel approachable: light thread UI, clear summaries, and a longer read when someone wants depth.",
      detailHtml:
        "<p><strong>eLe</strong> is a reading world built around the news. I cared about <strong>tone</strong>: each story becomes a <strong>chat-style thread</strong> so the screen feels friendly, not like a textbook wall.</p><p>The <strong>product graphic</strong> and flow keep one clear loop: headline → short lines → <strong>summary</strong> → optional <strong>longer paragraph</strong>. Same story, more room when the learner is ready.</p><p>For me this was concept work: <strong>who it is for</strong>, <strong>how it should feel</strong>, and <strong>what stays on screen</strong> at each step.</p>",
    },
    {
      title: "Point: live presentation coach",
      category: "Concept craft · interface",
      trend: "Mar 2026 – Now",
      suit: "spade",
      imageSrc: "/spotlight/point-landing.png",
      imageAlt: "Point landing page: Your AI presentation coach, lined paper background and Start with Point button",
      projectUrl: "https://pointpresent.com/",
      roleLine:
        "Defined the rehearsal world: lined-paper landing, live practice screen, and an audience layer so the room feels real.",
      impactLine:
        "Coaching cues sit on a calm UI; persona tone, filler timing, and background crowd read at a glance.",
      detailHtml:
        "<p><strong>Point</strong> is a presentation coach with a deliberate <strong>visual mood</strong>: the landing uses <strong>lined paper</strong> and a single clear call to start.</p><p>On the rehearsal screen I wanted <strong>hierarchy</strong>: voice tone, <strong>persona-style</strong> delivery notes, and <strong>filler words</strong> timed where the speaker can actually fix them.</p><p>The <strong>audience video</strong> layer is a spatial concept: practice is not a floating widget, it is you in front of people. I built the product end to end, but the card is about the <strong>world on screen</strong>.</p>",
    },
    {
      title: "Campus studio: visuals that carry hard ideas",
      category: "Concept craft · visual study",
      trend: "2025",
      suit: "spade",
      imageSrc: "/spotlight/kookmin-university-logo.png",
      /** Letterbox in the card photo slot (official seal is circular). */
      imageFit: "contain",
      imageAlt:
        "Kookmin University circular seal: KMU wordmark with ring text Kookmin University / 국민대학교",
      roleLine:
        "Turned dense course topics into charts, word clouds, and slides people could read without the jargon first.",
      impactLine:
        "Learned to sketch the story before the equation; joined a weekly campus circle to debate papers out loud.",
      detailHtml:
        "<p>In class I kept asking: <strong>what should the room see first?</strong> Text analytics became <strong>word clouds and topic views</strong> on airline reviews. Other briefs pushed me to frame real tasks (detection, speech flows) as <strong>clear problem stories</strong>, not only notebooks.</p><p><strong>X:AI Base (Spring 2025)</strong> was a small <strong>paper-reading circle</strong> at Kookmin: present, argue, and sketch what mattered on a slide. Good training for concept work: compress a paper into a <strong>single visual beat</strong>.</p>",
    },
    {
      title: "HUSS hackathon: vision, roadmap, main pitch",
      category: "Story & pitch · concept vision",
      trend: "Aug 2025",
      suit: "heart",
      imageSrc: "/spotlight/huss-convergence-presentation.png",
      imageAlt:
        "HUSS stage pitch: presenter with slide on government macro data versus neighbourhood micro data for an environmental data app",
      roleLine:
        "Owned the product story, slide arc, and main-stage pitch for an environmental civic app concept.",
      impactLine:
        "Grand Prize; proved a tight visual narrative can carry a technical idea across a big room.",
      detailHtml:
        "<p><strong>HUSS Idea Hackathon</strong>: our team pitched an <strong>environmental data app</strong> as a world citizens could picture: macro government data versus <strong>neighbourhood micro stories</strong> on one slide arc.</p><p>I led <strong>vision</strong>, <strong>roadmap</strong>, and the <strong>200+</strong> seat pitch. The win mattered, but the craft lesson was design-led: <strong>one clear story</strong> beats a dense stack of features.</p>",
    },
    {
      title: "Steady over time: Airbnb capstone",
      category: "Story & pitch · capstone narrative",
      trend: "Spring 2025",
      suit: "heart",
      imageSrc: "/spotlight/capstone-outlier-accommodations.png",
      imageAlt:
        "Capstone slide: final definition of outlier Airbnb listings, scatter of model-predicted vs actual booking rate with high and low outlier clusters",
      roleLine:
        "Built the capstone story deck: scatter plot as the hero visual, then human language from listings and reviews.",
      impactLine:
        "Learned to translate messy data into slides and sentences a general audience could trust.",
      detailHtml:
        "<p>Our capstone asked why similar Airbnb stays <strong>book differently</strong>. Behind the scenes we clustered listings, but on stage the concept was visual: a <strong>scatter of predicted vs actual booking</strong> with outlier bands you could point to.</p><p>We then mined <strong>descriptions and reviews</strong> for the “why” in plain words. With <strong>business-admin teammates</strong> I practiced what concept designers need: <strong>name the pattern</strong>, <strong>show the chart</strong>, <strong>tell the consequence</strong>.</p>",
    },
    {
      title: "Metaphor: the wrapper for easy communication",
      category: "Story & pitch · stage visuals",
      trend: "Jan–Nov 2025",
      suit: "heart",
      imageSrc: "/spotlight/da-bagging-seminar.png",
      imageAlt:
        "D&A club session: presenter at screen with seminar slides explaining ML ideas with simple metaphors",
      roleLine:
        "Co-led D&A club sessions: slide metaphors and hooks so newcomers could see the idea before the math.",
      impactLine:
        "Whisper Challenge and mosquito-catching frames became visual anchors; definitions followed the picture.",
      detailHtml:
        "<p>I treat teaching slides like <strong>concept boards</strong>: one metaphor, one image in the mind, then the formal term.</p><p>On the <strong>D&amp;A</strong> executive board I helped run a year with <strong>50+</strong> members. On stage I paired the <strong>vanishing gradient problem</strong> with the <strong>Whisper Challenge</strong>, and <strong>hyperparameter tuning</strong> with <strong>catching mosquitoes</strong>. The room laughed, then leaned in. That rhythm is the same as product concept work: <strong>hook → world → detail</strong>.</p>",
    },
    {
      title: "Netherlands exchange: gamified civic reporting",
      category: "Worlds abroad · civic metaphor",
      trend: "Fall 2024",
      suit: "diamond",
      imageSrc: "/spotlight/netherlands-exchange-team.png",
      imageAlt:
        "Netherlands exchange team with civic gamification posters: location-based issues, egg metaphor, municipality monster",
      roleLine:
        "Co-created a civic game world: egg issues, municipality monster, posters, and UI copy with Dutch partners.",
      impactLine:
        "A playful visual loop made shared neighborhood pain legible; facilitation in a new city.",
      detailHtml:
        "<p><strong>Netherlands exchange (Fall 2024)</strong> was world-building for civic life. Reports attach to <strong>place</strong>. One thread starts as a small <strong>egg</strong>; as more people echo the pain, the egg <strong>grows</strong> until a <strong>municipality monster</strong> clears the pile. Posters and prototypes carried the same metaphor system.</p><p>I joined <strong>stakeholder meetings</strong>, wrote <strong>UI copy</strong>, and helped workshops land as <strong>one coherent visual story</strong> our class and local partners could share.</p>",
    },
    {
      title: "Climate field study: Georgia and Uzbekistan",
      category: "Worlds abroad · field narrative",
      trend: "Jul 2025",
      suit: "diamond",
      imageSrc: "/spotlight/climate-field-meeting.png",
      imageAlt:
        "Climate field program meeting room: round table with Uzbekistan desk flag and partners in discussion",
      roleLine:
        "Field visits in Georgia and Uzbekistan; one written report that threaded voices, partners, and flow.",
      impactLine:
        "Ministry meeting prep with GGGI support; compared two regions in language a general reader could follow.",
      detailHtml:
        "<p><strong>Global Climate Change Response</strong> (Kookmin) was narrative design in the field: how do <strong>Georgia</strong> and <strong>Uzbekistan</strong> tell climate work differently?</p><p>I joined meetings (including Tashkent), helped a <strong>GGGI</strong> partner shape talks for the <strong>Ministry of Ecology</strong>, and wrote <strong>one report</strong> that braided interviews into a single readable arc. Tools: <strong>listening</strong>, <strong>notes</strong>, and <strong>plain English structure</strong>.</p>",
    },
    {
      title: "Global PBL: six months in Irvine, CA",
      category: "Worlds abroad · study track",
      trend: "Mar–Aug 2026 (planned)",
      suit: "diamond",
      imageSrc: "/spotlight/global-pbl-presentation.png",
      imageAlt:
        "Global PBL presentation: full-length photo of speaker in black tee between two projection screens, laptop on stand, classroom lighting",
      roleLine:
        "Planned Irvine term: product concepts, visual systems, and studio time near local startups.",
      impactLine:
        "US coursework plus building in a region full of early-stage product worlds.",
      detailHtml:
        "<p><strong>Global PBL</strong> (Kookmin): <strong>six months in Irvine, California</strong> (planned on the card).</p><p>I am aiming this track at <strong>concept craft in the wild</strong>: sharper visual systems, full product builds, and weeks around <strong>startups</strong> where the story and the screen change every month.</p><p>Tools in view: prototyping, <strong>cloud builds</strong>, and <strong>AI-assisted</strong> workflows when they speed iteration, not when they replace the sketch.</p>",
    },
    {
      title: "Background extra: Shin's Project & more",
      category: "Just for fun · on-camera cameo",
      trend: "2025",
      suit: "club",
      imageSrc: "/spotlight/club-tvn-broadcast-extra.png",
      imageAlt:
        "Drama still from Shin's Project / Boss Project (tvN): night crowd scene; one of several background-extra credits",
      roleLine:
        "Background extra on dramas: match wardrobe, spacing, and mood so the frame reads true.",
      impactLine:
        "Learned set rhythm: retakes, blocking, and how tiny fixes sell a night scene.",
      detailHtml:
        "<p><strong>Shin's Project</strong> (<em>Boss Project</em> / 신사장 프로젝트 on tvN) is the card still, but I have filled <strong>crowd and street</strong> shots on other dramas too.</p><p>Each call is concept-adjacent discipline: <strong>do not break the world</strong>. Plain clothes, tight spacing, reset, repeat until the director’s frame holds.</p><p>From the back row you see how <strong>visual continuity</strong> is built take by take.</p>",
    },
    {
      title: "Club fencing (épée)",
      category: "Just for fun · sport",
      trend: "2024",
      suit: "club",
      imageSrc: "/spotlight/club-fencing-class.png",
      imageAlt:
        "Fencing club group photo in a gym: white jackets, masks and blades, brick wall and court lines",
      roleLine: "Trained épée in a club: gear, rules, and steady footwork on the strip.",
      impactLine: "Learned how attack and defense both show up in work and life, not only in bouts.",
      detailHtml:
        "<p><strong>Club épée</strong>: Weekly practice with masks, foils, and simple drills.</p><p>Fencing felt like a small picture of life: sometimes you <strong>step forward</strong>, sometimes you <strong>hold the line</strong>. Only defending rarely wins; only attacking opens you up. So balance matters off the strip too.</p>",
    },
    {
      title: "Spanish on Duolingo: daily streak",
      category: "Just for fun · daily language",
      trend: "Ongoing (440+ days)",
      suit: "club",
      imageSrc: "/spotlight/club-duolingo-spanish-streak.png",
      imageAlt:
        "Duolingo streak share card: 440-day flame streak with Duo mascot and “See you later!”",
      roleLine: "Study Spanish a little every day for friends and travel, not only for the number.",
      impactLine: "A small daily habit that still changes how the day feels.",
      detailHtml:
        "<p><strong>Spanish · Duolingo</strong>: The screenshot shows a <strong>440-day streak</strong>.</p><p>I keep the habit because each new language feels like <strong>more room in my head</strong>. New ways to joke, apologize, and listen. Spanish is the one I chose next for <strong>friends</strong> and for <strong>travel</strong> with less friction.</p><p>Long term I care less about “finishing the tree” and more about <strong>speaking clearly</strong>, one short session at a time.</p>",
    },
  ],

  garden: {
    cardRabbitSrc: "/card-rabbit.png",
    cardRabbitAlt: "White Rabbit herald with trumpet and scroll",
    /** Small caps above the gate line — signals a scene change from the hero. */
    sectionGateEyebrow: "The path shifts",
    /** One beat: you’ve crossed into a new “page” of the site. */
    sectionGateTitle: "This is the garden. The story turns here.",
    /** Short bridge before the White Rabbit callout. */
    sectionGateSub: "Proof ahead, suit by suit. Follow the rabbit when you’re ready.",
    /** White Rabbit voice above the suit buttons */
    rabbitCalloutHtml:
      "<strong>Pick a track.</strong> Each suit is a different slice. Tap a card for the full note.",
    rabbitSignoff: "— The White Rabbit (in a hurry)",
    suitPickerTitle: "Pick a suit",
    suitPickerHint: "Tap a suit, then a card. Details open on a stage.",
    /** Shown under the hint while no suit is selected — makes the glyphs the obvious target */
    tapSuitsCue: "Tap a suit symbol",
    /** Shown above the horizontal card strip when a suit is selected (scroll affordance). */
    cardStripHint: "The first card lands centered. Scroll sideways for more.",
    changeSuit: "Change suit",
    /** Shown when a suit has no spotlight cards yet (e.g. ♣ with zero items). */
    emptySuitTitle: "This suit is open",
    emptySuitBody:
      "No garden cards in this lane right now. Proof lives under ♠, ♥, and ♦. Pick another suit, or come back when a club card is added.",
    suits: [
      {
        id: "spade",
        glyph: "♠",
        label: "Concept craft",
        sub: "A spade's edge:<br />worlds drawn trim and clear",
        desc: "Spade lane: product visuals, interfaces, and campus visual studies.",
      },
      {
        id: "heart",
        glyph: "♥",
        label: "Story & pitch",
        sub: "A heart's warmth:<br />narrative beside people",
        desc: "Heart lane: decks, metaphors, capstone stories, and stage craft.",
      },
      {
        id: "diamond",
        glyph: "♦",
        label: "Worlds abroad",
        sub: "Bright as stones:<br />miles and new tongues",
        desc: "Diamond lane: exchange worlds, field narratives, and study tracks.",
      },
      {
        id: "club",
        glyph: "♣",
        label: "just for fun",
        sub: "One stem, three leaves:<br />bits that round me out",
        desc: "Just-for-fun lane: clover-shaped curiosity: cameos, fencing, streaks, small side quests.",
      },
    ] as const,
  },

  /**
   * Caterpillar shelf — four book-spine “moves”; opening one reveals that category.
   * Palette anchor (spines + section wash): FERN #768E78 · PISTACHIO #C6C09C · FENNEL #EBDEC0 · PEONY #E79897 · PEACH #FCAC83 · HONEY #FCC88A.
   */
  shelf: {
    sectionEyebrow: "The Caterpillar's shelf",
    sectionTitle: "The Caterpillar's shelf: a small study in comfort and spark",
    sectionSub: "Film, music, books, and drama I keep like reference boards on the wall.",
    spineRowCue: "Four spines. Tap to open.",
    caterpillarSrc: "/caterpillar.png",
    caterpillarAlt: "The Caterpillar on a mushroom (illustration)",
    backToShelf: "← Back to shelf",
    emptyShelfTitle: "This stack is still growing",
    emptyShelfBody:
      "This lane is open for the next stack: same card format when new picks land here.",
    /** Stack card body — two lines of copy shown together */
    stackBodyEnLabel: "English",
    stackBodyKoLabel: "한국어",
    /**
     * Order: films → music → books → drama.
     * spineFoot = small caps on spine top · spineTitle = vertical spine center (same word) · spineBlurb optional (hidden when empty).
     */
    categories: [
      {
        id: "films",
        spineTitle: "Film",
        spineFoot: "Film",
        spineBlurb: "",
        spineClass: "bg-[#ddbfbc]",
      },
      {
        id: "music",
        spineTitle: "Music",
        spineFoot: "Music",
        spineBlurb: "",
        spineClass: "bg-[#edd0b8]",
      },
      {
        id: "books",
        spineTitle: "Book",
        spineFoot: "Book",
        spineBlurb: "",
        spineClass: "bg-[#b8c9bc]",
      },
      {
        id: "dramas",
        spineTitle: "Drama",
        spineFoot: "Drama",
        spineBlurb: "",
        spineClass: "bg-[#d6cfc0]",
      },
    ] as const,
    films: [
      {
        title: "The Florida Project",
        year: 2017,
        director: "Sean Baker",
        posterSrc: "/shelf/the-florida-project.png",
        lineEn: "I love how this film lets tenderness and sorrow meet.",
        lineKo: "다정함과 슬픔이 만나는 이 영화가 좋아요.",
      },
      {
        title: "Little Miss Sunshine",
        year: 2006,
        director: "Jonathan Dayton & Valerie Faris",
        posterSrc: "/shelf/little-miss-sunshine.png",
        lineEn: "I'm rooting for this messy family that grows stronger through what they lack.",
        lineKo: "결핍으로 단단해지는 이 엉망인 가족을 응원하고 싶어요.",
      },
      {
        title: "Monster",
        year: 2023,
        director: "Hirokazu Kore-eda",
        posterSrc: "/shelf/monster-2023.png",
        lineEn: "If they'd known each other just a little more, they might not have hurt each other so deeply.",
        lineKo: "조금만 서로를 더 알면 깊이 상처주지 못했을 텐데.",
      },
    ],
    music: [
      {
        title: "Ribs",
        year: 2013,
        director: "Lorde · Pure Heroine",
        posterSrc: "/shelf/music-lorde-pure-heroine.png",
        lineEn: "Freer days rush back, and it all turns bittersweet.",
        lineKo: "자유롭던 시절이 떠오르면서 달콤씁쓸해진다.",
      },
      {
        title: "You're On Your Own, Kid",
        year: 2022,
        director: "Taylor Swift · Midnights",
        posterSrc: "/shelf/music-taylor-swift-midnights.png",
        lineEn: "What I owe myself is what makes me stronger.",
        lineKo: "내 책임이라는 것은 나를 강하게 만든다.",
      },
      {
        title: "The Maybe Man",
        year: 2023,
        director: "AJR · The Maybe Man",
        posterSrc: "/shelf/music-ajr-the-maybe-man.png",
        lineEn: "Comfort when I don't know myself and just want to run.",
        lineKo: "나도 나를 모르겠고 도망치고 싶을 때 위로가 됩니다.",
      },
    ],
    books: [
      {
        title: "노랑무늬영원",
        year: 1999,
        director: "한강 · 소설집",
        posterSrc: "/shelf/book-norang-munui-yeongwon.png",
        lineEn: "When fragility becomes mutual comfort.",
        lineKo: "연약함이 서로의 위로가 될 때.",
      },
      {
        title: "시선으로부터,",
        year: 2020,
        director: "정세랑 · 장편소설",
        posterSrc: "/shelf/book-siseon-eurobuto.png",
        lineEn: "A smooth way to digest tradition.",
        lineKo: "전통을 매끈하게 소화하는 방법.",
      },
      {
        title: "재수사",
        year: 2024,
        director: "장강명 · 장편소설",
        posterSrc: "/shelf/book-jaesusa.png",
        lineEn: "Following the circuitry of being human, step by step.",
        lineKo: "사람이라는 회로를 찬찬히 따라간다.",
      },
    ],
    dramas: [
      {
        title: "The Pitt",
        year: 2025,
        director: "R. Scott Gemmill",
        posterSrc: "/shelf/the-pitt.png",
        lineEn: "The push-pull between characters is so precise you fall in before you know it.",
        lineKo: "인물의 역학 관계가 정교하고 그래서 빠져들게 됩니다.",
      },
      {
        title: "Succession",
        year: 2023,
        director: "Jesse Armstrong",
        posterSrc: "/shelf/succession.png",
        lineEn: "Cruelty, I felt, arrives trailing loneliness.",
        lineKo: "잔인함은 외로움에서 온다고 느꼈어요.",
      },
      {
        title: "Severance",
        year: 2022,
        director: "Dan Erickson",
        posterSrc: "/shelf/severance.png",
        lineEn: "I don't want to cut myself off from the pride work gives me.",
        lineKo: "노동을 통한 뿌듯함과 단절되고 싶지 않아요.",
      },
    ],
    /** Below the shelf — Tenniel tea-party art + contact “on the table”. */
    teaInvite: {
      eyebrow: "After the shelf",
      title: "Back from the study: feeling a little peckish?",
      bodyLine1:
        "All that wandering through pictures. Small wonder you've worked up an appetite.",
      bodyLine2:
        "Curiouser about my little rabbit-hole? If you'd care to take tea, do send word. I'd be glad to hear from you.",
      imageSrc: "/tea-party-invite.png",
      imageAlt:
        "Mad tea-party engraving: Alice, March Hare, Dormouse, and Mad Hatter at a long table with teacups and plates",
      /** Small ink sketch between the engraving and contact links (decorative). */
      teacupSrc: "/tea-cup.png",
      /** Visible link text — URLs sit in `title` / `aria-label` on the anchors. */
      linkCtaLinkedin: "Want to link with me on LinkedIn?",
      linkCtaEmail: "Care to send me an email?",
    },
  },

  cheshire: {
    /**
     * Two-beat lead-in that frames the section as a small dialogue:
     *   1) quiet prose lead-in (lighter weight),
     *   2) Alice's question — the cue the Cheshire pull quote will answer.
     */
    bodyHtml:
      '<p class="mx-auto mb-6 max-w-sm text-[0.875rem] leading-relaxed text-black/55">You&rsquo;ve come this far, past the garden, the shelf, the tea.</p>' +
      '<div class="mx-auto max-w-sm border-l-2 border-black/30 pl-4 text-left text-[0.95rem] leading-relaxed text-black/78"><p class="mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-black/55">Alice asks</p><p>&ldquo;I don&rsquo;t much care where&mdash;so long as I get <em>somewhere</em>.&rdquo;</p></div>',
    /** Carroll line — Cheshire's reply to Alice's question above. */
    quote:
      "\u201cOh, you\u2019re sure to do that,<br />if only you walk long enough.\u201d",
    attribution: "\u2014 The Cheshire Cat, Alice's Adventures in Wonderland",
    /** Optional closing after the pull quote; leave empty so the exchange stays tight. */
    codaHtml: "",
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
