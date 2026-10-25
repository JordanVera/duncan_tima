import type { About } from "./types";

export const about: About = {
  intro:
    "I’m a designer focused on building clear, purposeful digital experiences. I bring a visual design background into product thinking, systems, and usability. The result is work that’s intentional, scalable, and centered on real users.",
  positioning:
    "I bring visual craft and product thinking together to make complex tools easier to understand and easier to use.",
  personal:
    "Outside of design, I enjoy the occasional coffee run, sports events, and mentoring others trying to get into the industry. As someone who has benefited tremendously from mentorship, I think it’s important to pay it forward as much as possible.",
  // Add a photo at public/images/about/duncan-tima-portrait.jpg and set it here, e.g.
  // portrait: { src: "/images/about/duncan-tima-portrait.jpg", width: 1600, height: 2000, alt: "Duncan Tima" },
  portrait: undefined,
  experience: [
    { role: "Senior Product Designer", company: "OEC", years: "2024–2025" },
    { role: "UI/UX Designer", company: "OEC", years: "2021–2024" },
    { role: "UI Designer", company: "Signet Jewelers", years: "2018–2020" },
    { role: "Graphic Designer", company: "City Furniture", years: "2016–2018" },
    { role: "Design Intern", company: "Spaces+Co", years: "2015–2016" },
  ],
};
