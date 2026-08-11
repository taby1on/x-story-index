"use client";
import { useEffect, useState } from "react";
import { copy, Locale } from "../lib/i18n";
import { RunRecord, RunRow } from "./Dashboard";
import { SiteHeader } from "./SiteHeader";

export function Records({locale}:{locale:Locale}){const t=copy[locale];const[runs,setRuns]=useState<RunRecord[]>([]);const[loading,setLoading]=useState(true);useEffect(()=>{fetch("/api/runs").then(r=>r.json()).then(d=>setRuns(d.runs??[])).finally(()=>setLoading(false))},[]);return <main><SiteHeader locale={locale} path="/records"/><div className="page-shell"><section className="page-intro"><div><span className="panel-label blue">{locale==="en"?"BACKEND ARCHIVE":"后端档案"}</span><h1>{locale==="en"?"Run records.":"运行记录。"}</h1></div><p><b>{locale==="en"?"Durable task history.":"持久保存的任务历史。"}</b><br/>{locale==="en"?"Every request keeps its source, keyword, state, metrics and timestamps.":"每次提交都保留来源、关键词、状态、指标与时间。"}</p></section><section className="archive-preview">{loading?<p>{t.loading}</p>:runs.length?runs.map((run,index)=><RunRow key={run.id} run={run} index={index} locale={locale}/>):<p>{t.noRuns}</p>}</section></div><footer><span>DURABLE RECORDS</span><span>X/STORY INDEX</span><span>{locale.toUpperCase()}</span></footer></main>}
