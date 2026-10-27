// Open roles for /careers. Add a role by appending to OPENINGS; the index,
// detail page, sitemap and JobPosting structured data all read from here.
// Remove (or comment out) a role once it's filled.

export const CAREERS_EMAIL = "enquire@codelogstech.com";

export type JobSection = {
  title: string;
  points: string[];
};

export type Opening = {
  slug: string;
  title: string;
  team: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  experience: string;
  location: string;
  /** ISO date the role was posted. */
  posted: string;
  icon: string;
  color: string;
  summary: string;
  about: string[];
  responsibilities: JobSection[];
  required: string[];
  preferred: string[];
  ideal: string;
  closing: string;
};

export const OPENINGS: Opening[] = [
  {
    slug: "product-manager",
    title: "Product Manager",
    team: "Product",
    type: "Full-time",
    experience: "3–6 years (flexible based on skills and experience)",
    location: "Udupi",
    posted: "2026-10-27",
    icon: "steps",
    color: "#0373fe",
    summary:
      "Own what gets built, why it matters and how well it solves the customer's problem, from requirements to release.",
    about: [
      "We are looking for a proactive and detail-oriented Product Manager to drive the planning, development, and continuous improvement of our software products. The ideal candidate will bridge the gap between business requirements, customer needs, design, and technology to ensure we build products that solve real-world problems and deliver measurable value.",
      "The Product Manager will own the product development lifecycle, from understanding customer requirements and defining product features to collaborating with developers, managing releases, and gathering feedback for continuous improvement.",
    ],
    responsibilities: [
      {
        title: "Product Strategy & Roadmap",
        points: [
          "Understand business objectives, customer needs, and market opportunities to define product priorities.",
          "Develop and maintain product roadmaps aligned with business goals.",
          "Identify opportunities to improve existing products and introduce new features.",
          "Evaluate competitor products, industry trends, and emerging technologies to identify areas for innovation.",
        ],
      },
      {
        title: "Requirements Gathering & Product Planning",
        points: [
          "Engage with customers, internal teams, and stakeholders to understand business workflows and pain points.",
          "Translate business requirements into clear product specifications, user stories, workflows, and acceptance criteria.",
          "Break down complex business processes into intuitive, user-friendly software features.",
          "Prioritize features and enhancements based on customer value, business impact, effort, and technical feasibility.",
          "Maintain a well-organized product backlog.",
          "Experience with Construction ERP or Construction Project Management software is an added advantage.",
        ],
      },
      {
        title: "UI/UX & Product Design",
        points: [
          "Collaborate with UI/UX designers to create intuitive user journeys, wireframes, prototypes, and screen specifications.",
          "Ensure product interfaces are practical, consistent, and easy to use.",
          "Review designs and validate that they accurately reflect business requirements.",
          "Participate in usability testing and incorporate feedback into product improvements.",
        ],
      },
      {
        title: "Development Team Coordination",
        points: [
          "Work closely with developers, QA engineers, designers, and technical leads throughout the development lifecycle.",
          "Explain requirements, clarify functionality, and resolve ambiguities during implementation.",
          "Participate in sprint planning, backlog refinement, sprint reviews, and release planning.",
          "Track development progress, identify dependencies, and help resolve blockers.",
          "Balance customer expectations, delivery timelines, product quality, and technical constraints.",
        ],
      },
      {
        title: "Testing & Quality Assurance",
        points: [
          "Define acceptance criteria and expected product behavior for every feature.",
          "Review completed features against requirements and coordinate user acceptance testing (UAT).",
          "Identify functional gaps, edge cases, and inconsistencies in workflows.",
          "Work with QA teams to ensure comprehensive test coverage.",
          "Validate fixes and ensure features are ready for release.",
        ],
      },
      {
        title: "Product Launch & Continuous Improvement",
        points: [
          "Coordinate feature releases, release notes, user documentation, and internal training.",
          "Collect and analyze customer feedback, usage patterns, and product performance.",
          "Monitor adoption, feature utilization, customer satisfaction, and other relevant product metrics.",
          "Recommend improvements based on data, customer feedback, and business outcomes.",
        ],
      },
    ],
    required: [
      "Bachelor's degree in Engineering, Computer Science, Business Administration, or a related field.",
      "3–6 years of experience in product management, business analysis, software implementation, or a similar role.",
      "Strong analytical, problem-solving, and critical-thinking skills.",
      "Excellent written and verbal communication skills.",
      "Ability to translate complex business requirements into clear and actionable specifications.",
      "Strong organizational skills and the ability to manage multiple priorities.",
      "Customer-focused mindset with an eye for detail and usability.",
      "Ability to work effectively with cross-functional teams.",
    ],
    preferred: [
      "Experience working with SaaS products or enterprise software.",
      "Basic understanding of APIs, databases, integrations, and software architecture.",
      "Experience conducting customer interviews, competitor analysis, and usability testing.",
      "Experience working in a product-led or technology-driven organization.",
    ],
    ideal:
      "We are looking for someone who takes ownership, thinks from the customer's perspective, and can connect business problems with practical technology solutions. The ideal candidate is comfortable asking the right questions, challenging assumptions, documenting requirements clearly, and working hands-on with the development team to turn ideas into reliable software products.",
    closing:
      "The right candidate does not simply manage tasks; they take ownership of what gets built, why it matters, and how successfully it solves the customer's problem.",
  },
];

export function openingBySlug(slug: string) {
  return OPENINGS.find((o) => o.slug === slug);
}

export function applyHref(o: Opening) {
  return `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(`Application: ${o.title}`)}`;
}
