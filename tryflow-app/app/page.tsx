"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FallingAlice } from "@/components/ui/FallingAlice";
import { site, type SpotlightItem } from "@/lib/site";

// ── Tenniel SVGs ──────────────────────────────────────────────────────────


// ── Rose stage icons (idea cards) ────────────────────────────────────────
// PLACEHOLDER: replace src with actual image paths once assets are ready.
// e.g. <img src="/assets/rose-bud.png" …/>

type RoseStage = "bud" | "half" | "full";

/** Tight, closed rosebud */
function RoseBudIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 36" fill="none" className={className}>
      <line x1="12" y1="36" x2="12" y2="24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M12 24 Q8 20 9 16" stroke="currentColor" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
      <path d="M12 24 Q16 20 15 16" stroke="currentColor" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
      <path d="M9 16 Q8 6 12 3 Q16 6 15 16" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
      <path d="M10.5 16 Q10 9 12 6 Q14 9 13.5 16" stroke="currentColor" strokeWidth="0.75" fill="none"/>
    </svg>
  );
}

/** Partially open half-bloom */
function RoseHalfBloomIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 36" fill="none" className={className}>
      <line x1="15" y1="36" x2="15" y2="25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M15 25 Q10 22 11 18" stroke="currentColor" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
      <path d="M15 25 Q20 22 19 18" stroke="currentColor" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
      <path d="M8 17 Q6 7 11 3 Q15 1 19 3 Q24 7 22 17" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
      <path d="M10 18 Q9 10 12 7 Q15 5 18 7 Q21 10 20 18" stroke="currentColor" strokeWidth="0.9" fill="none"/>
      <path d="M12 18 Q12 12 15 10 Q18 12 18 18" stroke="currentColor" strokeWidth="0.75" fill="none"/>
      <path d="M8 17 Q4 20 6 25" stroke="currentColor" strokeWidth="0.85" fill="none" strokeLinecap="round"/>
      <path d="M22 17 Q26 20 24 25" stroke="currentColor" strokeWidth="0.85" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

/** Fully open rose in bloom */
function RoseFullBloomIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 34 36" fill="none" className={className}>
      <line x1="17" y1="36" x2="17" y2="26" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M14 26 Q9 24 11 20" stroke="currentColor" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
      <path d="M20 26 Q25 24 23 20" stroke="currentColor" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
      <path d="M4 15 Q2 5 10 2 Q17 0 24 2 Q32 5 30 15" stroke="currentColor" strokeWidth="1.15" fill="none" strokeLinecap="round"/>
      <path d="M7 16 Q6 8 11 5 Q17 2 23 5 Q28 8 27 16" stroke="currentColor" strokeWidth="0.9" fill="none"/>
      <path d="M10 17 Q9 11 13 8 Q17 6 21 8 Q25 11 24 17" stroke="currentColor" strokeWidth="0.75" fill="none"/>
      <path d="M13 17 Q13 12 17 11 Q21 12 21 17" stroke="currentColor" strokeWidth="0.65" fill="none"/>
      <circle cx="17" cy="17" r="2.2" stroke="currentColor" strokeWidth="0.6" fill="none"/>
      <path d="M4 15 Q0 19 2 24 Q7 20 9 17" stroke="currentColor" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
      <path d="M30 15 Q34 19 32 24 Q27 20 25 17" stroke="currentColor" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
      <path d="M10 18 Q8 23 12 26 Q17 28 22 26 Q26 23 24 18" stroke="currentColor" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

