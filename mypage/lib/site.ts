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
      "Under the hero: tap ♠ ♥ ♦ ♣ — hard skills, soft skills, international, and clubs (side quests: broadcast cameo, sport, language streaks, and more to come).",
    linkedinDescription: "Public LinkedIn profile.",
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
    /** Plain bridge after the hero: who this is and why the garden comes next (first-visit clarity). */
    summaryHtml:
      "<p><strong>Wonjun</strong> — Data Science and AI product builder (live apps, ML, and team leadership). The <strong>garden</strong> below is the proof deck: each playing card is a real project or chapter, sorted by suit.</p>",
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
      "<p>I value <strong>logic, consistency, and solid work</strong> — clear thinking, steady standards, and building things that can handle <strong>feedback and problems</strong>.</p><p>When difficult choices come up, I want my reasoning to <strong>make sense to myself first</strong>. That personal standard is something I've developed over time.</p>",
    growImageSrc: "/eattme.png",
    growImageAlt: "EAT ME cake",
    shrinkLabel: "DRINK ME",
    shrinkTitle: "What I want to shrink",
    shrinkBodyHtml:
      "<p>I tend to <strong>overthink</strong> things — following every possibility until even small decisions start to feel risky.</p><p>Some lessons can only be learned by <strong>trying</strong>. I want to get more comfortable <strong>taking small steps</strong> instead of waiting for a <strong>perfect plan</strong>.</p>",
    shrinkImageSrc: "/drink-removebg-preview.png",
    shrinkImageAlt: "DRINK ME bottle",
  },

  /**
   * Playing-card grid — grouped by suit.
   * Spades: eLe, Point, ML (+ X:AI Base at school in the ML card) · Hearts · Diamonds · Clubs: side quests (extras, sport, habits — expandable)
   */
  spotlight: [
    {
      title: "eLe — live news into leveled English dialogues",
      category: "Hard skills · AI product",
      trend: "Mar 2026",
      suit: "spade",
      imageSrc: "/spotlight/ele-english-education.png",
      imageAlt:
        "eLe English education graphic: easy plus live equals english, with try-it cue and QR — Presented by Wonjun Lee",
      projectUrl: "https://juns007-ele-frontend.static.hf.space/",
      roleLine: "Led product direction and built a flow from fresh news to classroom-ready dialogues.",
      impactLine: "Teachers spend less time on prep; learners get dialogues that match their level.",
      detailHtml:
        "<p><strong>eLe</strong> is an English-study product that turns <strong>live news</strong> into short dialogues matched to the learner’s level.</p><p>I focused on <strong>auto-building lesson material</strong> so the work is lighter for teachers, and on keeping the content feeling <strong>new each week</strong>.</p>",
    },
    {
      title: "Point — live presentation coach",
      category: "Hard skills · real-time AI",
      trend: "Mar 2026 →",
      suit: "spade",
      imageSrc: "/spotlight/point-landing.png",
      imageAlt: "Point landing page: Your AI presentation coach, lined paper background and Start with Point button",
      projectUrl: "https://pointpresent.com/",
      roleLine: "Built the live practice screen and kept heavy work on the user’s device when possible.",
      impactLine: "Learners get quicker tips during a talk, without waiting on a distant server.",
      detailHtml:
        "<p><strong>Point</strong> gives <strong>live feedback</strong> on voice and body language while someone rehearses a talk.</p><p>I designed it so <strong>most processing runs on the device</strong>, which keeps delay low and the coach feeling present.</p>",
    },
    {
      title: "ML class work and a campus AI reading circle",
      category: "Hard skills · ML & analytics",
      trend: "2025",
      suit: "spade",
      imageSrc: "/spotlight/kookmin-university-logo.png",
      /** Letterbox in the card photo slot (official seal is circular). */
      imageFit: "contain",
      imageAlt:
        "Kookmin University circular seal: KMU wordmark with ring text Kookmin University / 국민대학교",
      roleLine: "Course projects in deep learning, speech, text, and analytics; ran a small on-campus AI paper circle.",
      impactLine: "Built course models and reports; learned to read research faster and ask better questions.",
      detailHtml:
        "<p><strong>Deep learning</strong> — Used a fish-farm detection brief to think through real-world object detection.</p><p><strong>Advanced AI (speech)</strong> — Built an end-to-end speech flow for a shopping task and tuned a small voice model.</p><p><strong>Text analytics</strong> — Worked with airline reviews, word clouds, and simple topic views.</p><p><strong>X:AI Base (Spring 2025)</strong> — Joined a <strong>weekly paper-reading circle</strong> at Kookmin: present, debate, and take notes with peers.</p><p>Takeaway: know when to <strong>skim</strong> a paper and when to <strong>go deep</strong>, and always check the methods and assumptions.</p>",
    },
    {
      title: "HUSS hackathon — vision, roadmap, main pitch",
      category: "Soft skills · leadership",
      trend: "Aug 2025",
      suit: "heart",
      imageSrc: "/spotlight/huss-convergence-presentation.png",
      imageAlt:
        "HUSS stage pitch: presenter with slide on government macro data versus neighbourhood micro data for an environmental data app",
      roleLine: "Owned the product vision and roadmap; delivered the main stage pitch for our team.",
      impactLine: "Won Grand Prize; learned to explain hard tech clearly to a large crowd.",
      detailHtml:
        "<p><strong>HUSS Idea Hackathon</strong> — Our team built an idea for an <strong>environmental data app</strong>.</p><p>I led the <strong>vision</strong>, shaped the <strong>roadmap</strong>, and pitched to <strong>200+</strong> people. We won the <strong>Grand Prize</strong>. The best lesson was turning dense tech into a <strong>simple story</strong> people could follow in one sitting.</p>",
    },
    {
      title: "Capstone — from team problem to team solution",
      category: "Soft skills · teamwork",
      trend: "Spring 2025",
      suit: "heart",
      imageSrc: "/spotlight/capstone-outlier-accommodations.png",
      imageAlt:
        "Capstone slide: final definition of outlier Airbnb listings — scatter of model-predicted vs actual booking rate with high and low outlier clusters",
      roleLine: "Worked with students from other majors from first question to final delivery.",
      impactLine: "Shipped a full project path, not only charts in a notebook.",
      detailHtml:
        "<p><strong>Airbnb capstone</strong> — We moved from a clear problem to a shared solution as a team.</p><p>We split roles, met often, and handled the messy parts of <strong>real group work</strong>.</p><p>We also studied <strong>outlier listings</strong> by comparing <strong>model guesses vs real booking rates</strong> to find stays the model missed—then we tightened what to improve next.</p>",
    },
    {
      title: "D&A society — year plan and member seminars",
      category: "Soft skills · community lead",
      trend: "Jan–Nov 2025",
      suit: "heart",
      imageSrc: "/spotlight/da-bagging-seminar.png",
      imageAlt:
        "D&A seminar in session: presenter beside screen explaining Bagging — bootstrap sampling, multiple models, and aggregating predictions (vote or average)",
      roleLine: "Set the year plan for 50+ members and led seminars on harder ML topics.",
      impactLine: "Helped members level up on RNNs, LSTMs, and hands-on practice.",
      detailHtml:
        "<p><strong>D&amp;A (Big Data Analysis Society)</strong> — I helped run the club for a year with <strong>50+</strong> members.</p><p>I wrote the <strong>roadmap</strong>, ran <strong>seminars</strong>, and taught topics like RNNs and LSTMs in plain steps.</p><p>One example: <strong>Bagging</strong> — train many small models on random samples, then <strong>vote</strong> (for labels) or <strong>average</strong> (for numbers) so the group is stronger than any single model.</p>",
    },
    {
      title: "Netherlands exchange — civic site with local partners",
      category: "International · exchange",
      trend: "Fall 2024",
      suit: "diamond",
      imageSrc: "/spotlight/netherlands-exchange-team.png",
      imageAlt:
        "Netherlands exchange: team photo on campus with civic-tech project posters (democracy / gamification) in the background",
      roleLine: "Built a small community website with local partners; used English every day.",
      impactLine: "Shipped a real site and grew more comfortable outside my home context.",
      detailHtml:
        "<p><strong>Netherlands exchange (Fall 2024)</strong> — Our team made a <strong>civic-tech style site</strong> with local partners.</p><p>I gathered needs, wrote copy, and coordinated in <strong>English daily</strong>. It was a strong stretch for listening, writing, and earning trust in a new place.</p>",
    },
    {
      title: "Climate field study — Georgia and Uzbekistan",
      category: "International · field research",
      trend: "Jul 2025",
      suit: "diamond",
      imageSrc: "/spotlight/climate-field-meeting.png",
      imageAlt:
        "Climate field program meeting room: round table with Uzbekistan desk flag and partners in discussion",
      roleLine: "Did field visits and expert talks; turned notes into one clear written report.",
      impactLine: "Helped set up a ministry meeting with GGGI support; compared regions in plain language.",
      detailHtml:
        "<p><strong>Global Climate Change Response</strong> (Kookmin) — Field work in <strong>Georgia and Uzbekistan</strong> to see how two regions handle climate work.</p><p>I met experts (for example in Tashkent), joined local meetings, and helped a GGGI partner prepare talks at the <strong>Ministry of Ecology</strong>.</p><p>I wrote <strong>one report</strong> that pulled the voices together on partners and project flow. Main tools: <strong>English</strong> and <strong>interview notes</strong>.</p>",
    },
    {
      title: "Global PBL — six months in Irvine, CA",
      category: "International · study abroad",
      trend: "Mar–Aug 2026",
      suit: "diamond",
      imageSrc: "/spotlight/global-pbl-presentation.png",
      imageAlt:
        "Global PBL presentation: full-length photo of speaker in black tee between two projection screens, laptop on stand, classroom lighting",
      roleLine: "Six-month track: applied AI, AWS, full-stack work, and time around local startups.",
      impactLine: "US classes plus project work in a region with many early-stage companies.",
      detailHtml:
        "<p><strong>Global PBL</strong> (Kookmin) — <strong>Six months in Irvine, California</strong> (planned window on the card).</p><p>Focus areas: <strong>applied AI</strong>, <strong>full-stack apps</strong>, <strong>cloud builds</strong>, and learning how <strong>startups</strong> move from idea to launch.</p><p>Tools in view: <strong>AI agents</strong> and <strong>AWS</strong>.</p>",
    },
    {
      title: "TV crowd extra — Boss Project (tvN)",
      category: "Clubs · on-camera cameo",
      trend: "Side quest",
      suit: "club",
      imageSrc: "/spotlight/club-tvn-broadcast-extra.png",
      imageAlt:
        "tvN drama still from Boss Project (신사장 프로젝트): night crowd scene; arrows mark background extra in light jacket",
      roleLine: "Stood in the crowd behind the leads; was asked to look plain and blend in.",
      impactLine: "Saw how many people and resets it takes to make one night scene feel real.",
      detailHtml:
        "<p><strong>tvN <em>Boss Project</em></strong> (신사장 프로젝트) — I was a <strong>background extra</strong> in a night crowd shot.</p><p>The job was to <strong>match spacing and tone</strong>, not to stand out. From the back you notice the <strong>pace on set</strong> and how many small moves keep a scene believable.</p>",
    },
    {
      title: "Club fencing (épée)",
      category: "Clubs · sport",
      trend: "Side quest",
      suit: "club",
      imageSrc: "/spotlight/club-fencing-class.png",
      imageAlt:
        "Fencing club group photo in a gym: white jackets, masks and blades, brick wall and court lines",
      roleLine: "Trained épée in a club—gear, rules, and steady footwork on the strip.",
      impactLine: "Learned how attack and defense both show up in work and life, not only in bouts.",
      detailHtml:
        "<p><strong>Club épée</strong> — Weekly practice with masks, foils, and simple drills.</p><p>Fencing felt like a small picture of life: sometimes you <strong>step forward</strong>, sometimes you <strong>hold the line</strong>. Only defending rarely wins; only attacking opens you up—so balance matters off the strip too.</p>",
    },
    {
      title: "Spanish on Duolingo — daily streak",
      category: "Clubs · daily language",
      trend: "440+ days",
      suit: "club",
      imageSrc: "/spotlight/club-duolingo-spanish-streak.png",
      imageAlt:
        "Duolingo streak share card: 440-day flame streak with Duo mascot and “See you later!”",
      roleLine: "Study Spanish a little every day for friends and travel—not only for the number.",
      impactLine: "A small daily habit that still changes how the day feels.",
      detailHtml:
        "<p><strong>Spanish · Duolingo</strong> — The screenshot shows a <strong>440-day streak</strong>.</p><p>I keep the habit because each new language feels like <strong>more room in my head</strong>—new ways to joke, apologize, and listen. Spanish is the one I chose next for <strong>friends</strong> and for <strong>travel</strong> with less friction.</p><p>Long term I care less about “finishing the tree” and more about <strong>speaking clearly</strong>, one short session at a time.</p>",
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
    /** Shown above the horizontal card strip when a suit is selected (scroll affordance). */
    cardStripHint: "The first card lands centered — scroll sideways for more.",
    changeSuit: "Change suit",
    /** Shown when a suit has no spotlight cards yet (e.g. ♣ with zero items). */
    emptySuitTitle: "This suit is open",
    emptySuitBody:
      "No garden cards in this lane right now — proof lives under ♠, ♥, and ♦. Pick another suit, or come back when a club card is added.",
    suits: [
      {
        id: "spade",
        glyph: "♠",
        label: "Hard skills",
        sub: "A spade's edge — craft kept trim and sharp",
        desc: "Spade lane — ML, AI products, analytics, and the building side.",
      },
      {
        id: "heart",
        glyph: "♥",
        label: "Soft skills",
        sub: "A heart's warmth — calm craft beside people",
        desc: "Heart lane — collaboration, communication, and people craft.",
      },
      {
        id: "diamond",
        glyph: "♦",
        label: "International",
        sub: "Bright as stones — miles and new tongues",
        desc: "Diamond lane — abroad, languages, precious keepsakes like small gems.",
      },
      {
        id: "club",
        glyph: "♣",
        label: "just for fun",
        sub: "One stem, three leaves — bits that round me out",
        desc: "Just-for-fun lane — clover-shaped curiosity: cameos, fencing, streaks, small side quests.",
      },
    ] as const,
  },

  /**
   * Caterpillar shelf — four book-spine “moves”; opening one reveals that category.
   * Palette anchor (spines + section wash): FERN #768E78 · PISTACHIO #C6C09C · FENNEL #EBDEC0 · PEONY #E79897 · PEACH #FCAC83 · HONEY #FCC88A.
   */
  shelf: {
    sectionEyebrow: "The Caterpillar's shelf",
    sectionTitle: "The Caterpillar's shelf — a small study in comfort and spark",
    sectionSub: "Films, albums, pages, and drama I keep like pictures on the wall.",
    spineRowCue: "Four spines — tap to open",
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
     * spineClass: light pastel solids (readable with dark spine type in page.tsx).
     */
    categories: [
      {
        id: "films",
        spineTitle: "Movies",
        spineFoot: "Films",
        /** Narrow no-break hyphen in “one‑line” so spine labels don’t split mid-word. */
        spineBlurb: "Posters · one\u2011line notes",
        spineClass: "bg-[#ddbfbc]",
      },
      {
        id: "music",
        spineTitle: "Sound",
        spineFoot: "Music",
        spineBlurb: "Albums · tracks",
        spineClass: "bg-[#edd0b8]",
      },
      {
        id: "books",
        spineTitle: "Reading",
        spineFoot: "Books",
        spineBlurb: "Reads · quotes",
        spineClass: "bg-[#b8c9bc]",
      },
      {
        id: "dramas",
        spineTitle: "Series",
        spineFoot: "Drama",
        spineBlurb: "Series · picks",
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
        lineEn: "Freer days rush back—and it all turns bittersweet.",
        lineKo: "자유롭던 시절이 떠오르면서 달콤씁쓸해진다",
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
        lineEn: "Comfort when I don't know myself and just want to run.",
        lineKo: "나도 나를 모르겠고 도망치고 싶을 때 위로가 됩니다",
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
        lineEn: "The push-pull between characters is so precise you fall in before you know it.",
        lineKo: "인물의 역학 관계가 정교하고 그래서 빠져들게 됩니다",
      },
      {
        title: "Succession",
        year: 2023,
        director: "Jesse Armstrong",
        posterSrc: "/shelf/succession.png",
        lineEn: "Cruelty, I felt, arrives trailing loneliness.",
        lineKo: "잔인함은 외로움에서 온다고 느꼈어요",
      },
      {
        title: "Severance",
        year: 2022,
        director: "Dan Erickson",
        posterSrc: "/shelf/severance.png",
        lineEn: "I don't want to cut myself off from the pride work gives me.",
        lineKo: "노동을 통한 뿌듯함과 단절되고 싶지 않아요",
      },
    ],
    /** Below the shelf — Tenniel tea-party art + contact “on the table”. */
    teaInvite: {
      eyebrow: "After the shelf",
      title: "Back from the study — feeling a little peckish?",
      bodyLine1:
        "All that wandering through pictures — small wonder you've worked up an appetite.",
      bodyLine2:
        "Curiouser about my little rabbit-hole? If you'd care to take tea, do send word — I'd be glad to hear from you.",
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
    /** Lead + Alice’s hinge line so the pull quote lands; then a short steadiness beat. */
    bodyHtml:
      '<p class="mx-auto mb-4 max-w-md text-[1rem] leading-relaxed text-black/65">You&rsquo;ve come this far—past the garden, the shelf, the tea. Small steps, still a real journey.</p>' +
      '<div class="mx-auto mb-4 max-w-md border-l-2 border-black/20 pl-4 text-left text-[0.9rem] leading-relaxed text-black/65"><p><span class="mr-2 font-semibold text-black/55">Alice</span>&ldquo;I don&rsquo;t much care where&mdash;so long as I get <em>somewhere</em>.&rdquo;</p></div>' +
      '<p class="mx-auto max-w-md text-[0.95rem] leading-relaxed text-black/62">The map won&rsquo;t always be clear. Keep walking steady enough, and you&rsquo;ll still fetch up somewhere that matters.</p>',
    /** Carroll line — same “walk long enough” promise, less prose around it. */
    quote: "\u201cOh, you're sure to do that, if only you walk long enough.\u201d",
    attribution: "\u2014 The Cheshire Cat, Alice's Adventures in Wonderland",
    /** Optional closing after the pull quote; leave empty when the lead already says it. */
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
