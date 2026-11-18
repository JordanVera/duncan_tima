import type { Project } from "../types";

export const aioko: Project = {
  slug: "aioko",
  name: "Aioko Japanese Cuisine",
  title: "Brand identity & signature mark",
  summary:
    "An expressive hospitality identity uniting a continuous-line kitsune (fox) illustration with refined geometric wordmarks — built for menus, storefront signage, packaging, and digital reservations.",
  client: "Aioko (Aiwoko) Japanese Cuisine",
  role: "Brand Identity & Logo System",
  service: "Visual Identity, Custom Illustration, Responsive Lockups",
  date: "2026-09-20",
  category: "Brand Design",
  cover: {
    src: "/images/projects/aioko/aioko-main-framed.svg",
    width: 944,
    height: 680,
    alt: "Aioko Japanese Cuisine primary vertical logo featuring a continuous-line coral fox mark above geometric wordmark",
    fit: "contain",
  },
  blocks: [
    {
      type: "sectionHeading",
      id: "assess",
      eyebrow: "A · Assess",
      title: "Honoring culinary craft without leaning on worn restaurant clichés.",
    },
    {
      type: "text",
      lead: "Modern hospitality brands have to feel equally authentic stamped onto textured menu paper, lit on an exterior facade, or pinned inside a mobile reservation screen.",
      paragraphs: [
        "Aioko Japanese Cuisine needed an identity with immediate cultural resonance and modern restraint — avoiding heavy brush-stroke clichés in favor of precision linework and balanced negative space.",
        "We explored how a single signature motif could anchor the entire brand system while flexing cleanly across vertical hero placements and narrow horizontal headers.",
      ],
      callout: "Delicate linework meets architectural typography — built to scale from chopstick sleeves to storefronts.",
    },
    {
      type: "sectionHeading",
      id: "build",
      eyebrow: "B · Build",
      title: "A continuous-line fox emblem paired with open geometric letterforms.",
    },
    {
      type: "text",
      paragraphs: [
        "The emblem captures a stylized fox (kitsune) in motion through a single fluid, expressive lineweight in warm coral (#FF6666) — evoking hospitality, heritage, and modern craft.",
        "Beneath the mark, wide-tracked geometric typography pairs crisp structural symmetry in 'AIWOKO' with a refined secondary descriptor for 'JAPANESE CUISINE'.",
      ],
    },
    {
      type: "image",
      image: {
        src: "/images/projects/aioko/aioko-main-framed.svg",
        width: 944,
        height: 680,
        alt: "Primary vertical lockup of Aioko Japanese Cuisine with centered fox emblem",
      },
      size: "inset",
      caption: "Primary vertical lockup designed for storefront signage, menu covers, and hero digital placements.",
    },
    {
      type: "sectionHeading",
      id: "create",
      eyebrow: "C · Create",
      title: "Responsive lockups engineered for real-world applications.",
    },
    {
      type: "imagePair",
      images: [
        {
          src: "/images/projects/aioko/aioko-main-framed.svg",
          width: 944,
          height: 680,
          alt: "Stacked primary brand lockup for Aioko Japanese Cuisine",
        },
        {
          src: "/images/projects/aioko/aioko-sec-framed.svg",
          width: 882,
          height: 600,
          alt: "Horizontal secondary lockup placing the fox mark beside stacked Aiwoko Japanese Cuisine typography",
        },
      ],
      caption:
        "Primary stacked emblem (left) paired with the compact horizontal lockup (right) for navigation bars, receipts, and packaging seals.",
    },
    {
      type: "sectionHeading",
      id: "deliver",
      eyebrow: "D · Deliver",
      title: "Precision vector assets ready for print, packaging, and web.",
    },
    {
      type: "text",
      paragraphs: [
        "Every path in the Aioko mark was tuned as clean, lightweight SVG geometry so the brand reproduces sharply across foil-stamped menus, takeout packaging, social avatars, and web interfaces without pixelation.",
      ],
    },
  ],
};
