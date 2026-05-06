"use client";

import { useState, useEffect, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { NavReveal } from "@/components/NavReveal";
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
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -3 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
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
              opacity: 0.1,
              mixBlendMode: "multiply",
              filter: "grayscale(100%) contrast(1.12)",
            }}
          />
        );
      })}
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

/** Corner pip matches the suit row the visitor picked (♠ ♥ ♦ ♣). */
const GARDEN_SUIT_GLYPH: Record<SpotlightItem["suit"], string> = {
  spade: "♠",
  heart: "♥",
  diamond: "♦",
  club: "♣",
};

function playingCardPipForSelectedSuit(selectedSuit: SpotlightItem["suit"], cardIndex: number) {
  return {
    rank: PLAYING_CARD_RANKS[cardIndex % PLAYING_CARD_RANKS.length],
    suit: GARDEN_SUIT_GLYPH[selectedSuit],
  };
}

/** Top-left / bottom-right index like a standard playing card */
function PlayingCardCornerPip({
  rank,
  suit,
  flip,
  size = "sm",
}: {
  rank: string;
  suit: string;
  flip?: boolean;
  size?: "sm" | "lg";
}) {
  const redSuit = suit === "♥" || suit === "♦";
  const pos =
    size === "lg"
      ? flip
        ? "bottom-3 right-3 rotate-180 sm:bottom-3.5 sm:right-3.5"
        : "top-3 left-3 sm:top-3.5 sm:left-3.5"
      : flip
        ? "bottom-2 right-2 rotate-180 sm:bottom-2.5 sm:right-2.5"
        : "top-2 left-2 sm:top-2.5 sm:left-2.5";
  const rankCls = size === "lg" ? "text-[15px] sm:text-[16px]" : "text-[12px] sm:text-[13px]";
  const suitCls = size === "lg" ? "text-[22px] sm:text-[24px]" : "text-[17px] sm:text-[19px]";
  return (
    <div
      className={`pointer-events-none absolute z-[4] flex flex-col items-center gap-0 select-none ${pos}`}
      style={{ fontFamily: "'Playfair Display', serif" }}
      aria-hidden
    >
      <span className={`font-bold tracking-tight ${rankCls} ${redSuit ? "text-red-900" : "text-neutral-900"}`}>{rank}</span>
      <span className={`leading-none ${suitCls} ${redSuit ? "text-red-900/90" : "text-neutral-800"}`}>{suit}</span>
    </div>
  );
}

