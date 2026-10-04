/**
 * ════════════════════════════════════════════════════════════════
 *  EDIT YOUR LINKS HERE
 *  Leave a value as '' (empty) and the matching button shows up as a
 *  dashed "link not added yet" placeholder instead of a broken link.
 * ════════════════════════════════════════════════════════════════
 */
export const LINKS = {
  /** e.g. 'https://github.com/your-username' */
  github: 'https://github.com/pksprakeerthi',
  /** e.g. 'https://www.linkedin.com/in/your-handle' */
  linkedin: 'https://www.linkedin.com/in/p-prakeerthi/',
  /** e.g. 'you@example.com' (shown publicly on the site) */
  email: '',
  /** Put your PDF at  public/resume.pdf  — this path then just works. */
  resume: '/resume.pdf',
  /** Optional: public URL of your Cisco certificate / Credly badge. */
  ciscoCertificate: '',
};

export const profile = {
  fullName: 'P K S Prakeerthi',
  shortName: 'Prakeerthi',
  handle: 'pks_prakeerthi',
  role: 'CSE Student',
  education: 'B.Tech — Computer Science & Engineering',
  subtitle: 'Computer Science Student • Application Security • AI',
  headline: 'Building applications. Understanding how they break. Learning how to secure them.',
  summary:
    "I'm building toward a career in Application Security, with a growing focus on AI and LLM security.",
  resumeDownloadName: 'PKS_Prakeerthi_Resume.pdf',

  /** Recruiter mode content. `coreSkills` are skill ids from skills.ts */
  recruiter: {
    tags: ['CSE Student', 'Application Security', 'AI / LLM Security'],
    coreSkills: [
      'application-security',
      'owasp',
      'threat-modeling',
      'python',
      'generative-ai',
      'streamlit',
      'react',
    ],
    currentLearning: [
      'Application Security fundamentals — OWASP, SAST / DAST / SCA',
      'Threat modeling and vulnerability management',
      'AI / LLM security concepts — prompt injection, RAG and agent security',
      'Building AI applications with Python and Streamlit',
    ],
  },

  /** Output of the `whoami` terminal command (one entry per line). */
  whoami: [
    'pks_prakeerthi',
    '',
    'role:',
    'CSE Student',
    '',
    'focus:',
    'Application Security',
    '',
    'interests:',
    'Cybersecurity',
    'AI',
    'LLM Security',
    '',
    'status:',
    'BUILDING...',
  ],
};
