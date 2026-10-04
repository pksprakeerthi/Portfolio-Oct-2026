import type { Level } from '../types';

export interface LabTopic {
  name: string;
  level: Level;
  note?: string;
}

export interface LabTarget {
  id: 'web' | 'api' | 'ai';
  label: string;
  tagline: string;
  topics: LabTopic[];
}

/**
 * Conservative defaults: everything is "learning" until YOU change it.
 * Switch a topic to 'worked-with' or 'project' only when that is true.
 */
export const labTargets: LabTarget[] = [
  {
    id: 'web',
    label: 'WEB',
    tagline: 'How web applications break — and how to build them so they don’t.',
    topics: [
      { name: 'OWASP', level: 'learning' },
      { name: 'Authentication', level: 'learning' },
      { name: 'Authorization', level: 'learning' },
      { name: 'XSS', level: 'learning' },
      { name: 'SQL Injection', level: 'learning' },
      { name: 'Secure coding', level: 'learning' },
    ],
  },
  {
    id: 'api',
    label: 'API',
    tagline: 'The attack surface behind every modern front-end.',
    topics: [
      { name: 'API Security', level: 'learning' },
      { name: 'Authentication', level: 'learning' },
      { name: 'Authorization', level: 'learning' },
      { name: 'Input validation', level: 'learning' },
      { name: 'Rate limiting', level: 'learning' },
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    tagline: 'Where application security meets LLM-powered systems — the long-term direction.',
    topics: [
      { name: 'Prompt Injection', level: 'learning' },
      { name: 'Jailbreaks', level: 'learning' },
      { name: 'RAG Security', level: 'learning' },
      { name: 'Tool / Agent Security', level: 'learning' },
      { name: 'LLM Threat Modeling', level: 'learning' },
      { name: 'Guardrails', level: 'learning' },
    ],
  },
];
