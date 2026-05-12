"use client";

import {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
  useMemo,
  type CSSProperties,
  type WheelEvent,
} from "react";
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

const SPOTLIGHT = site.spotlight;

const PLAYING_CARD_RANKS = ["A", "Q", "A", "Q", "A", "Q"] as const;

/** Garden suit glyphs (♣ kept for layout helpers even when no spotlight card uses clubs). */
type GardenSuit = "spade" | "heart" | "diamond" | "club";

const GARDEN_SUIT_GLYPH: Record<GardenSuit, string> = {
  spade: "♠",
  heart: "♥",
  diamond: "♦",
  club: "♣",
};

function playingCardPipForSelectedSuit(selectedSuit: GardenSuit, cardIndex: number) {
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
        ? "bottom-3 right-2.5 rotate-180 sm:bottom-4 sm:right-3"
        : "top-2 left-2 sm:top-2.5 sm:left-2.5";
  const rankCls = size === "lg" ? "text-[15px] sm:text-[16px]" : "text-[12px] sm:text-[13px]";
  const suitCls = size === "lg" ? "text-[22px] sm:text-[24px]" : "text-[17px] sm:text-[19px]";
  return (
    <div
      className={`pointer-events-none absolute z-[35] flex flex-col items-center gap-0 select-none ${pos}`}
      style={{ fontFamily: "'Playfair Display', serif" }}
      aria-hidden
    >
      <span className={`font-bold tracking-tight ${rankCls} ${redSuit ? "text-red-900" : "text-neutral-900"}`}>{rank}</span>
      <span className={`leading-none ${suitCls} ${redSuit ? "text-red-900/90" : "text-neutral-800"}`}>{suit}</span>
    </div>
  );
}

function spotlightHasProjectUrl(idea: SpotlightItem): idea is SpotlightItem & { projectUrl: string } {
  return "projectUrl" in idea && typeof (idea as { projectUrl?: unknown }).projectUrl === "string";
}

/** Logos / seals: show full asset inside the frame instead of `object-cover` crop. */
function spotlightImageFitContain(idea: SpotlightItem): boolean {
  return "imageFit" in idea && idea.imageFit === "contain";
}

function spotlightProjectHost(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

function SpotlightProjectLink({ href, className = "" }: { href: string; className?: string }) {
  const host = spotlightProjectHost(href);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "relative z-20 inline-flex shrink-0 items-center gap-1 font-semibold tracking-wide text-neutral-800 underline decoration-neutral-400 underline-offset-[3px] transition-colors hover:text-black hover:decoration-neutral-700",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {host}
      <span className="translate-y-[0.5px] text-[9px] font-normal text-neutral-700" aria-hidden>
        ↗
      </span>
    </a>
  );
}

