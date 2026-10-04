import type { Level } from '../types';

export type SkillCategory = 'cybersecurity' | 'programming' | 'ai' | 'tools';

export interface Skill {
  id: string;
  label: string;
  category: SkillCategory;
  level: Level;
  /** Where you used it. `null` = not filled in yet (a placeholder is shown). */
  usedIn: string | null;
  /** Project ids from projects.ts */
  projects: string[];
}

export interface SkillCategoryMeta {
  id: SkillCategory;
  label: string;
  blurb: string;
  /** Cluster centre, in % of the constellation canvas (desktop). */
  x: number;
  y: number;
}

export const skillCategories: SkillCategoryMeta[] = [
  { id: 'cybersecurity', label: 'Cybersecurity', blurb: 'Application-security focus', x: 26, y: 27 },
  { id: 'programming', label: 'Programming', blurb: 'Languages', x: 74, y: 27 },
  { id: 'ai', label: 'AI', blurb: 'Generative AI & LLMs', x: 26, y: 73 },
  { id: 'tools', label: 'Tools / Tech', blurb: 'Day-to-day tooling', x: 74, y: 73 },
];

/**
 * REVIEW THESE LEVELS. They are conservative defaults based only on what
 * was provided. Change a level to 'worked-with' / 'project' only when it is true,
 * and fill in `usedIn` with a real sentence.
 */
export const skills: Skill[] = [
  // ── Cybersecurity ─────────────────────────────────────────
  { id: 'application-security', label: 'Application Security', category: 'cybersecurity', level: 'learning', usedIn: null, projects: [] },
  { id: 'owasp', label: 'OWASP', category: 'cybersecurity', level: 'learning', usedIn: null, projects: [] },
  { id: 'web-security', label: 'Web Security', category: 'cybersecurity', level: 'learning', usedIn: null, projects: [] },
  { id: 'api-security', label: 'API Security', category: 'cybersecurity', level: 'learning', usedIn: null, projects: [] },
  { id: 'sast', label: 'SAST', category: 'cybersecurity', level: 'learning', usedIn: null, projects: [] },
  { id: 'dast', label: 'DAST', category: 'cybersecurity', level: 'learning', usedIn: null, projects: [] },
  { id: 'sca', label: 'SCA', category: 'cybersecurity', level: 'learning', usedIn: null, projects: [] },
  {
    id: 'threat-modeling',
    label: 'Threat Modeling',
    category: 'cybersecurity',
    level: 'learning',
    usedIn: 'Being applied to the in-progress AI Threat Model Generator.',
    projects: ['ai-threat-model'],
  },
  { id: 'vulnerability-management', label: 'Vulnerability Management', category: 'cybersecurity', level: 'learning', usedIn: null, projects: [] },

  // ── Programming ───────────────────────────────────────────
  {
    id: 'python',
    label: 'Python',
    category: 'programming',
    level: 'project',
    usedIn: 'AI / Streamlit application work, including InfluenceLens AI.',
    projects: ['influencelens'],
  },
  { id: 'java', label: 'Java', category: 'programming', level: 'learning', usedIn: null, projects: [] },
  { id: 'javascript', label: 'JavaScript', category: 'programming', level: 'worked-with', usedIn: 'Web development, including this portfolio (TypeScript / React).', projects: [] },
  { id: 'sql', label: 'SQL', category: 'programming', level: 'learning', usedIn: null, projects: [] },
  { id: 'html', label: 'HTML', category: 'programming', level: 'worked-with', usedIn: 'Web development, including this portfolio.', projects: [] },
  { id: 'css', label: 'CSS', category: 'programming', level: 'worked-with', usedIn: 'Web development, including this portfolio (Tailwind CSS).', projects: [] },

  // ── AI ────────────────────────────────────────────────────
  {
    id: 'generative-ai',
    label: 'Generative AI',
    category: 'ai',
    level: 'project',
    usedIn: 'AI-assisted analysis in InfluenceLens AI.',
    projects: ['influencelens'],
  },
  { id: 'multimodal-ai', label: 'Multimodal AI', category: 'ai', level: 'learning', usedIn: null, projects: [] },
  { id: 'llm-concepts', label: 'LLM concepts', category: 'ai', level: 'learning', usedIn: null, projects: [] },
  { id: 'rag', label: 'RAG', category: 'ai', level: 'learning', usedIn: null, projects: [] },
  { id: 'prompt-engineering', label: 'Prompt Engineering', category: 'ai', level: 'learning', usedIn: null, projects: [] },
  {
    id: 'ai-app-development',
    label: 'AI application development',
    category: 'ai',
    level: 'project',
    usedIn: 'Building AI-assisted apps with Python and Streamlit.',
    projects: ['influencelens', 'ai-full-stack'],
  },

  // ── Tools / Technologies ─────────────────────────────────
  { id: 'git', label: 'Git', category: 'tools', level: 'worked-with', usedIn: null, projects: [] },
  { id: 'github', label: 'GitHub', category: 'tools', level: 'worked-with', usedIn: null, projects: [] },
  {
    id: 'streamlit',
    label: 'Streamlit',
    category: 'tools',
    level: 'project',
    usedIn: 'AI app interfaces, including InfluenceLens AI.',
    projects: ['influencelens', 'ai-full-stack'],
  },
  { id: 'react', label: 'React', category: 'tools', level: 'project', usedIn: 'This portfolio website.', projects: [] },
  { id: 'vite', label: 'Vite', category: 'tools', level: 'project', usedIn: 'Build tooling for this portfolio website.', projects: [] },
];

export const skillById = (id: string): Skill | undefined => skills.find((s) => s.id === id);