function IdeaCard({
  idea,
  index,
  selectedSuit,
}: {
  idea: SpotlightItem;
  index: number;
  selectedSuit: SpotlightItem["suit"];
}) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const initStage: RoseStage = TAG_TO_STAGE[idea.tag ?? ""] ?? "bud";
  const [stage, setStage] = useState<RoseStage>(initStage);
  const [bloomed, setBloomed] = useState(false);

  const scrim = bloomed
    ? "linear-gradient(180deg, rgba(250,252,248,0.94) 0%, rgba(236,244,230,0.97) 100%)"
    : hovered
      ? "linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(252,252,250,0.96) 100%)"
      : "linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(250,250,248,0.94) 100%)";

  const pip = playingCardPipForSelectedSuit(selectedSuit, index);

  const advanceRose = () => {
    if (stage === "bud") setStage("half");
    else if (stage === "half") {
      setStage("full");
      setBloomed(true);
    }
  };

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  useEffect(() => {
    if (!expanded) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [expanded]);

  const borderFront = hovered ? "rgba(0,0,0,0.32)" : "rgba(0,0,0,0.2)";
  const shadowFront = hovered
    ? "0 12px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(255,255,255,0.75)"
    : "0 6px 22px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(255,255,255,0.65)";

  const stripFace = (
    <div
      className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border"
      style={{
        borderColor: borderFront,
        boxShadow: shadowFront,
        background: "linear-gradient(145deg, #fbfbf9 0%, #f2f2ee 100%)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/card-soldier.jpg"
        alt="" aria-hidden draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full select-none rounded-2xl object-cover"
        style={{ objectPosition: "center top", opacity: 0.07, mixBlendMode: "multiply", filter: "grayscale(100%) contrast(1.25)" }}
      />

      <div
        className="relative z-[1] m-2 flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl ring-1 ring-black/18 sm:m-2.5"
        style={{
          border: "1px solid rgba(0,0,0,0.22)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.8), inset 0 0 0 2px rgba(0,0,0,0.05)",
        }}
      >
        <PlayingCardCornerPip rank={pip.rank} suit={pip.suit} />
        <PlayingCardCornerPip rank={pip.rank} suit={pip.suit} flip />

        <div className="relative flex h-full min-h-0 flex-1 flex-col bg-[#f6f5f2] px-5 pb-4 pt-10 sm:px-6 sm:pb-5 sm:pt-11">
          <QueenCroquetMosaic cardIndex={index} />
          <div className="pointer-events-none absolute inset-0 z-[1] bg-white/50" aria-hidden />
          <div className="pointer-events-none absolute inset-0 z-[1]" style={{ background: scrim }} />

          <div className="relative z-[2] flex min-h-0 flex-1 flex-col items-center text-center">
            <div className="mb-3 flex shrink-0 flex-wrap items-center justify-center gap-2">
              <div className="relative h-7 w-5 shrink-0 text-black/55">
                <RoseStageIcon stage={stage} className="absolute inset-0" />
              </div>
              {idea.tag ? (
                <span className="border border-black/25 bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-neutral-800 shadow-sm">{idea.tag}</span>
              ) : null}

              {stage === "full" && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="text-[10px] italic tracking-wider text-black/45"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {site.cardUi.inBloom}
                </motion.span>
              )}
            </div>

            <h3
              className="mb-2 line-clamp-3 max-w-[98%] min-h-0 shrink font-serif text-sm leading-snug text-neutral-900 sm:text-[15px]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              &ldquo;{idea.title}&rdquo;
            </h3>
            <p className="mb-2 shrink-0 text-[11px] font-medium uppercase tracking-wider text-neutral-600">{idea.category}</p>
            <div className="mb-3 min-h-0 w-full max-w-[95%] flex-1 space-y-2 overflow-hidden border-t border-black/18 pt-2.5 text-left">
              <div>
                <p className="text-[8px] uppercase tracking-[0.22em] text-black/40">{site.cardUi.roleLabel}</p>
                <p className="mt-0.5 line-clamp-2 font-serif text-[10px] leading-snug text-neutral-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {idea.roleLine}
                </p>
              </div>
              <div className="border-t border-black/10 pt-2">
                <p className="text-[8px] uppercase tracking-[0.22em] text-black/40">{site.cardUi.impactLabel}</p>
                <p className="mt-0.5 line-clamp-2 font-serif text-[10px] leading-snug text-neutral-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {idea.impactLine}
                </p>
              </div>
            </div>

            <p className="mt-auto shrink-0 pt-1 text-[9px] font-semibold uppercase tracking-wider text-neutral-600">{site.cardUi.hintClosed}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const modalPortal =
    typeof document !== "undefined" && expanded
      ? createPortal(
          <>
            <motion.div
              key="scrim"
              role="presentation"
              className="fixed inset-0 z-[220] bg-black/58"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.28 }}
              onClick={() => setExpanded(false)}
              style={{ backdropFilter: "blur(4px)" }}
            />
            <div className="fixed inset-0 z-[221] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                key="panel"
                role="dialog"
                aria-modal="true"
                aria-label={idea.title}
                className="pointer-events-auto w-full max-w-[min(92vw,460px)]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                style={{ perspective: 1400 }}
              >
                    <motion.div
                      initial={{ rotateY: reduceMotion ? 180 : 0 }}
                      animate={{ rotateY: 180 }}
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { duration: 0.58, ease: [0.22, 1, 0.36, 1], delay: 0.05 }
                      }
                      className="min-h-[min(88vh,560px)]"
                      style={{ transformStyle: "preserve-3d", position: "relative" }}
                    >
                      {/* Modal front — minimal flip preview */}
                      <div
                        className="flex h-full min-h-[min(88vh,560px)] flex-col overflow-hidden rounded-2xl border border-black/10 bg-[#fafaf9]"
                        style={{
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                        }}
                      >
                        <PlayingCardCornerPip rank={pip.rank} suit={pip.suit} size="sm" />
                        <PlayingCardCornerPip rank={pip.rank} suit={pip.suit} flip size="sm" />
                        <div className="relative flex min-h-[260px] flex-1 flex-col px-6 pb-6 pt-12 sm:px-8 sm:pb-8 sm:pt-14">
                          <div className="relative z-[2] flex flex-1 flex-col items-center justify-center text-center">
                            <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
                              <div className="relative h-7 w-5 shrink-0 text-neutral-600">
                                <RoseStageIcon stage={stage} className="absolute inset-0" />
                              </div>
                              {idea.tag ? (
                                <span className="border border-black/15 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-neutral-700">
                                  {idea.tag}
                                </span>
                              ) : null}
                            </div>
                            <h3 className="mb-2 max-w-[98%] font-serif text-base leading-snug text-neutral-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                              &ldquo;{idea.title}&rdquo;
                            </h3>
                            <p className="mb-4 text-[11px] font-medium uppercase tracking-wider text-neutral-500">{idea.category}</p>
                          </div>
                        </div>
                      </div>

                      {/* Modal back — minimal reading panel (no imagery / watermark) */}
                      <div
                        className="absolute inset-0 flex min-h-[min(88vh,560px)] flex-col overflow-y-auto overflow-x-hidden rounded-2xl border border-black/10 bg-[#fafaf9] [&::-webkit-scrollbar]:hidden"
                        style={{
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => setExpanded(false)}
                          className="absolute right-4 top-4 z-30 text-[11px] font-medium tracking-wide text-neutral-500 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-900 hover:decoration-neutral-500"
                        >
                          {site.cardUi.closeDetail}
                        </button>

                        <PlayingCardCornerPip rank={pip.rank} suit={pip.suit} size="sm" />
                        <PlayingCardCornerPip rank={pip.rank} suit={pip.suit} flip size="sm" />

                        <div className="relative z-10 flex flex-1 flex-col px-6 pb-10 pt-14 sm:px-10 sm:pb-12 sm:pt-16">
                            <AnimatePresence>
                              {bloomed && (
                                <motion.div
                                  key="bloom-modal"
                                  initial={{ opacity: 0.45 }}
                                  animate={{ opacity: 0 }}
                                  transition={{ duration: 0.5, ease: "easeOut" }}
                                  className="pointer-events-none absolute inset-0 z-[5]"
                                  style={{ background: "radial-gradient(circle at 50% 42%, rgba(180,220,150,0.22) 0%, transparent 55%)" }}
                                />
                              )}
                            </AnimatePresence>

                            <p className="mx-auto mb-6 max-w-sm border-b border-black/10 pb-3 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-600">
                              {idea.trend}
                              <span className="text-black/20">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
                              {idea.category}
                            </p>

                            <div className="mx-auto w-full max-w-sm space-y-6">
                              <div>
                                <p className="text-[9px] uppercase tracking-[0.28em] text-black/40">{site.cardUi.roleLabel}</p>
                                <p
                                  className="mt-2 font-serif text-[15px] leading-snug text-neutral-950 sm:text-base"
                                  style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                  {idea.roleLine}
                                </p>
                              </div>
                              <div className="border-t border-black/10 pt-6">
                                <p className="text-[9px] uppercase tracking-[0.28em] text-black/40">{site.cardUi.impactLabel}</p>
                                <p
                                  className="mt-2 font-serif text-[15px] leading-snug text-neutral-950 sm:text-base"
                                  style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                  {idea.impactLine}
                                </p>
                              </div>
                            </div>

                            <div
                              className="mt-8 max-w-none text-[15px] leading-[1.68] text-neutral-900 [&_em]:italic [&_em]:text-neutral-700 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-neutral-950"
                              dangerouslySetInnerHTML={{ __html: idea.detailHtml }}
                            />

                            <button
                              type="button"
                              onClick={advanceRose}
                              className="mx-auto mt-8 flex max-w-full flex-col items-center gap-2 border-t border-black/10 px-3 pt-8 text-center transition-colors hover:bg-black/[0.02]"
                            >
                              <div className="relative h-10 w-7 text-neutral-600">
                                <RoseStageIcon stage={stage} className="absolute inset-0" />
                              </div>
                              <span
                                className="text-[9px] uppercase tracking-wider text-neutral-500"
                                style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
                              >
                                {stage === "full" ? site.cardUi.inBloom : site.cardUi.hintBack}
                              </span>
                            </button>

                            <p className="mt-6 text-center text-[9px] uppercase tracking-wider text-black/35">{site.cardUi.hintModalClose}</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
          </>,
          document.body,
        )
      : null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay: index * 0.03, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true, amount: 0.12 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="relative flex h-full min-h-0 flex-col select-none"
      >
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="flex h-full min-h-0 w-full cursor-pointer flex-col rounded-2xl border-0 bg-transparent p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2"
          aria-haspopup="dialog"
          aria-expanded={expanded}
        >
          <div className="relative flex min-h-0 flex-1 flex-col">{stripFace}</div>
        </button>
      </motion.div>
      {modalPortal}
    </>
  );
}

