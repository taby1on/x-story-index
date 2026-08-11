export type Locale = "en" | "zh";

export const copy = {
  en: {
    records: "Records", report: "Report", language: "中文", eyebrow: "PUBLIC SIGNAL RESEARCH TOOL",
    title: "Trace the story.", subtitle: "Audit the posts behind it.", note: "Collect → Record → Analyze. Every number keeps its scope and limitations.",
    newRun: "01 / NEW RUN", storyUrl: "X Story URL", keyword: "Analysis keyword", queue: "QUEUE RUN ↗", queuing: "RECORDING…",
    worker: "This desk records requests and reports. Collection runs in a controlled worker with an authenticated X session.",
    queued: "Run recorded. The collector can now process it.", failed: "Unable to create run.", workflow: "02 / WORKFLOW",
    steps: ["Submit source", "Collect visible timelines", "Record raw evidence", "Audit coverage", "Publish report"],
    stepNotes: ["Story URL + keyword", "Top + Latest, deduplicated", "Post IDs + public metrics", "Visible sample vs reported corpus", "Charts + downloadable evidence"],
    audit: "03 / FEATURED AUDIT", openReport: "OPEN REPORT →", reported: "Reported posts", visible: "Visible sample", impressions: "Sample impressions", coverage: "Approx. coverage",
    caveat: "X labels this Story as 1.3k posts, while Top + Latest exposed 130 unique posts to the audited account. This is a visible-sample audit, not a census.",
    recent: "Recent backend records", allRecords: "ALL RECORDS →", loading: "Loading records…", noRuns: "No runs yet.",
  },
  zh: {
    records: "运行记录", report: "分析报告", language: "English", eyebrow: "公共信号研究工具",
    title: "追踪故事。", subtitle: "核对背后的帖子。", note: "采集 → 存档 → 分析。每个数字都保留统计口径与限制。",
    newRun: "01 / 新建任务", storyUrl: "X Story 链接", keyword: "分析关键词", queue: "创建任务 ↗", queuing: "写入中…",
    worker: "控制台负责保存任务和报告。采集由具有 X 登录态的受控工作节点执行。",
    queued: "任务已写入记录，采集器现在可以处理它。", failed: "无法创建任务。", workflow: "02 / 工作流",
    steps: ["提交来源", "采集可见时间线", "记录原始证据", "核对覆盖范围", "发布分析报告"],
    stepNotes: ["Story 链接与关键词", "合并 Top + Latest 并去重", "帖子 ID 与公开指标", "可见样本对比卡片标注总量", "图表与可下载证据"],
    audit: "03 / 重点审计", openReport: "查看报告 →", reported: "卡片标注", visible: "页面可见样本", impressions: "样本曝光量", coverage: "约覆盖率",
    caveat: "X 将此 Story 标注为 1.3k posts，但 Top + Latest 仅向审计账号展示 130 条唯一帖子。本报告是可见样本审计，不是全量普查。",
    recent: "最近后端记录", allRecords: "全部记录 →", loading: "正在读取记录…", noRuns: "暂无任务。",
  },
} as const;

export function route(locale: Locale, path = "") { return `/${locale}${path}`; }
