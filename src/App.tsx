import { useCallback, useEffect, useRef, useState } from 'react';
import {
  exportPack,
  lessonPlanText,
  navSections,
  weaveSteps,
  type SupportLane,
  type TimelineId,
  type WorkspaceMode,
} from './data/lessonLoomData';
import { SiteFooter } from './components/SiteFooter';
import { WeaveCompleteBanner } from './components/WeaveCompleteBanner';
import { useMotion } from './motion/motionContext';
import { useScrollToSection } from './motion/useScrollToSection';
import { DifferentiationUDL } from './components/sections/DifferentiationUDL';
import { ExportPackSection } from './components/sections/ExportPackSection';
import { HeroLanding } from './components/sections/HeroLanding';
import { LessonIntake } from './components/sections/LessonIntake';
import { LessonWeave } from './components/sections/LessonWeave';
import { MadeWithStitch } from './components/sections/MadeWithStitch';
import { ResponsivePreview } from './components/sections/ResponsivePreview';
import { ReviewSafety } from './components/sections/ReviewSafety';
import { StudentFractionGarden } from './components/sections/StudentFractionGarden';
import { TeacherConsole } from './components/sections/TeacherConsole';
import { TeachingSignal } from './components/sections/TeachingSignal';
import { IndustrialButton } from './components/ui/IndustrialButton';
import { StatusPip } from './components/ui/StatusPip';
import { WorkspaceModeToggle } from './components/ui/WorkspaceModeToggle';
import { createWeaveTimeline } from './motion/createWeaveTimeline';
import { downloadExportZip } from './utils/buildExportZip';
import { isEquivalentTileSelection } from './utils/fractionCheck';
import { delay } from './utils/scroll';

const navIcons: Record<string, string> = {
  hero: '⌂',
  intake: '✎',
  weave: '◎',
  signals: '◈',
  student: '◇',
  teacher: '▣',
  udl: '≡',
  review: '✓',
  export: '⬇',
  devices: '▭',
  stitch: '✦',
};

const CANONICAL_TILES = ['one-half', 'two-fourths', 'three-sixths'];

