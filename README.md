# PKS_SYSTEM — Interactive Portfolio

React + TypeScript + Vite + Tailwind CSS + Framer Motion + Lucide.

## Run it

```bash
cd pks-portfolio
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
npm run preview    # serve the production build
```

## Where to edit things

| What | File |
| --- | --- |
| GitHub / LinkedIn / email / resume path / Cisco certificate URL | `src/data/profile.ts` → `LINKS` |
| Name, headline, recruiter-mode text, `whoami` output | `src/data/profile.ts` → `profile` |
| Projects (add a new one = add one object) | `src/data/projects.ts` |
| Project GitHub / demo links | `links: { demo, github }` inside each project |
| Skills and their honest level (`learning` / `worked-with` / `project`) | `src/data/skills.ts` |
| Security Lab topics | `src/data/lab.ts` |
| Mind-map nodes | `src/data/graph.ts` |
| Learning-journey stages, "you are here" marker, Cisco milestone | `src/data/journey.ts` |

An empty string (`''`) for any link renders a dashed **"add link"** placeholder instead of a dead link.

## Resume

Put your PDF at **`public/resume.pdf`**. Every resume button then works (served at `/resume.pdf`).

## Honesty defaults

Skill and lab levels are conservative defaults (mostly **Learning**). Review `src/data/skills.ts`,
`src/data/lab.ts` and project statuses in `src/data/projects.ts`, and change them only to what is true.
The InfluenceLens credibility numbers are illustrative sample values for the UI mock-up and are labelled as such.

## Features

Boot sequence (skippable, remembered in `localStorage`) · constellation hero · knowledge-graph "Who am I" ·
Security Lab · case-file drawer (Esc / X / click outside) · skill constellation · learning journey ·
Recruiter Mode · `Ctrl/Cmd + K` command palette · `whoami` terminal · reduced-motion support.