function IdeaCard({
  idea,
  index,
  selectedSuit,
}: {
  idea: SpotlightItem;
  index: number;
  selectedSuit: GardenSuit;
}) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [stage, setStage] = useState<RoseStage>("bud");
  const [bloomed, setBloomed] = useState(false);
  const imageFitContain = spotlightImageFitContain(idea);
  const modalScrollBodyRef = useRef<HTMLDivElement | null>(null);
  const modalFlipRootRef = useRef<HTMLDivElement | null>(null);

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

  /** Body overflow:hidden blocks wheel → document scroll; route wheel into the modal column (non-passive). */
  useEffect(() => {
    if (!expanded) return;
    const root = modalFlipRootRef.current;
    const scrollEl = modalScrollBodyRef.current;
    if (!root || !scrollEl) return;

    const onWheel = (e: globalThis.WheelEvent) => {
      if (!root.contains(e.target as Node)) return;
      const delta = e.deltaY + e.deltaX;
      if (delta === 0) return;
      scrollEl.scrollTop += delta;
      e.preventDefault();
    };

    root.addEventListener("wheel", onWheel as EventListener, { passive: false });
    return () => root.removeEventListener("wheel", onWheel as EventListener);
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
        src={idea.imageSrc}
        alt=""
        aria-hidden
        draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full select-none rounded-2xl object-cover"
        style={{ objectPosition: "center center", opacity: 0.08, mixBlendMode: "multiply", filter: "grayscale(100%) contrast(1.2)" }}
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
          <div className="pointer-events-none absolute inset-0 z-[1] bg-[#f3f2ee]/55" aria-hidden />
              <div className="pointer-events-none absolute inset-0 z-[1]" style={{ background: scrim }} />

          <div className="relative z-[2] flex min-h-0 flex-1 flex-col items-center text-center">
            <h3
              className="mb-2 line-clamp-3 max-w-[98%] min-h-0 shrink font-serif text-sm leading-snug text-neutral-900 sm:text-[15px]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              &ldquo;{idea.title}&rdquo;
            </h3>
            <p className="mb-2 shrink-0 text-[11px] font-medium uppercase tracking-wider text-neutral-700">{idea.category}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div
              className={[
                "mb-3 w-full max-w-[95%] shrink-0 rounded-md",
                imageFitContain
                  ? "relative aspect-[5/3] overflow-hidden bg-[#ebe8e1] ring-1 ring-black/10"
                  : "relative aspect-[5/3] overflow-hidden bg-[#ebe8e1] ring-1 ring-black/18",
              ].join(" ")}
            >
              {spotlightHasProjectUrl(idea) ? (
                <a
                  href={idea.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-20 block h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-1"
                  aria-label="Open project site in a new tab"
                  onClick={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <img
                    src={idea.imageSrc}
                    alt={idea.imageAlt}
                    draggable={false}
                    className={
                      imageFitContain
                        ? "absolute inset-0 m-auto h-full w-full object-contain p-2 sm:p-2.5"
                        : "aspect-[5/3] w-full object-cover"
                    }
                    style={{ objectPosition: imageFitContain ? "center center" : "center 40%" }}
                  />
                </a>
              ) : (
                <img
                  src={idea.imageSrc}
                  alt={idea.imageAlt}
                  draggable={false}
                  className={
                    imageFitContain
                      ? "absolute inset-0 m-auto h-full w-full object-contain p-2 sm:p-2.5"
                      : "aspect-[5/3] w-full object-cover"
                  }
                  style={{ objectPosition: imageFitContain ? "center center" : "center 40%" }}
                />
              )}
                  </div>
            {spotlightHasProjectUrl(idea) ? (
              <div className="relative z-20 mb-2 flex w-full max-w-[95%] shrink-0 justify-center px-1">
                <SpotlightProjectLink href={idea.projectUrl} className="text-[10px]" />
              </div>
                  ) : null}
            <div className="mb-3 min-h-0 w-full max-w-[95%] flex-1 space-y-2 overflow-hidden border-t border-black/18 pt-2.5 text-left">
              <div>
                <p className="text-[8px] uppercase tracking-[0.22em] text-black/72">{site.cardUi.roleLabel}</p>
                <p className="mt-0.5 line-clamp-2 font-serif text-[10px] leading-snug text-neutral-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {idea.roleLine}
                </p>
              </div>
              <div className="border-t border-black/10 pt-2">
                <p className="text-[8px] uppercase tracking-[0.22em] text-black/72">{site.cardUi.impactLabel}</p>
                <p className="mt-0.5 line-clamp-2 font-serif text-[10px] leading-snug text-neutral-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {idea.impactLine}
                </p>
              </div>
                </div>

            <p className="mt-auto shrink-0 pt-1 text-[9px] font-semibold uppercase tracking-wider text-neutral-700">{site.cardUi.hintClosed}</p>
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
                      ref={modalFlipRootRef}
                      initial={{ rotateY: reduceMotion ? 180 : 0 }}
                      animate={{ rotateY: 180 }}
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { duration: 0.58, ease: [0.22, 1, 0.36, 1], delay: 0.05 }
                      }
                      className="h-[min(88dvh,560px)] min-h-[320px] w-full"
                      style={{ transformStyle: "preserve-3d", position: "relative" }}
                    >
                      {/* Modal front — minimal flip preview */}
                      <div
                        className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-black/10 bg-[#f7f5f1]"
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
                            <h3 className="mb-2 max-w-[98%] font-serif text-base leading-snug text-neutral-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                              &ldquo;{idea.title}&rdquo;
                            </h3>
                            <p className="mb-4 text-[11px] font-medium uppercase tracking-wider text-neutral-700">{idea.category}</p>
            </div>
          </div>
        </div>

                      {/* Modal back: scrollable column + footer close; wheel on card chrome forwards to body */}
        <div
                        className="absolute inset-0 flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-black/10 bg-[#f7f5f1]"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
                          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                        }}
                      >
                        <PlayingCardCornerPip rank={pip.rank} suit={pip.suit} size="sm" />
                        <PlayingCardCornerPip rank={pip.rank} suit={pip.suit} flip size="sm" />

                        <div
                          ref={modalScrollBodyRef}
                          className="relative z-10 min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain [scrollbar-gutter:stable] px-6 pb-6 pt-14 sm:px-10 sm:pb-8 sm:pt-16"
                        >
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

                            <p className="mx-auto mb-6 max-w-sm border-b border-black/10 pb-3 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-700">
                              {idea.trend}
                              <span className="text-black/60">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
                              {idea.category}
                            </p>

                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            {spotlightHasProjectUrl(idea) ? (
                              <a
                                href={idea.projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={[
                                  "mx-auto mb-6 block max-w-sm overflow-hidden rounded-lg border shadow-[0_2px_12px_rgba(0,0,0,0.06)] outline-none ring-0 transition-[box-shadow,opacity] hover:opacity-[0.97] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2",
                                  imageFitContain ? "border-black/10" : "border-black/12",
                                ].join(" ")}
                                aria-label={`Open project site: ${spotlightProjectHost(idea.projectUrl)}`}
                                onClick={(e) => e.stopPropagation()}
                                onPointerDown={(e) => e.stopPropagation()}
                              >
                                <div
                                  className={
                                    imageFitContain
                                      ? "relative aspect-[5/3] bg-[#ebe8e1]"
                                      : ""
                                  }
                                >
                                  <img
                                    src={idea.imageSrc}
                                    alt={idea.imageAlt}
                                    draggable={false}
                                    className={
                                      imageFitContain
                                        ? "absolute inset-0 m-auto h-full w-full object-contain p-4 sm:p-5"
                                        : "max-h-48 w-full object-cover sm:max-h-52"
                                    }
                                    style={{ objectPosition: imageFitContain ? "center center" : "center 38%" }}
                                  />
                                </div>
                                <div className="flex justify-center border-t border-black/10 bg-[#f3f1ec] px-3 py-2.5 sm:py-3">
                                  <span className="inline-flex items-center gap-1 text-xs font-semibold tracking-wide text-neutral-800 underline decoration-neutral-400 underline-offset-[3px] sm:text-[13px]">
                                    {spotlightProjectHost(idea.projectUrl)}
                                    <span className="translate-y-[0.5px] text-[9px] font-normal text-neutral-700" aria-hidden>
                                      ↗
                                    </span>
                                  </span>
                                </div>
                              </a>
                            ) : (
                              <div
                                className={[
                                  "mx-auto mb-6 max-w-sm overflow-hidden rounded-lg border shadow-[0_2px_12px_rgba(0,0,0,0.06)]",
                                  imageFitContain
                                    ? "relative aspect-[5/3] border-black/10 bg-[#ebe8e1]"
                                    : "border-black/12",
                                ].join(" ")}
                              >
                                <img
                                  src={idea.imageSrc}
                                  alt={idea.imageAlt}
                                  draggable={false}
                                  className={
                                    imageFitContain
                                      ? "absolute inset-0 m-auto h-full w-full object-contain p-4 sm:p-5"
                                      : "max-h-48 w-full object-cover sm:max-h-52"
                                  }
                                  style={{ objectPosition: imageFitContain ? "center center" : "center 38%" }}
                                />
                              </div>
                            )}

                            <div className="mx-auto w-full max-w-sm space-y-6">
                              <div>
                                <p className="text-[9px] uppercase tracking-[0.28em] text-black/72">{site.cardUi.roleLabel}</p>
                                <p
                                  className="mt-2 font-serif text-[15px] leading-snug text-neutral-950 sm:text-base"
                                  style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                  {idea.roleLine}
                                </p>
                              </div>
                              <div className="border-t border-black/10 pt-6">
                                <p className="text-[9px] uppercase tracking-[0.28em] text-black/72">{site.cardUi.impactLabel}</p>
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
                              <div className="relative h-10 w-7 text-neutral-700">
                                <RoseStageIcon stage={stage} className="absolute inset-0" />
        </div>
                              <span
                                className="text-[9px] uppercase tracking-wider text-neutral-700"
                                style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
                              >
                                {site.cardUi.hintBack}
                              </span>
                            </button>

                            <p className="mt-6 text-center text-[9px] uppercase tracking-wider text-black/78">{site.cardUi.hintModalClose}</p>
                        </div>

                        <div className="relative z-20 flex shrink-0 justify-center border-t border-black/10 bg-[#f5f3ef] px-4 py-3 sm:px-6">
                          <button
                            type="button"
                            onClick={() => setExpanded(false)}
                            className="text-[11px] font-medium tracking-wide text-neutral-700 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-900 hover:decoration-neutral-500"
                          >
                            {site.cardUi.closeDetail}
                          </button>
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
        <div
          role="button"
          tabIndex={0}
          onClick={() => setExpanded(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setExpanded(true);
            }
          }}
          className="flex h-full min-h-0 w-full cursor-pointer flex-col rounded-2xl border-0 bg-transparent p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2"
          aria-haspopup="dialog"
          aria-expanded={expanded}
        >
          <div className="relative flex min-h-0 flex-1 flex-col">{stripFace}</div>
        </div>
      </motion.div>
      {modalPortal}
    </>
  );
}

// ── Shared font constant ──────────────────────────────────────────────────
const SERIF = "'Cormorant Garamond', 'Playfair Display', serif";

function resolveMorphStem(morphFrom: string, morphStem: string | undefined): string {
  const trimmed = morphStem?.trim();
  if (trimmed) return trimmed;
  const word = morphFrom.replace(/\?+$/, "");
  return word.slice(0, 3);
}

/** Letters typed after stem so line 2 ends as nameLine (handles shared “W”, etc.). */
function suffixAfterMorphStem(stem: string, nameLine: string): string {
  const n = nameLine.replace(/^\s+/, "");
  if (n.startsWith(stem)) return n.slice(stem.length);
  const last = stem.slice(-1);
  if (last && n.startsWith(last)) return n.slice(1);
  return n;
}

/** Relative times (ms from cycle start) and line-2 text for one hero morph pass. */
function buildHeroMorphTimeline(
  morphFrom: string,
  nameLine: string,
  helloTyping: string,
  morphStem: string | undefined,
): { at: number; text: string }[] {
  const stem = resolveMorphStem(morphFrom, morphStem);
  const suffixChars = suffixAfterMorphStem(stem, nameLine);

  const items: { at: number; text: string }[] = [];
  let t = 520;
  items.push({ at: t, text: morphFrom });
  t += 780;

  let cur = morphFrom;
  while (cur.length > stem.length) {
    t += 68;
    cur = cur.slice(0, -1);
    items.push({ at: t, text: cur });
  }

  let acc = stem;
  for (const ch of suffixChars) {
    t += 78;
    acc += ch;
    items.push({ at: t, text: acc });
  }

  t += 200;
  for (const ch of helloTyping) {
    t += 78;
    acc += ch;
    items.push({ at: t, text: acc });
  }

  return items;
}

