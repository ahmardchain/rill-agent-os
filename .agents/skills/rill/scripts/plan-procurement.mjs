import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

export function planProcurement(input) {
  const taskId = String(input.taskId ?? "").trim();
  const task = String(input.task ?? "").trim();
  const budget = Number(input.budget);
  const policy = input.policy ?? {};
  const maxResource = Number(policy.maxPerResource ?? Infinity);
  const allowed = new Set(policy.allowedVendors ?? []);
  const paidFingerprints = new Set(input.paidFingerprints ?? []);
  const required = [...new Set(input.requiredCapabilities ?? [])];

  const evaluated = (input.quotes ?? []).map((quote) => {
    const price = Number(quote.price);
    const reasons = [];
    if (!allowed.has(quote.vendor)) reasons.push("VENDOR_NOT_ALLOWED");
    if (!Number.isFinite(price) || price < 0) reasons.push("INVALID_PRICE");
    if (price > maxResource) reasons.push("RESOURCE_LIMIT_EXCEEDED");
    if (quote.recurring === true) reasons.push("RECURRING_CHARGE");
    if (
      quote.duplicate === true ||
      (quote.requestFingerprint && paidFingerprints.has(quote.requestFingerprint))
    ) {
      reasons.push("DUPLICATE_REQUEST");
    }
    if (!quote.capability) reasons.push("CAPABILITY_MISSING");
    return {
      quote: {
        vendor: String(quote.vendor ?? ""),
        capability: String(quote.capability ?? ""),
        price,
        requestFingerprint: String(quote.requestFingerprint ?? "unknown"),
      },
      reasons,
    };
  });

  const candidates = evaluated
    .filter((item) => item.reasons.length === 0)
    .map((item) => item.quote);
  const rejected = evaluated
    .filter((item) => item.reasons.length > 0)
    .map((item) => ({ ...item.quote, reasons: item.reasons }));

  const selected = required
    .map((capability) =>
      candidates
        .filter((quote) => quote.capability === capability)
        .sort(
          (a, b) =>
            Number(a.price) - Number(b.price) ||
            String(a.vendor).localeCompare(String(b.vendor)),
        )[0],
    )
    .filter(Boolean);

  const missing = required.filter(
    (capability) => !selected.some((quote) => quote.capability === capability),
  );
  const total = selected.reduce((sum, quote) => sum + Number(quote.price), 0);
  let decision = "READY";
  const reasons = [];

  if (!taskId) reasons.push("TASK_ID_MISSING");
  if (!task) reasons.push("TASK_MISSING");
  if (!Number.isFinite(budget) || budget <= 0) reasons.push("INVALID_BUDGET");
  if (!required.length) reasons.push("NO_CAPABILITIES_REQUESTED");
  if (missing.length) reasons.push("CAPABILITY_UNAVAILABLE");
  if (total > budget) reasons.push("BUDGET_EXCEEDED");
  if (reasons.length) decision = "BLOCK";
  else if (total > Number(policy.humanApprovalAbove ?? Infinity)) {
    decision = "REVIEW";
    reasons.push("HUMAN_APPROVAL_REQUIRED");
  }

  const evidence = {
    taskId,
    task,
    currency: input.currency ?? "USDC",
    budget,
    selected,
    rejected,
    missing,
    total: Number(total.toFixed(6)),
    decision,
    reasons,
    policyVersion: policy.version ?? "unknown",
  };
  const receipt = createHash("sha256")
    .update(JSON.stringify(evidence))
    .digest("hex");

  return { ...evidence, receipt };
}

function readCliInput(argv) {
  if (argv[0] === "--file") {
    if (!argv[1]) throw new Error("Provide a JSON file after --file.");
    return JSON.parse(readFileSync(argv[1], "utf8"));
  }
  return JSON.parse(argv[0] ?? "{}");
}

if (process.argv[1]?.endsWith("plan-procurement.mjs")) {
  try {
    console.log(
      JSON.stringify(planProcurement(readCliInput(process.argv.slice(2))), null, 2),
    );
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}
