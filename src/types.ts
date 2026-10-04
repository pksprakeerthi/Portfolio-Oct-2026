/**
 * How honestly a topic/skill is represented on the site.
 *  - learning     : actively studying; no proficiency claimed
 *  - worked-with  : used hands-on (exercises, small builds)
 *  - project      : applied inside a project listed in the Case Files
 */
export type Level = 'learning' | 'worked-with' | 'project';

export const LEVEL_ORDER: Level[] = ['learning', 'worked-with', 'project'];

export const LEVEL_META: Record<Level, { label: string; description: string }> = {
  learning: {
    label: 'Learning',
    description: 'Actively studying — no proficiency claimed.',
  },
  'worked-with': {
    label: 'Worked With',
    description: 'Used hands-on in exercises or small builds.',
  },
  project: {
    label: 'Project Experience',
    description: 'Applied in a project listed in the Case Files.',
  },
};
