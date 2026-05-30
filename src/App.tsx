import { navSections } from './data/lessonLoomData';
import { ClassroomSessionSpine } from './components/ClassroomSessionSpine';
import { SiteFooter } from './components/SiteFooter';
import { LabsCaseStudy } from './components/sections/LabsCaseStudy';
import { WeaveCompleteBanner } from './components/WeaveCompleteBanner';
import { useLessonLoomFlow } from './hooks/useLessonLoomFlow';
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
import { Button } from './components/ui/Button';
import { StatusPip } from './components/ui/StatusPip';
import { WorkspaceModeToggle } from './components/ui/WorkspaceModeToggle';

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

export default function App() {
  const flow = useLessonLoomFlow();

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {flow.weaveLiveMessage}
      </div>

      <nav className="app-nav" aria-label="Section navigation">
        <div className="app-nav__logo" title="Lesson Loom">
          LL
        </div>
        {navSections.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`app-nav__link ${flow.activeNav === item.id ? 'app-nav__link--active' : ''}`}
            onClick={() => flow.scrollTo(item.id)}
            aria-label={item.label}
            title={item.label}
          >
            <span className="app-nav__icon" aria-hidden="true">
              {navIcons[item.id] ?? '•'}
            </span>
          </button>
        ))}
      </nav>

      <div className="app-main" data-workspace-mode={flow.workspaceMode}>
        <header className="app-topbar">
          <div>
            <div className="app-topbar__title">Lesson Loom</div>
            <div className="app-topbar__subtitle">
              Turn a teacher-approved lesson plan into an interactive classroom interface.
            </div>
          </div>
          <WorkspaceModeToggle
            mode={flow.workspaceMode}
            onChange={flow.handleWorkspaceModeChange}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => void flow.runJudgeDemo()}
            disabled={flow.demoRunning}
            data-testid="run-judge-demo"
          >
            {flow.demoRunning ? 'Running demo…' : 'Run judge demo'}
          </Button>
          <div className="app-topbar__status">
            <StatusPip label="Demo prototype · No student data" tone="green" />
          </div>
          <p className="app-topbar__trust">
            Teacher first. Always.
            <br />
            You own the lesson.
          </p>
        </header>

        <ClassroomSessionSpine
          visible={flow.hasWoven || flow.demoRunning}
          activeStepIndex={flow.spineActiveIndex}
          activeSupport={flow.activeSupport}
          activeSegment={flow.activeSegment}
          approved={flow.approved}
          workspaceMode={flow.workspaceMode}
          onNavigate={flow.handleSpineNavigate}
        />

        {flow.hasWoven && flow.studentAppActive && (
          <WeaveCompleteBanner
            activeSupport={flow.activeSupport}
            approved={flow.approved}
            checkSuccess={flow.checkSuccess}
            onStudent={() => {
              flow.handleWorkspaceModeChange('student');
            }}
            onTeacher={() => {
              flow.handleWorkspaceModeChange('teacher');
            }}
            onExport={() => flow.scrollTo('export')}
          />
        )}

        <main id="main-content">
          <HeroLanding
            hasWoven={flow.hasWoven}
            reducedMotion={flow.prefersReducedMotion}
            onWeave={flow.runWeaveSequence}
            onViewDemo={() => {
              flow.handleWorkspaceModeChange('student');
            }}
          />
          <LessonIntake onExtract={flow.runWeaveSequence} />
          <LessonWeave
            hasWoven={flow.hasWoven}
            activeWeaveStep={flow.activeWeaveStep}
            onWeave={flow.runWeaveSequence}
          />
          <TeachingSignal
            hasWoven={flow.hasWoven}
            activeWeaveStep={flow.activeWeaveStep}
            onWeave={flow.runWeaveSequence}
          />
          <StudentFractionGarden
            studentAppActive={flow.studentAppActive}
            activeSupport={flow.activeSupport}
            classMode={flow.classMode}
            selectedTileIds={flow.selectedTileIds}
            onToggleTile={flow.handleToggleTile}
            onReset={flow.handleResetTiles}
            onCheck={flow.handleCheck}
            checkSuccess={flow.checkSuccess}
            showSuccessPulse={flow.showSuccessPulse}
          />
          <TeacherConsole
            activeSegment={flow.activeSegment}
            onSegmentChange={flow.setActiveSegment}
            classMode={flow.classMode}
            onClassModeChange={flow.setClassMode}
          />
          <DifferentiationUDL
            activeLane={flow.activeSupport}
            onLaneChange={flow.setActiveSupport}
          />
          <ReviewSafety approved={flow.approved} onApprove={() => flow.setApproved(true)} />
          <ExportPackSection
            hasWoven={flow.hasWoven}
            approved={flow.approved}
            copiedExportId={flow.copiedExportId}
            downloadNotice={flow.downloadNotice}
            onCopy={flow.handleExportCopy}
            onDownload={flow.handleDownload}
          />
          <ResponsivePreview />
          <MadeWithStitch />
          <LabsCaseStudy />
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
