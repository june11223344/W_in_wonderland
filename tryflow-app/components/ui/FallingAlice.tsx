"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const ALICE_SRC = "/alice.png";
const ROLL_DURATION_S = 0.88;
const ROLL_DURATION_MS = Math.round(ROLL_DURATION_S * 1000);
const LERP = 0.12;
const COLLISION_DIST = 68;
const ITEM_SIZE = 72;

/** Do not spawn more than this many of each type at once */
const MAX_CAKES_ON_SCREEN = 4;
const MAX_DRINKS_ON_SCREEN = 3;

/** Base on-screen width (px); smaller than before — scale multipliers apply on top */
const ALICE_BASE_WIDTH = 76;
const ALICE_ANCHOR_LEFT = ALICE_BASE_WIDTH / 2;
const ALICE_ANCHOR_TOP = Math.round(ALICE_BASE_WIDTH * 0.91);

/** After drink — slightly less extreme than 0.5 so it matches smaller default */
const SCALE_DRINK = 0.56;
/** 1st / 2nd cake hit — each step bigger; further cakes stay at 2nd tier until reset */
const SCALE_CAKE_STEPS = [1.38, 1.72] as const;

interface FloatingItem {
  id: number;
  type: "cake" | "drink";
  x: number;
  y: number;
  vx: number;
  vy: number;
  frameCount: number;
}

