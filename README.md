# X/Story Index

A reusable X Story analytics desk with separate English and Chinese interfaces, durable run records, visual reports and downloadable evidence.

## Routes

- `/en` and `/zh` — language-specific control desks for any `x.com/i/trending/...` Story URL.
- `/en/records` and `/zh/records` — durable D1-backed run history.
- `/en/report?run=<id>` and `/zh/report?run=<id>` — per-run visual report.
- `POST /api/runs` — validate and queue a Story audit.
- `POST /api/results` — controlled collector callback; computes totals and stores completed artifacts.
- `GET /api/download?runId=<id>&format=csv|json|report` — CSV, JSON or Markdown export.

## Storage and workflow

D1 stores task state and aggregate metrics. R2 stores the generated per-run CSV, JSON and report files. The hosted desk does not claim direct access to X's hidden corpus: an authenticated controlled worker collects the Top and Latest timelines, deduplicates posts, then uploads results through `/api/results`.

The featured audit retains the original visible-sample limitation: X reports approximately `1.3k posts`, while 130 unique posts were exposed to the audited account.

## Development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run db:generate
npm run lint
npm test
```
