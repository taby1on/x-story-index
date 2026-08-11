"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { featuredRun, workflowSteps } from "./lib/report-data";

type RunRecord = { id:string; storyUrl:string; title:string; keyword:string; status:string; visiblePosts:number; reportedPosts:string; createdAt:string };
function Bilingual({ en, zh }: { en:string; zh:string }) { return <><strong>{en}</strong><span className="zh">{zh}</span></>; }

export default function Home() {
  const [runs,setRuns]=useState<RunRecord[]>([]); const [message,setMessage]=useState(""); const [submitting,setSubmitting]=useState(false);
  useEffect(()=>{fetch("/api/runs").then(r=>r.json()).then(d=>setRuns(d.runs??[])).catch(()=>setRuns([]))},[]);
  async function submitRun(event:FormEvent<HTMLFormElement>){event.preventDefault();setSubmitting(true);setMessage("");const form=new FormData(event.currentTarget);const response=await fetch("/api/runs",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({storyUrl:form.get("storyUrl"),keyword:form.get("keyword")})});const data=await response.json();setSubmitting(false);if(!response.ok)return setMessage(data.error??"Unable to create run / 无法创建任务");setRuns(current=>[data.run,...current]);setMessage("Run recorded in the backend archive. / 任务已写入后端档案。");}
  return <main>
    <header className="masthead"><Link href="/" className="brand">X/STORY INDEX</Link><nav><Link href="/records">RECORDS / 记录</Link><Link href="/report">REPORT / 报告</Link></nav></header>
    <section className="hero grid-lines"><div className="eyebrow">PUBLIC SIGNAL RESEARCH TOOL · 公共信号研究工具</div><h1>Trace the story.<br/><span>核对故事背后的帖子。</span></h1><p className="hero-note"><b>Collect → Record → Analyze.</b><br/>采集、存档、分析。每个数字都保留口径与限制。</p><div className="issue-stamp">ISSUE 001<br/><span>AUG 2026</span></div></section>
    <section className="control-grid">
      <div className="panel input-panel"><div className="panel-label red">01 / NEW RUN · 新建任务</div><form onSubmit={submitRun}><label htmlFor="story-url"><Bilingual en="X Story URL" zh="X Story 链接"/></label><input id="story-url" name="storyUrl" required defaultValue={featuredRun.storyUrl} aria-label="X Story URL"/><label htmlFor="story-keyword"><Bilingual en="Keyword" zh="统计关键词"/></label><input id="story-keyword" name="keyword" required defaultValue="Spark Lab" aria-label="Keyword"/><button disabled={submitting} type="submit">{submitting?"RECORDING… / 写入中…":"QUEUE RUN ↗ / 创建任务"}</button><p className="form-note">The hosted desk records requests and reports. The authenticated collector remains a controlled worker.<br/>线上控制台保存任务与报告；登录态采集器仍作为受控工作节点运行。</p>{message&&<p className="message">{message}</p>}</form></div>
      <div className="panel workflow-panel"><div className="panel-label blue">02 / WORKFLOW · 工作流</div>{workflowSteps.map((step,index)=><div className="workflow-row" key={step.en}><span className="step-no">0{index+1}</span><div><Bilingual en={step.en} zh={step.zh}/><small>{step.note}</small></div><span className={`status-dot ${index<3?"done":"warn"}`}>{index<3?"●":"◐"}</span></div>)}</div>
    </section>
    <section className="feature-run"><div className="panel-label violet">03 / FEATURED AUDIT · 重点审计</div><div className="feature-title"><div><span className="mono">STORY {featuredRun.storyId}</span><h2>{featuredRun.title}</h2><p>{featuredRun.titleZh}</p></div><Link href="/report" className="big-link">OPEN REPORT<br/>查看报告 →</Link></div><div className="metric-strip"><div><em>1.3k</em><Bilingual en="Reported posts" zh="卡片标注"/></div><div><em>130</em><Bilingual en="Visible sample" zh="页面可见样本"/></div><div><em>1,015,945</em><Bilingual en="Sample impressions" zh="样本曝光量"/></div><div><em className="red-text">10%</em><Bilingual en="Approx. coverage" zh="约覆盖率"/></div></div><div className="caveat"><b>Coverage note / 覆盖说明</b> — X labels the Story as 1.3k posts, while its Top + Latest timelines expose 130 unique posts to this account. The report is a visible-sample audit, not a census.<br/>X 将该 Story 标注为 1.3k posts，但 Top + Latest 仅向当前账号展示 130 条唯一帖子。本报告是可见样本审计，不是全量普查。</div></section>
    <section className="archive-preview"><div className="section-head"><Bilingual en="Recent backend records" zh="最近后端记录"/><Link href="/records">ALL RECORDS / 全部记录 →</Link></div>{(runs.length?runs.slice(0,4):[featuredRun]).map((run,index)=><div className="record-row" key={run.id}><span>{String(index+1).padStart(2,"0")}</span><div><b>{run.title}</b><small>{run.keyword} · {run.reportedPosts} reported / 标注</small></div><span className={`tag ${run.status}`}>{run.status}</span><time>{new Date(run.createdAt).toLocaleDateString("en-CA")}</time></div>)}</section>
    <footer><span>METHOD BEFORE METRIC · 方法先于指标</span><span>EN / 中文</span><span>OPEN RECORDS · 开放档案</span></footer>
  </main>;
}
