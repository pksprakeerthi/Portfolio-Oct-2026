export type ProjectStatus = 'In Progress' | 'Completed' | 'Details Pending';

export interface Project {
  id: string;
  caseNumber: string;
  title: string;
  tagline: string;
  status: ProjectStatus;
  /** One-line teaser shown in the case index. */
  summary: string;
  /** `null` = placeholder text is shown instead (nothing is invented). */
  problem: string | null;
  solution: string | null;
  techStack: string[];
  role: string | null;
  learned: string | null;
  securityRelevance: string | null;
  highlights: string[];
  links: { demo: string; github: string };
  /** Renders the illustrative credibility interface inside the case file. */
  visual?: 'credibility';
}

/**
 * Add a new project = add one object to this array. Nothing else to edit.
 * Leave a field as `null` / '' and the site shows a clear placeholder.
 */
export const projects: Project[] = [
  {
    id: 'influencelens',
    caseNumber: '001',
    title: 'InfluenceLens AI',
    tagline: 'AI-assisted credibility analysis',
    status: 'In Progress', // ← change to 'Completed' when it is
    summary:
      'An AI-assisted credibility analysis application focused on content in areas such as skincare & beauty, health & supplements, and food & beverages.',
    problem:
      'Online content about skincare & beauty, health & supplements, and food & beverages often makes claims that are hard to check quickly.',
    solution:
      'An AI-assisted application that analyzes the credibility of this kind of content and presents the result in a clear, visual interface.',
    techStack: ['Python', 'Streamlit', 'Generative AI'],
    role: null,
    learned: null,
    securityRelevance:
      'Judging how far AI-assisted output can be trusted — and how its claims are verified — is a core theme in AI and LLM security.',
    highlights: ['AI-assisted analysis', 'Credibility scoring', 'Streamlit interface'],
    links: { demo: '', github: '' },
    visual: 'credibility',
  },
  {
    id: 'pulse',
    caseNumber: '002',
    title: 'Pulse',
    tagline: 'AI agent that remembers problems and owners',
    status: 'Details Pending',
    summary:
      'An AI agent focused on organizational memory and incident ownership — remembering problems and who owns them.',
    problem:
      'Organizations lose track of recurring problems and of who owns them.',
    solution:
      'An AI agent built around organizational memory and incident ownership, so problems and their owners are remembered.',
    techStack: [],
    role: null,
    learned: null,
    securityRelevance: null,
    highlights: ['AI', 'Memory', 'Incident context', 'Ownership', 'Reasoning / interface'],
    links: { demo: '', github: '' },
  },
  {
    id: 'ai-threat-model',
    caseNumber: '003',
    title: 'AI Threat Model Generator',
    tagline: 'AI-assisted threat modeling',
    status: 'In Progress',
    summary: 'An AI-assisted threat modeling project. Currently in progress.',
    problem: null,
    solution: null,
    techStack: [],
    role: null,
    learned: null,
    securityRelevance:
      'Threat modeling is a core Application Security practice — and a natural bridge into AI / LLM threat modeling.',
    highlights: ['Threat modeling', 'AI-assisted', 'In progress'],
    links: { demo: '', github: '' },
  },
  {
    id: 'ai-full-stack',
    caseNumber: '004',
    title: 'AI Full Stack Projects',
    tagline: 'AI / Streamlit work',
    status: 'Details Pending',
    summary: 'A home for AI full-stack work built with Streamlit. Individual projects will be listed here.',
    problem: null,
    solution: null,
    techStack: ['Streamlit'],
    role: null,
    learned: null,
    securityRelevance: null,
    highlights: ['AI', 'Streamlit', 'Full stack'],
    links: { demo: '', github: '' },
  },
];

export const projectById = (id: string): Project | undefined => projects.find((p) => p.id === id);

/**
 * ILLUSTRATIVE sample values for the InfluenceLens interface mock-up.
 * These are demo numbers for the UI — not real analysis output.
 */
export const credibilitySamples = [
  { id: 'skincare', label: 'Skincare & Beauty', evidence: 82, source: 78, risk: 31, score: 82 },
  { id: 'health', label: 'Health & Supplements', evidence: 64, source: 59, risk: 52, score: 61 },
  { id: 'food', label: 'Food & Beverages', evidence: 71, source: 74, risk: 38, score: 72 },
];
