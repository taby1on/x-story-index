import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders separate English and Chinese control desks", async () => {
  const [english, chinese] = await Promise.all([render("/en"), render("/zh")]);
  assert.equal(english.status, 200); assert.equal(chinese.status, 200);
  const en = await english.text(); const zh = await chinese.text();
  assert.match(en, /Trace the X Trending Event/); assert.match(en,/X PR-STUNT INDEX/); assert.doesNotMatch(en, /核对背后的帖子。/); assert.match(en,/Key accounts/); assert.match(en,/@SparkLab_City/); assert.match(en,/@marclou/);
  assert.match(zh, /追踪故事。/); assert.doesNotMatch(zh, /Trace the story\./);
  assert.match(en, /中文/); assert.match(zh, /English/); assert.match(en, /og\.png/);
});

test("renders visualized reports and ships all three evidence downloads", async () => {
  const [english, chinese] = await Promise.all([render("/en/report"), render("/zh/report")]);
  assert.equal(english.status, 200); assert.equal(chinese.status, 200);
  const en = await english.text(); const zh = await chinese.text();
  assert.match(en, /Visible signals, measured limits/); assert.match(en, /Key-account recovery/); assert.match(en, /Impression distribution/); assert.match(en, /RAW CSV/);
  assert.match(zh, /可见信号，明确边界/); assert.match(zh, /关键账号补充扫描/); assert.match(zh, /曝光量分布/); assert.match(zh, /原始 CSV/);
  await Promise.all([access(new URL("../public/data/x-story-posts.csv", import.meta.url)),access(new URL("../public/data/x-story-snapshot.json", import.meta.url)),access(new URL("../public/data/x-story-report.md", import.meta.url)),access(new URL("../public/og.png", import.meta.url))]);
  const snapshot=JSON.parse(await readFile(new URL("../public/data/x-story-snapshot.json",import.meta.url),"utf8"));assert.equal(snapshot.posts.length,137);assert.equal(snapshot.collection.account_scan.new_posts,7);
});