/** Animated rose that blooms through stages */
function RoseStageIcon({ stage, className }: { stage: RoseStage; className?: string }) {
  return (
    <div className={className} style={{ position: "relative" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ scale: 0.2, rotate: -30, opacity: 0, y: 6 }}
          animate={{ scale: 1, rotate: 0, opacity: 1, y: 0 }}
          exit={{ scale: 2, rotate: 20, opacity: 0, y: -6 }}
          transition={{ type: "spring", stiffness: 500, damping: 26 }}
          style={{ position: "absolute", inset: 0 }}
        >
          {stage === "bud"  && <RoseBudIcon  className="w-full h-full" />}
          {stage === "half" && <RoseHalfBloomIcon className="w-full h-full" />}
          {stage === "full" && <RoseFullBloomIcon className="w-full h-full" />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const QUEEN_CROQUET_SRC = "/assets/queen-croquet.jpg";

/** Croquet scene chopped into a grid — each cell shows a different crop of the same art */
function QueenCroquetMosaic({ cardIndex }: { cardIndex: number }) {
  const cols = 4;
  const rows = 3;
  const total = cols * rows;
  return (
    <div
      className="absolute inset-0 grid overflow-hidden pointer-events-none z-0"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
      }}
      aria-hidden
    >
      {Array.from({ length: total }, (_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const seed = cardIndex * 97 + i * 41;
        const jx = ((seed % 23) - 11) * 0.35;
        const jy = (((seed >> 2) % 19) - 9) * 0.35;
        const denomX = Math.max(1, cols - 1);
        const denomY = Math.max(1, rows - 1);
        const posX = Math.max(0, Math.min(100, (col / denomX) * 100 + jx));
        const posY = Math.max(0, Math.min(100, (row / denomY) * 100 + jy));
        return (
          <div
            key={i}
            style={{
              minWidth: 0,
              minHeight: 0,
              backgroundImage: `url(${QUEEN_CROQUET_SRC})`,
              backgroundSize: `${cols * 110}% ${rows * 110}%`,
              backgroundPosition: `${posX}% ${posY}%`,
              backgroundRepeat: "no-repeat",
              opacity: 0.26,
              mixBlendMode: "multiply",
              filter: "grayscale(100%) contrast(1.12)",
            }}
          />
        );
      })}
    </div>
  );
}

const ROSE_BLOOM_PNG = [
  "/assets/rose-bloom-1.png",
  "/assets/rose-bloom-2.png",
  "/assets/rose-bloom-3.png",
] as const;

/** One fixed bloom stage (0=bud, 1=opening, 2=full) — no frame cycling */
function QueenGardenRoseFixed({ stage, w }: { stage: 0 | 1 | 2; w: number }) {
  return (
    <div
      className="relative shrink-0 select-none"
      style={{ width: w, height: w * 1.28 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ROSE_BLOOM_PNG[stage]}
        alt=""
        draggable={false}
        className="absolute inset-0 h-full w-full object-contain"
        style={{
          opacity: 0.5,
          mixBlendMode: "multiply",
          filter: "grayscale(100%) contrast(1.12)",
        }}
      />
    </div>
  );
}

const QUEEN_GARDEN_ROSE_W: Record<0 | 1 | 2, number> = { 0: 64, 1: 72, 2: 80 };

/** Each rose fades in at its own fixed position, one by one left→right */
const QUEEN_GARDEN_STEP_IN_MS = 900;
const QUEEN_GARDEN_HOLD_ALL_MS = 2200;
const QUEEN_GARDEN_FADE_OUT_MS = 700;
const QUEEN_GARDEN_PAUSE_EMPTY_MS = 600;

function QueenGardenCyclingRose() {
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { amount: 0.35 });
  /** How many roses visible: 0, 1, 2, 3 */
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!inView) setVisibleCount(0);
  }, [inView]);

  useEffect(() => {
    if (reduceMotion || !inView) return;

    let cancelled = false;
    const wait = (ms: number) =>
      new Promise<void>((resolve) => { window.setTimeout(() => resolve(), ms); });

    (async () => {
      while (!cancelled) {
        setVisibleCount(0);
        await wait(400);
        if (cancelled) break;
        setVisibleCount(1);
        await wait(QUEEN_GARDEN_STEP_IN_MS);
        if (cancelled) break;
        setVisibleCount(2);
        await wait(QUEEN_GARDEN_STEP_IN_MS);
        if (cancelled) break;
        setVisibleCount(3);
        await wait(QUEEN_GARDEN_HOLD_ALL_MS);
        if (cancelled) break;
        setVisibleCount(0);
        await wait(QUEEN_GARDEN_FADE_OUT_MS + QUEEN_GARDEN_PAUSE_EMPTY_MS);
      }
    })();

    return () => { cancelled = true; };
  }, [reduceMotion, inView]);

  const maxW = QUEEN_GARDEN_ROSE_W[2];
  const boxH = maxW * 1.28;

  return (
    <div
      ref={wrapRef}
      className="flex items-end justify-start gap-1.5 sm:gap-2 md:justify-end"
      style={{ minHeight: boxH }}
      aria-hidden
    >
      {([0, 1, 2] as const).map((stage) => (
        <motion.div
          key={stage}
          animate={reduceMotion || visibleCount > stage
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.82 }
          }
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end origin-bottom"
        >
          <QueenGardenRoseFixed stage={stage} w={QUEEN_GARDEN_ROSE_W[stage]} />
        </motion.div>
      ))}
    </div>
  );
}