/** Line 1 fixed; line 2 loops: I’m Wonderland → … → I’m Wonjun. → Hello! → pause → repeat. */
function HeroWonderlandIntro({
  line1,
  morphFrom,
  morphStem,
  nameLine,
  helloTyping,
}: {
  line1: string;
  morphFrom: string;
  morphStem?: string;
  nameLine: string;
  helloTyping: string;
}) {
  const reduceMotion = useReducedMotion();
  const stemResolved = resolveMorphStem(morphFrom, morphStem);
  const line2Complete = `${stemResolved}${suffixAfterMorphStem(stemResolved, nameLine)}${helloTyping}`;
  const [line2, setLine2] = useState(reduceMotion ? line2Complete : "");

  const h1Style: CSSProperties = {
    fontFamily: SERIF,
    color: "#000000",
    fontWeight: 400,
    fontStyle: "italic",
  };

  const morphTimeoutIds = useRef<number[]>([]);

  useEffect(() => {
    if (reduceMotion) return;

    const HOLD_FULL_MS = 2200;
    const BLANK_MS = 900;

    const events = buildHeroMorphTimeline(morphFrom, nameLine, helloTyping, morphStem);
    const lastAt = events.length > 0 ? events[events.length - 1].at : 0;

    let dead = false;

    const clearCycleTimeouts = () => {
      morphTimeoutIds.current.forEach((id) => window.clearTimeout(id));
      morphTimeoutIds.current = [];
    };

    const run = (fn: () => void, delay: number) => {
      const id = window.setTimeout(() => {
        if (!dead) fn();
      }, delay);
      morphTimeoutIds.current.push(id);
    };

    const cycle = () => {
      if (dead) return;
      clearCycleTimeouts();
      events.forEach(({ at, text }) => {
        run(() => setLine2(text), at);
      });
      run(() => setLine2(""), lastAt + HOLD_FULL_MS);
      run(() => cycle(), lastAt + HOLD_FULL_MS + BLANK_MS);
    };

    cycle();

    return () => {
      dead = true;
      clearCycleTimeouts();
    };
  }, [reduceMotion, morphFrom, morphStem, nameLine, helloTyping]);

  if (reduceMotion) {
    return (
      <div className="mb-10 text-center">
        <motion.p
          className="mx-auto mb-4 max-w-3xl text-[clamp(1.05rem,3.4vw,1.85rem)] font-serif italic leading-snug tracking-tight text-black md:leading-snug"
          style={h1Style}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          {line1}
        </motion.p>
        <motion.h1
          className="mx-auto max-w-[min(96vw,56rem)] px-1 text-[clamp(1.85rem,min(11vw,3rem),3rem)] font-serif italic leading-tight tracking-tight text-black text-balance sm:text-5xl md:text-7xl md:leading-none lg:text-8xl"
          style={h1Style}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.38 }}
          aria-label={line2Complete}
        >
          {line2Complete}
        </motion.h1>
      </div>
    );
  }

  return (
    <div className="relative mb-10 min-h-[8.5rem] sm:min-h-[9rem] md:min-h-[12rem]">
      <motion.p
        className="mx-auto mb-4 max-w-3xl text-[clamp(1.05rem,3.4vw,1.85rem)] font-serif italic leading-snug tracking-tight text-black md:leading-snug"
        style={h1Style}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.2 }}
      >
        {line1}
      </motion.p>
      <h1
        className="mx-auto min-h-[2.85rem] max-w-[min(96vw,56rem)] px-1 text-center text-[clamp(1.85rem,min(11vw,3rem),3rem)] font-serif italic leading-tight tracking-tight text-black text-balance sm:min-h-[3.2rem] sm:text-5xl md:min-h-[4.5rem] md:text-7xl md:leading-none lg:text-8xl"
        style={h1Style}
        aria-live="polite"
        aria-label={line2Complete}
      >
        {line2 || "\u00a0"}
      </h1>
    </div>
  );
}

