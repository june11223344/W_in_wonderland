import { NextResponse } from "next/server";

/** Vercel/배포 진단용 — 브라우저에서 `/api/health` 로 열리면 라우팅은 살아 있는 것 */
export function GET() {
  return NextResponse.json({ ok: true, service: "june-intro" });
}