// ── Tag → initial rose stage ──────────────────────────────────────────────
const TAG_TO_STAGE: Record<string, RoseStage> = {
  Hot: "full",
  Featured: "full",
  Emerging: "half",
  New: "bud",
  Daily: "full",
  Growing: "half",
  Building: "half",
  Always: "full",
  Steady: "bud",
  Open: "half",
};

const SPOTLIGHT = site.spotlight;

const PLAYING_CARD_RANKS = ["A", "Q", "A", "Q", "A", "Q"] as const;
const PLAYING_CARD_SUITS_BLACK = ["♠", "♣"] as const;
const PLAYING_CARD_SUITS_RED   = ["♥", "♦"] as const;

function playingCardPip(index: number) {
  const isRed = index % 2 === 1;
  const suits = isRed ? PLAYING_CARD_SUITS_RED : PLAYING_CARD_SUITS_BLACK;
  return {
    rank: PLAYING_CARD_RANKS[index % PLAYING_CARD_RANKS.length],
    suit: suits[Math.floor(index / 2) % suits.length],
  };
}

/** Top-left / bottom-right index like a standard playing card */
function PlayingCardCornerPip({
  rank,
  suit,
  flip,
}: {
  rank: string;
  suit: string;
  flip?: boolean;
}) {
  const redSuit = suit === "♥" || suit === "♦";
  return (
    <div
      className={`pointer-events-none absolute z-[4] flex flex-col items-center gap-0.5 select-none ${
        flip ? "bottom-3 right-3 rotate-180 sm:bottom-4 sm:right-4" : "top-3 left-3 sm:top-4 sm:left-4"
      }`}
      style={{ fontFamily: "'Playfair Display', serif" }}
      aria-hidden
    >
      <span
        className={`text-[17px] font-bold tracking-tight sm:text-[19px] ${redSuit ? "text-red-900/80" : "text-black/80"}`}
      >
        {rank}
      </span>
      <span
        className={`text-[26px] leading-none sm:text-[30px] ${redSuit ? "text-red-900/75" : "text-black/60"}`}
      >
        {suit}
      </span>
    </div>
  );
}