function AliceScaleBand({ copy }: { copy: (typeof site)["aliceScale"] }) {
  /** Same box on both sides so labels + titles line up across the split — pad matches each column so multiply images never flash white. */
  const imgWrapGrow =
    "flex h-[148px] w-full shrink-0 items-center justify-center rounded-lg bg-stone-50 sm:h-[160px] md:h-auto md:w-[140px] md:shrink-0 md:self-center";
  const imgWrapShrink =
    "flex h-[148px] w-full shrink-0 items-center justify-center rounded-lg bg-slate-50 sm:h-[160px] md:h-auto md:w-[140px] md:shrink-0 md:self-center";
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
        className="mb-2 text-center text-[10px] tracking-[0.14em] text-black/60"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {copy.sectionEyebrow}
      </p>
      <h3
        className="mb-8 text-center font-serif text-[1.35rem] leading-snug text-black/72 md:text-2xl md:leading-snug"
        style={{ fontFamily: SERIF, fontWeight: 300 }}
        dangerouslySetInnerHTML={{ __html: copy.sectionTitleHtml }}
      />

      <div
        className="grid overflow-hidden rounded-2xl border border-black/10 md:grid-cols-2 md:items-stretch"
        style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.85) inset" }}
      >
        <div className="flex min-h-0 flex-col gap-5 bg-stone-50 p-7 sm:p-8 md:h-full md:flex-row md:items-center md:gap-8 md:border-r md:border-black/[0.06]">
          <div className={imgWrapGrow}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={copy.growImageSrc} alt={copy.growImageAlt} draggable={false} style={imgStyle} />
          </div>
          <div className="flex min-w-0 flex-col text-center md:flex-1 md:justify-center md:text-left">
            <p className="mb-1 text-[10px] tracking-[0.12em] text-black/60">{copy.growLabel}</p>
            <h4
              className="mb-2 font-serif text-lg text-black/78 sm:text-xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {copy.growTitle}
            </h4>
            <div
              className="text-sm leading-relaxed text-black/70"
              dangerouslySetInnerHTML={{ __html: copy.growBodyHtml }}
            />
          </div>
        </div>

        <div className="flex min-h-0 flex-col gap-5 border-t border-black/[0.06] bg-slate-50 p-7 sm:p-8 md:h-full md:flex-row md:items-center md:border-t-0 md:gap-8">
          <div className={imgWrapShrink}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={copy.shrinkImageSrc} alt={copy.shrinkImageAlt} draggable={false} style={imgStyle} />
          </div>
          <div className="flex min-w-0 flex-col text-center md:flex-1 md:justify-center md:text-left">
            <p className="mb-1 text-[10px] tracking-[0.12em] text-black/60">{copy.shrinkLabel}</p>
            <h4
              className="mb-2 font-serif text-lg text-black/78 sm:text-xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {copy.shrinkTitle}
            </h4>
            <div
              className="text-sm leading-relaxed text-black/70"
              dangerouslySetInnerHTML={{ __html: copy.shrinkBodyHtml }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

type ShelfCategoryId = (typeof site.shelf.categories)[number]["id"];

type ShelfMediaRow =
  | (typeof site.shelf.films)[number]
  | (typeof site.shelf.music)[number]
  | (typeof site.shelf.books)[number]
  | (typeof site.shelf.dramas)[number];

function ShelfMediaGrid({
  items,
  enLabel,
  koLabel,
  /** Film / drama posters are ~2:3; album art is square — avoid hard-cropping squares into a tall frame. */
  coverLayout = "poster",
}: {
  items: readonly ShelfMediaRow[];
  enLabel: string;
  koLabel: string;
  coverLayout?: "poster" | "album";
}) {
  const albumLayout = coverLayout === "album";
  return (
    <div
      className={[
        "flex flex-nowrap gap-5 pb-2 pt-0.5 [-webkit-overflow-scrolling:touch]",
        "snap-x snap-mandatory overflow-x-auto overflow-y-visible scroll-pl-4 scroll-pr-4",
        "max-sm:-mx-1.5 max-sm:px-1.5",
        "sm:snap-none sm:mx-0 sm:grid sm:grid-cols-2 sm:justify-items-center sm:gap-x-6 sm:gap-y-8 sm:overflow-visible sm:pb-0 sm:pl-0 sm:pr-0 sm:pt-0 lg:grid-cols-3 lg:gap-x-8",
      ].join(" ")}
    >
      {items.map((item, i) => (
        <motion.article
          key={item.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.04 + i * 0.05 }}
          className={[
            "flex shrink-0 flex-col overflow-hidden rounded-2xl border border-black/10 bg-[#faf9f6] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset]",
            /* Mobile: slightly narrower strip cards; sm+: cap width so 2:3 posters don’t tower on wide grids */
            "w-[min(16rem,calc(100vw-2.75rem))] snap-center sm:w-full sm:min-w-0 sm:max-w-[15rem] sm:shrink sm:snap-align-none md:max-w-[15.5rem]",
          ].join(" ")}
        >
          <div
            className={
              albumLayout
                ? "relative mx-auto flex w-full max-w-[min(88vw,240px)] justify-center bg-[#e8e4dc] sm:max-w-[min(100%,260px)]"
                : "relative aspect-[2/3] w-full bg-[#e8e4dc]"
            }
          >
            <div className={albumLayout ? "relative aspect-square w-full" : "absolute inset-0"}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.posterSrc}
                alt={`${item.title} (${item.year}) poster`}
                draggable={false}
                className={
                  albumLayout
                    ? "absolute inset-0 h-full w-full object-contain p-3 sm:p-4"
                    : "absolute inset-0 h-full w-full object-cover"
                }
              />
            </div>
          </div>
          <div className="flex flex-col p-4 sm:p-5">
            <h4 className="font-serif text-lg leading-tight text-black sm:text-xl" style={{ fontFamily: SERIF }}>
              {item.title}
            </h4>
            <p className="mt-0.5 text-[11px] uppercase tracking-wider text-black/72">
              {item.year} · {item.director}
            </p>
            <div className="mt-3 border-t border-black/[0.08] pt-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/60">{enLabel}</p>
              <p className="mt-1 text-sm leading-relaxed text-black/74" lang="en">
                {item.lineEn}
              </p>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/60">{koLabel}</p>
              <p className="mt-1 text-sm leading-relaxed text-black/82" lang="ko">
                {item.lineKo}
              </p>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

function CaterpillarShelfSection({ copy }: { copy: (typeof site)["shelf"] }) {
  const [activeCategory, setActiveCategory] = useState<ShelfCategoryId | null>(null);
  const reduceMotion = useReducedMotion();

  const activeMeta = activeCategory ? copy.categories.find((c) => c.id === activeCategory) : undefined;

  return (
    <section
      id="shelf"
      className="relative scroll-mt-24 border-t border-[#768E78]/18 bg-[#f6f4ee] px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10 text-center md:mb-14"
        >
          <p
            className="mb-2 text-[10px] tracking-[0.14em] text-black/72"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {copy.sectionEyebrow}
          </p>
          <h2
            className="mb-3 font-serif text-2xl text-black/75 md:text-3xl"
            style={{ fontFamily: SERIF, fontWeight: 400 }}
          >
            {copy.sectionTitle}
          </h2>
          <p
            className="mx-auto max-w-2xl text-sm leading-relaxed text-black/70"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {copy.sectionSub}
          </p>
        </motion.div>

        <div className="flex flex-col">
        <motion.div
            initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col items-center gap-8 lg:flex-row lg:items-end lg:justify-center lg:gap-8 xl:gap-10"
          >
              <div className="flex shrink-0 flex-col items-center gap-4 lg:items-end">
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55 }}
                  className="flex justify-center rounded-lg bg-[#f6f4ee]"
                >
                  {/* Match section bg so decode / letterboxing never flashes white before multiply blends. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={copy.caterpillarSrc}
                    alt={copy.caterpillarAlt}
                    draggable={false}
                    className="h-auto max-h-[min(52vw,300px)] w-auto max-w-[min(88vw,340px)] object-contain sm:max-h-[320px] lg:max-h-[min(34vw,360px)] lg:max-w-[min(36vw,320px)]"
                    style={{ filter: "grayscale(100%) contrast(1.35) opacity(0.9)", mixBlendMode: "multiply", userSelect: "none" }}
                  />
                </motion.div>
              </div>

              <div className="flex w-full shrink-0 flex-col items-center gap-3.5 lg:w-auto">
                <p className="text-center text-[11px] font-medium tracking-wide text-black/72">
                  {copy.spineRowCue}
                </p>
                <div
                  className={[
                    "flex w-full flex-nowrap items-stretch justify-start gap-x-1.5 overflow-x-auto overflow-y-visible pb-1 [-webkit-overflow-scrolling:touch]",
                    "max-sm:snap-x max-sm:snap-mandatory max-sm:scroll-pl-2 max-sm:scroll-pr-3 max-sm:px-1 max-sm:pl-2 max-sm:pr-3",
                    "sm:mx-0 sm:justify-center sm:gap-x-0.5 sm:overflow-visible sm:px-0 sm:pb-0 sm:pl-0 sm:pr-0 sm:snap-none md:gap-x-0.5",
                  ].join(" ")}
                >
                  {copy.categories.map((cat) => (
                    <div key={cat.id} className="flex max-sm:snap-center shrink-0 touch-manipulation justify-center">
                    <button
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      aria-pressed={activeCategory === cat.id}
                      className={[
                        "group relative flex h-[210px] min-h-[210px] w-[5.45rem] min-w-[5.45rem] max-w-[6rem] shrink-0 flex-col rounded-sm border border-black/20 shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-[transform,box-shadow,ring]",
                        "sm:h-[228px] sm:min-h-[228px] sm:w-[5.55rem] sm:min-w-[5.55rem] md:h-[236px] md:w-[5.65rem] md:min-w-[5.65rem]",
                        "hover:-translate-y-1 hover:shadow-[0_6px_16px_rgba(0,0,0,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-1 active:scale-[0.98]",
                        activeCategory === cat.id
                          ? "z-10 ring-2 ring-black/35 ring-offset-1 ring-offset-[#f6f4ee] shadow-[0_8px_20px_rgba(0,0,0,0.14)]"
                          : "",
                        cat.spineClass,
                      ].join(" ")}
                      aria-label={cat.spineBlurb.trim() ? `Open ${cat.spineFoot}: ${cat.spineBlurb}` : `Open ${cat.spineFoot}`}
                    >
                      {/* top rule */}
                      <div
                        className="mx-2 mt-2.5 h-px shrink-0 bg-gradient-to-r from-transparent via-black/30 to-transparent"
                        aria-hidden
                      />
                      <span
                        className="shrink-0 px-1.5 pb-1 pt-1.5 text-center text-[8px] font-bold leading-tight tracking-[0.12em] text-black/75"
                        style={{ textShadow: "0 1px 0 rgba(255,255,255,0.45)" }}
                      >
                        {cat.spineFoot}
                      </span>
                      <span
                        className="flex min-h-0 flex-1 items-center justify-center px-1 py-2 text-center font-serif text-sm font-semibold leading-tight tracking-wide text-black/78 sm:text-[0.95rem]"
                        style={{
                          fontFamily: SERIF,
                          textShadow: "0 1px 0 rgba(255,255,255,0.4)",
                        }}
                      >
                        {cat.spineTitle}
                      </span>
                      {cat.spineBlurb.trim() ? (
                        <span
                          className="shrink-0 px-1.5 pb-1 pt-0.5 text-center text-[7px] font-medium leading-snug text-black/76 sm:text-[8px]"
                          style={{ textShadow: "0 1px 0 rgba(255,255,255,0.45)" }}
                        >
                          {cat.spineBlurb}
                        </span>
                      ) : null}
                      {/* bottom rule + mirrored label */}
                      <div
                        className="mx-2 h-px shrink-0 bg-gradient-to-r from-transparent via-black/26 to-transparent"
                        aria-hidden
                      />
                      <span
                        className="shrink-0 rotate-180 px-1.5 pb-1.5 pt-1 text-center text-[8px] font-bold leading-tight tracking-[0.12em] text-black/60"
                        style={{ textShadow: "0 1px 0 rgba(255,255,255,0.45)" }}
                        aria-hidden
                      >
                        {cat.spineFoot}
                      </span>
                    </button>
                    </div>
                  ))}
                </div>
                <div
                  className="h-2.5 w-full rounded-sm"
                  style={{
                    background: "linear-gradient(90deg, rgba(0,0,0,0.06), rgba(0,0,0,0.12), rgba(0,0,0,0.06))",
                    boxShadow: "0 1px 0 rgba(255,255,255,0.65) inset",
                  }}
                  aria-hidden
                />
              </div>
          </motion.div>

          <div className="mx-auto w-full max-w-6xl sm:[perspective:1200px]">
            <AnimatePresence initial={false} mode="wait">
              {activeCategory ? (
                <motion.div
                  key={activeCategory}
                  initial={
                    reduceMotion
                      ? { opacity: 0, y: 20 }
                      : { opacity: 0, y: 36, scale: 0.96 }
                  }
                  animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, scale: 1 }}
                  exit={
                    reduceMotion
                      ? { opacity: 0, y: 12 }
                      : { opacity: 0, y: 18, scale: 0.98 }
                  }
                  transition={
                    reduceMotion
                      ? { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }
                      : { type: "spring", stiffness: 280, damping: 26 }
                  }
                  className="relative mt-8 origin-top sm:mt-10"
                >
                  <div
                    className={[
                      "relative rounded-2xl border border-black/[0.14] p-5 shadow-[0_14px_0_rgba(0,0,0,0.04),0_28px_56px_rgba(0,0,0,0.11)] sm:p-7 md:p-8",
                      /* Avoid pure-white top: reads as a floating box against #f6f4ee until the spring settles. */
                      "bg-gradient-to-b from-[#f6f4ee] via-[#faf9f6] to-[#f0ebe3]",
                    ].join(" ")}
                  >
                    <span
                      className="pointer-events-none absolute left-4 top-3 select-none font-serif text-2xl leading-none text-black/[0.2] sm:left-5 sm:top-4 sm:text-3xl"
                      aria-hidden
                    >
                      ♦
                    </span>
                    <span
                      className="pointer-events-none absolute bottom-3 right-4 rotate-180 select-none font-serif text-2xl leading-none text-black/[0.2] sm:bottom-4 sm:right-5 sm:text-3xl"
                      aria-hidden
                    >
                      ♦
                    </span>

                    <div className="relative z-[1] mb-5 text-center sm:mb-4 sm:text-right">
                      <h3 className="font-serif text-xl text-black/85 sm:text-2xl md:text-[1.65rem]" style={{ fontFamily: SERIF }}>
                        {activeMeta?.spineTitle}
                      </h3>
                      {activeMeta && activeMeta.spineFoot !== activeMeta.spineTitle ? (
                        <p className="mt-1 text-[10px] uppercase tracking-[0.35em] text-black/60">{activeMeta.spineFoot}</p>
                      ) : null}
                    </div>

                    {activeCategory === "films" ? (
                      <ShelfMediaGrid items={copy.films} enLabel={copy.stackBodyEnLabel} koLabel={copy.stackBodyKoLabel} />
                    ) : activeCategory === "music" ? (
                      <ShelfMediaGrid
                        items={copy.music}
                        enLabel={copy.stackBodyEnLabel}
                        koLabel={copy.stackBodyKoLabel}
                        coverLayout="album"
                      />
                    ) : activeCategory === "books" ? (
                      <ShelfMediaGrid items={copy.books} enLabel={copy.stackBodyEnLabel} koLabel={copy.stackBodyKoLabel} />
                    ) : activeCategory === "dramas" ? (
                      <ShelfMediaGrid items={copy.dramas} enLabel={copy.stackBodyEnLabel} koLabel={copy.stackBodyKoLabel} />
                    ) : (
                      <div className="mx-auto max-w-md rounded-2xl border border-black/10 bg-[#faf9f6]/90 px-8 py-12 text-center">
                        <p className="font-serif text-lg text-black/78" style={{ fontFamily: SERIF }}>
                          {copy.emptyShelfTitle}
                        </p>
                        <p
                          className="mt-3 text-sm leading-relaxed text-black/70"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                          {copy.emptyShelfBody}
                        </p>
                      </div>
                    )}

                    <div className="relative z-[1] mt-10 flex justify-center border-t border-black/10 pt-6">
                      <button
                        type="button"
                        onClick={() => setActiveCategory(null)}
                        className="border-b-2 border-black/20 pb-2 text-center text-base font-medium tracking-[0.14em] text-black/73 transition-colors hover:border-black/45 hover:text-black/80 sm:text-lg md:text-xl md:pb-2.5 md:tracking-[0.18em]"
                      >
                        {copy.backToShelf}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeaPartyInviteSection({
  invite,
  links,
}: {
  invite: (typeof site)["shelf"]["teaInvite"];
  links: (typeof site)["links"];
}) {
  const emailPlain = links.contactMailto.replace(/^mailto:/i, "").trim();
  let linkedinLine: string = links.linkedin;
  try {
    const u = new URL(links.linkedin);
    linkedinLine = `${u.hostname.replace(/^www\./, "")}${u.pathname}`.replace(/\/$/, "");
  } catch {
    /* keep full string */
  }

  return (
    <section
      id="tea-invite"
      className="relative scroll-mt-24 border-t border-[#768E78]/15 bg-[#f5f2ea] px-6 py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
        >
          <p
            className="mb-2 text-[10px] tracking-[0.12em] text-black/72"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {invite.eyebrow}
          </p>
          <h2
            lang="en"
            className="mb-8 font-serif text-xl text-black/78 md:text-2xl"
            style={{ fontFamily: SERIF }}
          >
            {invite.title}
          </h2>
        </motion.div>

        {/* Art + links: same paper color as section from first paint — no lighter “card” panel. */}
        <div className="text-center">
          <div className="mx-auto max-w-[min(100%,640px)]">
            {/*
              Frame uses the exact section fill (#f5f2ea) so nothing reads as a white box.
              multiply knocks out opaque white in the PNGs against that same tone.
            */}
            <div
              className="overflow-hidden rounded-lg bg-[#f5f2ea]"
              style={{ aspectRatio: "16 / 10" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={invite.imageSrc}
                alt={invite.imageAlt}
                draggable={false}
                loading="eager"
                decoding="async"
                className="block h-full w-full select-none object-contain object-center"
                style={{ filter: "grayscale(100%) contrast(1.12)", mixBlendMode: "multiply" }}
              />
            </div>
            <div className="mt-4 flex justify-center sm:mt-5" aria-hidden>
              <div className="inline-flex items-center justify-center rounded-lg bg-[#f5f2ea] px-2 py-1.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={invite.teacupSrc}
                  alt=""
                  width={88}
                  height={72}
                  draggable={false}
                  loading="eager"
                  decoding="async"
                  className="h-12 w-auto max-w-[min(5.5rem,22vw)] select-none opacity-[0.92] sm:h-14"
                  style={{ filter: "grayscale(100%) contrast(1.12)", mixBlendMode: "multiply" }}
                />
              </div>
            </div>
            <div
              className="mt-4 flex flex-col items-center justify-center gap-3 sm:mt-5 sm:flex-row sm:gap-10"
              lang="en"
            >
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title={linkedinLine}
                className="max-w-[min(100%,20rem)] text-center text-[13px] leading-snug text-black/74 underline decoration-black/20 underline-offset-[3px] transition-colors hover:text-black/85 hover:decoration-black/45 sm:max-w-[min(100%,14rem)] sm:text-left sm:text-sm"
                aria-label={`${invite.linkCtaLinkedin} ${linkedinLine}, opens in new tab`}
              >
                {invite.linkCtaLinkedin}
              </a>
              <span className="hidden text-black/60 sm:inline" aria-hidden>
                ·
              </span>
              <a
                href={links.contactMailto}
                title={emailPlain}
                className="max-w-[min(100%,20rem)] text-center text-[13px] leading-snug text-black/74 underline decoration-black/20 underline-offset-[3px] transition-colors hover:text-black/85 hover:decoration-black/45 sm:max-w-[min(100%,14rem)] sm:text-left sm:text-sm"
                aria-label={`${invite.linkCtaEmail} ${emailPlain}`}
              >
                {invite.linkCtaEmail}
              </a>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
        >
          <p className="mx-auto mt-10 max-w-lg text-base leading-relaxed text-black/78" lang="en">
            {invite.bodyLine1}
          </p>
          <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-black/78" lang="en">
            {invite.bodyLine2}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════

export default function HomePage() {
  const [gardenSuit, setGardenSuit] = useState<GardenSuit | null>(null);
  const gardenHintMotion = useReducedMotion();
  const cheshireImageReduced = useReducedMotion();
  const gardenStripRef = useRef<HTMLDivElement>(null);
  const gardenStripInnerRef = useRef<HTMLDivElement>(null);
  const [gardenCardStripIndex, setGardenCardStripIndex] = useState(0);
  /** When all cards fit in the strip width, center the row with flex instead of scroll. */
  const [gardenStripRowCenter, setGardenStripRowCenter] = useState(false);

  const gardenStripCards = useMemo(
    () => (gardenSuit ? SPOTLIGHT.filter((idea) => idea.suit === gardenSuit) : []),
    [gardenSuit],
  );

  const syncGardenStripActiveIndex = useCallback(() => {
    const el = gardenStripRef.current;
    if (!el || gardenStripCards.length === 0) {
      setGardenCardStripIndex(0);
      return;
    }
    const n = gardenStripCards.length;
    if (n <= 1) {
      setGardenCardStripIndex(0);
      return;
    }
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 2) {
      setGardenCardStripIndex(0);
      return;
    }
    const ratio = el.scrollLeft / maxScroll;
    const idx = Math.round(ratio * (n - 1));
    setGardenCardStripIndex(Math.max(0, Math.min(n - 1, idx)));
  }, [gardenStripCards]);

  /**
   * After picking a suit, center the first card in the horizontal strip.
   * `scrollIntoView` is unreliable here (motion layout + nested scrollport), so we set `scrollLeft` from geometry.
   */
  useLayoutEffect(() => {
    if (gardenSuit === null || gardenStripCards.length === 0) {
      setGardenCardStripIndex(0);
      setGardenStripRowCenter(false);
      return;
    }
    setGardenCardStripIndex(0);

    const strip = gardenStripRef.current;
    const inner = gardenStripInnerRef.current;
    if (!strip || !inner) return;

    setGardenStripRowCenter(false);

    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

    const apply = () => {
      const first = inner.children[0] as HTMLElement | undefined;
      if (!first) return;
      const maxScroll = Math.max(0, strip.scrollWidth - strip.clientWidth);
      if (maxScroll <= 2) {
        strip.scrollLeft = 0;
        setGardenStripRowCenter(true);
        return;
      }
      const s = strip.getBoundingClientRect();
      const c = first.getBoundingClientRect();
      const diff = c.left + c.width / 2 - (s.left + s.width / 2);
      strip.scrollLeft = clamp(Math.round(strip.scrollLeft + diff), 0, maxScroll);
    };

    apply();
    const id0 = requestAnimationFrame(apply);
    const id1 = requestAnimationFrame(() => {
      apply();
      syncGardenStripActiveIndex();
    });
    return () => {
      cancelAnimationFrame(id0);
      cancelAnimationFrame(id1);
    };
  }, [gardenSuit, gardenStripCards, syncGardenStripActiveIndex]);

  /** Map vertical wheel to horizontal scroll on the card strip (wheel still scrolls the page at the ends). */
  const onGardenCardStripWheel = useCallback((e: WheelEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.scrollWidth <= el.clientWidth + 2) return;
    const max = el.scrollWidth - el.clientWidth;
    const delta = e.deltaY + e.deltaX;
    if (delta === 0) return;
    const atStart = el.scrollLeft <= 1;
    const atEnd = el.scrollLeft >= max - 1;
    if (delta > 0 && !atEnd) {
      el.scrollLeft = Math.min(max, el.scrollLeft + delta);
      e.preventDefault();
    } else if (delta < 0 && !atStart) {
      el.scrollLeft = Math.max(0, el.scrollLeft + delta);
      e.preventDefault();
    }
  }, []);

  const {
    links,
    brand,
    nav,
    navReveal,
    a11y,
    hero,
    processIntro,
    aliceScale,
    garden,
    shelf,
    cheshire,
    footer,
  } = site;

  return (
    <div className="min-w-0 overflow-x-hidden bg-[#fcfcfa] text-[#1a1a1a]">
      <a
        href="#main"
        className="pointer-events-none fixed left-4 top-0 z-[100] -translate-y-[140%] rounded-md border border-black/12 bg-[#fcfcfa] px-4 py-2.5 text-sm font-medium text-black shadow-md outline-none ring-0 transition-transform duration-200 focus:pointer-events-auto focus:translate-y-[max(0.5rem,env(safe-area-inset-top))] focus:ring-2 focus:ring-black/25"
      >
        {a11y.skipToMain}
      </a>
      {/* ── Navbar ── */}
      <nav
        className="fixed left-0 right-0 top-0 z-50 flex min-h-14 flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-2 sm:h-16 sm:flex-nowrap sm:gap-y-0 sm:px-8 sm:py-0"
        style={{
          borderBottom: "1px solid rgba(0,0,0,0.07)",
          backdropFilter: "blur(16px)",
          background: "rgba(255,255,255,0.92)",
          paddingTop: "max(0.5rem, env(safe-area-inset-top))",
        }}
      >
        <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div
            className="flex shrink-0 items-center justify-center rounded-md"
            style={{ background: "rgba(255,255,255,0.92)" }}
          >
            <img
              src="/rabbit.png"
              alt={brand.rabbitAlt}
              className="-scale-x-100"
              style={{ width: 36, height: "auto", filter: "grayscale(100%) contrast(1.3)", mixBlendMode: "multiply" }}
            />
          </div>
          <span className="font-serif text-black/80 tracking-wide text-lg"
            style={{ fontFamily: SERIF }}>{brand.navTitle}</span>
        </div>
        <div className="flex max-w-[min(100%,calc(100%-5.5rem))] flex-wrap items-center justify-end gap-x-3 gap-y-1 sm:max-w-none sm:gap-x-5 sm:gap-y-2 md:gap-x-6">
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
            label={nav.email}
            kind="mailto"
            href={links.contactMailto}
            panelTitle="Email"
            description={navReveal.emailDescription}
            size="sm"
            panel="below"
          />
        </div>
      </nav>

      <main
        id="main"
        tabIndex={-1}
        lang="en"
        className="outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcfcfa]"
      >
      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative bg-[#fcfcfa] px-6 pb-0 pt-28 text-center sm:pt-32">
        <div style={{ position: "relative", zIndex: 1 }}>
          {hero.eyebrow.trim() ? (
          <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-6 text-xs tracking-[0.2em] text-black/72"
            >
              {hero.eyebrow}
            </motion.p>
          ) : null}

          <HeroWonderlandIntro
            line1={hero.introLine1}
            morphFrom={hero.wonderlandMorph}
            morphStem={hero.morphStem}
            nameLine={hero.nameLine}
            helloTyping={hero.helloTyping}
          />

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }}
          className={`mx-auto max-w-md text-base leading-relaxed text-black ${hero.summaryHtml.trim() ? "mb-6" : "mb-10"}`}
          dangerouslySetInnerHTML={{ __html: hero.subHtml }}
        />

        {hero.summaryHtml.trim() ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 1.05 }}
            className="mx-auto mb-10 max-w-lg rounded-lg border border-black/[0.08] bg-white/60 px-5 py-4 text-left text-sm leading-relaxed text-black/88 shadow-sm sm:text-[0.9375rem] sm:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: hero.summaryHtml }}
          />
        ) : null}

        </div>{/* /relative zIndex wrapper */}

      </section>

      {/* ══════════════════════════════════════════
          QUEEN'S GARDEN — suit picker + skill cards (early for recruiter scan)
      ══════════════════════════════════════════ */}
      <section id="garden" className="relative z-30 scroll-mt-24 bg-[#faf9f6] pb-12">
        <div className="mx-auto max-w-6xl px-6 pb-6 pt-14 sm:pt-16 md:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto mb-12 max-w-xl border-b border-black/[0.07] pb-12 text-center sm:mb-14 sm:pb-14"
          >
            <p
              className="mb-3 text-[11px] tracking-[0.12em] text-black/78"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {garden.sectionGateEyebrow}
            </p>
            <p
              className="font-serif text-xl leading-snug text-black sm:text-2xl"
              style={{ fontFamily: SERIF, fontWeight: 400, fontStyle: "italic" }}
            >
              {garden.sectionGateTitle}
            </p>
            <p
              className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-black/75"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {garden.sectionGateSub}
            </p>
          </motion.div>

          {/* Suit picker + White Rabbit callout */}
          <div className="mx-auto max-w-3xl pb-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              viewport={{ once: true }}
              className="mb-6 flex flex-col items-center gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-center sm:gap-6 md:gap-8"
            >
              <div className="flex shrink-0 justify-center rounded-xl bg-[#faf9f6] px-2 py-1 sm:px-3 sm:py-1.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={garden.cardRabbitSrc}
                  alt={garden.cardRabbitAlt}
                  draggable={false}
                  className="h-[clamp(200px,48vw,280px)] w-auto shrink-0 object-contain sm:h-[clamp(220px,36vw,300px)] md:h-[min(340px,38vw)]"
                  style={{ filter: "grayscale(100%) contrast(1.15)", mixBlendMode: "multiply", opacity: 0.95 }}
                />
              </div>
              <div className="min-w-0 max-w-md sm:text-left">
                <p
                  className="text-base leading-relaxed text-black/74 sm:text-lg"
                  style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
                  dangerouslySetInnerHTML={{ __html: garden.rabbitCalloutHtml }}
                />
                <p
                  className="mt-3 text-[11px] tracking-wide text-black/72 sm:text-xs"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {garden.rabbitSignoff}
                </p>
              </div>
            </motion.div>
            <p
              className="mb-4 text-[11px] font-medium tracking-wide text-black/62"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {garden.suitPickerTitle}
            </p>
            <p className="mb-4 text-xs leading-relaxed text-black/75">{garden.suitPickerHint}</p>
            {gardenSuit === null ? (
              <div className="mb-5 flex flex-col items-center gap-1">
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
                  <span
                    className="font-serif text-xl leading-none tracking-[0.35em] text-black/78 sm:text-2xl sm:tracking-[0.4em]"
                    style={{ fontFamily: SERIF }}
                    aria-hidden
                  >
                    {garden.suits.map((s) => s.glyph).join("")}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/72">
                    {garden.tapSuitsCue}
                  </span>
          </div>
                {!gardenHintMotion ? (
                  <motion.span
                    className="select-none text-lg text-black/56"
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
                    aria-hidden
                  >
                    ↓
                  </motion.span>
                ) : null}
              </div>
            ) : null}
            <div className="grid grid-cols-2 items-stretch gap-2 sm:grid-cols-4 sm:gap-3">
              {garden.suits.map((s, i) => {
                const active = gardenSuit === s.id;
                const red = s.id === "heart" || s.id === "diamond";
                const idlePulse = gardenSuit === null && !gardenHintMotion;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setGardenSuit(s.id)}
                    className={[
                      "flex min-h-[168px] flex-col items-center justify-center gap-2 rounded-2xl border px-3 py-6 text-center transition-all sm:min-h-[188px] sm:gap-2.5 sm:py-8",
                      "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25 focus-visible:ring-offset-2",
                      active ? "border-black/30 bg-white/90 shadow-md ring-1 ring-black/12" : "border-black/10 bg-white/50 hover:border-black/20 hover:bg-white/70",
                      gardenSuit === null && !active ? "ring-2 ring-black/10 ring-offset-2 ring-offset-white" : "",
                    ].join(" ")}
                    aria-pressed={active}
                    aria-label={`${s.label}: ${s.sub}. ${s.desc}`}
                  >
                    <motion.span
                      className="inline-block font-serif text-4xl leading-none sm:text-5xl"
                style={{
                        fontFamily: SERIF,
                        color: red ? "rgba(140, 35, 35, 0.85)" : "rgba(0,0,0,0.55)",
                      }}
                      animate={
                        idlePulse
                          ? { scale: [1, 1.08, 1], y: [0, -3, 0] }
                          : { scale: 1, y: 0 }
                      }
                      transition={
                        idlePulse
                          ? { duration: 2.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.16 }
                          : { duration: 0.22 }
                      }
                      aria-hidden
                    >
                      {s.glyph}
                    </motion.span>
                    <div className="flex max-w-[11.5rem] flex-col items-center gap-1 px-0.5">
                      <span className="text-[10px] font-semibold tracking-wide text-black/78">{s.label}</span>
                      <span className="text-[11px] font-medium leading-snug text-black/76">{s.sub}</span>
                    </div>
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
              style={{ background: "linear-gradient(to right, rgba(250,249,246,0.95) 0%, transparent 100%)" }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 sm:w-20"
              style={{ background: "linear-gradient(to left, rgba(250,249,246,0.95) 0%, transparent 100%)" }}
              aria-hidden
            />
            {gardenStripCards.length > 1 ? (
              <p
                className="mx-auto max-w-6xl px-6 pb-2 pt-1 text-center text-[11px] leading-snug text-black/62 sm:px-10 md:px-14"
                lang="en"
              >
                {garden.cardStripHint}
              </p>
            ) : null}
            <div
              ref={gardenStripRef}
              onScroll={syncGardenStripActiveIndex}
              className="mx-auto flex w-full max-w-6xl justify-start overflow-x-auto overflow-y-visible overscroll-x-contain px-4 py-10 pb-4 pt-2 [-webkit-overflow-scrolling:touch] [scroll-snap-type:x_mandatory] [scroll-padding-inline:1rem] [touch-action:pan-x_pan-y] sm:px-8 md:px-10"
              style={{ overscrollBehaviorX: "contain", overscrollBehaviorY: "auto" }}
              onWheel={onGardenCardStripWheel}
            >
              {gardenStripCards.length === 0 ? (
                <div className="flex min-h-[min(280px,calc(100dvh-16rem))] w-full max-w-md flex-col items-center justify-center px-6 py-16 text-center">
                  <p className="font-serif text-lg text-black/74 sm:text-xl" style={{ fontFamily: SERIF }}>
                    {garden.emptySuitTitle}
                  </p>
                  <p
                    className="mt-3 max-w-sm text-sm leading-relaxed text-black/72"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {garden.emptySuitBody}
                  </p>
                </div>
              ) : (
                <div
                  ref={gardenStripInnerRef}
                  className={[
                    "items-stretch gap-4 sm:gap-5",
                    gardenStripRowCenter
                      ? "flex w-full min-w-full flex-nowrap justify-center px-2"
                      : "inline-flex min-w-max px-1 sm:px-2",
                  ].join(" ")}
                >
                  {gardenStripCards.map((idea, i) => {
                    return (
                      <motion.div
                        key={idea.title}
                        className="flex h-[min(404px,calc(100dvh-12rem))] min-h-0 w-[clamp(220px,52vw,268px)] shrink-0 snap-center flex-col [touch-action:pan-x_pan-y]"
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
              )}
            </div>
            {gardenStripCards.length > 1 ? (
              <div
                className="flex justify-center gap-2 pb-1 pt-2"
                role="navigation"
                aria-label={a11y.gardenCardStripNav}
              >
                {gardenStripCards.map((_, i) => (
                  <button
                    key={`${gardenSuit}-${i}`}
                    type="button"
                    aria-label={`Card ${i + 1} of ${gardenStripCards.length}`}
                    aria-current={i === gardenCardStripIndex ? "step" : undefined}
                    onClick={() => {
                      const inner = gardenStripInnerRef.current;
                      const node = inner?.children[i] as HTMLElement | undefined;
                      node?.scrollIntoView({
                        behavior: gardenHintMotion ? "auto" : "smooth",
                        inline: "center",
                        block: "nearest",
                      });
                    }}
                    className={[
                      "h-2 w-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf9f6]",
                      i === gardenCardStripIndex ? "bg-black/65" : "bg-black/22 hover:bg-black/40",
                    ].join(" ")}
                  />
                ))}
              </div>
            ) : null}
            <div className="flex justify-center pt-4">
              <button
                type="button"
                onClick={() => setGardenSuit(null)}
                className="border-b border-black/20 pb-0.5 text-xs tracking-wider text-black/72 transition-colors hover:border-black/40 hover:text-black/88"
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
      <section
        id="about"
        className="relative scroll-mt-24 overflow-hidden bg-[#f8f6f2] px-6 py-24 md:py-32 lg:py-40"
      >

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
                  className="mb-5 text-[11px] tracking-[0.14em] text-black/74"
                >
                  {processIntro.eyebrow}
            </motion.p>

            <motion.div
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.08 }} viewport={{ once: true }}
                >
                  <h2
                    className="text-3xl md:text-[2.15rem] lg:text-4xl font-serif text-black/78 leading-snug"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                    dangerouslySetInnerHTML={{ __html: processIntro.titleHtml }}
                  />
                  <p
                    className="text-black/75 mt-4 text-sm leading-relaxed tracking-wide md:max-w-xl"
                    dangerouslySetInnerHTML={{ __html: processIntro.subHtml }}
                  />
                </motion.div>
          </div>

          <motion.div
                initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.85, delay: 0.12 }} viewport={{ once: true }}
                className="flex shrink-0 justify-center rounded-2xl bg-[#f8f6f2] px-3 py-2 md:justify-end md:pl-2"
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

      <CaterpillarShelfSection copy={shelf} />

      <TeaPartyInviteSection invite={shelf.teaInvite} links={links} />

      {/* ══════════════════════════════════════════
          CHESHIRE QUOTE — CTA
      ══════════════════════════════════════════ */}
      <section
        lang="en"
        className="relative overflow-hidden bg-[#f3efe6] px-6 py-24 text-center md:py-32 lg:py-40"
        style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
      >
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }} viewport={{ once: true }}
          className="max-w-3xl mx-auto">
          <div
            className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-black/70 sm:mb-12"
            dangerouslySetInnerHTML={{ __html: cheshire.bodyHtml }}
          />
          <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-black/55">
            Cheshire replies
          </p>
          <div className="mb-8 flex justify-center rounded-2xl bg-[#f3efe6] px-4 py-3 sm:mb-10 sm:px-5 sm:py-4">
            <motion.img
              src="/chat.png"
              alt="Cheshire Cat"
              draggable={false}
              className="h-auto max-h-[160px] w-auto max-w-[min(58vw,180px)] object-contain sm:max-h-[180px]"
              style={{ filter: "grayscale(100%) contrast(1.4)", mixBlendMode: "multiply", userSelect: "none" }}
              initial={{ opacity: 0.82 }}
              animate={
                cheshireImageReduced
                  ? { opacity: 0.82 }
                  : { opacity: [0.14, 0.96, 0.14] }
              }
              transition={
                cheshireImageReduced
                  ? { duration: 0 }
                  : { duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 1] }
              }
            />
          </div>
          <blockquote
            className="mx-auto mb-5 max-w-2xl text-2xl font-serif italic leading-snug text-black/82 md:text-[1.875rem] md:leading-[1.25] lg:text-[2.15rem] lg:leading-[1.22]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {cheshire.quote}
          </blockquote>
          <p
            className={`text-sm tracking-wider text-black/72 ${cheshire.codaHtml.trim() ? "mb-10" : "mb-12"}`}
          >
            {cheshire.attribution}
          </p>
          {cheshire.codaHtml.trim() ? (
            <div
              className="mx-auto mb-12 max-w-2xl text-base leading-relaxed text-black/70"
              dangerouslySetInnerHTML={{ __html: cheshire.codaHtml }}
            />
          ) : null}
        </motion.div>
      </section>
      </main>

      {/* ── Footer ── */}
      <footer
        className="bg-[#f2ece2] py-10 px-8"
        style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
      >
        {/* Classical colophon */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px w-16" style={{ background: "rgba(0,0,0,0.14)" }} />
            <div className="h-px w-16" style={{ background: "rgba(0,0,0,0.14)" }} />
          </div>
          <p className="text-black/70 text-xs tracking-widest"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", letterSpacing: "0.18em" }}>
            {footer.colophonLine1}
          </p>
          <div className="flex items-center justify-center gap-2 mt-1.5">
            <span className="text-black/75 text-xs font-serif tracking-widest"
              style={{ fontFamily: "'Playfair Display', serif" }}>{footer.colophonName}</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-black/73 text-sm font-serif"
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
              label={nav.email}
              kind="mailto"
              href={links.contactMailto}
              panelTitle="Email"
              description={navReveal.emailDescription}
              size="xs"
              panel="above"
            />
          </div>
          <p className="text-black/78 text-xs">{footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
}