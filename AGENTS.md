# Rill contributor contract

## Product boundary

Rill is a policy and receipt layer for machine-resource procurement. It is not a trading signal bot, wallet, exchange, or payment provider. The interactive site is a clearly labelled simulation; code and copy must never imply that a payment settled when only an authorization was produced.

## UI / UX — mandatory

Read `UI.md` completely before writing or modifying interface code. Treat its full resource list as a review checklist, not an optional menu.

- Preserve Rill's split procurement-instrument composition, pale mineral paper, estuary teal ink, sharp geometry, and editorial typography.
- Do not introduce generic SaaS sections, decorative glass, gratuitous gradients, fake metrics, nested cards, or emoji icons.
- Use real brand marks when appropriate and one consistent professional icon family for interface symbols.
- Keep visible keyboard focus, semantic state announcements, 44px minimum interactive targets, responsive layouts designed for their viewport, and `prefers-reduced-motion` parity.
- Motion must explain discovery, authorization, return, or state change. Decoration alone is not a reason to animate.

## Agent safety

- Prefer public read-only Binance MCP market context for the demo.
- Never trade, transfer, bridge, or custody funds without explicit user instruction and confirmation.
- Reject duplicate request fingerprints, disallowed providers, incomplete routes, invalid prices, and resources over policy caps.
- Return `READY`, `REVIEW`, or `BLOCK` with reasons and a deterministic receipt.

## Completion checks

Run `npm test`. For interface work, also verify the primary flow at desktop and mobile widths, keyboard focus, reduced-motion behavior, readable contrast, and a clean application console.
