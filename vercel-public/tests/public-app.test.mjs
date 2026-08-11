import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("public build contains bilingual routes, downloads, and Kimi analysis", async () => {
  const [html, app, config, api] = await Promise.all([
    readFile(new URL("../dist/index.html", import.meta.url), "utf8"),
    readFile(new URL("../dist/app.js", import.meta.url), "utf8"),
    readFile(new URL("../vercel.json", import.meta.url), "utf8"),
    readFile(new URL("../api/analyze.mjs", import.meta.url), "utf8")
  ]);
  assert.match(html, /X PR-STUNT INDEX/);
  assert.match(app, /Trace X Trending Events/);
  assert.match(app, /追踪 X 热门事件/);
  assert.match(app, /\/api\/analyze/);
  assert.match(app, /x-story-posts\.csv/);
  assert.deepEqual(JSON.parse(config).rewrites.length, 4);
  assert.match(api, /process\.env\.KIMI_API_KEY\|\|process\.env\.kimi_api/);
});
