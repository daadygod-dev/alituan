// Extends the earlier `notes-data.ts` shape with fields needed for real
// indexability: a distinct SEO title/description (can differ from the
// on-page H1/summary — search snippets and page headings often want
// different phrasing), keywords, and a reading-time estimate for
// structured data. `body` becomes an array of section blocks instead of
// one paragraph, so the rendered page has real heading structure
// (H2s) for crawlers and readers to scan — a single <p> blob has weak
// on-page SEO regardless of how good the writing is.
//
// IMPORTANT: `body` content below is a SCAFFOLD, not final copy. Every
// [BRACKETED] placeholder needs your real specifics before publishing —
// see the note above the array. Publishing unverified specific claims
// (years of experience, outcomes, client names) as fact is a real risk
// to your credibility, not just a style issue.

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type Note = {
  slug: string;
  title: string; // on-page H1
  seoTitle: string; // <title> tag + search snippet — can be phrased differently than the H1
  summary: string; // on-page subhead, shown under H1
  seoDescription: string; // <meta name="description"> — should be ~150-160 chars for full display in search results
  keywords: string[];
  date: string; // ISO format
  updatedAt?: string; // ISO format — include once you actually revise a post; omit until then
  readingTimeMinutes: number;
  body: ArticleSection[];
};

export const notes: Note[] = [
  {
    slug: "building-ihuriro-a-rwanda-first-negotiation-marketplace",
    title: "Building Ihuriro, a Rwanda-first negotiation marketplace",
    seoTitle: "Ihuriro: Building a Negotiation Marketplace for Rwanda | Vertex Technology Services",
    summary:
      "Notes on the architecture behind Ihuriro (formerly Murandasi), a negotiation-first marketplace built for the Rwandan market.",
    seoDescription:
      "How Ihuriro's Next.js and Supabase backend handles offer/accept negotiation flows, with real fixes made to the order-sync trigger logic.",
    keywords: ["Rwanda marketplace", "Next.js", "Supabase", "negotiation platform", "East Africa tech"],
    date: "2026-08-15",
    readingTimeMinutes: 5,
    body: [
      {
        heading: "Why a negotiation-first marketplace",
        paragraphs: [
          "Most marketplace templates assume fixed pricing: a buyer sees a price, pays it, done. Ihuriro (previously called Murandasi) is built around a different assumption — that price is a starting point for a conversation, which is how a lot of commerce actually works in the Rwandan market.",
          "[PLACEHOLDER — fill in the actual product reasoning here: who is this for, what markets/categories, why negotiation as the core mechanic rather than a bolt-on feature.]",
        ],
      },
      {
        heading: "The stack and why",
        paragraphs: [
          "The frontend is Next.js 16 with React 19, TypeScript 5.9, and pnpm for package management, tested with Vitest 3. The backend runs on Supabase/Postgres, with Cloudflare R2 handling media storage and a Hono API on Cloudflare Workers generating presigned upload URLs.",
          "The color system leans into a near-black base (#1A1A1A) with a mustard-gold accent (#F4C430) against a white-to-warm-ivory scale — a deliberate move away from the generic blue-and-white SaaS palette most marketplace templates default to.",
        ],
      },
      {
        heading: "A real bug in the offer/accept flow",
        paragraphs: [
          "During a migration audit, an `accept_offer()` RPC function was missing entirely from the database layer — meaning accepted offers had no server-side path to actually finalize into an order. The fix added the missing RPC along with sync triggers between the `orders` and `bookings` tables, so accepting an offer reliably produces a consistent order record rather than a silent gap between what the UI showed and what the database actually stored.",
          "That's the kind of bug that's invisible in a demo — the UI looks fine right up until a real transaction needs to actually commit.",
        ],
      },
    ],
  },
  {
    slug: "shiftwise-switching-frameworks-mid-build",
    title: "ShiftWise: switching frameworks mid-build, and why",
    seoTitle: "Why I Switched ShiftWise from Flutter to React Native Mid-Build",
    summary:
      "A real framework migration on a live project — Flutter/Dart to React Native/Expo — and the tradeoffs that came with it.",
    seoDescription:
      "Lessons from migrating ShiftWise, a shift-worker utility app, from Flutter to React Native/Expo mid-development, including Firestore security and offline persistence decisions.",
    keywords: ["React Native", "Expo", "Flutter to React Native", "Firebase", "mobile app development"],
    date: "2026-07-30",
    readingTimeMinutes: 4,
    body: [
      {
        heading: "The switch",
        paragraphs: [
          "ShiftWise started in Flutter/Dart. Partway through, it moved to React Native with Expo instead. [PLACEHOLDER — the real reason for the switch belongs here: what specifically wasn't working in Flutter for this project, what tipped the decision. I don't have that detail and won't invent one.]",
        ],
      },
      {
        heading: "What got locked in after the switch",
        paragraphs: [
          "Several architecture decisions were made deliberately rather than defaulted into: `@react-native-firebase` for offline data persistence, `lucide-react-native` for icons, `@gorhom/bottom-sheet` and `react-native-reanimated` for the interaction layer, and a glassmorphism, dark-first visual design (`#0A0A0B` base, translucent white surfaces at 6% opacity, a `#3B6EF8` primary accent).",
          "The project also runs on Firebase's free Spark plan rather than the paid Blaze tier. That's a real, documented tradeoff — Spark has a known limitation around atomic write guards, meaning certain race conditions aren't fully protected against at the database level yet. That gap is deferred, not ignored: it's tracked as a known issue to resolve on a Blaze upgrade, not ignored.",
        ],
      },
      {
        heading: "Getting Firestore security rules right",
        paragraphs: [
          "The security rules follow a deny-by-default model: nothing is readable or writable unless explicitly allowed, access is matched against the authenticated user's UID, and entitlement data is server-owned rather than client-writable. That last point matters specifically for a shift-tracking app — if a client could write its own entitlement status, nothing would stop someone from granting themselves premium features by editing a local request.",
        ],
      },
    ],
  },
  {
    slug: "auditing-a-live-aitools-directory",
    title: "Auditing a live Next.js app: what broke and why",
    seoTitle: "Debugging a Live Next.js 15 App: Real Bugs Found in Production",
    summary:
      "A real bug audit on AI ToolsHQ, a live AI-tools directory — the specific mistakes found and what actually fixed them.",
    seoDescription:
      "Real bugs found auditing a live Next.js 15 app: wrong Radix UI import paths, missing async params, and Firebase client SDK misuse in server components.",
    keywords: ["Next.js debugging", "Next.js 15", "Firebase", "Radix UI", "server components"],
    date: "2026-07-10",
    readingTimeMinutes: 4,
    body: [
      {
        heading: "Three real bugs, not hypotheticals",
        paragraphs: [
          "This wasn't a code review exercise — these were actual defects found in a live site (AI ToolsHQ, an AI tools directory). Three separate categories of bug showed up in the same audit pass.",
        ],
      },
      {
        heading: "Wrong import paths, silently broken components",
        paragraphs: [
          "Several components were importing from incorrect Radix UI paths — the kind of mistake that doesn't always throw a build error if a similarly-named export exists elsewhere, but produces a component that doesn't behave as expected at runtime.",
        ],
      },
      {
        heading: "The Next.js 15 async params trap",
        paragraphs: [
          "Next.js 15 made dynamic route params asynchronous — `params` became a Promise instead of a plain object, matching the same pattern used in this site's own `/blog/[slug]` route. Code written against the older synchronous assumption doesn't just fail loudly; in some cases it silently returns undefined values instead of crashing, which is worse, because the page renders without erroring but shows the wrong (or missing) content.",
        ],
      },
      {
        heading: "Client SDK in the wrong place",
        paragraphs: [
          "The Firebase client SDK was being called directly inside server components — which doesn't work, since client SDKs assume a browser environment. The fix was converting the affected components to `\"use client\"` and moving the data fetching into `useEffect` with `useParams`, keeping the client-only code actually running on the client.",
        ],
      },
    ],
  },
  {
    slug: "finsave-ai-money-coaching-for-msmes",
    title: "FinSave AI: what it takes to build financial coaching for MSMEs",
    seoTitle: "FinSave AI: Financial Coaching for Rwandan and African MSMEs",
    summary:
      "FinSave AI is live at finsave.aitoolshq.space, built around bank and mobile-money coaching for small businesses in Rwanda.",
    seoDescription:
      "Notes on FinSave AI, a financial coaching tool for African MSMEs, covering the planned multi-account ingestion approach via Plaid Sandbox and mobile-money statement uploads.",
    keywords: ["fintech Rwanda", "MSME financial tools", "AI financial coaching", "mobile money Africa"],
    date: "2026-06-20",
    readingTimeMinutes: 4,
    body: [
      {
        heading: "The problem it's aimed at",
        paragraphs: [
          "Most MSMEs in Rwanda don't have a single bank account they run their business through — money moves across mobile money, informal record-keeping, and sometimes a bank account, without ever being aggregated in one place. FinSave AI is built around that reality rather than assuming a single clean bank feed.",
        ],
      },
      {
        heading: "The ingestion approach",
        paragraphs: [
          "The planned approach for pulling in financial data combines Plaid Sandbox for bank accounts with a mobile-money statement upload path — accepting CSV, PDF, or even a photo of a printed statement, run through Tesseract OCR to extract the transaction data. [PLACEHOLDER — confirm current implementation status: this is the planned approach from project docs; state plainly here whether ingestion is fully live yet or still in progress, since the fetch only confirmed the site resolves, not what's functionally complete.]",
        ],
      },
      {
        heading: "Lender access without exposing real account numbers",
        paragraphs: [
          "One deliberate design choice: lenders reviewing a business's financial standing don't see real account numbers. Instead, FinSave generates a separate Business Code used specifically for lender-facing access — keeping the underlying account details out of a channel that doesn't need them.",
        ],
      },
    ],
  },
];
 