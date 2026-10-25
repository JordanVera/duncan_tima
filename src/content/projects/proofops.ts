import type { Project } from "../types";

const dir = "/images/projects/proofops";

export const proofops: Project = {
  slug: "proofops",
  name: "ProofOPS",
  title: "Operations Task Management",
  summary:
    "Proof's operations team coordinates thousands of serves daily across a distributed network of process servers. I helped design a task management system that brought structure, ownership, and visibility to their most complex workflows.",
  client: "Proof",
  role: "Product Designer",
  service: "UX Design",
  date: "2025-10-15",
  category: "Internal operations",
  cover: {
    src: `${dir}/proofops-cover.png`,
    width: 2560,
    height: 1607,
    alt: "ProofOPS tasks dashboard grouping tasks by due time, with tabs for task types such as chat, bad address, and SLA breach",
    fit: "contain",
  },
  blocks: [
    { type: "sectionHeading", id: "background", eyebrow: "Background", title: "Operations Task Manager @ Proof" },
    {
      type: "video",
      video: {
        src: "/video/proofops-background.mp4",
        width: 1856,
        height: 1080,
        label: "Walkthrough of the ProofOPS task manager",
        poster: {
          src: `${dir}/proofops-background-poster.jpg`,
          width: 1856,
          height: 1080,
          alt: "Still frame from the ProofOPS task manager walkthrough",
          fit: "contain",
        },
      },
    },
    {
      type: "text",
      paragraphs: [
        "Proof is a legal tech platform that handles service of process: the constitutional requirement that someone must be formally notified when they're sued. Proof's platform connects thousands of law firms with a nationwide network of vetted process servers.",
      ],
    },
    { type: "sectionHeading", id: "complexity", eyebrow: "Context", title: "Legal tech is complex." },
    {
      type: "text",
      paragraphs: [
        "Behind every successful serve is an ops team navigating layers of complexity: federal law, state law, county rules, court jurisdiction, judge preferences, client preferences. Can you serve on Sunday in Florida? Does this county require a notary? Is this a garnishment or a summons? Does that change the timeline?",
      ],
      callout: "Before this project, that knowledge lived in spreadsheets, Slack threads, and people's heads.",
    },
    {
      type: "image",
      size: "wide",
      image: {
        src: `${dir}/proofops-legal-complexity.png`,
        width: 2560,
        height: 1273,
        alt: "Layered diagram from federal law down to client preferences, annotated with examples such as Florida not allowing service on Sunday",
        fit: "contain",
      },
    },
    { type: "sectionHeading", id: "problem", eyebrow: "The problem", title: "There was no task system. At all." },
    {
      type: "text",
      paragraphs: [
        "Specialists worked from a dashboard that showed jobs needing attention, but there was no structure for what needed attention or who should handle it. The most common workflow was “babysitting”: a specialist would open 15–20 browser tabs, one per job, and watch them move through the serve lifecycle. When something needed action, they'd jump in. Then go back to watching.",
        "Work got distributed through Slack and tribal knowledge. A supervisor would say “hey, can someone look at the Smith case?” and whoever was available would grab it. A client could have five serves open with the same recurring issue and no one would notice — because people were thinking about individual jobs, not client relationships or task types.",
        "This created compounding problems:",
      ],
    },
    {
      type: "features",
      layout: "grid",
      items: [
        { title: "No ownership", body: "Enterprise clients paying premium rates got the same anonymous service as self-serve accounts. No one knew their history." },
        { title: "No visibility", body: "We couldn't measure performance because there was nothing to measure. Everyone did everything." },
        { title: "No specialization", body: "Some work requires deep expertise (affidavit prep, compliance review). Some requires speed (dispatch, basic QA). Treating all work as interchangeable meant neither got optimized." },
        { title: "No scalability", body: "Every acquisition, every new service line, every enterprise deal required ad-hoc workarounds. There was no model for how to organize work." },
      ],
    },
    {
      type: "image",
      size: "wide",
      image: {
        src: `${dir}/proofops-compounding-problems.png`,
        width: 1351,
        height: 529,
        alt: "The previous ops dashboard: stacked widgets for pending jobs, invoices, and affidavits with no task structure",
        fit: "contain",
      },
    },
    { type: "sectionHeading", id: "mapping-work", eyebrow: "Mapping work", title: "Mapping what “work” actually meant." },
    {
      type: "text",
      lead: "Before I could design a task system, I had to define what a task even was.",
      paragraphs: [
        "I mapped the complete job lifecycle, from the moment a job enters the platform to final completion, and identified every point where ops might need to act. This revealed 10+ distinct task types, each with different triggers, different required information, and different actions.",
        "The “babysitting” workflow existed because the system had no concept of these distinctions. A job needing dispatch looked the same as a job needing affidavit review. The only way to know was to open it and look.",
      ],
    },
    {
      type: "image",
      size: "full",
      image: {
        src: `${dir}/proofops-job-lifecycle-map.png`,
        width: 2560,
        height: 1607,
        alt: "Job lifecycle map across five stages, from job created to complete, with ops tasks, decision points, and external actions",
        fit: "contain",
      },
    },
    { type: "sectionHeading", id: "architecture", eyebrow: "System architecture", title: "A three-layer model: Teams, Roles, and Routing Logic." },
    {
      type: "diagram",
      kind: "teamsRolesRouting",
      caption: "How the three layers work together, summarized from the case study.",
    },
    {
      type: "features",
      layout: "rows",
      items: [
        {
          title: "Teams create client ownership",
          body: "Every client maps to a team. Enterprise clients get dedicated teams. Platform clients map regionally. Dispatch handles exceptions across all teams.",
          image: {
            src: `${dir}/proofops-teams.png`,
            width: 1006,
            height: 681,
            alt: "Team type selector with Enterprise, Platform, and Dispatch options",
            fit: "contain",
          },
        },
        {
          title: "Roles create specialization",
          body: "10 distinct roles, mapped from the lifecycle work. Each has clear responsibilities, required skills, and measurable outputs.",
          image: {
            src: `${dir}/proofops-roles.png`,
            width: 1440,
            height: 904,
            alt: "Role assignment list with QA Coordinator, QA Specialist, and Service Specialist and their responsibilities",
            fit: "contain",
          },
        },
        {
          title: "Routing logic creates predictability",
          body: "Tasks find the right person through rules, not luck. The system prioritizes continuity (same person on a client's work) while ensuring coverage.",
          image: {
            src: `${dir}/proofops-routing-logic.png`,
            width: 1440,
            height: 904,
            alt: "Task card for affidavit preparation, assigned to a specialist with a due date and checklist sub-tasks",
            fit: "contain",
          },
        },
      ],
    },
    { type: "sectionHeading", id: "documentation", eyebrow: "Documentation", title: "Documentation as a design artifact." },
    {
      type: "text",
      paragraphs: [
        "The complexity here — 10 roles, multiple team types, routing logic with fallbacks — couldn't live in wireframes. I wrote a comprehensive spec covering every task type: what triggers it, what information surfaces, what actions are available, SLA expectations, escalation paths.",
        "This document became the single source of truth for the build and survives today as institutional knowledge.",
      ],
    },
    {
      type: "image",
      size: "wide",
      image: {
        src: `${dir}/proofops-documentation.png`,
        width: 2880,
        height: 1808,
        alt: "Proof Ops documentation page for the attempt status update task, listing assignee, trigger, required information, SLA, escalation, and actions",
        fit: "contain",
      },
    },
    { type: "sectionHeading", id: "outcome", eyebrow: "Outcome", title: "From tabs to tasks." },
    {
      type: "features",
      layout: "grid",
      items: [
        { title: "Structured queues", body: "Specialists went from babysitting 15–20 browser tabs to working a structured queue." },
        { title: "Dedicated enterprise support", body: "When a paralegal calls, they reach someone who knows their account." },
        { title: "Measurable performance", body: "For the first time, we can see who's excelling and where training is needed." },
      ],
    },
  ],
};
