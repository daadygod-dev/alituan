export type Note = {
  slug: string;
  title: string;
  // Short one-liner shown only on the note page itself, not the list —
  // the list in your screenshot shows titles only.
  summary: string;
  date: string; // ISO format, e.g. "2026-08-01"
  // Placeholder body content — I don't know the real specifics of these
  // projects, so this is intentionally generic and short rather than
  // invented detail. Replace with your actual writing before publishing;
  // treat this as a content shape reference, not draft copy.
  body: string;
};

export const notes: Note[] = [
  {
    slug: "building-ai-systems-for-my-agency",
    title: "Building AI systems for my agency",
    summary: "Notes on using AI tools across client and internal projects at Vertex.",
    date: "2026-08-20",
    body: "Placeholder body — replace with your actual writeup. Talk about which AI tools you're using day to day, where they speed things up, and where you still have to be the quality gate.",
  },
  {
    slug: "redesigning-my-portfolio-as-a-personal-os",
    title: "Redesigning my portfolio as a personal OS",
    summary: "Rethinking the portfolio site as a living dashboard rather than a static resume.",
    date: "2026-08-10",
    body: "Placeholder body — replace with your actual writeup. Talk about what 'personal OS' means for this redesign: stack, sections, why you moved away from a static portfolio format.",
  },
  {
    slug: "split-slider",
    title: "Split Slider",
    summary: "A small UI component/interaction experiment.",
    date: "2026-07-28",
    body: "Placeholder body — replace with your actual writeup. If this is a component breakdown, this is a good spot for a demo embed or code snippet.",
  },
  {
    slug: "spring-number-flow",
    title: "Spring Number Flow",
    summary: "Animating numbers with spring physics instead of linear tweens.",
    date: "2026-07-15",
    body: "Placeholder body — replace with your actual writeup. Good spot to link the library/approach used (e.g. Framer Motion springs, react-spring, or a custom easing) and show a before/after.",
  },
];