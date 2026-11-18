import type { Service, ToolkitItem } from "./types";

export const servicesIntro =
  "Each discipline can be engaged independently; when combined, they create a far more coherent experience across how a business looks, communicates, and works.";

export const services: Service[] = [
  {
    number: "01",
    name: "Brand Design",
    description:
      "Identity, communication, campaigns, and brand systems that express a business clearly and memorably across physical and digital touchpoints.",
    deliverables: [
      "Visual identity & logo systems",
      "Brand strategy & guidelines",
      "Campaign & spatial collateral",
      "Custom iconography & typography",
    ],
    example: {
      src: "/images/projects/opus-ortho/opus-brand-guidelines.png",
      width: 1672,
      height: 941,
      alt: "OpusOrtho brand guidelines spread showing typography, color tokens, and photography standards",
      fit: "contain",
    },
  },
  {
    number: "02",
    name: "Digital Experiences",
    description:
      "Websites, customer journeys, UX/UI, information architecture, and interaction design that shape how people understand and trust your business.",
    deliverables: [
      "Marketing & flagship websites",
      "Customer journey & IA mapping",
      "Responsive UX/UI systems",
      "Interactive direction & motion",
    ],
    example: {
      src: "/images/projects/opus-ortho/opus-website-board.png",
      width: 1672,
      height: 941,
      alt: "OpusOrtho digital experience screens showing consultation booking and treatment navigation",
      fit: "contain",
    },
  },
  {
    number: "03",
    name: "Product Design",
    description:
      "Discovery, workflows, prototypes, usability validation, and scalable interface systems that support how complex digital products actually work.",
    deliverables: [
      "Product discovery & audits",
      "Workflow & task architecture",
      "Interactive prototypes",
      "Scalable design systems",
    ],
    example: {
      src: "/images/projects/amplify/amplify-collage.webp",
      width: 1920,
      height: 1256,
      alt: "Amplify Conference spatial and digital system unifying wayfinding, screens, and attendee touchpoints",
      fit: "contain",
    },
  },
];

export const toolkit: ToolkitItem[] = [
  {
    name: "Figma",
    category: "Interface & Design Systems",
    lightSrc: "/images/toolkit/figma.svg",
    darkSrc: "/images/toolkit/figma.svg",
    width: 288,
    height: 432,
  },
  {
    name: "Axure RP",
    category: "Complex Prototyping",
    lightSrc: "/images/toolkit/axure-light.svg",
    darkSrc: "/images/toolkit/axure-dark.svg",
    width: 322,
    height: 77,
  },
  {
    name: "Miro",
    category: "Workshops & Architecture",
    lightSrc: "/images/toolkit/miro.svg",
    darkSrc: "/images/toolkit/miro-dark.svg",
    width: 703,
    height: 258,
  },
  {
    name: "Notion",
    category: "Strategy & Documentation",
    lightSrc: "/images/toolkit/notion-light.svg",
    darkSrc: "/images/toolkit/notion-dark.svg",
    width: 180,
    height: 63,
  },
  {
    name: "Claude",
    category: "Research & Rapid Prototyping",
    lightSrc: "/images/toolkit/claude-light.svg",
    darkSrc: "/images/toolkit/claude.svg",
    width: 184,
    height: 40,
  },
];
