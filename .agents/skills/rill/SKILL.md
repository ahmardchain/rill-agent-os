---
name: rill
description: Plan x402-style machine-resource procurement for an agent task while enforcing a user-set USDC budget, vendor trust, per-resource limits, duplicate protection, human approval, and deterministic receipts. Use when an agent needs paid data, search, inference, compute, or verification.
---

# Rill

Rill is a policy and receipt layer for agent procurement. A user supplies a job and a maximum budget; Rill translates the job into required capabilities, evaluates machine-priced resources, selects the lowest-cost complete route allowed by policy, and returns an auditable decision.

## Required inputs

Collect all of the following before making a decision:

- task identifier and plain-language job;
- budget and currency;
- required resource capabilities;
- provider quotes and vendor identities;
- unique request fingerprints;
- fingerprints paid previously;
- active vendor, recurring-charge, per-resource, and human-approval policy.

Never invent missing evidence. If required evidence cannot be obtained, return `BLOCK` and explain what is missing.

## Binance Agent OS context

When current market context is relevant and the Binance MCP server is available, use its public, read-only market-data tools. Cite the returned symbol and timestamp in the final evidence.

Do not call a Binance trade or transfer tool unless the user explicitly requests that exact action and confirms the final parameters. Rill itself plans authorization; it does not claim that a payment settled without a real provider response or transaction result.

## Workflow

1. Translate the job into the smallest complete set of required capabilities.
2. Gather eligible provider quotes without treating unverified marketing claims as evidence.
3. Reject untrusted vendors, invalid prices, duplicates, recurring charges, and quotes above the per-resource limit.
4. Run `node .agents/skills/rill/scripts/plan-procurement.mjs '<json>'`, or pass a JSON file with `--file`.
5. Present the selected route, rejected quotes, exact total, and policy version before any authorization.
6. Require human confirmation when the active policy returns `REVIEW`.
7. After every real payment attempt, record only the returned status. Never infer settlement from intent.
8. Return the deterministic SHA-256 procurement receipt.

## Decision contract

- `READY` — the lowest-cost complete route fits the active policy and budget.
- `REVIEW` — a complete route exists but exceeds the human-approval threshold.
- `BLOCK` — the job cannot be procured safely from the supplied evidence and policy.

The planner returns `taskId`, `task`, `currency`, `budget`, `selected`, `rejected`, `missing`, `total`, `decision`, `reasons`, `policyVersion`, and `receipt`.

## Safety boundary

Rill governs and records procurement permission. It does not custody funds, guarantee provider output, recommend investments, or describe simulated authorization as a settled payment.
