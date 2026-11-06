import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// The live A.R.T.E.M.I.S demo is served over plain HTTP. A browser on an
// https page would block a direct client-side fetch to it as mixed content,
// so this route does the health check server-side and hands the client a
// same-origin, https JSON response instead.
export async function GET() {
  const target = "http://54.87.62.83:8000/health";

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const start = Date.now();

    const res = await fetch(target, {
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timeout);
    const latencyMs = Date.now() - start;

    if (!res.ok) {
      return NextResponse.json({ online: false, latencyMs: null });
    }

    return NextResponse.json({ online: true, latencyMs });
  } catch {
    return NextResponse.json({ online: false, latencyMs: null });
  }
}
