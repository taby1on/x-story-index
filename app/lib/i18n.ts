export type Locale = "en" | "zh";

export const copy = {
  en: {
    records: "Records", report: "Report", language: "中文", eyebrow: "PUBLIC SIGNAL RESEARCH TOOL",
    title: "Trace the X Trending Event", subtitle: "Audit the posts behind it.", note: "Collect → Record → Analyze. Every number keeps its scope and limitations.",
    newRun: "01 / NEW RUN", storyUrl: "X Story URL", keyword: "Analysis keyword", accounts: "Key accounts (one handle per line)", queue: "QUEUE RUN ↗", queuing: "RECORDING…",
    worker: "This desk records requests and reports. Collection runs in a controlled worker with an authenticated X session.",
    queued: "Run recorded. The collector can now process it.", failed: "Unable to create run.", workflow: "02 / WORKFLOW",
    steps: ["Submit source", "Collect Story timelines", "Scan key accounts", "Merge raw evidence", "Publish report"],
    stepNotes: ["Story URL + keyword + handles", "Top + Latest, deduplicated", "Recent related posts from named people", "Post ID deduplication + source labels", "Charts + downloadable evidence"],
    audit: "03 / FEATURED AUDIT", openReport: "OPEN REPORT →", reported: "Reported posts", visible: "Visible sample", impressions: "Sample impressions", coverage: "Approx. coverage",
    caveat: "X labels this Story as 1.3k posts. Top + Latest exposed 130 unique posts; a key-account scan added 7 missed posts, producing 137 audited posts. This is still a visible-sample audit, not a census.",
    recent: "Recent backend records", allRecords: "ALL RECORDS →", loading: "Loading records…", noRuns: "No runs yet.",
  },
  zh: {
    records: "运行记录", report: "分析报告", language: "English", eyebrow: "公共信号研究工具",
    title: "追踪故事。", subtitle: "核对背后的帖子。", note: "采集 → 存档 → 分析。每个数字都保留统计口径与限制。",
    newRun: "01 / 新建任务", storyUrl: "X Story 链接", keyword: "分析关键词", accounts: "关键账号（每行一个 handle）", queue: "创建任务 ↗", queuing: "写入中…",
    worker: "控制台负责保存任务和报告。采集由具有 X 登录态的受控工作节点执行。",
    queued: "任务已写入记录，采集器现在可以处理它。", failed: "无法创建任务。", workflow: "02 / 工作流",
    steps: ["提交来源", "采集 Story 时间线", "扫描关键账号", "合并原始证据", "发布分析报告"],
    stepNotes: ["Story 链接、关键词与账号", "合并 Top + Latest 并去重", "搜索指定人物近期相关帖子", "按帖子 ID 去重并保留来源", "图表与可下载证据"],
    audit: "03 / 重点审计", openReport: "查看报告 →", reported: "卡片标注", visible: "页面可见样本", impressions: "样本曝光量", coverage: "约覆盖率",
    caveat: "X 将此 Story 标注为 1.3k posts。Top + Latest 展示了 130 条唯一帖子，关键账号补充扫描找回 7 条遗漏内容，当前审计共 137 条。本报告仍是可见样本审计，不是全量普查。",
    recent: "最近后端记录", allRecords: "全部记录 →", loading: "正在读取记录…", noRuns: "暂无任务。",
  },
} as const;

export function route(locale: Locale, path = "") { return `/${locale}${path}`; }
