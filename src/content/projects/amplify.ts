import type { Project } from "../types";

export const amplify: Project = {
  slug: "amplify",
  name: "Amplify Conference",
  title: "Event brand & spatial experience",
  summary:
    "A bold conference identity built around \"Inspire. Equip. Amplify.\" — uniting illuminated entry portals, freestanding lobby monoliths, attendee credentials, and auditorium stage visuals.",
  client: "Amplify Conference",
  role: "Creative Direction & Environmental Design",
  service: "Brand System, Stage Graphics, Spatial Wayfinding, Print",
  date: "2026-10-08",
  category: "Brand Design & Environmental Experience",
  cover: {
    src: "/images/projects/amplify/amplify-collage.webp",
    width: 1920,
    height: 1256,
    alt: "Amplify Conference illuminated orange entry archway reading Inspire, Equip, Amplify alongside branded column wrap",
    fit: "contain",
  },
  blocks: [
    {
      type: "sectionHeading",
      id: "assess",
      eyebrow: "A · Assess",
      title: "Designing an identity that commands an entire multi-day venue.",
    },
    {
      type: "text",
      lead: "Live conferences live or die on momentum. From the moment attendees step into the lobby to the keynote countdown on the main stage, every surface shapes the energy in the room.",
      paragraphs: [
        "Amplify needed a cohesive visual language capable of scaling effortlessly from a 3-inch speaker lanyard to a 40-foot auditorium LED wall — without losing clarity in crowded hallways or low-light sessions.",
        "We centered the architecture around a stark obsidian-and-white palette charged with high-visibility orange, anchored by a bespoke geometric 'A' monogram.",
      ],
      callout: "Every architectural threshold became an unmistakable moment of arrival.",
    },
    {
      type: "image",
      image: {
        src: "/images/projects/amplify/amplify-15.jpg",
        width: 3493,
        height: 2287,
        alt: "Main auditorium stage featuring wide LED screens with Amplify logo, October 5th-8th schedule, and QR code",
      },
      caption:
        "Main auditorium LED stage graphics pairing the custom Amplify monogram with October 5th–8th event lockups.",
    },
    {
      type: "sectionHeading",
      id: "build",
      eyebrow: "B · Build",
      title: "Credentials, registration, and directional clarity at scale.",
    },
    {
      type: "imagePair",
      images: [
        {
          src: "/images/projects/amplify/amplify-badges.png",
          width: 1536,
          height: 1024,
          alt: "White Attendee badge and black Speaker badge for Amplify Conference with geometric A watermark",
        },
        {
          src: "/images/projects/amplify/amplify-08.jpg",
          width: 3432,
          height: 2288,
          alt: "Amplify Conference registration desk featuring matte black backdrop, orange registration lettering, and lanyard stations",
        },
      ],
      caption:
        "High-contrast Attendee and Speaker credentials paired with the central registration desk and color-coded lanyards.",
    },
    {
      type: "sectionHeading",
      id: "create",
      eyebrow: "C · Create",
      title: "Transforming lobbies, columns, and hospitality zones.",
    },
    {
      type: "text",
      paragraphs: [
        "Instead of flat directional banners, we introduced dimensional freestanding letter monoliths — spelling WELCOME and AMPLIFY with crisp orange edge trim — alongside floor decals and repeat-pattern column wraps that guided foot traffic naturally.",
        "Even secondary moments like 'The Snack Stop' hospitality wall received full brand treatment, turning break areas into memorable photo and recharge hubs.",
      ],
    },
    {
      type: "imagePair",
      images: [
        {
          src: "/images/projects/amplify/amplify-01.jpg",
          width: 2228,
          height: 1344,
          alt: "Monumental freestanding black and orange pillars spelling AMPLIFY across the conference lobby",
        },
        {
          src: "/images/projects/amplify/amplify-04.jpg",
          width: 1822,
          height: 1492,
          alt: "The Snack Stop feature wall with orange wire baskets over subtle Grab, Recharge, Amplify typography",
        },
      ],
      caption:
        "Dimensional lobby monoliths and hospitality wall installations unifying physical touchpoints.",
    },
    {
      type: "sectionHeading",
      id: "deliver",
      eyebrow: "D · Deliver",
      title: "A unified physical and digital rollout across the venue.",
    },
    {
      type: "imagePair",
      images: [
        {
          src: "/images/projects/amplify/amplify-06.jpg",
          width: 2210,
          height: 1452,
          alt: "Freestanding black and orange dimensional welcome installation",
        },
        {
          src: "/images/projects/amplify/amplify-07.jpg",
          width: 2235,
          height: 3353,
          alt: "Lobby floor graphics reading You've Entered the Amplify Zone leading toward the registration counter",
        },
      ],
      caption:
        "Arrival thresholds, floor decals, and illuminated portal framing guiding attendees smoothly from check-in to auditorium doors.",
    },
    {
      type: "imagePair",
      images: [
        {
          src: "/images/projects/amplify/amplify-10.jpg",
          width: 3443,
          height: 2279,
          alt: "Illuminated orange doorway arch leading into the main hall with wrapped column and digital signage",
        },
        {
          src: "/images/projects/amplify/amplify-09.jpg",
          width: 2287,
          height: 3430,
          alt: "Vertical perspective of the Amplify column wrap with Equip and Amplify repeating type and portal arch",
        },
      ],
      caption:
        "Illuminated doorway framing, column wraps, and synchronized digital lobby displays.",
    },
  ],
};
