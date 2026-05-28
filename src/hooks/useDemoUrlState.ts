import { useEffect, useRef } from 'react';
import {
  fractionTiles,
  type SupportLane,
  type WorkspaceMode,
} from '../data/lessonLoomData';

export type DemoUrlSnapshot = {
  woven: boolean;
  mode: WorkspaceMode;
  tiles: string[];
  approved: boolean;
  support: SupportLane;
};

const DEMO_PARAM_KEYS = ['w', 'mode', 'tiles', 'approved', 'support'] as const;

const VALID_MODES = new Set<WorkspaceMode>(['student', 'teacher']);
const VALID_SUPPORT = new Set<SupportLane>(['support', 'core', 'extend']);
const VALID_TILE_IDS = new Set(fractionTiles.map((tile) => tile.id));

function parseTiles(raw: string | null): string[] {
  if (!raw) return [];
  return raw
    .split(',')
    .map((id) => id.trim())
    .filter((id) => id.length > 0 && VALID_TILE_IDS.has(id));
}

/** Parse shareable demo params from a query string (no PII). */
export function parseDemoUrlState(search: string): Partial<DemoUrlSnapshot> | null {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  const hasDemoParams = DEMO_PARAM_KEYS.some((key) => params.has(key));
  if (!hasDemoParams) return null;

  const snapshot: Partial<DemoUrlSnapshot> = {};

  if (params.has('w')) {
    snapshot.woven = params.get('w') === '1';
  }

  const mode = params.get('mode');
  if (mode && VALID_MODES.has(mode as WorkspaceMode)) {
    snapshot.mode = mode as WorkspaceMode;
  }

  if (params.has('tiles')) {
    snapshot.tiles = parseTiles(params.get('tiles'));
  }

  if (params.has('approved')) {
    snapshot.approved = params.get('approved') === '1';
  }

  const support = params.get('support');
  if (support && VALID_SUPPORT.has(support as SupportLane)) {
    snapshot.support = support as SupportLane;
  }

  return snapshot;
}

/** Read demo params from the current location on first load. */
export function readDemoUrlOnLoad(): Partial<DemoUrlSnapshot> | null {
  if (typeof window === 'undefined') return null;
  return parseDemoUrlState(window.location.search);
}

/** Serialize demo state to short query params (omit defaults). */
export function buildDemoSearch(snapshot: DemoUrlSnapshot): string {
  const params = new URLSearchParams();

  if (snapshot.woven) {
    params.set('w', '1');
  }

  if (snapshot.mode !== 'student') {
    params.set('mode', snapshot.mode);
  }

  if (snapshot.tiles.length > 0) {
    params.set('tiles', snapshot.tiles.join(','));
  }

  if (snapshot.approved) {
    params.set('approved', '1');
  }

  if (snapshot.support !== 'core') {
    params.set('support', snapshot.support);
  }

  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

export function replaceDemoUrl(snapshot: DemoUrlSnapshot): void {
  if (typeof window === 'undefined') return;
  const search = buildDemoSearch(snapshot);
  const hash = window.location.hash;
  const next = `${window.location.pathname}${search}${hash}`;
  if (`${window.location.pathname}${window.location.search}${hash}` !== next) {
    window.history.replaceState(null, '', next);
  }
}

type UseDemoUrlStateOptions = {
  snapshot: DemoUrlSnapshot;
  /** Debounce URL writes (ms). */
  debounceMs?: number;
};

/**
 * Keeps `?w=&mode=&tiles=&approved=&support=` in sync with app demo state.
 * Hydrate once via `readDemoUrlOnLoad()` in App state initializers.
 */
export function useDemoUrlState({
  snapshot,
  debounceMs = 150,
}: UseDemoUrlStateOptions): void {
  const timerRef = useRef<number | null>(null);
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      replaceDemoUrl(snapshot);
      return;
    }

    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      replaceDemoUrl(snapshot);
      timerRef.current = null;
    }, debounceMs);

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [snapshot, debounceMs]);
}