// ── Shared font constant ──────────────────────────────────────────────────
const SERIF = "'Cormorant Garamond', 'Playfair Display', serif";

function AliceScaleBand({ copy }: { copy: (typeof site)["aliceScale"] }) {
  /** Same box on both sides so labels + titles line up across the split */
  const imgWrapClass =
    "flex h-[148px] w-full shrink-0 items-center justify-center md:h-[160px] md:w-[140px]";
  const imgStyle: CSSProperties = {
    maxHeight: "132px",
    width: "auto",
    maxWidth: "118px",
    height: "auto",
    objectFit: "contain",
    filter: "grayscale(100%) contrast(1.2)",
    mixBlendMode: "multiply",
    userSelect: "none",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, delay: 0.06 }}
      className="mx-auto mb-14 mt-2 max-w-5xl px-1"
    >
      <p
        className="mb-2 text-center text-[10px] uppercase tracking-[0.42em] text-black/25"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {copy.sectionEyebrow}
      </p>
      <h3
        className="mb-8 text-center font-serif text-[1.35rem] leading-snug text-black/58 md:text-2xl md:leading-snug"
        style={{ fontFamily: SERIF, fontWeight: 300 }}
        dangerouslySetInnerHTML={{ __html: copy.sectionTitleHtml }}
      />

      <div
        className="grid overflow-hidden rounded-2xl border md:grid-cols-2 md:items-stretch"
        style={{ borderColor: "rgba(0,0,0,0.1)", boxShadow: "0 1px 0 rgba(255,255,255,0.85) inset" }}
      >
        <div className="flex min-h-0 flex-col gap-5 bg-[#faf9f7] p-7 sm:p-8 md:h-full md:flex-row md:items-stretch md:gap-8 md:border-r md:border-black/10">
          <div className={imgWrapClass}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={copy.growImageSrc} alt={copy.growImageAlt} draggable={false} style={imgStyle} />
          </div>
          <div className="flex min-w-0 flex-col text-center md:flex-1 md:justify-center md:text-left">
            <p className="mb-1 text-[10px] uppercase tracking-[0.32em] text-red-900/50">{copy.growLabel}</p>
            <h4
              className="mb-2 font-serif text-lg text-black/78 sm:text-xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {copy.growTitle}
            </h4>
            <div
              className="text-sm leading-relaxed text-black/38"
              dangerouslySetInnerHTML={{ __html: copy.growBodyHtml }}
            />
          </div>
        </div>

        <div className="flex min-h-0 flex-col gap-5 border-t border-black/10 bg-white p-7 sm:p-8 md:h-full md:flex-row md:items-stretch md:border-t-0 md:gap-8">
          <div className={imgWrapClass}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={copy.shrinkImageSrc} alt={copy.shrinkImageAlt} draggable={false} style={imgStyle} />
          </div>
          <div className="flex min-w-0 flex-col text-center md:flex-1 md:justify-center md:text-left">
            <p className="mb-1 text-[10px] uppercase tracking-[0.32em] text-sky-900/45">{copy.shrinkLabel}</p>
            <h4
              className="mb-2 font-serif text-lg text-black/78 sm:text-xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {copy.shrinkTitle}
            </h4>
            <div
              className="text-sm leading-relaxed text-black/38"
              dangerouslySetInnerHTML={{ __html: copy.shrinkBodyHtml }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
type GardenSuit = SpotlightItem["suit"];

export default function HomePage() {
  const [gardenSuit, setGardenSuit] = useState<GardenSuit | null>(null);
  const {
    links,
    brand,
    nav,
    navReveal,
    hero,
    processIntro,
    aliceScale,
    garden,
    cheshire,
    footer,
  } = site;

  return (
    <div className="overflow-x-hidden text-[#1a1a1a]" style={{ background: "#ffffff" }}>
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 h-16 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.07)", backdropFilter: "blur(16px)", background: "rgba(255,255,255,0.92)" }}>
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/rabbit.png" alt={brand.rabbitAlt} style={{ width: 36, height: "auto", filter: "grayscale(100%) contrast(1.3)", mixBlendMode: "multiply" }} />
          <span className="font-serif text-black/80 tracking-wide text-lg"
            style={{ fontFamily: SERIF }}>{brand.navTitle}</span>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 sm:gap-x-6">
          <NavReveal
            label={nav.board}
            kind="anchor"
            href="#garden"
            panelTitle="Garden"
            description={navReveal.boardDescription}
            size="sm"
            panel="below"
          />
          <NavReveal
            label={nav.linkedin}
            kind="external"
            href={links.linkedin}
            panelTitle="LinkedIn"
            description={navReveal.linkedinDescription}
            size="sm"
            panel="below"
          />
          <NavReveal
            label={nav.github}
            kind="external"
            href={links.github}
            panelTitle="GitHub"
            description={navReveal.githubDescription}
            size="sm"
            panel="below"
          />
          <NavReveal
            label={nav.email}
            kind="mailto"
            href={links.contactMailto}
            panelTitle="Email"
            size="sm"
            panel="below"
            trigger="outline"
          />
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
          className="text-black/40 mx-auto mb-10 max-w-md text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: hero.subHtml }}
        />

        </div>{/* /relative zIndex wrapper */}

      </section>

      {/* ══════════════════════════════════════════
          QUEEN'S GARDEN — suit picker + skill cards (early for recruiter scan)
      ══════════════════════════════════════════ */}
      <section
        id="garden"
        className="relative z-30 scroll-mt-24 border-t bg-white pb-12"
        style={{ borderColor: "rgba(0,0,0,0.07)" }}
      >
        <div className="mx-auto max-w-6xl px-6 pt-8 pb-6 sm:pt-10 md:pt-12">
          <div className="mx-auto mb-5 h-px max-w-md bg-black/10" aria-hidden />

          {/* Suit picker + White Rabbit callout */}
          <div className="mx-auto max-w-3xl pb-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              viewport={{ once: true }}
              className="mb-6 flex flex-col items-center gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-center sm:gap-6 md:gap-8"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={garden.cardRabbitSrc}
                alt={garden.cardRabbitAlt}
                draggable={false}
                className="h-[clamp(200px,48vw,280px)] w-auto shrink-0 object-contain sm:h-[clamp(220px,36vw,300px)] md:h-[min(340px,38vw)]"
                style={{ filter: "grayscale(100%) contrast(1.15)", mixBlendMode: "multiply", opacity: 0.95 }}
              />
              <div className="min-w-0 max-w-md sm:text-left">
                <p
                  className="text-base leading-relaxed text-black/42 sm:text-lg"
                  style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
                  dangerouslySetInnerHTML={{ __html: garden.rabbitCalloutHtml }}
                />
                <p
                  className="mt-3 text-[11px] tracking-wide text-black/30 sm:text-xs"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {garden.rabbitSignoff}
                </p>
              </div>
            </motion.div>
            <p
              className="mb-4 text-[10px] uppercase tracking-[0.35em] text-black/28"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {garden.suitPickerTitle}
            </p>
            <p className="mb-6 text-xs leading-relaxed text-black/32">{garden.suitPickerHint}</p>
            <div className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-4 sm:gap-4">
              {garden.suits.map((s) => {
                const active = gardenSuit === s.id;
                const red = s.id === "heart" || s.id === "diamond";
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setGardenSuit(s.id)}
                    className={[
                      "flex h-full min-h-[210px] flex-col items-center justify-between gap-1 rounded-2xl border px-2.5 py-4 text-center transition-all sm:min-h-[240px] sm:px-3 sm:py-5",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2",
                      active ? "border-black/30 bg-white/90 shadow-md ring-1 ring-black/12" : "border-black/10 bg-white/50 hover:border-black/20 hover:bg-white/70",
                    ].join(" ")}
                    aria-pressed={active}
                  >
                    <div className="flex flex-col items-center">
                      <span
                        className="font-serif text-4xl leading-none sm:text-5xl"
                        style={{
                          fontFamily: SERIF,
                          color: red ? "rgba(140, 35, 35, 0.85)" : "rgba(0,0,0,0.55)",
                        }}
                        aria-hidden
                      >
                        {s.glyph}
                      </span>
                      <span className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-black/45">{s.label}</span>
                      <span className="mt-0.5 text-[9px] font-medium text-black/38">{s.sub}</span>
                    </div>
                    <p className="text-[10px] leading-snug text-black/34">{s.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cards for selected suit */}
        {gardenSuit !== null ? (
          <div className="relative w-full overflow-visible pb-16 pt-2">
            <div
              className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 sm:w-20"
              style={{ background: "linear-gradient(to right, rgba(255,255,255,0.95) 0%, transparent 100%)" }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 sm:w-20"
              style={{ background: "linear-gradient(to left, rgba(255,255,255,0.95) 0%, transparent 100%)" }}
              aria-hidden
            />
            <div
              className="mx-auto flex w-full max-w-6xl justify-center overflow-x-auto overflow-y-visible px-6 py-10 pb-4 pt-2 sm:px-10 md:px-14 [&::-webkit-scrollbar]:hidden"
              style={{
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div className="inline-flex items-stretch gap-4 sm:gap-5">
                {SPOTLIGHT.filter((idea) => idea.suit === gardenSuit).map((idea, i) => {
                  return (
                    <motion.div
                      key={idea.title}
                      className="flex h-[min(404px,calc(100vh-12rem))] min-h-0 w-[clamp(220px,52vw,268px)] shrink-0 flex-col"
                      style={{ scrollSnapAlign: "center" }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.35, ease: "easeOut" }}
                      whileHover={{ y: -3, transition: { duration: 0.2, ease: "easeOut" } }}
                    >
                      <IdeaCard idea={idea} index={i} selectedSuit={gardenSuit} />
                    </motion.div>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-center pt-4">
              <button
                type="button"
                onClick={() => setGardenSuit(null)}
                className="border-b border-black/20 pb-0.5 text-xs tracking-wider text-black/40 transition-colors hover:border-black/40 hover:text-black/65"
              >
                {garden.changeSuit}
              </button>
            </div>
          </div>
        ) : null}
      </section>

      {/* ══════════════════════════════════════════
          LANDING — Process section
      ══════════════════════════════════════════ */}
      <section id="about" className="relative scroll-mt-24 py-40 px-6 overflow-hidden"
        style={{ background: "#ffffff" }}>

        <div className="max-w-6xl mx-auto">

          {/* ── About me: copy left, White Rabbit right (md+) ───────────── */}
          <div className="relative mb-0 mx-auto max-w-5xl">
            <div
              className="flex flex-col items-stretch gap-10 md:flex-row md:items-center md:gap-12 lg:gap-16"
            >
              <div className="min-w-0 flex-1 text-center md:text-left md:pr-2">
                <motion.p
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.7 }} viewport={{ once: true }}
                  className="text-black/22 text-[10px] tracking-[0.45em] uppercase mb-5"
                >
                  {processIntro.eyebrow}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.08 }} viewport={{ once: true }}
                >
                  <h2
                    className="text-3xl md:text-[2.15rem] lg:text-4xl font-serif text-black/70 leading-snug"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                    dangerouslySetInnerHTML={{ __html: processIntro.titleHtml }}
                  />
                  <p
                    className="text-black/32 mt-4 text-sm leading-relaxed tracking-wide md:max-w-xl"
                    dangerouslySetInnerHTML={{ __html: processIntro.subHtml }}
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.85, delay: 0.12 }} viewport={{ once: true }}
                className="flex shrink-0 justify-center md:justify-end md:pl-2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/rabbit.png"
                  alt="White Rabbit"
                  draggable={false}
                  style={{
                    width: "clamp(180px, 36vw, 300px)",
                    height: "auto",
                    filter: "grayscale(100%) contrast(1.5)",
                    mixBlendMode: "multiply",
                    userSelect: "none",
                  }}
                />
              </motion.div>
            </div>

            {/* Dotted trail — rabbit’s path toward EAT ME / DRINK ME */}
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

          <AliceScaleBand copy={aliceScale} />

        </div>
      </section>

      {/* ══════════════════════════════════════════
          CHESHIRE QUOTE — CTA
      ══════════════════════════════════════════ */}
      <section className="relative py-40 px-6 text-center overflow-hidden"
        style={{ borderTop: "1px solid rgba(0,0,0,0.07)", background: "#ffffff" }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }} viewport={{ once: true }}
          className="max-w-3xl mx-auto">
          <div
            className="mb-10 flex flex-col items-center justify-center gap-8 sm:mb-12 sm:flex-row sm:items-end sm:gap-10 md:gap-14"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/caterpillar-tenniel.png"
              alt="The Caterpillar on a mushroom (Tenniel)"
              draggable={false}
              className="h-auto max-h-[200px] w-auto max-w-[min(72vw,220px)] object-contain sm:max-h-[220px]"
              style={{ filter: "grayscale(100%) contrast(1.35) opacity(0.82)", mixBlendMode: "multiply", userSelect: "none" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/chat.png"
              alt="Cheshire Cat"
              draggable={false}
              className="h-auto max-h-[200px] w-auto max-w-[min(72vw,200px)] object-contain sm:max-h-[220px]"
              style={{ filter: "grayscale(100%) contrast(1.4) opacity(0.82)", mixBlendMode: "multiply", userSelect: "none" }}
            />
          </div>
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
          <div className="flex flex-wrap items-center justify-end gap-x-6 gap-y-1">
            <NavReveal
              label={nav.linkedin}
              kind="external"
              href={links.linkedin}
              panelTitle="LinkedIn"
              description={navReveal.linkedinDescription}
              size="xs"
              panel="above"
            />
            <NavReveal
              label={nav.github}
              kind="external"
              href={links.github}
              panelTitle="GitHub"
              description={navReveal.githubDescription}
              size="xs"
              panel="above"
            />
            <NavReveal
              label={nav.email}
              kind="mailto"
              href={links.contactMailto}
              panelTitle="Email"
              size="xs"
              panel="above"
              trigger="outline"
            />
          </div>
          <p className="text-black/15 text-xs">{footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
}