export function FallingAlice() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [spinNonce, setSpinNonce] = useState(0);
  const [rolling, setRolling] = useState(false);
  const [items, setItems] = useState<FloatingItem[]>([]);
  const [aliceScale, setAliceScale] = useState(1);

  const rafRef = useRef<number | undefined>(undefined);
  const targetRef = useRef({ x: -200, y: -200 });
  const displayRef = useRef({ x: -200, y: -200 });
  const itemsRef = useRef<FloatingItem[]>([]);
  const itemIdRef = useRef(0);
  const scaleTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  /** 0 = no cake streak; 1 = ate one cake; 2 = ate two (max step before cap) */
  const cakeTierRef = useRef(0);

  // Track mouse
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Main loop: smooth follow + item movement + collision
  useEffect(() => {
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;

      const t = targetRef.current;
      const d = displayRef.current;
      const nx = d.x + (t.x - d.x) * LERP;
      const ny = d.y + (t.y - d.y) * LERP;
      displayRef.current = { x: nx, y: ny };
      setPos({ x: nx, y: ny });

      // Move items + collision
      if (itemsRef.current.length > 0) {
        let collided = false;
        let collisionType: "cake" | "drink" = "cake";
        const W = window.innerWidth;
        const H = window.innerHeight;
        const survived: FloatingItem[] = [];

        for (const item of itemsRef.current) {
          let { vx, vy, frameCount } = item;

          // Random direction nudge every ~120 frames
          frameCount++;
          if (frameCount % 120 === 0) {
            vx += (Math.random() - 0.5) * 1.2;
            vy += (Math.random() - 0.5) * 1.2;
            const spd = Math.sqrt(vx * vx + vy * vy);
            if (spd > 1.8) { vx = (vx / spd) * 1.8; vy = (vy / spd) * 1.8; }
          }

          let ix = item.x + vx;
          let iy = item.y + vy;

          // Repel from center zone
          const cx = W / 2, cy = H / 2;
          const dcx = ix - cx, dcy = iy - cy;
          const distC = Math.sqrt(dcx * dcx + dcy * dcy);
          const minDist = Math.min(W, H) * 0.28;
          if (distC < minDist && distC > 0) {
            const push = (minDist - distC) / minDist * 0.35;
            vx += (dcx / distC) * push;
            vy += (dcy / distC) * push;
          }

          // Bounce off edges
          if (ix < 0) { ix = 0; vx = Math.abs(vx); }
          if (ix > W) { ix = W; vx = -Math.abs(vx); }
          if (iy < 0) { iy = 0; vy = Math.abs(vy); }
          if (iy > H) { iy = H; vy = -Math.abs(vy); }

          const dx = nx - ix;
          const dy = ny - iy;
          if (Math.sqrt(dx * dx + dy * dy) < COLLISION_DIST) {
            collided = true;
            collisionType = item.type;
            continue;
          }
          survived.push({ ...item, x: ix, y: iy, vx, vy, frameCount });
        }

        itemsRef.current = survived;
        setItems([...survived]);

        if (collided) {
          let newScale = 1;
          if (collisionType === "cake") {
            const nextTier = Math.min(cakeTierRef.current + 1, 2);
            cakeTierRef.current = nextTier;
            const step = SCALE_CAKE_STEPS[Math.min(nextTier, SCALE_CAKE_STEPS.length) - 1];
            newScale = step;
          } else {
            cakeTierRef.current = 0;
            newScale = SCALE_DRINK;
          }
          setAliceScale(newScale);
          if (scaleTimeoutRef.current) clearTimeout(scaleTimeoutRef.current);
          scaleTimeoutRef.current = setTimeout(() => {
            setAliceScale(1);
            cakeTierRef.current = 0;
          }, 3000);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Spawn items
  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const spawn = () => {
      const delay = 4000 + Math.random() * 5000;
      timeoutId = setTimeout(() => {
        if (cancelled) return;
        const cakeCount = itemsRef.current.filter((i) => i.type === "cake").length;
        const drinkCount = itemsRef.current.filter((i) => i.type === "drink").length;
        const canCake = cakeCount < MAX_CAKES_ON_SCREEN;
        const canDrink = drinkCount < MAX_DRINKS_ON_SCREEN;

        if (!canCake && !canDrink) {
          spawn();
          return;
        }

        let type: "cake" | "drink";
        if (canCake && canDrink) {
          type = Math.random() < 0.5 ? "cake" : "drink";
        } else if (canCake) {
          type = "cake";
        } else {
          type = "drink";
        }

        const W = window.innerWidth;
        const H = window.innerHeight;
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.8 + Math.random() * 0.8;
        // Spawn only in peripheral zone (avoid center 40% x 40%)
        let sx: number, sy: number;
        const zone = Math.floor(Math.random() * 4); // 0=left, 1=right, 2=top, 3=bottom
        if (zone === 0) { sx = W * Math.random() * 0.22; sy = Math.random() * H; }
        else if (zone === 1) { sx = W * (0.78 + Math.random() * 0.22); sy = Math.random() * H; }
        else if (zone === 2) { sx = Math.random() * W; sy = H * Math.random() * 0.2; }
        else { sx = Math.random() * W; sy = H * (0.8 + Math.random() * 0.2); }
        const newItem: FloatingItem = {
          id: itemIdRef.current++,
          type,
          x: sx,
          y: sy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          frameCount: 0,
        };
        itemsRef.current = [...itemsRef.current, newItem];
        setItems([...itemsRef.current]);
        spawn();
      }, delay);
    };

    spawn();
    return () => { cancelled = true; clearTimeout(timeoutId); };
  }, []);

  // Occasional roll
  useEffect(() => {
    let cancelled = false;
    let waitId: ReturnType<typeof setTimeout>;
    let rollEndId: ReturnType<typeof setTimeout>;

    const schedule = () => {
      const delay = 4200 + Math.random() * 5800;
      waitId = setTimeout(() => {
        if (cancelled) return;
        setRolling(true);
        rollEndId = setTimeout(() => {
          if (cancelled) return;
          setRolling(false);
          setSpinNonce((n) => n + 1);
          schedule();
        }, ROLL_DURATION_MS);
      }, delay);
    };

    schedule();
    return () => {
      cancelled = true;
      clearTimeout(waitId);
      clearTimeout(rollEndId);
    };
  }, []);

  return (
    <>
      {/* Floating items — behind content (z-10) */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {items.map(item => (
          <div
            key={item.id}
            style={{
              position: "absolute",
              left: item.x - ITEM_SIZE / 2,
              top: item.y - ITEM_SIZE / 2,
              width: ITEM_SIZE,
              height: ITEM_SIZE,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.type === "cake" ? "/eattme.png" : "/drink-removebg-preview.png"}
              alt={item.type}
              draggable={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                filter: "grayscale(100%) contrast(1.3)",
                mixBlendMode: "multiply",
                userSelect: "none",
              }}
            />
          </div>
        ))}
      </div>

      {/* Alice cursor — always on top (z-50) */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <div
          style={{
            position: "absolute",
            left: pos.x - ALICE_ANCHOR_LEFT,
            top: pos.y - ALICE_ANCHOR_TOP,
            width: ALICE_BASE_WIDTH,
            willChange: "transform",
            transform: `scale(${aliceScale})`,
            transition: "transform 0.5s cubic-bezier(0.34, 1.45, 0.64, 1)",
          }}
        >
          <motion.div
            key={spinNonce}
            initial={false}
            animate={
              rolling
                ? { rotate: [0, 180, 360], y: [0, -10, 6, 0], scaleY: [1, 0.9, 1] }
                : { rotate: [-4, 4, -4], y: [0, 4, 0] }
            }
            transition={
              rolling
                ? { duration: ROLL_DURATION_S, ease: [0.33, 0, 0.2, 1] as const }
                : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
            }
            style={{ transformOrigin: "50% 45%" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ALICE_SRC}
              alt=""
              draggable={false}
              fetchPriority="high"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                filter: "grayscale(100%) contrast(1.4)",
                mixBlendMode: "multiply",
                userSelect: "none",
              }}
            />
          </motion.div>
        </div>
      </div>
    </>
  );
}