import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

async function read(relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

test("ships Rill as a repo-scoped Codex skill", async () => {
  const skill = await read(".agents/skills/rill/SKILL.md");
  const metadata = await read(".agents/skills/rill/agents/openai.yaml");

  assert.match(skill, /^---\nname: rill\n/);
  assert.match(skill, /READY.*REVIEW.*BLOCK/s);
  assert.match(skill, /Never infer settlement from intent/);
  assert.match(metadata, /value: "binance"/);
  assert.match(metadata, /https:\/\/agent\.binance\.com\/mcp\/agentic/);
});

test("configures Binance Agent OS as a guarded remote MCP server", async () => {
  const config = await read(".codex/config.toml");

  assert.match(config, /\[mcp_servers\.binance\]/);
  assert.match(config, /url = "https:\/\/agent\.binance\.com\/mcp\/agentic"/);
  assert.match(config, /default_tools_approval_mode = "writes"/);
});

test("keeps the simulation and settlement boundary explicit", async () => {
  const page = await read("app/page.tsx");
  const readme = await read("README.md");

  assert.match(page, /does not claim live settlement/);
  assert.match(page, /read-only market context/);
  assert.match(page, /070d951e478c75059adc111cdd7fafce31d20da33a7f0e2de4521ab8ff161d65/);
  assert.match(page, /resetMission\(event: React\.MouseEvent<HTMLButtonElement>\).*event\.preventDefault\(\)/s);
  assert.match(readme, /does not require trading permissions/);
  assert.match(readme, /does not custody funds/);
});

test("documents every mandatory UI review resource", async () => {
  const ui = await read("UI.md");
  const resources = [
    "ui-skills.com",
    "designsystemchecklist.com",
    "vibeprompts.dev",
    "interfaces.rauno.me",
    "coss.com/ui",
    "reui.io/components",
    "component.gallery",
    "designsystems.one",
    "utopia.fyi",
    "open-props.style",
    "kinetics.colorion.co",
    "animatedbuttons.colorion.co",
    "motion-primitives.com",
    "iconcreator.dev",
    "bg.ibelick.com",
  ];

  for (const resource of resources) assert.match(ui, new RegExp(resource.replaceAll(".", "\\.")));
});

test("ships an exact social preview for the public demo", async () => {
  const layout = await read("app/layout.tsx");
  const image = await readFile(path.join(root, "public/rill-og.png"));

  assert.match(layout, /metadataBase: new URL\("https:\/\/rill-agent-payments\.ahmardchain\.chatgpt\.site"\)/);
  assert.match(layout, /summary_large_image/);
  assert.equal(image.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  assert.ok(image.byteLength > 20_000);
});
