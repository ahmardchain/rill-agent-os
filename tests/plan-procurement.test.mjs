import assert from "node:assert/strict";
import test from "node:test";

import { planProcurement } from "../.agents/skills/rill/scripts/plan-procurement.mjs";

const base = {
  taskId: "brief_24h",
  task: "Find what moved BTC volatility in the last 24 hours and return a verified brief.",
  budget: 5,
  requiredCapabilities: ["news", "compute", "proof"],
  paidFingerprints: [],
  quotes: [
    { vendor: "context.index", capability: "news", price: 0.18, requestFingerprint: "news:btc:24h" },
    { vendor: "other.index", capability: "news", price: 0.3, requestFingerprint: "news:btc:other" },
    { vendor: "quant.compute", capability: "compute", price: 0.42, requestFingerprint: "compute:btc:volatility" },
    { vendor: "proof.layer", capability: "proof", price: 0.08, requestFingerprint: "proof:btc:brief" },
  ],
  policy: {
    version: "2.0",
    maxPerResource: 1,
    humanApprovalAbove: 2,
    allowedVendors: ["context.index", "other.index", "quant.compute", "proof.layer"],
  },
};

test("selects the lowest-cost complete route", () => {
  const result = planProcurement(base);
  assert.equal(result.decision, "READY");
  assert.equal(result.total, 0.68);
  assert.deepEqual(result.selected.map((quote) => quote.vendor), ["context.index", "quant.compute", "proof.layer"]);
  assert.equal(result.receipt, "070d951e478c75059adc111cdd7fafce31d20da33a7f0e2de4521ab8ff161d65");
});

test("requires review above the approval threshold", () => {
  const result = planProcurement({ ...base, policy: { ...base.policy, humanApprovalAbove: 0.5 } });
  assert.equal(result.decision, "REVIEW");
  assert.deepEqual(result.reasons, ["HUMAN_APPROVAL_REQUIRED"]);
});

test("blocks a duplicate request fingerprint", () => {
  const result = planProcurement({ ...base, paidFingerprints: ["compute:btc:volatility"] });
  assert.equal(result.decision, "BLOCK");
  assert.ok(result.missing.includes("compute"));
  assert.ok(result.rejected.some((quote) => quote.reasons.includes("DUPLICATE_REQUEST")));
});

test("blocks an unnamed job before authorization", () => {
  const result = planProcurement({ ...base, task: "" });
  assert.equal(result.decision, "BLOCK");
  assert.ok(result.reasons.includes("TASK_MISSING"));
});
