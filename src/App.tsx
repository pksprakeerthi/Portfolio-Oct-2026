import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import {
  Download,
  FlaskConical,
  FolderOpen,
  Github,
  Linkedin,
  Mail,
  RotateCcw,
  Route as RouteIcon,
  ScanSearch,
  Sparkles,
  Terminal as TerminalIcon,
  User,
} from 'lucide-react';
import BootSequence from './components/BootSequence';
import CustomCursor from './components/CustomCursor';
import FloatingNav from './components/FloatingNav';
import type { Command } from './components/CommandPalette';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Journey from './sections/Journey';
import Contact from './sections/Contact';
import RecruiterView from './sections/RecruiterView';
import { NAV_IDS } from './data/navigation';
import { LINKS, profile } from './data/profile';
import { projectById } from './data/projects';
import { useActiveSection } from './hooks/useActiveSection';
import { isLinkSet } from './lib/links';
import { storage } from './lib/storage';

// Heavier / below-the-fold pieces are code-split.
const SecurityLab = lazy(() => import('./sections/SecurityLab'));
const Skills = lazy(() => import('./sections/Skills'));
const CommandPalette = lazy(() => import('./components/CommandPalette'));
const Terminal = lazy(() => import('./components/Terminal'));
const CaseFileDrawer = lazy(() => import('./components/CaseFileDrawer'));

const INTRO_KEY = 'pks:intro-seen:v1';

function SectionFallback({ id }: { id: string }) {
  return <div id={id} className="min-h-[60vh]" aria-hidden="true" />;
}

export default function App() {
  const [booted, setBooted] = useState<boolean>(() => storage.get(INTRO_KEY) === '1');
  const [recruiter, setRecruiter] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);

  const active = useActiveSection(NAV_IDS, booted && !recruiter);

  const enter = useCallback(() => {
    storage.set(INTRO_KEY, '1');
    setBooted(true);
    window.scrollTo({ top: 0 });
  }, []);

  const goTo = useCallback(
    (id: string) => {
      const run = () => document.getElementById(id)?.scrollIntoView({ block: 'start' });
      if (recruiter) {
        setRecruiter(false);
        window.setTimeout(run, 80);
      } else {
        run();
      }
    },
    [recruiter],
  );

  const toggleRecruiter = useCallback(() => {
    setRecruiter((r) => !r);
    window.scrollTo({ top: 0 });
  }, []);

  const closeProject = useCallback(() => setOpenProjectId(null), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);
  const closeTerminal = useCallback(() => setTerminalOpen(false), []);

  const openExternal = useCallback((url: string) => {
    if (isLinkSet(url)) window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  // Ctrl/Cmd + K toggles the command palette
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const commands: Command[] = useMemo(
    () => [
      { id: 'who', label: 'Who am I?', hint: 'About', keywords: 'about mind map', icon: User, run: () => goTo('about') },
      { id: 'projects', label: 'Explore projects', hint: 'Case files', keywords: 'work case files', icon: FolderOpen, run: () => goTo('projects') },
      { id: 'lab', label: 'Open security lab', hint: 'Lab', keywords: 'web api ai security', icon: FlaskConical, run: () => goTo('lab') },
      { id: 'skills', label: 'View skills', hint: 'Constellation', keywords: 'technologies tools', icon: Sparkles, run: () => goTo('skills') },
      { id: 'journey', label: 'Learning journey', hint: 'Timeline', keywords: 'timeline progress cisco', icon: RouteIcon, run: () => goTo('journey') },
      {
        id: 'recruiter',
        label: recruiter ? 'Exit recruiter mode' : 'Recruiter mode',
        hint: '30-second view',
        keywords: 'summary hire',
        icon: ScanSearch,
        run: toggleRecruiter,
      },
      {
        id: 'resume',
        label: 'Download resume',
        hint: LINKS.resume,
        keywords: 'cv pdf',
        icon: Download,
        run: () => {
          const a = document.createElement('a');
          a.href = LINKS.resume;
          a.download = profile.resumeDownloadName;
          document.body.appendChild(a);
          a.click();
          a.remove();
        },
      },
      {
        id: 'github',
        label: 'Open GitHub',
        hint: isLinkSet(LINKS.github) ? 'External link' : 'link not added yet',
        icon: Github,
        run: () => openExternal(LINKS.github),
      },
      {
        id: 'linkedin',
        label: 'Open LinkedIn',
        hint: isLinkSet(LINKS.linkedin) ? 'External link' : 'link not added yet',
        icon: Linkedin,
        run: () => openExternal(LINKS.linkedin),
      },
      { id: 'contact', label: 'Contact me', hint: 'Contact', keywords: 'email reach', icon: Mail, run: () => goTo('contact') },
      { id: 'terminal', label: 'Open terminal', hint: 'whoami, help…', keywords: 'shell easter egg', icon: TerminalIcon, run: () => setTerminalOpen(true) },
      {
        id: 'intro',
        label: 'Replay intro',
        hint: 'Boot sequence',
        icon: RotateCcw,
        run: () => {
          storage.remove(INTRO_KEY);
          setRecruiter(false);
          setBooted(false);
        },
      },
    ],
    [goTo, openExternal, recruiter, toggleRecruiter],
  );

  const project = openProjectId ? (projectById(openProjectId) ?? null) : null;

  return (
    <MotionConfig reducedMotion="user">
      <CustomCursor />

      <AnimatePresence>{!booted && <BootSequence key="boot" onEnter={enter} />}</AnimatePresence>

      {booted && (
        <>
          <a href="#main" className="skip-link">
            Skip to content
          </a>

          {!recruiter && (
            <FloatingNav
              active={active}
              onNavigate={goTo}
              onPalette={() => setPaletteOpen(true)}
              onRecruiter={toggleRecruiter}
              onTerminal={() => setTerminalOpen(true)}
            />
          )}

          <main id="main">
            {recruiter ? (
              <RecruiterView onExit={toggleRecruiter} onOpenProject={setOpenProjectId} />
            ) : (
              <>
                <Hero onExplore={() => goTo('projects')} />
                <About />
                <Suspense fallback={<SectionFallback id="lab" />}>
                  <SecurityLab />
                </Suspense>
                <Projects onOpen={setOpenProjectId} />
                <Suspense fallback={<SectionFallback id="skills" />}>
                  <Skills onOpenProject={setOpenProjectId} />
                </Suspense>
                <Journey />
                <Contact />
              </>
            )}
          </main>

          <button
            type="button"
            onClick={() => setTerminalOpen((o) => !o)}
            aria-label="Toggle terminal"
            aria-expanded={terminalOpen}
            className="glass fixed bottom-4 left-4 z-40 hidden h-11 w-11 items-center justify-center rounded-full text-slate-400 transition-colors hover:text-volt md:inline-flex"
          >
            <TerminalIcon className="h-4 w-4" aria-hidden="true" />
          </button>

          <Suspense fallback={null}>
            <CaseFileDrawer project={project} onClose={closeProject} />
            <CommandPalette open={paletteOpen} onClose={closePalette} commands={commands} />
            <Terminal open={terminalOpen} onClose={closeTerminal} />
          </Suspense>
        </>
      )}
    </MotionConfig>
  );
}
