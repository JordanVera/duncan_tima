import type { Project } from "../types";

const dir = "/images/projects/proof";

export const proof: Project = {
  slug: "proof",
  name: "Proof",
  title: "Client Experience Redesign",
  summary:
    "Redesigning how law firms follow a service of process, replacing uncertainty and fragmented job pages with one clear, continuous story.",
  client: "Proof",
  role: "UX/UI Designer",
  service: "UX Design",
  date: "2025-07-18",
  category: "Client experience",
  cover: {
    src: `${dir}/proof-cover.png`,
    width: 2560,
    height: 1920,
    alt: "Proof job overview showing a completed serve, its attempts, and a details panel",
    fit: "contain",
  },
  blocks: [
    { type: "sectionHeading", id: "why-it-mattered", eyebrow: "Why it mattered", title: "About the product" },
    {
      type: "text",
      paragraphs: [
        "Proof handles service of process: the constitutional requirement that someone must be formally notified when they're sued. The platform connects thousands of law firms with a nationwide network of process servers. These serves often involve urgent, emotionally charged cases where uncertainty quickly erodes trust.",
      ],
    },
    {
      type: "metrics",
      label: "Understanding the challenge",
      note: "Baseline conditions before the redesign.",
      tone: "baseline",
      items: [
        { value: "30%", label: "of chat messages from clients were asking for status updates" },
        { value: ">$50k", label: "annual spend — high-value clients churned primarily because of poor visibility" },
        { value: "30 days", label: "was the retention window — confusion killed momentum" },
      ],
    },
    { type: "sectionHeading", id: "where-we-started", eyebrow: "Where we started", title: "The job details page hadn't been touched in years." },
    {
      type: "text",
      paragraphs: [
        "We knew it needed work, but it was a big undertaking with lots of stakeholders and opinions. We agreed to take a phased approach, starting with one widget: chat.",
        "Chat is a key differentiator. Clients can message process servers directly. But every message creates a review task for ops. The business goal was to reduce task volume. The design question: why are clients chatting so much?",
      ],
    },
    {
      type: "image",
      size: "wide",
      image: {
        src: `${dir}/proof-job-details-before.png`,
        width: 2556,
        height: 1648,
        alt: "The original job details page with job details, attempts, addresses, and chat panels side by side",
        fit: "contain",
      },
      caption: "The job details page before the redesign.",
    },
    { type: "sectionHeading", id: "research", eyebrow: "Research revealed", title: "The issue wasn't chat. It was clarity." },
    {
      type: "text",
      paragraphs: [
        "I used Claude to classify 1,000+ chat threads by intent, identifying 16 distinct message categories. The pattern was clear…clients weren't chatting because they wanted to chat. They were asking the same question over and over: what's happening with my job?",
      ],
      callout:
        "The problem wasn't the chat experience. It was that we weren't telling clients what they needed to know.",
    },
    {
      type: "image",
      size: "wide",
      image: {
        src: `${dir}/proof-chat-intent-research.png`,
        width: 1506,
        height: 816,
        alt: "Chat research board with charts and four themes: low signal and high noise, job status confusion, manual fragmented workflows, and tech and ops dependencies",
        fit: "contain",
      },
    },
    {
      type: "quote",
      quote:
        "People are dealing with some of the most traumatic experiences they'll ever have. A divorce, a child custody dispute, somebody's taken off with the kid. The more information we can give them, the more reassuring it is to them that things are moving in the direction they need them to go.",
      attribution: "Paralegal, mid-sized family law firm",
    },
    { type: "sectionHeading", id: "reframe", eyebrow: "The reframe", title: "But clarity alone wouldn't solve it." },
    {
      type: "text",
      lead: "There was a structural problem.",
      paragraphs: [
        "When jobs get redispatched (natural disasters, server availability, access issues, client requests) our system created a brand new page. New job. New chat. New history. Clients with complex serves had 2–10 separate job pages to navigate. Which one was current? Where should they message?",
      ],
      callout: "That's not a product experience. That's a breakdown of trust.",
    },
    {
      type: "image",
      size: "wide",
      image: {
        src: `${dir}/proof-fragmented-job-pages.png`,
        width: 2560,
        height: 1607,
        alt: "Three stacked legacy job pages created by reassignments, beside the redesigned single serve page",
        fit: "contain",
      },
    },
    {
      type: "text",
      paragraphs: [
        "“Jobs” were an internal concept that made sense for ops but meant nothing to clients. We needed a new mental model: one serve, one story, regardless of how many reassignments happened behind the scenes. The serve became the container.",
      ],
    },
    {
      type: "image",
      size: "inset",
      image: {
        src: `${dir}/proof-serve-as-container.png`,
        width: 1380,
        height: 988,
        alt: "Diagram comparing the old data model, where reassignments chain separate job IDs, with the new serve structure that groups job IDs under one serve ID",
        fit: "contain",
      },
    },
    { type: "sectionHeading", id: "solution", eyebrow: "Solution", title: "Three experiences that remove uncertainty." },
    {
      type: "features",
      layout: "rows",
      items: [
        {
          title: "Job tracker",
          body: "Answers one question: is this progressing the way it should? Instead of binary status labels, it surfaces contextual health indicators (on track, needs attention, at risk) and explains why. Attempts count in aggregate across the full serve. Risk surfaces early, not after failure.",
          image: {
            src: `${dir}/proof-job-tracker-health.png`,
            width: 1049,
            height: 776,
            alt: "Job tracker card reading “Proof is reviewing your job” with a timeline of expected steps and durations",
            fit: "contain",
          },
        },
        {
          title: "Unified history",
          body: "Reassignments no longer reset the conversation. A single timeline preserves all attempts, chats, and documents regardless of how many times the serve changes hands.",
          image: {
            src: `${dir}/proof-unified-history.png`,
            width: 814,
            height: 812,
            alt: "Chat panel with active and past conversations, including a reassigned thread and its reason",
            fit: "contain",
          },
        },
        {
          title: "Address intelligence",
          body: "Many failed attempts came from address quality issues. We integrated Melissa Data to validate addresses proactively and surface risks before dispatch.",
          image: {
            src: `${dir}/proof-address-intelligence.png`,
            width: 1334,
            height: 798,
            alt: "Add address form warning that the building address was verified but the unit number is missing",
            fit: "contain",
          },
        },
      ],
    },
    { type: "sectionHeading", id: "enabling-ops", eyebrow: "Enabling ops", title: "Enabling ops without rebuilding the platform." },
    {
      type: "text",
      paragraphs: [
        "Client visibility required ops to see the same unified context. Stakeholders proposed redesigning the entire ops platform.",
        "I recommended a narrower approach: a global job selector that surfaces key context without changing existing workflows. Ship value now, defer the full redesign.",
      ],
    },
    {
      type: "image",
      size: "wide",
      image: {
        src: `${dir}/proof-global-job-selector.png`,
        width: 2571,
        height: 422,
        alt: "Global job selector showing each job in a serve with its status, job health, reassign reason, and attempted addresses",
        fit: "contain",
      },
    },
    {
      type: "quote",
      quote:
        "Thank you for listening to our feedback and keeping the workflow very similar while also adding value with information in ways that we can go self-serve it and not confuse the team. Taking our feedback and doing what you did, it's a world of efforts, and it's very much appreciated.",
      attribution: "VP of Operations",
    },
    { type: "sectionHeading", id: "outcomes", eyebrow: "Outcomes", title: "What changed." },
    {
      type: "metrics",
      label: "Reported outcomes",
      note: "As reported in the original case study.",
      tone: "outcome",
      items: [
        { value: "25%", label: "reduction in status-check messages" },
        { value: ">80%", label: "positive feedback" },
        { value: "70%", label: "quick action adoption" },
      ],
    },
    { type: "sectionHeading", id: "takeaway", eyebrow: "Key takeaway", title: "Clients didn't need more features — they needed to understand what was already happening." },
    {
      type: "text",
      paragraphs: [
        "By redesigning the client experience around a continuous story (and enabling internal teams to support that truth), we reduced confusion, restored trust, and created a scalable foundation for retention.",
      ],
    },
    {
      type: "image",
      size: "wide",
      image: {
        src: `${dir}/proof-key-takeaway.png`,
        width: 6400,
        height: 4800,
        alt: "Redesigned Serves list with a health column showing statuses such as On Track, Behind Schedule, and Action Required",
        fit: "contain",
      },
    },
  ],
};
