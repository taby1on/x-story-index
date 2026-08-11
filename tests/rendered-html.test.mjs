import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the bilingual control desk", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>X\/Story Index — Bilingual Story Audit<\/title>/i);
  assert.match(html, /X\/STORY INDEX/);
  assert.match(html, /Trace the story\./);
  assert.match(html, /核对故事背后的帖子。/);
  assert.match(html, /1\.3k/);
  assert.match(html, /130/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
  assert.match(html, /og\.png/);
});

test("server-renders the report and ships evidence downloads", async () => {
  const response = await render("/report");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Visible signals/);
  assert.match(html, /主要发现/);
  assert.match(html, /1,015,945/);
  assert.match(html, /Spark Lab signals/);
  await Promise.all([
    access(new URL("../public/data/x-story-posts.csv", import.meta.url)),
    access(new URL("../public/data/x-story-snapshot.json", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
  ]);
  const snapshot = JSON.parse(await readFile(new URL("../public/data/x-story-snapshot.json", import.meta.url), "utf8"));
  assert.equal(snapshot.posts.length, 130);
});
