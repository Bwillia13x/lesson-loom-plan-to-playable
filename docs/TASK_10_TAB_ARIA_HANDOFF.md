# Task 10 — Tab ARIA handoff

**Date:** 2026-05-29  
**Choice:** **Option A — full WAI-ARIA tabs** (`tablist` / `tab` / `tabpanel` with `aria-controls`)

## Rationale

Both UDL lane pickers and the teacher timeline switch a single visible content region when the user picks an option. That matches the tabs pattern. Option B (`role="group"` + `aria-pressed`) would work for simple toggles but would not describe the linked detail panels under the controls.

Class mode in `TeacherConsole` already uses `role="group"` (not tabs) because it is a binary mode switch without a dedicated panel.

## Changes

### `DifferentiationUDL.tsx`

- `role="tablist"` on `.lane-tabs` (unchanged).
- Each lane button: `id="udl-tab-{lane}"`, `aria-controls="udl-lane-panel"`, `aria-selected`, `tabIndex` 0 / -1.
- Lane detail grid: `role="tabpanel"`, `id="udl-lane-panel"`, `aria-labelledby` points at the active tab.

### `TeacherConsole.tsx`

- `role="tablist"` on `.timeline` (unchanged).
- Each segment button: `id="teacher-tab-{id}"`, `aria-controls="teacher-segment-panel"`, `aria-selected`, `tabIndex` 0 / -1.
- Active segment `Panel`: wrapped in `role="tabpanel"`, `id="teacher-segment-panel"`, `aria-labelledby` on the active tab.

## Out of scope (Task 11)

- Arrow-key roving focus between tabs (not required for Task 10 acceptance).
- Automated tab keyboard smoke in `e2e/accessibility.spec.ts`.

## Verification

- `npm run build` — see command output in implementer session.
- Grep: no `role="tab"` without matching `tabpanel` + `aria-controls` in these files.
