# X PR-STUNT INDEX

A reusable X Story analytics desk with separate English and Chinese interfaces, durable run records, visual reports and downloadable evidence.

## Routes

- `/en` and `/zh` — language-specific control desks for any `x.com/i/trending/...` Story URL, keyword and optional key-account watchlist.
- `/en/records` and `/zh/records` — durable D1-backed run history.
- `/en/report?run=<id>` and `/zh/report?run=<id>` — per-run visual report.
- `POST /api/runs` — validate and queue a Story audit.
- `POST /api/results` — controlled collector callback; computes totals and stores completed artifacts.
- `GET /api/download?runId=<id>&format=csv|json|report` — CSV, JSON or Markdown export.

## Storage and workflow

D1 stores task state and aggregate metrics. R2 stores the generated per-run CSV, JSON and report files. The hosted desk does not claim direct access to X's hidden corpus: an authenticated controlled worker collects the Top and Latest timelines, deduplicates posts, then uploads results through `/api/results`.

Collection uses two sources: Story Top + Latest timelines, followed by recent related-post searches over user-supplied key accounts. Results are merged by post ID and retain a source label.

In the featured audit, Top + Latest exposed 130 unique posts. A nine-account recovery scan found 7 additional posts, producing 137 audited posts against X's approximate `1.3k posts` label. The result remains a visible sample rather than a full census.

## Development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run db:generate
npm run lint
npm test
```

## Public Vercel edition

`vercel-public/` is a separate, stateless public edition. It preserves the English and Chinese landing/report routes, visual report, evidence downloads, and adds server-side Kimi analysis without exposing the API key to the browser.

Configure these encrypted Vercel environment variables before using AI analysis:

```text
KIMI_API_KEY=your_key
KIMI_BASE_URL=https://api.moonshot.ai/v1
KIMI_MODEL=kimi-k2.5
```

The analysis endpoint accepts only a locale and analyzes a fixed server-owned audit payload. It is not an open-ended proxy for the Kimi API.