export default function App() {
  const [lessonPlanDraft, setLessonPlanDraft] = useState(lessonPlanText);
  const [hasWoven, setHasWoven] = useState(false);
  const [activeWeaveStep, setActiveWeaveStep] = useState(0);
  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>('student');
  const [activeSupport, setActiveSupport] = useState<SupportLane>('core');
  const [selectedTileIds, setSelectedTileIds] = useState<string[]>([]);
  const [copiedExportId, setCopiedExportId] = useState<string | null>(null);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);
  const [checkSuccess, setCheckSuccess] = useState(false);
  const [checkAttempted, setCheckAttempted] = useState(false);
  const [showSuccessPulse, setShowSuccessPulse] = useState(false);
  const [reflectionText, setReflectionText] = useState('');
  const [reflectionSaved, setReflectionSaved] = useState(false);
  const [reflectionTouched, setReflectionTouched] = useState(false);
  const [activeSegment, setActiveSegment] = useState<TimelineId>('partner');
  const [classMode, setClassMode] = useState<'whole' | 'groups'>('whole');
  const [approved, setApproved] = useState(false);
  const [activeNav, setActiveNav] = useState('hero');
  const [demoRunning, setDemoRunning] = useState(false);
  const [weaveLiveMessage, setWeaveLiveMessage] = useState('');
  const uiTimeoutIds = useRef<number[]>([]);
  const weaveTimelineRef = useRef<ReturnType<typeof createWeaveTimeline>>(null);
  const prevHasWovenRef = useRef(false);

  const { reduced: prefersReducedMotion } = useMotion();
  const scrollTo = useScrollToSection();
  const studentAppActive =
    hasWoven && activeWeaveStep >= weaveSteps.length - 1;

  const clearWeaveTimeline = () => {
    if (weaveTimelineRef.current) {
      weaveTimelineRef.current.kill();
      weaveTimelineRef.current = null;
    }
  };

  const clearUiTimeouts = () => {
    uiTimeoutIds.current.forEach((t) => window.clearTimeout(t));
    uiTimeoutIds.current = [];
  };

  const runWeaveSequence = useCallback(() => {
    clearWeaveTimeline();
    clearUiTimeouts();
    setHasWoven(true);
    setActiveWeaveStep(-1);
    scrollTo('weave');

    weaveTimelineRef.current = createWeaveTimeline(
      setActiveWeaveStep,
      prefersReducedMotion,
    );
  }, [prefersReducedMotion, scrollTo]);

  useEffect(
    () => () => {
      clearWeaveTimeline();
      clearUiTimeouts();
    },
    [],
  );

  useEffect(() => {
    if (hasWoven && !prevHasWovenRef.current) {
      setWeaveLiveMessage(
        'Lesson woven. Teaching signal extracted and ready to explore.',
      );
    }
    prevHasWovenRef.current = hasWoven;
  }, [hasWoven]);

  useEffect(() => {
    const ids = navSections.map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveNav(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.25, 0.5] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleWorkspaceModeChange = (mode: WorkspaceMode) => {
    setWorkspaceMode(mode);
    scrollTo(mode === 'student' ? 'student' : 'teacher');
  };

  const handleToggleTile = (id: string) => {
    setCheckSuccess(false);
    setCheckAttempted(false);
    setShowSuccessPulse(false);
    setReflectionSaved(false);
    setReflectionTouched(false);
    setSelectedTileIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };

  const handleCheck = useCallback(() => {
    setCheckAttempted(true);
    const success = isEquivalentTileSelection(selectedTileIds);
    setCheckSuccess(success);
    if (success) {
      setShowSuccessPulse(true);
      const t = window.setTimeout(() => setShowSuccessPulse(false), 700);
      uiTimeoutIds.current.push(t);
    }
  }, [selectedTileIds]);

  const handleResetTiles = () => {
    setSelectedTileIds([]);
    setCheckSuccess(false);
    setCheckAttempted(false);
    setShowSuccessPulse(false);
    setReflectionText('');
    setReflectionSaved(false);
    setReflectionTouched(false);
  };

  const handleSaveReflection = () => {
    setReflectionSaved(true);
    setReflectionTouched(true);
  };

  const handleExportCopy = (id: string) => {
    const file = exportPack.find((f) => f.id === id);
    if (file && navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(file.body);
    }
    setCopiedExportId(id);
    const t = window.setTimeout(() => setCopiedExportId(null), 1500);
    uiTimeoutIds.current.push(t);
  };

  const handleDownload = () => {
    downloadExportZip();
    setDownloadNotice('Download started: lesson-loom-fraction-garden.zip');
    const t = window.setTimeout(() => setDownloadNotice(null), 3500);
    uiTimeoutIds.current.push(t);
  };

  const runJudgeDemo = useCallback(async () => {
    if (demoRunning) return;
    setDemoRunning(true);
    setApproved(false);
    setCheckSuccess(false);
    setCheckAttempted(false);
    setSelectedTileIds([]);
    setReflectionText('');
    setReflectionSaved(false);
    setReflectionTouched(false);

    runWeaveSequence();
    await delay(prefersReducedMotion ? 300 : 1100);

    setWorkspaceMode('student');
    setSelectedTileIds(CANONICAL_TILES);
    scrollTo('student');
    await delay(400);

    setCheckAttempted(true);
    setCheckSuccess(true);
    setShowSuccessPulse(true);
    await delay(prefersReducedMotion ? 200 : 800);

    setWorkspaceMode('teacher');
    scrollTo('teacher');
    await delay(prefersReducedMotion ? 200 : 600);

    scrollTo('review');
    setApproved(true);
    await delay(300);

    scrollTo('export');
    setDemoRunning(false);
  }, [demoRunning, prefersReducedMotion, runWeaveSequence, scrollTo]);

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {weaveLiveMessage}
      </div>

      <nav className="app-nav" aria-label="Section navigation">
        <div className="app-nav__logo" title="Lesson Loom">
          LL
        </div>
        {navSections.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`app-nav__link ${activeNav === item.id ? 'app-nav__link--active' : ''}`}
            onClick={() => scrollTo(item.id)}
            aria-label={item.label}
            title={item.label}
          >
            <span className="app-nav__icon" aria-hidden="true">
              {navIcons[item.id] ?? '•'}
            </span>
          </button>
        ))}
      </nav>

      <div className="app-main" data-workspace-mode={workspaceMode}>
        <header className="app-topbar">
          <div>
            <div className="app-topbar__title">Lesson Loom</div>
            <div className="app-topbar__subtitle">
              Turn a teacher-approved lesson plan into an interactive classroom interface.
            </div>
          </div>
          <WorkspaceModeToggle
            mode={workspaceMode}
            onChange={handleWorkspaceModeChange}
          />
          <IndustrialButton
            variant="ghost"
            size="sm"
            onClick={() => void runJudgeDemo()}
            disabled={demoRunning}
            data-testid="run-judge-demo"
          >
            {demoRunning ? 'Running demo…' : 'Run judge demo'}
          </IndustrialButton>
          <div className="app-topbar__status">
            <StatusPip label="All systems operational" tone="green" />
          </div>
          <p className="app-topbar__trust">
            Teacher first. Always.
            <br />
            You own the lesson.
          </p>
        </header>

        {hasWoven && activeWeaveStep >= weaveSteps.length - 1 && (
          <WeaveCompleteBanner
            onStudent={() => {
              setWorkspaceMode('student');
              scrollTo('student');
            }}
            onTeacher={() => {
              setWorkspaceMode('teacher');
              scrollTo('teacher');
            }}
            onExport={() => scrollTo('export')}
          />
        )}

        <main id="main-content">
          <HeroLanding
            hasWoven={hasWoven}
            lessonPlanDraft={lessonPlanDraft}
            onWeave={runWeaveSequence}
            onViewDemo={() => {
              setWorkspaceMode('student');
              scrollTo('student');
            }}
          />
          <LessonIntake
            value={lessonPlanDraft}
            onChange={setLessonPlanDraft}
            onExtract={runWeaveSequence}
          />
          <LessonWeave
            hasWoven={hasWoven}
            activeWeaveStep={activeWeaveStep}
            onWeave={runWeaveSequence}
          />
          <TeachingSignal hasWoven={hasWoven} onWeave={runWeaveSequence} />
          <StudentFractionGarden
            selectedTileIds={selectedTileIds}
            onToggleTile={handleToggleTile}
            onReset={handleResetTiles}
            onCheck={handleCheck}
            checkSuccess={checkSuccess}
            checkAttempted={checkAttempted}
            showSuccessPulse={showSuccessPulse}
            studentAppActive={studentAppActive}
            reflectionText={reflectionText}
            reflectionSaved={reflectionSaved}
            reflectionTouched={reflectionTouched}
            onReflectionChange={setReflectionText}
            onReflectionTouch={() => setReflectionTouched(true)}
            onSaveReflection={handleSaveReflection}
          />
          <TeacherConsole
            activeSegment={activeSegment}
            onSegmentChange={setActiveSegment}
            classMode={classMode}
            onClassModeChange={setClassMode}
          />
          <DifferentiationUDL
            activeLane={activeSupport}
            onLaneChange={setActiveSupport}
          />
          <ReviewSafety approved={approved} onApprove={() => setApproved(true)} />
          <ExportPackSection
            hasWoven={hasWoven}
            copiedExportId={copiedExportId}
            downloadNotice={downloadNotice}
            onCopy={handleExportCopy}
            onDownload={handleDownload}
          />
          <ResponsivePreview />
          <MadeWithStitch />
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
