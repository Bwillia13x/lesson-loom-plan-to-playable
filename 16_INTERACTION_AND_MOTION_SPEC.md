# Interaction and Motion Spec — Lesson Loom

## Principle

Motion should make the lesson transformation legible. It should not decorate the product into noise.

## Signature interaction: Lesson Weave

Trigger: user clicks **Weave lesson**.

State changes:

1. `hasWoven` becomes `true`.
2. Weave path nodes activate in sequence.
3. Teaching Signal cards reveal or brighten.
4. Student App Preview gains active state.
5. Export Pack remains available but visually becomes more meaningful after weaving.

Suggested timing:

```txt
0ms       CTA pressed
100ms     Objective node active
220ms     Visual model node active
340ms     Interaction node active
460ms     Checkpoint node active
580ms     Differentiation node active
700ms     Teacher guide node active
820ms     Student app node active
900ms+    Signal cards complete reveal
```

Use CSS transitions or simple timeouts. Avoid complex animation frameworks unless already installed.

## Fraction tile interaction

Each tile is a button.

States:

- default;
- hover;
- selected;
- correct set active;
- focus-visible.

When selected:

- tile border deepens;
- soft sage/lavender fill appears;
- selected garden bed preview updates if implemented.

Correct state:

- success message appears;
- progress pips mark complete;
- pale gold accent can appear.

Incorrect / incomplete state:

- do not punish;
- show hint: “Compare how much of the whole is shaded, not just the numbers.”

## Teacher/Student mode toggle

Use two buttons:

- Student view
- Teacher console

Default: Student view.

Interaction:

- switching mode should not reset selected tiles;
- mode switch should feel smooth, but content can swap instantly if reduced motion is active.

## Differentiation lanes

Use three buttons:

- Support
- Core
- Extend

Default: Core.

Each lane should:

- update headline/description;
- update three teacher moves;
- keep UDL checks visible.

## Export pack interaction

Each export card has a “Copy” or “Copy brief” button.

On click:

- set copied state;
- button label changes to “Copied” for roughly 1.5 seconds;
- no actual file download is required;
- optional: write a short text string to clipboard if safe/easy.

## Scroll behavior

Primary CTA may scroll to the Lesson Intake or Student App Preview after weaving.

If implementing scroll:

- use `element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })`;
- keep it optional; do not let scroll logic break the app.

## Reduced motion

Respect:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.001ms !important;
  }
}
```

But do not remove state changes. Reduced motion should still show all active states.

## Hover and focus

Every card with action should have:

- subtle hover lift or border change;
- visible focus ring;
- no hover-only information.

Recommended focus ring:

```css
:focus-visible {
  outline: 3px solid rgba(109, 114, 217, 0.35);
  outline-offset: 3px;
}
```

## What not to animate

Do not animate:

- large blocks of text repeatedly;
- every card constantly;
- background particles;
- fake typing unless extremely short and non-essential;
- anything that makes the teacher console hard to read.
