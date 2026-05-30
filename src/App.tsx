import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  exportPack,
  fractionTiles,
  lessonPlanText,
  navSections,
  weaveSteps,
  type DevicesSnapshot,
  type SignalSurfaceLink,
  type SupportLane,
  type TimelineId,
  type WorkspaceMode,
} from './data/lessonLoomData';
import { JudgeDemoTopbar, PresenterCaption } from './demo/JudgeDemoTopbar';
import { useLessonLoomDemo } from './demo/useLessonLoomDemo';
import { ClassroomSessionSpine } from './components/ClassroomSessionSpine';
import { useDemoUrlState, readDemoUrlOnLoad } from './hooks/useDemoUrlState';
import { useHashNavigationOnLoad } from './hooks/useHashNavigation';
import { SiteFooter } from './components/SiteFooter';
import { WeaveCompleteBanner } from './components/WeaveCompleteBanner';
import { useMotion } from './motion/motionContext';
import { useScrollToSection } from './motion/useScrollToSection';
import { DifferentiationUDL } from './components/sections/DifferentiationUDL';
import { ExportPackSection } from './components/sections/ExportPackSection';
import { HeroLanding } from './components/sections/HeroLanding';
import { LessonIntake } from './components/sections/LessonIntake';
import { LessonWeave } from './components/sections/LessonWeave';
import { LabsCaseStudy } from './components/sections/LabsCaseStudy';
import { MadeWithStitch } from './components/sections/MadeWithStitch';
import { ResponsivePreview } from './components/sections/ResponsivePreview';
import { ReviewSafety } from './components/sections/ReviewSafety';
import { StudentFractionGarden } from './components/sections/StudentFractionGarden';
import { TeacherConsole } from './components/sections/TeacherConsole';
import { TeachingSignal } from './components/sections/TeachingSignal';
import { StatusPip } from './components/ui/StatusPip';
import { WorkspaceModeToggle } from './components/ui/WorkspaceModeToggle';
import { createWeaveTimeline } from './motion/createWeaveTimeline';
import { LessonLoomSessionProvider } from './context/LessonLoomSessionContext';
import { downloadExportZip } from './utils/buildExportZip';
import { isEquivalentTileSelection } from './utils/fractionCheck';

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
  labs: '◆',
};

const urlOnLoad = readDemoUrlOnLoad();

