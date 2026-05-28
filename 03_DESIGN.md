# DESIGN.md — Lesson Loom Visual System

_Last updated: 2026-05-27_  
_Project: Lesson Loom — Plan to Playable_

## 1. Design thesis

Lesson Loom should feel like a calm, premium classroom studio: part lesson planner, part interactive learning canvas, part trusted teacher companion.

It should not feel like generic SaaS, a children’s game, or a loud edtech dashboard.

The aesthetic should communicate:

- teacher control;
- warmth;
- clarity;
- craft;
- trust;
- visual richness;
- calm intelligence.

## 2. Visual keywords

Use:

- warm ivory;
- paper texture feeling;
- soft sage / garden green;
- deep navy / graphite text;
- lavender-blue system accents;
- pale gold success accents;
- thin linework;
- woven path motif;
- quiet grid marks;
- tactile fraction tiles;
- rounded but precise cards;
- editorial spacing.

Avoid:

- neon gradients;
- robot imagery;
- generic AI brain icons;
- cluttered dashboards;
- cartoon overload;
- childish primary colors;
- stock teacher/student illustrations;
- excessive glassmorphism;
- dark cyberpunk themes.

## 3. Palette

Use CSS variables.

```css
:root {
  --ll-bg: #f7f2e8;
  --ll-bg-soft: #fbf8f1;
  --ll-paper: #fffdf7;
  --ll-paper-warm: #f2eadc;
  --ll-ink: #112035;
  --ll-graphite: #2e3440;
  --ll-muted: #667085;
  --ll-line: rgba(17, 32, 53, 0.12);
  --ll-line-strong: rgba(17, 32, 53, 0.22);
  --ll-sage: #8fae8b;
  --ll-sage-deep: #4f7652;
  --ll-mint: #dcebd6;
  --ll-lavender: #b7b8f3;
  --ll-lavender-deep: #6d72d9;
  --ll-gold: #d8aa4f;
  --ll-rose: #df8f7a;
  --ll-blue-soft: #dbeafe;
  --ll-shadow: 0 24px 80px rgba(17, 32, 53, 0.12);
  --ll-shadow-soft: 0 16px 44px rgba(17, 32, 53, 0.08);
}
```

## 4. Typography

Recommended font strategy:

- Display / headline: serif or editorial face if available; otherwise `Georgia` fallback.
- UI / body: `Inter`, `Geist`, or system sans.
- Mono labels: `SFMono-Regular`, `ui-monospace`, `Menlo`.

CSS:

```css
:root {
  --ll-font-display: Georgia, 'Times New Roman', serif;
  --ll-font-ui: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --ll-font-mono: 'SFMono-Regular', ui-monospace, Menlo, Monaco, Consolas, monospace;
}
```

Type scale:

- Hero headline: clamp(3rem, 8vw, 7.2rem), line-height 0.92
- Section headline: clamp(2rem, 4vw, 4rem), line-height 0.98
- Card title: 1.05rem to 1.35rem
- Body: 0.95rem to 1.05rem
- Small labels: 0.72rem to 0.82rem, uppercase, letter-spacing 0.08em

## 5. Layout system

Max width:

- Desktop content: 1180px to 1240px.
- Hero grid: 2 columns, 44% / 56% or 48% / 52%.
- Section padding: 96px desktop, 56px tablet, 36px mobile.

Use generous whitespace. The product should look confident, not dense.

## 6. Components

### Cards

Cards should look like warm paper with subtle elevation.

```css
.card {
  background: linear-gradient(180deg, rgba(255,253,247,0.98), rgba(247,242,232,0.92));
  border: 1px solid var(--ll-line);
  border-radius: 28px;
  box-shadow: var(--ll-shadow-soft);
}
```

### Buttons

Primary:

- deep navy background;
- ivory text;
- soft lavender/sage halo on hover;
- rounded pill or rounded rectangle;
- clear focus ring.

Secondary:

- transparent/paper background;
- thin border;
- navy text;
- subtle fill on hover.

### Badges

Small, mono, uppercase.

Use for:

- Teacher reviewed
- Draft only
- No student data
- UDL check
- Printable fallback

### Fraction tiles

Tiles should feel tactile and manipulable.

Visual style:

- rounded rectangles;
- soft garden colors;
- label fractions clearly;
- selected state with ring and raised shadow;
- equivalent match state with gold/sage accent.

### Weave line

Use SVG or CSS line.

Visual:

- thin path;
- woven/dashed or gradient stroke;
- starts lavender, moves through sage/gold;
- active pulse travels along the path.

Do not use heavy neon glow.

## 7. Motion design

Motion should feel like “weaving,” not “loading.”

Recommended timings:

- Card entrance: 300–500ms.
- Weave path: 1200–1800ms.
- Hover lift: 160–220ms.
- Tab transition: 200–280ms.
- Success pulse: 400–650ms.

Easing:

```css
--ease-out-soft: cubic-bezier(.22, .8, .24, 1);
--ease-in-out-soft: cubic-bezier(.65, 0, .35, 1);
```

Reduced motion:

- Disable path animation.
- Use instant card activation.
- Preserve visual state changes.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

## 8. Section design notes

### Hero

Make it submission-screenshot worthy.

Composition:

- left side: copy and CTAs;
- right side: layered lesson plan → woven line → interactive app preview;
- background: warm ivory with quiet grid and soft radial glow.

### Lesson Intake

Should feel familiar and teacher-owned.

Use document-like card, not chatbot UI.

### Teaching Signal Board

Should feel like an instructional design audit.

Cards should be small but legible, with source phrase chips.

### Student App Preview

This is the most visual section.

Make Fraction Garden look playful but refined.

Use garden-bed metaphor:

- soil/beds as rounded containers;
- fraction tiles as plots;
- soft grid;
- progress pips as seeds/growth markers.

### Teacher Console

Should feel practical.

Avoid novelty for novelty’s sake. Teachers need timing, prompts, misconceptions, and next steps.

### Differentiation / UDL

Use a calm three-lane layout.

Support / Core / Extend should be visually distinct but not stigmatizing.

### Review & Safety

Trustworthy and restrained.

Use checklists, not fear messaging.

### Export Pack

Use the Build Passport idea.

Cards should feel like real artifacts:

- `stitch-prompt.md`
- `DESIGN.md`
- `teacher-guide.pdf`
- `printable-worksheet.pdf`
- `student-activity-spec.md`
- `implementation-notes.md`

## 9. Icons

Use thin line icons if available. Otherwise use small text labels and simple shapes.

Suggested metaphors:

- loom / thread / weave;
- garden bed;
- tile;
- compass;
- clipboard;
- checkmark;
- document;
- spark / signal node.

Avoid graduation caps and generic schoolhouse icons unless very subtle.

## 10. Copy voice

Plain, warm, confident.

Use:

- “teacher-approved”;
- “classroom-ready draft”;
- “interactive lesson interface”;
- “printable fallback”;
- “student activity”;
- “teacher console.”

Avoid:

- “revolutionize education”;
- “replace planning”;
- “AI tutor for every child”;
- “automated personalization”;
- “official curriculum generator.”

## 11. Accessibility

- Text contrast should be strong.
- Buttons need visible focus.
- Do not rely on hue only for selected states.
- Use semantic HTML.
- Provide labels for interactive tiles.
- Keep target sizes finger-friendly on mobile.

## 12. Desired emotional effect

The user should think:

> “This is beautiful, useful, and plausible. I can immediately imagine a teacher using it.”
