import type { Project } from "../types";

const dir = "/images/projects/userwise";

const screen = (file: string, alt: string) => ({
  src: `${dir}/${file}`,
  width: 6400,
  height: 4800,
  alt,
  fit: "contain" as const,
});

export const userwise: Project = {
  slug: "userwise",
  name: "Userwise",
  title: "LiveOps Platform",
  summary:
    "Designing player retention tools for mobile game developers: a LiveOps platform that helps studios retain players without adding operational complexity.",
  client: "Userwise",
  role: "UI Designer",
  service: "UX Design",
  date: "2023-12-30",
  category: "B2B platform",
  cover: {
    src: `${dir}/userwise-cover.png`,
    width: 2560,
    height: 1920,
    alt: "Userwise campaign schedule showing events, messages, push notifications, and offers on a weekly calendar",
    fit: "contain",
  },
  blocks: [
    { type: "sectionHeading", id: "overview", eyebrow: "Overview", title: "Powerful tooling, made approachable." },
    {
      type: "text",
      paragraphs: [
        "Userwise gives mobile game developers powerful tools to retain players. I partnered closely with Maddie (Head of Product) and Tom (Co-founder) of Userwise to design a LiveOps platform that helps mobile game developers retain players without adding operational complexity. The work focused on simplifying powerful tooling into clear, intuitive workflows that feel approachable, even for non-technical teams.",
      ],
    },
    {
      type: "image",
      size: "wide",
      image: screen(
        "userwise-overview.png",
        "Shop slot editor with basic settings, segment override, triggers, payment type, and items",
      ),
    },
    { type: "sectionHeading", id: "challenge", eyebrow: "The challenge", title: "Powerful features that needed to feel simple." },
    {
      type: "text",
      paragraphs: [
        "LiveOps platforms are inherently complex — scheduling campaigns, configuring in-game shops, managing versions across environments, importing bulk data. The challenge was designing interfaces that could handle real operational complexity while remaining usable for teams who aren't deeply technical.",
      ],
      callout: "Every feature needed clear defaults, visible state, and recoverable actions.",
    },
    {
      type: "quote",
      quote:
        "I really loved your ability to take my thoughts and my ideas and my half baked concepts about what I wanted to achieve and what I wanted to build for my product. You turned that thing that I had in my head into reality, and that really meant a lot to me.",
      attribution: "Head of Product @ Userwise",
    },
    { type: "sectionHeading", id: "process", eyebrow: "How I worked", title: "Wireframes to production, in close partnership with the founders." },
    {
      type: "text",
      paragraphs: [
        "Working in tight feedback loops with the team (weekly feature planning, user interviews every two weeks), I translated those conversations into UX flows and wireframes. From there, I moved into high-fidelity design, iterating until features were ready for engineering. The pace was fast: weekly check-ins, rapid iteration, tight collaboration.",
      ],
    },
    {
      type: "image",
      size: "wide",
      image: screen("userwise-process.png", "Three hand-drawn wireframe sketches exploring an overview, a custom chart layout, and period comparison"),
    },
    { type: "sectionHeading", id: "features", eyebrow: "What I designed", title: "Core features of the platform." },
    {
      type: "features",
      layout: "rows",
      items: [
        {
          title: "Campaigns",
          body: "Campaign creation, scheduling, and management. Designed flows for setting up targeted player campaigns with configurable triggers, timing, and content. Focused on making complex scheduling logic visible and editable without overwhelming users.",
          image: screen("userwise-campaigns.png", "Campaign schedule with events, messages, push notifications, and offers laid out across a week"),
        },
        {
          title: "Shops",
          body: "In-game store configuration. Designed interfaces for creating and managing offers, bundles, and pricing logic. The challenge was representing complex pricing rules (time-limited, player-segment-specific, tiered) in a way that's scannable and editable.",
          image: screen("userwise-shops.png", "Summary of items and currencies beside a staged premium and free reward timeline"),
        },
        {
          title: "Version history",
          body: "Change tracking and rollback. Designed a version history system that lets teams see what changed, when, and by whom — with the ability to restore previous states. Critical for teams managing live games where mistakes can impact real players.",
          image: screen("userwise-version-history.png", "Version history table listing content type, title, and who made each change"),
        },
        {
          title: "JSON upload",
          body: "Bulk data import with validation. Designed upload flows that handle large JSON files, surface validation errors clearly, and let users fix issues before committing changes. Focused on making error states actionable rather than just informative.",
          image: screen("userwise-json-upload.png", "JSON configuration editor with basic settings and a code panel"),
        },
      ],
    },
    {
      type: "quote",
      quote:
        "You somehow managed to declutter the chaos of my mind and turn it into actual designs that I could physically see in front of my eyes.",
      attribution: "Co-founder @ Userwise",
    },
    { type: "sectionHeading", id: "outcome", eyebrow: "Outcome", title: "A platform that shipped, compounded, and lasted." },
    {
      type: "text",
      paragraphs: [
        "The platform launched in 2023. At the time the original case study was written, it was still in active use more than two years later, serving studios including Halfbrick (makers of Fruit Ninja) and powering LiveOps for some of the world's most-played mobile games.",
        "According to the same account, the product's success allowed Userwise to expand beyond the platform into full-service game development and LiveOps management — growth enabled by a foundation that worked.",
      ],
    },
    {
      type: "image",
      size: "wide",
      image: screen("userwise-outcome.png", "Triggered campaigns list with categories, content counts, triggers, and publish status"),
    },
    {
      type: "quote",
      quote:
        "Through your skills and your expertise and your talents, you truly have the ability to turn people's dreams into reality, and I really think that's a great superpower to have.",
      attribution: "Head of Product @ Userwise",
    },
  ],
};
