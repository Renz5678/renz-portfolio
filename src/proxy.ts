import { NextRequest, NextResponse } from "next/server";

// ─────────────────────────────────────────────────────────────────────────────
// SEO crawler allowlist
// These bots must NEVER be blocked — they drive organic search ranking.
// Check is UA prefix/substring only; real crawlers also pass reverse-DNS
// verification at the CDN layer, but that isn't available in proxy.
// ─────────────────────────────────────────────────────────────────────────────
const SEO_CRAWLERS = [
  "Googlebot",
  "Googlebot-Image",
  "AdsBot-Google",
  "Bingbot",
  "DuckDuckBot",
  "Slurp",           // Yahoo
  "Applebot",
  "facebookexternalhit",
  "LinkedInBot",
  "Twitterbot",
  "Discordbot",
];

// ─────────────────────────────────────────────────────────────────────────────
// Obvious scripted-client User-Agent substrings to block.
// These are library default UAs — no real browser sends these.
// ─────────────────────────────────────────────────────────────────────────────
const SCRIPTED_UA_PATTERNS = [
  "curl/",
  "python-requests",
  "python-urllib",
  "go-http-client",
  "scrapy",
  "wget",
  "libwww-perl",
  "java/",
  "okhttp",
  "axios/",        // often used by scrapers; real browser apps set a proper UA
  "node-fetch",
  "node-http",
];

function isSEOCrawler(ua: string): boolean {
  return SEO_CRAWLERS.some((bot) =>
    ua.toLowerCase().includes(bot.toLowerCase())
  );
}

function isScriptedClient(ua: string): boolean {
  const lower = ua.toLowerCase();
  return SCRIPTED_UA_PATTERNS.some((pattern) => lower.includes(pattern));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ua = request.headers.get("user-agent") ?? "";

  // ── 1. SEO crawlers — always allow through immediately ────────────────────
  if (isSEOCrawler(ua)) {
    return NextResponse.next();
  }

  // ── 2. Block obvious scripted/headless clients on page + API routes ───────
  //    Empty UA is also a red flag (browsers always send one).
  if (!ua || isScriptedClient(ua)) {
    return new NextResponse("Forbidden", {
      status: 403,
      headers: { "X-Block-Reason": "scripted-client" },
    });
  }

  // ── 3. CORS enforcement on all /api/* routes ──────────────────────────────
  if (pathname.startsWith("/api/")) {
    const origin = request.headers.get("origin");
    const host   = request.headers.get("host");
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    // Warn if site URL env var is not set in production — prevents localhost
    // from silently becoming an allowed CORS origin on a misconfigured deploy.
    if (!siteUrl && process.env.NODE_ENV === "production") {
      console.warn("[proxy] NEXT_PUBLIC_SITE_URL is not set in production — CORS check is operating without it");
    }

    const allowedOrigins = [
      `https://${host}`,
      // Only include localhost-derived origins in development
      process.env.NODE_ENV !== "production" ? `http://${host}` : null,
      // Only include siteUrl if it is not a localhost address in production
      siteUrl && (process.env.NODE_ENV !== "production" || !siteUrl.includes("localhost"))
        ? siteUrl
        : null,
    ].filter((o): o is string => Boolean(o));

    if (origin && !allowedOrigins.includes(origin)) {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     *   - _next/static  (Next.js static assets)
     *   - _next/image   (image optimisation)
     *   - favicon.ico   (browser built-in request)
     *   - Files with an extension in public/ (images, fonts, PDFs, etc.)
     *
     * This means the proxy runs on every page route AND any future /api routes,
     * but never on static files — so asset loading is never interrupted.
     */
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|pdf|woff2?|ttf|otf|eot|mp4|webm)$).*)",
  ],
};
