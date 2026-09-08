import type { Metadata } from "next";
import { Geist_Mono, Funnel_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AIAssistant } from "@/components/ai-assistant";

// ─────────────────────────────────────────────────────────────────────
// FILL THESE IN BEFORE PUBLISHING. These feed both the metadata below
// AND the Organization/Person JSON-LD — get them right once, here, and
// everything downstream is consistent. Left as placeholders rather than
// guessed, since a wrong legal name or logo URL baked into structured
// data is worse than an honest gap: it's a false claim search engines
// and AI crawlers will read as fact.
// ─────────────────────────────────────────────────────────────────────
const SITE_URL = "https://alituan.me";
const SITE_NAME = "Samuel Umuhoza - Sofware Engineer";
const LEGAL_NAME = "samuel's Software Engineer"; // e.g. "Vertex Technology Services", confirm exact legal form
const LOGO_URL = `${SITE_URL}/profile.jpg`; // must be an absolute URL once deployed
const PERSON_NAME = "Samuel Umuhoza"; // public byline / founder name
const SITE_DESCRIPTION = "Personal Website to showcase my works,skills and achievements with different worldwide";

// GitHub confirmed elsewhere as "alituan" — added as a real value. X and
// LinkedIn left as placeholders since those URLs haven't been confirmed
// yet; add them the moment you have them, don't ship guessed handles.
const SAME_AS: string[] = [
  "https://github.com/daadygod-dev",
  // "https://x.com/GoDaddy35729",
  // "https://linkedin.com/in/umuhoza-samuel",
];

const playfairDisplayHeading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const funnelSans = Funnel_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ─────────────────────────────────────────────────────────────────────
// SEO metadata. Per Next.js/Google guidance: titles should target the
// actual query and stay under ~60 characters, descriptions are written
// for humans, not stuffed with keywords. metadataBase lets every child
// page's relative OG image/canonical resolve correctly without
// repeating the full domain everywhere.
// ─────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    // Lets child pages set title: "Post Name" and have it render as
    // "Post Name | SITE_NAME" automatically, instead of repeating the
    // site name in every page's metadata by hand.
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
   verification: {
    google: "aD97XXUY-Uw1v1VNhNc3OnrX1IfU1aWUm5O4_82gRlA",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ─────────────────────────────────────────────────────────────────────
// AEO / GEO: Organization + WebSite + Person JSON-LD, once, in the root
// layout. This is the entity graph that lets AI answer engines (and
// Google's rich results) connect your name/brand to your actual site
// and social profiles rather than treating you as an anonymous source.
// Verified approach — this is not a separate "AEO schema": it's the
// same schema.org vocabulary regular SEO structured data already uses,
// per current (2026) guidance from both Google and Bing on this. There
// is no special "AI schema" beyond this.
// ─────────────────────────────────────────────────────────────────────
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: LEGAL_NAME,
  url: SITE_URL,
  logo: LOGO_URL,
  sameAs: SAME_AS,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSON_NAME,
  url: SITE_URL,
  sameAs: SAME_AS,
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning
       
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        funnelSans.variable,
        playfairDisplayHeading.variable,
        geistMono.variable
      )}
        >
            <head>
                {/*
                  Rendered once, site-wide. dangerouslySetInnerHTML is
                  safe here specifically because these three objects are
                  built entirely from constants defined above in this
                  file — no user input, no request-time data, so there's
                  no injection surface.
                */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
                />
            </head>
            <body className="font-inter">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    
                </ThemeProvider>
                <AIAssistant />
            </body>
        </html>
    )
}