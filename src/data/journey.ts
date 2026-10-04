export type JourneyState = 'done' | 'current' | 'next';

export interface JourneyStage {
  id: string;
  title: string;
  state: JourneyState;
  summary: string;
  details: string[];
}

/**
 * EDIT `state` to move the highlighted "you are here" marker.
 * Exactly one stage should be 'current'.
 */
export const journey: JourneyStage[] = [
  {
    id: 'fundamentals',
    title: 'Cybersecurity Fundamentals',
    state: 'done',
    summary: 'Where the security side began.',
    details: ['Cisco — Introduction to Cybersecurity (completed)'],
  },
  {
    id: 'ai-full-stack',
    title: 'AI Full Stack',
    state: 'done',
    summary: 'Building AI-assisted applications end to end.',
    details: ['AI / Streamlit application work', 'InfluenceLens AI'],
  },
  {
    id: 'web-development',
    title: 'Web Development',
    state: 'done',
    summary: 'Front-end and web foundations.',
    details: ['React, Vite, JavaScript, HTML, CSS', 'This interactive portfolio'],
  },
  {
    id: 'application-security',
    title: 'Application Security',
    state: 'current',
    summary: 'The current focus: how applications break, and how to secure them.',
    details: [
      'OWASP and web / API security',
      'SAST / DAST / SCA',
      'Threat modeling',
      'Vulnerability management',
    ],
  },
  {
    id: 'ai-llm-security',
    title: 'AI / LLM Security',
    state: 'next',
    summary: 'The long-term direction.',
    details: [
      'Prompt injection and jailbreaks',
      'RAG security',
      'Tool / agent security',
      'LLM threat modeling and guardrails',
    ],
  },
];

/** Subtle "what's after this" nodes. Edit freely. */
export const nextNodes: string[] = [
  'Finish the AI Threat Model Generator',
  'More hands-on Application Security projects',
  'Add your next goal here',
];

export const ciscoMilestone = {
  title: 'Cisco — Introduction to Cybersecurity',
  status: 'Completed',
  // Certificate URL lives in LINKS.ciscoCertificate (src/data/profile.ts).
  // No certificate number or date is shown on purpose.
};
