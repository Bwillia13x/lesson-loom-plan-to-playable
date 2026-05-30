import { useCallback, useEffect, useRef, useState } from 'react';
import {
  equivalentCanonicalIds,
  exportPack,
  navSections,
  teachingSignals,
  type SupportLane,
  type TimelineId,
  type WorkspaceMode,
} from '../data/lessonLoomData';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import { isEquivalentTileSelection } from '../utils/fractionCheck';
import { delay, scrollToSection } from '../utils/scroll';

const FINAL_SIGNAL_STEP = teachingSignals.length - 1;

export function useLessonLoomFlow() {
  const [hasWoven, setHasWoven] = useState(false);
  const [activeWeaveStep, setActiveWeaveStep] = useState(0);
  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>('student');
  const [activeSupport, setActiveSupport] = useState<SupportLane>('core');
  const [selectedTileIds, setSelectedTileIds] = useState<string[]>([]);
  const [copiedExportId, setCopiedExportId] = useState<string | null>(null);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);
  const [checkSuccess, setCheckSuccess] = useState(false);
  const [showSuccessPulse, setShowSuccessPulse] = useState(false);
  const [activeSegment, setActiveSegment] = useState<TimelineId>('partner');
  const [classMode, setClassMode] = useState<'whole' | 'groups'>('whole');
  const [approved, setApproved] = useState(false);
  const [activeNav, setActiveNav] = useState('hero');
  const [demoRunning, setDemoRunning] = useState(false);
  const [weaveLiveMessage, setWeaveLiveMessage] = useState('');

  const weaveTimers = useRef<number[]>([]);
  const uiTimers = useRef<number[]>([]);
  const prevHasWovenRef = useRef(false);

  const prefersReducedMotion = usePrefersReducedMotion();
  const scrollBehavior: ScrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

  const scrollTo = useCallback(
    (id: string) => scrollToSection(id, scrollBehavior),
    [scrollBehavior],
  );

  const clearWeaveTimers = () => {
    weaveTimers.current.forEach((t) => window.clearTimeout(t));
    weaveTimers.current = [];
  };

  const clearUiTimers = () => {
    uiTimers.current.forEach((t) => window.clearTimeout(t));
    uiTimers.current = [];
  };

  const runWeaveSequence = useCallback(() => {
    clearWeaveTimers();
    setHasWoven(true);
    setActiveWeaveStep(0);
    scrollTo('weave');

    if (prefersReducedMotion) {
      setActiveWeaveStep(FINAL_SIGNAL_STEP);
      return;
    }

    const delays = [100, 220, 340, 460, 580, 700, 820];
    delays.forEach((delayMs, index) => {
      const timer = window.setTimeout(() => {
        setActiveWeaveStep(index);
      }, delayMs);
      weaveTimers.current.push(timer);
    });

    const finalTimer = window.setTimeout(() => {
      setActiveWeaveStep(FINAL_SIGNAL_STEP);
    }, 940);
    weaveTimers.current.push(finalTimer);
  }, [prefersReducedMotion, scrollTo]);

  useEffect(() => {
    return () => {
      clearWeaveTimers();
      clearUiTimers();
    };
  }, []);

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
    setShowSuccessPulse(false);
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
    const success = isEquivalentTileSelection(selectedTileIds);
    setCheckSuccess(success);
    if (success) {
      setShowSuccessPulse(true);
      const t = window.setTimeout(() => setShowSuccessPulse(false), 700);
      uiTimers.current.push(t);
    }
  }, [selectedTileIds]);

  const handleResetTiles = () => {
    setSelectedTileIds([]);
    setCheckSuccess(false);
    setShowSuccessPulse(false);
  };

  const handleExportCopy = useCallback(
    (id: string) => {
      if (!hasWoven) return;
      const file = exportPack.find((f) => f.id === id);
      if (!file || !navigator.clipboard?.writeText) return;

      void navigator.clipboard
        .writeText(`${file.title}\n\n${file.preview}`)
        .then(() => {
          setCopiedExportId(id);
          const t = window.setTimeout(() => setCopiedExportId(null), 1500);
          uiTimers.current.push(t);
        })
        .catch(() => {
          /* clipboard denied — do not show Copied */
        });
    },
    [hasWoven],
  );

  const handleDownload = useCallback(() => {
    if (!hasWoven) return;
    setDownloadNotice(
      'Demo prototype: download is a visual preview only. Use Copy on each export card for handoff text.',
    );
    const t = window.setTimeout(() => setDownloadNotice(null), 4000);
    uiTimers.current.push(t);
  }, [hasWoven]);

  const runJudgeDemo = useCallback(async () => {
    if (demoRunning) return;
    setDemoRunning(true);
    setApproved(false);
    setCheckSuccess(false);
    setSelectedTileIds([]);

    runWeaveSequence();
    await delay(prefersReducedMotion ? 300 : 1100);

    setWorkspaceMode('student');
    setSelectedTileIds([...equivalentCanonicalIds]);
    scrollTo('student');
    await delay(400);

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

  return {
    hasWoven,
    activeWeaveStep,
    workspaceMode,
    activeSupport,
    selectedTileIds,
    copiedExportId,
    downloadNotice,
    checkSuccess,
    showSuccessPulse,
    activeSegment,
    classMode,
    approved,
    activeNav,
    demoRunning,
    weaveLiveMessage,
    prefersReducedMotion,
    scrollTo,
    runWeaveSequence,
    handleWorkspaceModeChange,
    handleToggleTile,
    handleCheck,
    handleResetTiles,
    handleExportCopy,
    handleDownload,
    runJudgeDemo,
    setActiveSupport,
    setActiveSegment,
    setClassMode,
    setApproved,
  };
}