export default function App() {
  const [lessonPlanDraft, setLessonPlanDraft] = useState(lessonPlanText);
  const [hasWoven, setHasWoven] = useState(urlOnLoad?.woven ?? false);
  const [activeWeaveStep, setActiveWeaveStep] = useState(() =>
    urlOnLoad?.woven ? weaveSteps.length - 1 : 0,
  );
  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>(
    urlOnLoad?.mode ?? 'student',
  );
  const [activeSupport, setActiveSupport] = useState<SupportLane>(
    urlOnLoad?.support ?? 'core',
  );
  const [selectedTileIds, setSelectedTileIds] = useState<string[]>(
    urlOnLoad?.tiles ?? [],
  );
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
  const [approved, setApproved] = useState(urlOnLoad?.approved ?? false);
  const [activeNav, setActiveNav] = useState('hero');
  const [highlightPhraseId, setHighlightPhraseId] = useState<string | null>(null);
  const [highlightSurface, setHighlightSurface] = useState<SignalSurfaceLink | null>(
    null,
  );
  const [weaveLiveMessage, setWeaveLiveMessage] = useState('');
  const uiTimeoutIds = useRef<number[]>([]);
  const highlightSurfaceTimeoutRef = useRef<number | null>(null);
  const weaveTimelineRef = useRef<ReturnType<typeof createWeaveTimeline>>(null);
  const prevHasWovenRef = useRef(false);

  const { reduced: prefersReducedMotion } = useMotion();
  const scrollTo = useScrollToSection();
  const studentAppActive =
    hasWoven && activeWeaveStep >= weaveSteps.length - 1;

  useHashNavigationOnLoad(prefersReducedMotion);

  const devicesSnapshot = useMemo<DevicesSnapshot>(
    () => ({
      woven: studentAppActive,
      workspaceMode,
      activeSupport,
      activeSegment,
      selectedTileLabels: selectedTileIds.map(
        (id) => fractionTiles.find((t) => t.id === id)?.label ?? id,
      ),
      approved,
      classMode,
    }),
    [
      studentAppActive,
      workspaceMode,
      activeSupport,
      activeSegment,
      selectedTileIds,
      approved,
      classMode,
    ],
  );

  const systemMapStep = useMemo(() => {
    if (approved) return 4;
    if (studentAppActive) return 3;
    if (hasWoven) return 1;
    return 0;
  }, [approved, studentAppActive, hasWoven]);

  const spineActiveIndex = useMemo(() => {
    if (approved || activeNav === 'export') return 4;
    if (activeNav === 'review') return 3;
    if (
      studentAppActive &&
      (activeNav === 'student' || activeNav === 'teacher' || activeNav === 'udl')
    ) {
      return 2;
    }
    if (hasWoven) return 1;
    return 0;
  }, [approved, activeNav, studentAppActive, hasWoven]);

  const demoUrlSnapshot = useMemo(
    () => ({
      woven: hasWoven && studentAppActive,
      mode: workspaceMode,
      tiles: selectedTileIds,
      approved,
      support: activeSupport,
    }),
    [
      hasWoven,
      studentAppActive,
      workspaceMode,
      selectedTileIds,
      approved,
      activeSupport,
    ],
  );

  useDemoUrlState({ snapshot: demoUrlSnapshot });

  const clearWeaveTimeline = () => {
    if (weaveTimelineRef.current) {
      weaveTimelineRef.current.kill();
      weaveTimelineRef.current = null;
    }
  };

  const clearUiTimeouts = () => {
    uiTimeoutIds.current.forEach((t) => window.clearTimeout(t));
    uiTimeoutIds.current = [];
    if (highlightSurfaceTimeoutRef.current !== null) {
      window.clearTimeout(highlightSurfaceTimeoutRef.current);
      highlightSurfaceTimeoutRef.current = null;
    }
    setHighlightSurface(null);
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

  const {
    demoRunning,
    demoCaptionIndex,
    applyDemoReset,
    applyDemoSuccessState,
    applyDemoReviewApproved,
    runJudgeDemo,
  } = useLessonLoomDemo(() => ({
    clearWeaveTimeline,
    clearUiTimeouts,
    setHasWoven,
    setActiveWeaveStep,
    setWorkspaceMode,
    setActiveSupport,
    setSelectedTileIds,
    setCopiedExportId,
    setDownloadNotice,
    setCheckSuccess,
    setCheckAttempted,
    setShowSuccessPulse,
    setReflectionText,
    setReflectionSaved,
    setReflectionTouched,
    setApproved,
    setWeaveLiveMessage,
    scrollTo,
    prefersReducedMotion,
    runWeaveSequence,
    setHighlightSurface,
    setActiveSegment,
    setClassMode,
  }));

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
    const initialTiles = urlOnLoad?.tiles;
    if (initialTiles?.length && isEquivalentTileSelection(initialTiles)) {
      setCheckAttempted(true);
      setCheckSuccess(true);
    }
  }, []);

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
    if (!hasWoven) return;
    const file = exportPack.find((f) => f.id === id);
    if (!file || !navigator.clipboard?.writeText) return;

    void navigator.clipboard
      .writeText(`${file.title}\n\n${file.body}`)
      .then(() => {
        setCopiedExportId(id);
        const t = window.setTimeout(() => setCopiedExportId(null), 1500);
        uiTimeoutIds.current.push(t);
      })
      .catch(() => {
        /* clipboard denied — do not show Copied */
      });
  };

  const handleDownload = () => {
    downloadExportZip({
      reflectionSaved,
      reflectionText,
      approved,
    });
    setDownloadNotice('Download started: lesson-loom-fraction-garden.zip');
    const t = window.setTimeout(() => setDownloadNotice(null), 3500);
    uiTimeoutIds.current.push(t);
  };

  const handleSignalSurfaceLink = useCallback(
    (target: SignalSurfaceLink, lane?: SupportLane) => {
      if (target === 'teacher') setWorkspaceMode('teacher');
      if (target === 'student') {
        setWorkspaceMode('student');
        setActiveSupport(lane ?? 'core');
      }
      if (target === 'udl') {
        setActiveSupport(lane ?? 'support');
      }
      const sectionId =
        target === 'udl' ? 'udl' : target === 'teacher' ? 'teacher' : 'student';
      if (highlightSurfaceTimeoutRef.current !== null) {
        window.clearTimeout(highlightSurfaceTimeoutRef.current);
      }
      setHighlightSurface(target);
      scrollTo(sectionId);
      highlightSurfaceTimeoutRef.current = window.setTimeout(() => {
        setHighlightSurface(null);
        highlightSurfaceTimeoutRef.current = null;
      }, 2000);
    },
    [scrollTo],
  );

  const handleSpineNavigate = useCallback(
    (sectionId: string) => {
      if (sectionId === 'teacher') setWorkspaceMode('teacher');
      if (sectionId === 'student') setWorkspaceMode('student');
      scrollTo(sectionId);
    },
    [scrollTo],
  );

  return (
    <div className={`app-shell${demoRunning ? ' app-shell--presenter' : ''}`}>
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

      <div
        className="app-main"
        data-workspace-mode={workspaceMode}
        data-session-spine={hasWoven || demoRunning ? 'true' : undefined}
      >
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
          <JudgeDemoTopbar
            demoRunning={demoRunning}
            demoCaptionIndex={demoCaptionIndex}
            onSceneReset={applyDemoReset}
            onSceneSuccess={applyDemoSuccessState}
            onSceneApproved={applyDemoReviewApproved}
            onRunJudgeDemo={runJudgeDemo}
          />
          <div className="app-topbar__status">
            <StatusPip label="All systems operational" tone="green" />
          </div>
          <p className="app-topbar__trust">
            Teacher first. Always.
            <br />
            You own the lesson.
          </p>
        </header>

        <ClassroomSessionSpine
          visible={hasWoven || demoRunning}
          activeStepIndex={spineActiveIndex}
          activeSupport={activeSupport}
          activeSegment={activeSegment}
          approved={approved}
          workspaceMode={workspaceMode}
          onNavigate={handleSpineNavigate}
        />

        {hasWoven && activeWeaveStep >= weaveSteps.length - 1 && (
          <WeaveCompleteBanner
            activeSupport={activeSupport}
            approved={approved}
            checkSuccess={checkSuccess}
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

        <LessonLoomSessionProvider
          hasWoven={hasWoven}
          studentAppActive={studentAppActive}
          approved={approved}
          workspaceMode={workspaceMode}
          activeSupport={activeSupport}
        >
        <main id="main-content" tabIndex={-1}>
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
            onChange={(next) => {
              setLessonPlanDraft(next);
              setHighlightPhraseId(null);
            }}
            onExtract={runWeaveSequence}
            highlightPhraseId={highlightPhraseId}
          />
          <LessonWeave
            hasWoven={hasWoven}
            activeWeaveStep={activeWeaveStep}
            onWeave={runWeaveSequence}
          />
          <TeachingSignal
            onWeave={runWeaveSequence}
            onHighlightSource={(signalId) => setHighlightPhraseId(signalId)}
            onSurfaceLink={handleSignalSurfaceLink}
          />
          <StudentFractionGarden
            activeSupport={activeSupport}
            classMode={classMode}
            surfaceHighlighted={highlightSurface === 'student'}
            selectedTileIds={selectedTileIds}
            onToggleTile={handleToggleTile}
            onReset={handleResetTiles}
            onCheck={handleCheck}
            checkSuccess={checkSuccess}
            checkAttempted={checkAttempted}
            showSuccessPulse={showSuccessPulse}
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
            reflectionSaved={reflectionSaved}
            reflectionText={reflectionText}
            surfaceHighlighted={highlightSurface === 'teacher'}
          />
          <DifferentiationUDL
            activeLane={activeSupport}
            onLaneChange={setActiveSupport}
            workspaceMode={workspaceMode}
            surfaceHighlighted={highlightSurface === 'udl'}
          />
          <ReviewSafety approved={approved} onApprove={() => setApproved(true)} />
          <ExportPackSection
            copiedExportId={copiedExportId}
            downloadNotice={downloadNotice}
            onCopy={handleExportCopy}
            onDownload={handleDownload}
          />
          <ResponsivePreview snapshot={devicesSnapshot} />
          <MadeWithStitch systemMapStep={systemMapStep} />
          <LabsCaseStudy />
        </main>
        </LessonLoomSessionProvider>

        <SiteFooter
          onResetDemo={applyDemoReset}
          onSuccessState={applyDemoSuccessState}
          onReviewApproved={applyDemoReviewApproved}
        />
      </div>

      <PresenterCaption visible={demoRunning} captionIndex={demoCaptionIndex} />
    </div>
  );
}
