"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

function mailtoAddress(mailto: string) {
  return mailto.replace(/^mailto:/i, "").trim();
}

export type NavRevealKind = "mailto" | "external" | "anchor";

export type NavRevealProps = {
  label: string;
  kind: NavRevealKind;
  href: string;
  /** Panel header (e.g. Email, LinkedIn, Board) */
  panelTitle: string;
  size?: "sm" | "xs";
  panel: "below" | "above";
  /** Nav GitHub-style bordered button vs plain text */
  trigger?: "text" | "outline";
  /** Extra line for anchor / external (optional) */
  description?: string;
};

export function NavReveal({
  label,
  kind,
  href,
  panelTitle,
  size = "sm",
  panel,
  trigger = "text",
  description,
}: NavRevealProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const row =
    "inline-flex min-h-[44px] min-w-[44px] items-center justify-center font-[inherit] leading-none sm:min-w-0";

  const textCls =
    size === "xs"
      ? `${row} border-0 bg-transparent px-2 text-xs tracking-wider text-black/58 transition-colors hover:text-black/82 sm:px-1`
      : `${row} border-0 bg-transparent px-2 text-sm tracking-wide text-black/62 transition-colors hover:text-black/90 sm:px-1`;

  const outlineCls =
    size === "xs"
      ? `${row} border bg-transparent px-3 text-xs tracking-wider text-black/60 transition-all hover:bg-black hover:text-white`
      : `${row} border bg-transparent px-4 text-sm tracking-wider text-black/70 transition-all hover:bg-black hover:text-white sm:px-5`;

  const btnCls =
    trigger === "outline"
      ? `${outlineCls} cursor-pointer`
      : `${textCls} cursor-pointer`;

  const panelPos =
    panel === "below"
      ? "left-1/2 top-full mt-2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0"
      : "bottom-full left-1/2 mb-2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0";

  return (
    <div className="relative inline-block" ref={wrapRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={btnCls}
        style={trigger === "outline" ? { borderColor: "rgba(0,0,0,0.2)" } : undefined}
        aria-expanded={open}
        aria-controls={panelId}
      >
        {label}
      </button>
      {open ? (
        <div
          id={panelId}
          role="region"
          className={`absolute z-[60] min-w-[260px] max-w-[min(100vw-2rem,320px)] rounded-md border bg-white px-3 py-2.5 text-left shadow-md ${panelPos}`}
          style={{ borderColor: "rgba(0,0,0,0.12)" }}
        >
          <p className="mb-1 text-[10px] uppercase tracking-widest text-black/55">{panelTitle}</p>

          {kind === "mailto" ? (
            <>
              {description ? (
                <p className="mb-2 text-xs leading-relaxed text-black/58">{description}</p>
              ) : null}
              <a
                href={href}
                className="block break-all text-sm text-black/75 hover:text-black underline-offset-2 hover:underline"
              >
                {mailtoAddress(href)}
              </a>
              <p className="mt-2 text-[10px] text-black/52">Tap the address to open your mail app.</p>
            </>
          ) : null}

          {kind === "external" ? (
            <>
              {description ? (
                <p className="mb-2 text-xs leading-relaxed text-black/58">{description}</p>
              ) : null}
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block break-all text-sm text-black/75 hover:text-black underline-offset-2 hover:underline"
              >
                {href}
              </a>
              <p className="mt-2 text-[10px] text-black/52">Tap the link to open in a new tab.</p>
            </>
          ) : null}

          {kind === "anchor" ? (
            <>
              {description ? (
                <p className="mb-2 text-xs leading-relaxed text-black/58">{description}</p>
              ) : null}
              <Link
                href={href}
                className="inline-flex items-center gap-1 text-sm text-black/75 hover:text-black underline-offset-2 hover:underline"
                onClick={() => setOpen(false)}
              >
                Go to section <span aria-hidden>→</span>
              </Link>
              <p className="mt-2 text-[10px] text-black/52">Scrolls to a section on this page.</p>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