function IdeaCard({ idea, index }: { idea: SpotlightItem; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const initStage: RoseStage = TAG_TO_STAGE[idea.tag ?? ""] ?? "bud";
  const [stage, setStage] = useState<RoseStage>(initStage);
  const [bloomed, setBloomed] = useState(false);

  const handleClick = () => {
    // 뒷면일 때 클릭하면 장미 단계 진행
    if (flipped) {
      if (stage === "bud")  setStage("half");
      else if (stage === "half") { setStage("full"); setBloomed(true); }
    }
  };

  const scrim = bloomed
    ? "linear-gradient(180deg, rgba(242,252,238,0.82) 0%, rgba(232,246,228,0.9) 100%)"
    : hovered
      ? "linear-gradient(180deg, rgba(255,255,255,0.62) 0%, rgba(250,251,248,0.88) 100%)"
      : "linear-gradient(180deg, rgba(255,255,255,0.52) 0%, rgba(247,249,245,0.86) 100%)";

  const pip = playingCardPip(index);

  // Deck-spread: each card originates from the grid center
  // col offset from center col (1): cols 0→+1, 1→0, 2→-1
  // row offset from center: row 0→+0.5, row 1→-0.5  (approximated for 2 rows)
  const CARD_W = 330;
  const CARD_H = 370;
  const GAP = 28;
  const col = index % 3;
  const row = Math.floor(index / 3);
  const deckX = (1 - col) * (CARD_W + GAP);    // +358, 0, -358
  const deckY = (0.5 - row) * (CARD_H + GAP);  // +199, -199
  const deckRot = (index - 2.5) * 4.5;          // fan: -11.25° … +11.25°

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.62, rotate: deckRot, x: deckX, y: deckY }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 }}
      transition={{
        delay: index * 0.07,
        duration: 0.65,
        type: "spring",
        stiffness: 80,
        damping: 15,
      }}
      viewport={{ once: true, amount: 0.1 }}
      onHoverStart={() => { setHovered(true); setFlipped(f => !f); }}
      onHoverEnd={() => { setHovered(false); }}
      onClick={handleClick}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative select-none"
      style={{ cursor: "inherit", perspective: 1200 }}
    >
      {/* ── 3D flip container ── */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, type: "spring", stiffness: 70, damping: 14 }}
        style={{ transformStyle: "preserve-3d", position: "relative" }}
      >

        {/* ════ FRONT FACE ════ */}
        <div
          className="overflow-hidden rounded-2xl border"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderColor: hovered && !flipped ? "rgba(0,0,0,0.22)" : "rgba(0,0,0,0.12)",
            boxShadow: hovered && !flipped
              ? "0 10px 28px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.6)"
              : "0 4px 18px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(255,255,255,0.5)",
            background: "linear-gradient(145deg, #fbfbf9 0%, #f2f2ee 100%)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/card-soldier.jpg"
            alt="" aria-hidden draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full select-none rounded-2xl object-cover"
            style={{ objectPosition: "center top", opacity: 0.14, mixBlendMode: "multiply", filter: "grayscale(100%) contrast(1.25)" }}
          />

          <div
            className="relative z-[1] m-2 overflow-hidden rounded-xl ring-1 ring-black/10 sm:m-2.5"
            style={{
              border: "1px solid rgba(0,0,0,0.14)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.65), inset 0 0 0 2px rgba(0,0,0,0.04)",
              minHeight: 288,
            }}
          >
            <PlayingCardCornerPip rank={pip.rank} suit={pip.suit} />
            <PlayingCardCornerPip rank={pip.rank} suit={pip.suit} flip />

            <div className="relative flex min-h-[288px] flex-col bg-[rgb(247,249,245)] px-5 pb-5 pt-11 sm:px-6 sm:pb-6 sm:pt-12">
              <QueenCroquetMosaic cardIndex={index} />
              <div className="pointer-events-none absolute inset-0 z-[1]" style={{ background: scrim }} />

              <AnimatePresence>
                {bloomed && (
                  <motion.div
                    key="bloom-flash"
                    initial={{ opacity: 0.5, scale: 0.5 }}
                    animate={{ opacity: 0, scale: 2.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="absolute inset-0 z-[3] rounded-[50%]"
                    style={{ background: "radial-gradient(circle, rgba(180,220,150,0.5) 0%, transparent 70%)", pointerEvents: "none" }}
                  />
                )}
              </AnimatePresence>

              <div className="relative z-[2] flex flex-1 flex-col items-center text-center">
                <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
                  <div className="relative h-7 w-5 shrink-0 text-black/40">
                    <RoseStageIcon stage={stage} className="absolute inset-0" />
                  </div>
                  {idea.tag ? (
                    <span className="border border-black/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-black/35">{idea.tag}</span>
                  ) : null}

                  {stage === "full" && (
                    <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                      className="text-[10px] italic tracking-wider text-black/30" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {site.cardUi.inBloom}
                    </motion.span>
                  )}
                </div>

                <h3 className="mb-3 max-w-[98%] font-serif text-sm leading-snug text-black/80 sm:text-[15px]"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  &ldquo;{idea.title}&rdquo;
                </h3>
                <p className="mb-5 text-[11px] uppercase tracking-wider text-black/30">{idea.category}</p>

                <div className="mt-auto w-full max-w-[220px]">
                  <div className="mb-1 flex items-center justify-between text-[9px] uppercase tracking-wider text-black/25">
                    <span>{site.cardUi.barLabel}</span>
                    <span className="font-mono text-black/40">{idea.score}</span>
                  </div>
                  <div className="h-px w-full bg-black/10">
                    <motion.div className="h-px bg-black/50"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${idea.score}%` }}
                      transition={{ delay: index * 0.07 + 0.3, duration: 0.9 }}
                      viewport={{ once: true }} />
                  </div>
                </div>

                <p className="mt-4 text-[9px] uppercase tracking-wider text-black/18">
                  {stage === "full" ? "✦" : site.cardUi.hintClosed}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ════ BACK FACE ════ */}
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl border"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderColor: "rgba(0,0,0,0.15)",
            boxShadow: "0 10px 32px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.5)",
            background: "linear-gradient(145deg, #f5f3ee 0%, #ede9e2 100%)",
          }}
        >
          {/* Card back pattern — tiled card-soldier */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/card-soldier.jpg"
            alt="" aria-hidden draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover rounded-2xl"
            style={{ opacity: 0.09, mixBlendMode: "multiply", filter: "grayscale(100%) contrast(1.3)" }}
          />

          {/* Inner frame */}
          <div className="absolute inset-2 sm:inset-2.5 z-[1] rounded-xl"
            style={{ border: "1px solid rgba(0,0,0,0.12)",
              boxShadow: "inset 0 0 0 4px rgba(0,0,0,0.04), inset 0 0 0 5px rgba(255,255,255,0.5)" }}>

            <PlayingCardCornerPip rank={pip.rank} suit={pip.suit} />
            <PlayingCardCornerPip rank={pip.rank} suit={pip.suit} flip />

            <div className="flex h-full flex-col items-center justify-center gap-5 px-6 py-10">
              {/* Decorative diamond centre */}
              <div className="flex flex-col items-center gap-1 opacity-20">
                {["♠", "♥", "♦", "♣"].map(s => (
                  <span key={s} className="text-lg leading-none" style={{ fontFamily: "serif" }}>{s}</span>
                ))}
              </div>

              {/* Score — large display */}
              <div className="text-center">
                <p className="text-[9px] tracking-[0.35em] uppercase text-black/30 mb-1">{site.cardUi.backMetricTitle}</p>
                <p className="font-mono text-5xl font-light text-black/70">{idea.score}</p>
                <p className="text-[9px] tracking-widest text-black/20 mt-1">{site.cardUi.backMetricSuffix}</p>
              </div>

              {/* Trend */}
              <p className="text-[10px] tracking-[0.3em] uppercase text-black/35 border-t border-black/10 pt-4 w-full text-center">
                {idea.trend} &nbsp;·&nbsp; {idea.category}
              </p>

              {/* Hint */}
              <p className="text-[9px] uppercase tracking-wider text-black/20 italic"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                {site.cardUi.hintBack}
              </p>
            </div>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
}

// ── Shared font constant ──────────────────────────────────────────────────
const SERIF = "'Cormorant Garamond', 'Playfair Display', serif";

const BOARD_SUITS = ["♠", "♥", "♦", "♣"] as const;

function BoardGameSection({
  boardGame,
}: {
  boardGame: (typeof site)["boardGame"];
}) {
  return (
    <section
      id="board"
      className="relative scroll-mt-24 border-t px-6 py-20 md:py-28"
      style={{
        borderColor: "rgba(0,0,0,0.07)",
        background: "linear-gradient(168deg, #f4f1ea 0%, #ffffff 42%, #f9f7f2 100%)",
      }}
    >
      <div className="relative z-[1] mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          viewport={{ once: true }}
          className="mb-10 text-center md:mb-14"
        >
          <p
            className="mb-4 text-[10px] uppercase tracking-[0.45em] text-black/30"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {boardGame.eyebrow}
          </p>
          <h2
            className="font-serif leading-[1.08] tracking-tight text-black/80"
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(1.85rem, 4vw, 3rem)",
              fontWeight: 300,
            }}
          >
            {boardGame.titleLine1}
            <br />
            <em className="not-italic" style={{ fontWeight: 400, color: "rgba(0,0,0,0.42)" }}>
              {boardGame.titleItalic}
            </em>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-black/38">{boardGame.sub}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08 }}
          viewport={{ once: true, amount: 0.15 }}
          className="relative rounded-[2rem] border bg-white/70 p-5 shadow-sm sm:p-8 md:p-10"
          style={{
            borderColor: "rgba(0,0,0,0.12)",
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.9) inset, 0 18px 40px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.04)",
          }}
        >
          <span
            className="pointer-events-none absolute left-5 top-5 select-none font-serif text-2xl text-black/[0.07] sm:left-8 sm:top-8"
            aria-hidden
          >
            ♠
          </span>
          <span
            className="pointer-events-none absolute bottom-5 right-5 select-none font-serif text-2xl text-black/[0.07] sm:bottom-8 sm:right-8"
            aria-hidden
          >
            ♣
          </span>

          <div className="relative mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 lg:gap-5">
            {boardGame.projects.map((project, i) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 16, rotate: -0.8 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: i * 0.08, duration: 0.55, type: "spring", stiffness: 120, damping: 18 }}
                viewport={{ once: true, amount: 0.2 }}
                className="group relative overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-[#fdfcf8] to-[#f3f0e8] px-5 pb-5 pt-8 transition-shadow hover:shadow-md"
              >
                <span className="absolute left-4 top-3 font-mono text-[10px] tracking-widest text-black/25">
                  SPACE {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="absolute right-4 top-2 text-xl leading-none text-black/[0.12] transition-colors group-hover:text-black/20"
                  style={{ fontFamily: "serif" }}
                  aria-hidden
                >
                  {BOARD_SUITS[i % BOARD_SUITS.length]}
                </span>
                <h3
                  className="pr-8 font-serif text-lg leading-snug text-black/80 sm:text-xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {project.title}
                </h3>
                <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-black/30">
                  {project.year}
                  <span className="mx-2 text-black/15">·</span>
                  {project.tag}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-black/40">{project.blurb}</p>
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 border-b border-black/20 pb-0.5 text-xs tracking-wider text-black/45 transition-colors hover:border-black/50 hover:text-black/75"
                  >
                    {project.linkLabel ?? boardGame.linkLabel}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <p className="mt-5 text-[10px] uppercase tracking-wider text-black/20">Token reserved — add a link in site.ts</p>
                )}
              </motion.article>
            ))}
          </div>

          <p
            className="mt-8 text-center text-[10px] uppercase tracking-[0.35em] text-black/25"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
          >
            {boardGame.footnote}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════
export default function HomePage() {
  const { links, brand, nav, hero, processIntro, steps, queenSection, garden, boardGame, cheshire, footer } = site;

  return (
    <div
      className="overflow-x-hidden"
      style={{ background: "#ffffff", fontFamily: "'Inter', sans-serif", color: "#1a1a1a" }}
    >
      <FallingAlice />
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 h-16 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.07)", backdropFilter: "blur(16px)", background: "rgba(255,255,255,0.92)" }}>
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/rabbit.png" alt={brand.rabbitAlt} style={{ width: 36, height: "auto", filter: "grayscale(100%) contrast(1.3)", mixBlendMode: "multiply" }} />
          <span className="font-serif text-black/80 tracking-wide text-lg"
            style={{ fontFamily: SERIF }}>{brand.navTitle}</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="#board" className="text-black/40 hover:text-black text-sm transition-colors tracking-wide">Board</Link>
          <a href={links.contactMailto} className="text-black/40 hover:text-black text-sm transition-colors tracking-wide">{nav.contact}</a>
          <a href={links.github} target="_blank" rel="noopener noreferrer"
            className="text-sm px-5 py-2 border text-black/70 hover:bg-black hover:text-white transition-all tracking-wider"
            style={{ borderColor: "rgba(0,0,0,0.2)" }}>
            {nav.github}
          </a>
        </div>
      </nav>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="pt-32 pb-0 px-6 text-center relative">
        <div style={{ position: "relative", zIndex: 1 }}>
          <motion.p
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-black/30 text-xs tracking-[0.4em] uppercase mb-6"
          >{hero.eyebrow}</motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35 }}
            className="text-5xl md:text-8xl font-serif leading-none tracking-tight mb-2"
            style={{ fontFamily: SERIF, fontWeight: 300 }}
          >
            {hero.line1}
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.5 }}
            className="text-5xl md:text-8xl font-serif italic leading-none tracking-tight mb-10"
            style={{ fontFamily: SERIF, color: "rgba(0,0,0,0.38)", fontWeight: 400 }}
          >
            {hero.nameLine}
          </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }}
          className="text-black/40 text-base max-w-md mx-auto mb-12 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: hero.subHtml }}
        />

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          className="flex items-center justify-center gap-4 mb-4"
        >
          <a href={links.contactMailto}>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 text-sm font-medium tracking-widest transition-all border border-black/80 bg-black text-white hover:bg-black/80">
              {hero.primaryCta}
            </motion.button>
          </a>
          <Link href="#garden">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 text-sm font-medium tracking-widest transition-all border text-black/60 hover:border-black/40"
              style={{ borderColor: "rgba(0,0,0,0.15)" }}>
              {hero.secondaryCta}
            </motion.button>
          </Link>
        </motion.div>
        </div>{/* /relative zIndex wrapper */}

      </section>

      {/* ══════════════════════════════════════════
          LANDING — Process section
      ══════════════════════════════════════════ */}
      <section className="relative py-40 px-6 overflow-hidden"
        style={{ background: "#ffffff" }}>

        <div className="max-w-6xl mx-auto">

          {/* ── "Follow the Rabbit" header ─────────────────────────────── */}
          <div className="relative flex flex-col items-center mb-0">

            {/* Label */}
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7 }} viewport={{ once: true }}
              className="text-black/22 text-[10px] tracking-[0.45em] uppercase mb-6"
            >
              {processIntro.eyebrow}
            </motion.p>

            {/* White Rabbit only — book spread (1book29) removed; it showed Alice/croquet */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }} viewport={{ once: true }}
              className="flex items-center justify-center w-full max-w-3xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/rabbit.png"
                alt="White Rabbit"
                draggable={false}
                style={{
                  width: "clamp(200px, 42vw, 340px)",
                  height: "auto",
                  filter: "grayscale(100%) contrast(1.5)",
                  mixBlendMode: "multiply",
                  userSelect: "none",
                }}
              />
            </motion.div>

            {/* Title below */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }} viewport={{ once: true }}
              className="text-center mt-8 mb-4"
            >
              <h2 className="text-3xl md:text-4xl font-serif text-black/70"
                style={{ fontFamily: "'Playfair Display', serif" }}
                dangerouslySetInnerHTML={{ __html: processIntro.titleHtml }}
              />
              <p className="text-black/30 text-sm mt-3 tracking-wide">
                {processIntro.sub}
              </p>
            </motion.div>

            {/* Dotted trail — rabbit's path leading down to the steps */}
            <motion.div
              initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }} viewport={{ once: true }}
              style={{ originY: 0 }}
              className="flex flex-col items-center gap-1.5 my-6"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{
                  width: 3, height: 3, borderRadius: "50%",
                  background: "rgba(0,0,0,0.15)",
                  opacity: 1 - i * 0.1,
                }} />
              ))}
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-0">
            {steps.map((step, i) => (
              <motion.div key={step.num}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.7 }} viewport={{ once: true }}
                className="py-12 px-8 text-center"
                style={{
                  borderLeft: i > 0 ? "1px solid rgba(0,0,0,0.07)" : "none",
                  borderTop: "1px solid rgba(0,0,0,0.07)",
                }}
              >
                <div style={{ height: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={step.imageSrc}
                    alt={step.imageAlt}
                    style={{
                      width: step.imageWidth,
                      margin: "0 auto",
                      filter: "grayscale(100%) contrast(1.4) opacity(0.85)",
                      mixBlendMode: "multiply",
                    }}
                  />
                </div>
                <div className="mt-6 mb-2">
                  <span className="text-black/20 text-xs font-serif tracking-widest"
                    style={{ fontFamily: "'Playfair Display', serif" }}>{step.num}</span>
                </div>
                <h3 className="text-xl font-serif mb-3 text-black/75"
                  style={{ fontFamily: "'Playfair Display', serif" }}>{step.title}</h3>
                <p className="text-black/35 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          RED QUEEN ENTRANCE
      ══════════════════════════════════════════ */}
      <section className="relative z-30" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 flex flex-col md:flex-row items-end gap-8 md:gap-12">

          {/* ── Left: Queen ── */}
          <motion.div
            initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            className="shrink-0 self-end"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/redqueen.png"
              alt="The Red Queen"
              draggable={false}
              style={{
                width: "clamp(90px, 12vw, 160px)",
                height: "auto",
                display: "block",
                filter: "grayscale(100%) contrast(1.35)",
                mixBlendMode: "multiply",
                opacity: 0.88,
                userSelect: "none",
              }}
            />
          </motion.div>

          {/* ── Centre: Text ── */}
          <div className="flex-1 min-w-0">
            <motion.p
              initial={{ opacity: 0, y: -6 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }} viewport={{ once: true }}
              className="text-[10px] tracking-[0.45em] uppercase mb-4"
              style={{ color: "rgba(0,0,0,0.25)" }}
            >
              {queenSection.eyebrow}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }} viewport={{ once: true }}
              className="font-serif leading-none tracking-tight mb-5"
              style={{
                fontFamily: SERIF,
                fontSize: "clamp(2.2rem, 4.5vw, 4.2rem)",
                fontWeight: 300,
                color: "rgba(0,0,0,0.82)",
              }}
            >
              {queenSection.titleLine1}<br />
              <em style={{ fontWeight: 400, color: "rgba(0,0,0,0.42)" }}>{queenSection.titleItalic}</em>
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }} viewport={{ once: true }}
              style={{ originX: 0 }}
              className="h-px bg-black/10 max-w-xs mb-6"
            />

            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }}
              className="text-black/35 text-sm leading-relaxed max-w-xs"
              dangerouslySetInnerHTML={{ __html: queenSection.bodyHtml }}
            />
          </div>

          {/* ── Right: Card Soldiers ── */}
          <motion.div
            initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            viewport={{ once: true }}
            className="shrink-0 self-end"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/card-soldiers.jpg"
              alt="Card Soldiers"
              draggable={false}
              style={{
                height: "clamp(140px, 18vw, 240px)",
                width: "auto",
                display: "block",
                filter: "grayscale(100%) contrast(1.2)",
                mixBlendMode: "multiply",
                opacity: 0.7,
                userSelect: "none",
              }}
            />
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          INVESTOR GRID — Queen's Garden
      ══════════════════════════════════════════ */}
      <section
        id="garden"
        className="relative z-30 px-6 pb-20 pt-0 overflow-hidden scroll-mt-24"
        style={{
          background: "#ffffff",
          cursor: "crosshair",
        }}
      >
        <div className="relative z-10 mx-auto max-w-6xl">
          {/* Divider */}
          <div className="mb-10 flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: "rgba(0,0,0,0.09)" }} />
            <QueenGardenCyclingRose />
            <div className="flex-1 h-px" style={{ background: "rgba(0,0,0,0.09)" }} />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 lg:grid-cols-3 lg:gap-8">
            {SPOTLIGHT.map((idea, i) => (
              <IdeaCard key={idea.title} idea={idea} index={i} />
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }}
            className="text-center mt-12">
            <Link href="#garden"
              className="inline-flex items-center gap-2 text-sm text-black/35 hover:text-black/70 transition-colors tracking-wider border-b pb-0.5"
              style={{ borderColor: "rgba(0,0,0,0.15)" }}>
              {garden.linkBack} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <BoardGameSection boardGame={boardGame} />

      {/* ══════════════════════════════════════════
          CHESHIRE QUOTE — CTA
      ══════════════════════════════════════════ */}
      <section className="relative py-40 px-6 text-center overflow-hidden"
        style={{ borderTop: "1px solid rgba(0,0,0,0.07)", background: "#ffffff" }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }} viewport={{ once: true }}
          className="max-w-3xl mx-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/chat.png" alt="Cheshire Cat" style={{ width: 200, margin: "0 auto 3rem", filter: "grayscale(100%) contrast(1.4) opacity(0.82)", mixBlendMode: "multiply" }} />
          <blockquote className="text-3xl md:text-5xl font-serif italic leading-tight text-black/50 mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            {cheshire.quote}
          </blockquote>
          <p className="text-black/25 text-sm tracking-wider mb-14">{cheshire.attribution}</p>
          <p className="text-black/40 text-base leading-relaxed max-w-lg mx-auto mb-12"
            dangerouslySetInnerHTML={{ __html: cheshire.bodyHtml }}
          />
          <a href={links.contactMailto}>
            <motion.button whileHover={{ scale: 1.03, background: "#1a1a1a" }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-10 py-4 border border-black/20 text-black/70 text-sm tracking-widest transition-all hover:text-white hover:border-black">
              {cheshire.cta}
            </motion.button>
          </a>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 px-8" style={{ borderTop: "1px solid rgba(0,0,0,0.07)", background: "#ffffff" }}>
        {/* Classical colophon */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px w-16" style={{ background: "rgba(0,0,0,0.1)" }} />
            <div className="h-px w-16" style={{ background: "rgba(0,0,0,0.1)" }} />
          </div>
          <p className="text-black/20 text-xs tracking-widest"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", letterSpacing: "0.18em" }}>
            {footer.colophonLine1}
          </p>
          <div className="flex items-center justify-center gap-2 mt-1.5">
            <span className="text-black/25 text-xs font-serif tracking-widest"
              style={{ fontFamily: "'Playfair Display', serif" }}>{footer.colophonName}</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-black/30 text-sm font-serif"
              style={{ fontFamily: "'Playfair Display', serif" }}>{footer.colophonName}</span>
          </div>
          <div className="flex items-center gap-8">
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="text-black/20 hover:text-black/50 text-xs tracking-wider transition-colors">{nav.github}</a>
            <a href={links.contactMailto} className="text-black/20 hover:text-black/50 text-xs tracking-wider transition-colors">Email</a>
          </div>
          <p className="text-black/15 text-xs">{footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
}