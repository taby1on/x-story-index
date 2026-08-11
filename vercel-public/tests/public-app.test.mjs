import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("public build contains bilingual queue, downloads, and Kimi analysis", async () => {
  const [html, app, config, api, runsApi, downloadApi] = await Promise.all([
    readFile(new URL("../dist/index.html", import.meta.url), "utf8"),
    readFile(new URL("../dist/app.js", import.meta.url), "utf8"),
    readFile(new URL("../vercel.json", import.meta.url), "utf8"),
    readFile(new URL("../api/analyze.mjs", import.meta.url), "utf8"),
    readFile(new URL("../api/runs.mjs", import.meta.url), "utf8"),
    readFile(new URL("../api/download.mjs", import.meta.url), "utf8")
  ]);
  assert.match(html, /X PR-STUNT INDEX/);
  assert.match(app, /Trace X Trending Events/);
  assert.match(app, /追踪 X 热门事件/);
  assert.match(app, /\/api\/analyze/);
  assert.match(app, /id=\"run-form\"/);
  assert.match(app, /\/api\/runs/);
  assert.match(app, /Recent backend records/);
  assert.match(app, /\/api\/download/);
  assert.deepEqual(JSON.parse(config).rewrites.length, 4);
  assert.match(api, /process\.env\.KIMI_API_KEY\|\|process\.env\.kimi_api/);
  assert.match(api, /api\.moonshot\.cn\/v1/);
  assert.doesNotMatch(config, /cleanUrls/);
  assert.doesNotMatch(api, /temperature:/);
  assert.match(api, /\/models/);
  assert.match(api, /discoveredModel/);
  assert.match(api, /SITES_BACKEND_BYPASS_TOKEN/);
  assert.match(runsApi, /OAI-Sites-Authorization/);
  assert.match(runsApi, /SITES_BACKEND_BYPASS_TOKEN/);
  assert.match(downloadApi, /OAI-Sites-Authorization/);
});
