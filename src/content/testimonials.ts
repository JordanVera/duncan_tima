import type { Testimonial } from "./types";

/** Wording and attribution copied from Duncan's existing site. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Duncan is without a doubt the best designer I've worked with! with a meticulous eye for design, broad range, and unmatched work ethic.",
    name: "Robin Boyd",
    title: "Senior Accountant/Entrepreneur, Robin+Co",
    avatar: { src: "/images/testimonials/robin-boyd.png", width: 640, height: 640, alt: "" },
  },
  {
    quote:
      "Duncan consistently performs at a high level, bringing creativity, attention to detail, and a calm, can-do attitude to even the most challenging projects.",
    name: "Frank Marricochi",
    title: "Senior UX Designer/Engineer, OEC",
    avatar: { src: "/images/testimonials/frank-marricochi.jpg", width: 389, height: 389, alt: "" },
  },
  {
    quote:
      "Duncan brings a thoughtful, calm, and creative approach to design, consistently delivering intuitive, user-centered solutions.",
    name: "Melanie Britton",
    title: "Product Operations Manager, OEC",
    avatar: { src: "/images/testimonials/melanie-britton.jpg", width: 400, height: 400, alt: "" },
  },
];
