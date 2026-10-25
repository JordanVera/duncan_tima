import type { Service } from "./types";

/**
 * Mirrors the services listed on Duncan's existing site.
 * Replace with the services screenshot content once supplied.
 */
export const servicesIntro =
  "From strategy to execution, I offer thoughtful and tailored design solutions that bring your unique vision to life.";

export const services: Service[] = [
  {
    number: "01",
    name: "Graphic Design",
    description:
      "From print to digital media I enjoy creating visually compelling designs that elevate your brand and captivate your audience.",
    example: {
      src: "/images/services/graphic-design-example.png",
      width: 2048,
      height: 2560,
      alt: "Poster design featuring a black Porsche race car with oversized “911” typography",
      fit: "cover",
    },
  },
  {
    number: "02",
    name: "Digital Design",
    description: "Intuitive and aesthetically pleasing digital experiences.",
    example: {
      src: "/images/services/digital-design-example.png",
      width: 2560,
      height: 1002,
      alt: "Three mobile banking screens showing accounts, an expenses breakdown chart, and a split payment flow",
      fit: "contain",
    },
  },
  {
    number: "03",
    name: "Social Media Design",
    description: "Engaging visuals that strengthen your online presence.",
    example: {
      src: "/images/services/social-media-design-example.png",
      width: 1080,
      height: 1350,
      alt: "Orange social media graphic of a Cleveland Browns quarterback with a scripture quote",
      fit: "cover",
    },
  },
];
