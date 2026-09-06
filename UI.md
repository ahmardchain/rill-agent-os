# Rill UI system

This file is mandatory for every website, web app, landing page, dashboard, mobile UI, frontend component, or other visual-interface change in this repository. Read it completely before implementation.

## Product, audience, purpose, personality

Rill is a procurement control surface for people building autonomous agents. It turns an abstract machine-payment workflow into a legible sequence: mandate, discovery, comparison, authorization, evidence return, and receipt. The audience is technically fluent but must be able to audit what the agent is doing at a glance.

The personality is precise, calm, and infrastructural: an editorial instrument rather than a speculative trading dashboard. It should feel trustworthy because hierarchy, language, timing, and evidence are clear—not because the interface adds security theatre.

## Visual direction

- Composition: a desktop split instrument with the mandate on mineral paper and the live route on deep estuary ink. On mobile, preserve the narrative order and redesign the route vertically rather than merely stacking desktop panels.
- Typography: Archivo Variable carries editorial hierarchy; IBM Plex Mono carries amounts, states, policy, and receipt evidence. Use width, rhythm, and contrast before containers.
- Color: paper and ink are structural; aqua means active flow, amber means authorization, and coral is reserved for a blocked or risky state. Color communicates state rather than decoration.
- Geometry: decisive rules, square or lightly eased corners, restrained shadows, and generous whitespace. Avoid card-inside-card layouts.
- Imagery: the route map is the product image. Every line, packet, node, and label must explain the workflow.
- Iconography: Lucide for interface actions; official Binance and Circle marks for their services. No emoji or fabricated company logos.
- Motion: draw routes during discovery, reveal quotes during comparison, send amber packets during authorization, return aqua packets during collection, and raise the receipt when complete. Respect `prefers-reduced-motion` without hiding state.

## Interaction and accessibility

- All controls need visible focus and a minimum 44px target.
- Do not rely on color alone for state; pair it with text, position, or iconography.
- Announce stage changes with a polite live region.
- Keep input labels persistent, amounts tabular, and simulation boundaries explicit.
- Verify narrow-phone, tablet, laptop, wide-desktop, keyboard, and reduced-motion behavior before release.

## Required resource review

Use every resource below as part of the design review. They are lenses on the same system; they are not permission to copy unrelated components or visual styles.

1. [UI Skills](https://ui-skills.com/) — interaction craft and visual-quality heuristics.
2. [Design System Checklist](https://www.designsystemchecklist.com/) — states, tokens, accessibility, and system completeness.
3. [Vibe Prompts](https://vibeprompts.dev/) — prompt-language anti-pattern check; remove generic generated-UI tropes.
4. [Rauno's interfaces](https://interfaces.rauno.me/) — restrained, physical interaction feedback.
5. [COSS UI](https://coss.com/ui/) — component composition and production detail.
6. [ReUI](https://reui.io/components) — behavior and accessibility references for complex controls.
7. [Component Gallery](https://component.gallery/) — cross-system comparison before inventing a pattern.
8. [Design Systems One](https://designsystems.one/) — naming, token, and governance discipline.
9. [Utopia](https://utopia.fyi/) — fluid type and spacing scales.
10. [Open Props](https://open-props.style/) — bounded easing, duration, and sizing primitives.
11. [Kinetics](https://kinetics.colorion.co/) — motion hierarchy and purposeful transitions.
12. [Animated Buttons](https://animatedbuttons.colorion.co/) — responsive action feedback without spectacle.
13. [Motion Primitives](https://motion-primitives.com/) — state-driven entrance, exit, and spatial continuity.
14. [Icon Creator](https://iconcreator.dev/) — icon proportion and optical consistency checks.
15. [Ibelick backgrounds](https://bg.ibelick.com/) — background restraint; use texture only when it reinforces information.

## Release questions

- Does this look specifically designed for machine procurement?
- Can someone understand what moved, what was authorized, and what came back?
- Are real marks used appropriately and all interface icons coherent?
- Is typography carrying hierarchy without excessive containers?
- Is each color and animated element semantic?
- Does mobile feel composed, not collapsed?
- Is the simulation boundary impossible to mistake for a real settlement claim?
