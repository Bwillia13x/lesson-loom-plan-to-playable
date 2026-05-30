# Styles partials

Entry point: [`index.css`](index.css) (imported from [`main.tsx`](../main.tsx)).

| File | Contents |
|------|----------|
| `tokens.css` | Design tokens, reset, global reduced-motion |
| `base.css` | Typography, skip link, utilities |
| `layout.css` | App shell, nav, topbar, presenter mode |
| `components.css` | Import hub for shared + section UI |
| `components-shared.css` | Panels, buttons, badges, garden, weave chrome |
| `components-sections.css` | Hero, signals, teacher, export, footer |
| `motion.css` | Weave path glow, `#student.ll-section--woven-active` panel ring |

Removed unused duplicate: `sections.css` (superseded by `components-sections.css`).

**Archived (2026-05-30):** unused 340-line legacy stylesheet (never imported) moved to [`docs/archive/styles/`](../../docs/archive/styles/). Active UI tokens live in `components-shared.css`.
