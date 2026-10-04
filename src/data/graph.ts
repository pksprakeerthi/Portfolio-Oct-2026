import type { Level } from '../types';

export interface GraphNode {
  id: string;
  label: string;
  level: Level | null;
  summary: string;
  focus: string[];
  related: string[];
}

/** The centre of the knowledge graph. */
export const graphCenter: GraphNode = {
  id: 'center',
  label: 'PRAKEERTHI',
  level: null,
  summary:
    'B.Tech Computer Science & Engineering student building toward Application Security, with a growing focus on AI and LLM security.',
  focus: ['Application Security', 'Cybersecurity', 'AI application development', 'Web development'],
  related: ['appsec', 'cybersecurity', 'ai', 'ai-security'],
};

/** Orbiting nodes. Order = clockwise from the top. */
export const graphNodes: GraphNode[] = [
  {
    id: 'cybersecurity',
    label: 'Cybersecurity',
    level: 'learning',
    summary: 'Foundations first. Completed Cisco — Introduction to Cybersecurity and continuing from there.',
    focus: ['Security fundamentals', 'Cisco — Introduction to Cybersecurity (completed)'],
    related: ['appsec', 'ai-security'],
  },
  {
    id: 'appsec',
    label: 'Application Security',
    level: 'learning',
    summary: 'The main career direction: understanding how applications break, and how to secure them.',
    focus: [
      'Web & API Security',
      'OWASP',
      'SAST / DAST / SCA',
      'Threat Modeling',
      'Vulnerability Management',
      'DevSecOps',
    ],
    related: ['cybersecurity', 'webdev', 'ai-security'],
  },
  {
    id: 'ai',
    label: 'AI',
    level: 'project',
    summary: 'Building AI-assisted applications, starting with InfluenceLens AI.',
    focus: [
      'Generative AI',
      'Multimodal AI',
      'LLM concepts',
      'RAG',
      'Prompt engineering',
      'AI application development',
    ],
    related: ['python', 'ai-security'],
  },
  {
    id: 'webdev',
    label: 'Web Development',
    level: 'worked-with',
    summary: 'Building front-ends and web apps — this portfolio is one of them.',
    focus: ['React', 'Vite', 'JavaScript', 'HTML', 'CSS'],
    related: ['appsec', 'python'],
  },
  {
    id: 'python',
    label: 'Python',
    level: 'project',
    summary: 'The language behind the AI / Streamlit application work.',
    focus: ['Streamlit apps', 'AI application development'],
    related: ['ai', 'webdev'],
  },
  {
    id: 'java',
    label: 'Java',
    level: 'learning',
    summary: 'Programming fundamentals. (Placeholder — add what you have built with Java.)',
    focus: ['Object-oriented fundamentals'],
    related: ['python'],
  },
  {
    id: 'ai-security',
    label: 'AI/LLM Security',
    level: 'learning',
    summary: 'The next focus area: how AI and LLM-powered systems fail — and how to defend them.',
    focus: [
      'Prompt injection',
      'Jailbreaks',
      'RAG security',
      'Tool / agent security',
      'LLM threat modeling',
      'Guardrails',
    ],
    related: ['ai', 'appsec', 'cybersecurity'],
  },
];

/** Extra links between orbiting nodes (centre links are added automatically). */
export const graphEdges: [string, string][] = [
  ['cybersecurity', 'appsec'],
  ['appsec', 'webdev'],
  ['appsec', 'ai-security'],
  ['ai', 'ai-security'],
  ['ai', 'python'],
  ['webdev', 'python'],
  ['python', 'java'],
];
