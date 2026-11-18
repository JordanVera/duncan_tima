import type { Project } from "../types";

export const opusOrtho: Project = {
  slug: "opus-ortho",
  name: "OpusOrtho",
  title: "Brand identity & digital experience",
  summary:
    "A warm, clinical brand system, custom dental iconography, and consultation-first web experience designed for a modern dentistry and orthodontics practice.",
  client: "OpusOrtho — Dentistry & Orthodontics",
  role: "Brand & Digital Direction",
  service: "Brand Identity, Guidelines, Web Experience, Iconography",
  date: "2026-10-15",
  category: "Brand Design & Digital Experience",
  cover: {
    src: "/images/projects/opus-ortho/opus-website-board.png",
    width: 1672,
    height: 941,
    alt: "OpusOrtho digital experience board featuring consultation booking, clear aligners, and patient portrait layouts",
    fit: "contain",
  },
  blocks: [
    {
      type: "sectionHeading",
      id: "assess",
      eyebrow: "A · Assess",
      title: "Replacing sterile dental tropes with confidence and clarity.",
    },
    {
      type: "text",
      lead: "Healthcare and orthodontic practices often default to cold, interchangeable templates that create distance before a patient ever walks in.",
      paragraphs: [
        "OpusOrtho needed a cohesive identity that could carry both clinical authority and human warmth — unifying reception signage, patient print collateral, social storytelling, and consultation booking under one recognizable system.",
        "We audited the full patient journey from first search and social discovery to treatment education (braces and clear aligners) and in-clinic arrival, identifying where clearer visual hierarchy and warmer art direction could build immediate trust.",
      ],
      callout: "Clinical excellence should feel welcoming from the very first touchpoint.",
    },
    {
      type: "image",
      image: {
        src: "/images/projects/opus-ortho/opus-brand-guidelines.png",
        width: 1672,
        height: 941,
        alt: "OpusOrtho brand guidelines showing typography (Larken Thin), color palette (#9279ba, #745E96, #D1C1F2), and photography principles",
      },
      caption:
        "Comprehensive brand guidelines establishing Larken Thin display typography, violet/lilac palette tokens, and authentic patient photography direction.",
    },
    {
      type: "sectionHeading",
      id: "build",
      eyebrow: "B · Build",
      title: "A modular visual grammar anchored by the radial smile emblem.",
    },
    {
      type: "text",
      paragraphs: [
        "At the center of the identity sits a 16-ray radial mark — symbolizing alignment, radiance, and patient-centered care. Around it, we structured a balanced palette of deep plum (#745E96), muted lavender (#9279BA), and soft lilac (#D1C1F2) offset by warm cream surfaces.",
        "Pairing Larken Thin editorial headings with crisp geometric sans-serif UI copy gave treatment pages, consultation forms, and clinic signage an elevated, unmistakable cadence.",
      ],
    },
    {
      type: "imagePair",
      images: [
        {
          src: "/images/projects/opus-ortho/opus-icon-grid.png",
          width: 1254,
          height: 1254,
          alt: "Nine custom fine-line dental and orthodontic icons on a muted purple background",
        },
        {
          src: "/images/projects/opus-ortho/opus-business-card-lavender.png",
          width: 1671,
          height: 941,
          alt: "OpusOrtho two-sided business cards in deep purple and soft lavender for Dr. Maya Bennett",
        },
      ],
      caption:
        "Bespoke fine-line orthodontic iconography paired with tactile print stationery for clinical practitioners.",
    },
    {
      type: "sectionHeading",
      id: "create",
      eyebrow: "C · Create",
      title: "Connecting digital journeys, social campaigns, and physical spaces.",
    },
    {
      type: "features",
      items: [
        {
          title: "Consultation-first web architecture",
          body: "Structured treatment pages for braces and clear aligners around transparent timelines, benefits, and a frictionless consultation request flow.",
          image: {
            src: "/images/projects/opus-ortho/opus-card-mockup.png",
            width: 1672,
            height: 941,
            alt: "OpusOrtho web screen system showing Braces treatment detail, Plan a Visit, Practice Values, and Book a Consultation",
          },
        },
        {
          title: "Editorial campaign & social system",
          body: "Modular portrait templates and story cards celebrate real, inclusive smiles while keeping the radial mark and typography consistent across channels.",
          image: {
            src: "/images/projects/opus-ortho/opus-three-panel-board.png",
            width: 1672,
            height: 941,
            alt: "Three-panel OpusOrtho editorial campaign posters celebrating patient smiles",
          },
        },
      ],
    },
    {
      type: "sectionHeading",
      id: "deliver",
      eyebrow: "D · Deliver",
      title: "Ready for launch across web, social, and clinic signage.",
    },
    {
      type: "imagePair",
      images: [
        {
          src: "/images/projects/opus-ortho/opus-story-cards.png",
          width: 1254,
          height: 1254,
          alt: "OpusOrtho social story templates featuring patient testimonials and portrait photography",
        },
        {
          src: "/images/projects/opus-ortho/opus-portrait.png",
          width: 1672,
          height: 941,
          alt: "OpusOrtho hero photography pairing natural smile portraiture with the white radial lockup",
        },
      ],
      caption:
        "Social story templates and primary hero lockups delivered alongside production brand guidelines.",
    },
    {
      type: "diagram",
      kind: "abcdProcess",
      caption: "Delivered end-to-end using ABCD's four-stage Assess, Build, Create, Deliver framework.",
    },
  ],
};
