# X/Story Index

A bilingual archive for collecting, recording, and analyzing visible X Story signals.  
用于采集、记录与分析 X Story 可见信号的中英双语档案站。

## Product surface / 产品页面

- `/` — Control Desk / 任务控制台：提交 Story URL 与关键词，调用后端创建运行记录。
- `/records` — Run Records / 运行记录：从 D1 数据库读取持久化任务历史。
- `/report` — Analysis Report / 分析报告：展示覆盖范围、曝光、互动、头部帖子及 Spark Lab 相关信号。
- `/api/runs` — Backend API / 后端接口：`GET` 查询记录，`POST` 校验并创建任务。

The first featured audit covers the X Story **“Indie Hackers Gather in Shanghai Despite Typhoon Floods.”** X reports approximately `1.3k posts`; its Top + Latest timelines exposed 130 unique posts to the audited account. The site labels this correctly as a visible sample rather than a complete census.

首期报告审计了 **“Indie Hackers Gather in Shanghai Despite Typhoon Floods”**。X 卡片标注约 `1.3k posts`，但 Top + Latest 时间线仅向审计账号展示 130 条唯一帖子；站点将其明确标记为“可见样本”，而非完整普查。

## Data / 数据

The auditable CSV and JSON snapshot are shipped under `public/data/` and can be downloaded from the report page. Public X metrics are time-sensitive; the snapshot retains collection time and per-post evidence.

逐帖 CSV 与 JSON 快照保存在 `public/data/`，可从报告页下载。X 指标会随时间变化，因此快照保留采集时间和逐帖证据。

## Local development / 本地开发

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
npm run lint
npm test
```

## Persistence / 持久化

Run records are stored in Cloudflare D1. The Drizzle schema is in `db/schema.ts`; generated migrations are in `drizzle/`. Runtime initialization uses prepared statements and creates the seed audit record idempotently.

运行记录存储在 Cloudflare D1。Drizzle 数据结构位于 `db/schema.ts`，迁移文件位于 `drizzle/`；运行时使用预编译 SQL，并以幂等方式写入首期审计记录。

## Important limitation / 重要限制

The hosted backend records run requests and serves reports. Authenticated X browser collection remains a controlled worker because the Story page requires a signed-in session and does not expose the full 1.3k-post cluster through its public timelines.

线上后端负责记录任务和展示报告。由于 Story 页面依赖登录态，且公开时间线没有暴露完整 1.3k 关联语料，X 浏览器采集仍由受控工作节点执行。
