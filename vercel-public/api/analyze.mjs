const REPORT={event:"Indie Hackers Gather in Shanghai Despite Typhoon Floods",reportedPosts:"1.3k",auditedPosts:137,coveragePercent:10.54,totalImpressions:1019573,likes:5923,replies:840,reposts:277,engagementRate:0.0069049,sparkLabVisiblePosts:9,sparkLabVisibleImpressions:6282,keyAccountRecoveredPosts:7,topPosts:[{"author":"@damonchen","impressions":192234,"summary":"Meeting long-time internet friends is amazing"},{"author":"@marclou","impressions":173516,"summary":"Meetup cancellation update during typhoon flooding"},{"author":"@damonchen","impressions":163556,"summary":"Why Marc never shipped an AI wrapper"},{"author":"@marclou","impressions":149536,"summary":"I only build two types of startups now"},{"author":"@marclou","impressions":138046,"summary":"I met my indie hacker hero today"}],method:"X Story Top and Latest timelines, deduplicated by post ID, plus recent related-post searches across ten named key accounts. This is a visible sample, not a census."};
let discoveredModel;let discoveredBase;
const FEATURED="run_2086392303732887996_20260811";const BACKEND=(process.env.RUNS_BACKEND_URL||"https://x-story-index.tabyi0n.chatgpt.site").replace(/\/$/,"");

export default async function handler(request,response){
  if(request.method!=="POST")return response.status(405).json({error:"Method not allowed"});
  const locale=request.body?.locale==="zh"?"zh":"en";
  const runId=String(request.body?.runId||FEATURED);
  const apiKey=process.env.KIMI_API_KEY||process.env.kimi_api;
  if(!apiKey)return response.status(503).json({error:locale==="zh"?"Kimi API Key 尚未在 Vercel 中配置。":"Kimi API key is not configured in Vercel yet."});
  let bases=process.env.KIMI_BASE_URL
    ?[process.env.KIMI_BASE_URL.replace(/\/$/,"")]
    :["https://api.moonshot.cn/v1","https://api.moonshot.ai/v1"];
  let model=process.env.KIMI_MODEL||discoveredModel;
  const language=locale==="zh"?"Simplified Chinese":"English";
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),45000);
  try{
    let report=REPORT;
    if(runId!==FEATURED){
      if(!/^run_[A-Za-z0-9_-]+$/.test(runId))return response.status(400).json({error:"Invalid run ID."});
      const backendToken=process.env.SITES_BACKEND_BYPASS_TOKEN;
      if(!backendToken)return response.status(503).json({error:"Run backend credentials are not configured."});
      const backendHeaders={"OAI-Sites-Authorization":`Bearer ${backendToken}`};
      const runResponse=await fetch(`${BACKEND}/api/runs?id=${encodeURIComponent(runId)}`,{headers:backendHeaders,signal:controller.signal});const runPayload=await runResponse.json();const run=runPayload?.run;
      if(!runResponse.ok||!run)return response.status(404).json({error:"Run not found."});
      if(!["complete","audited"].includes(run.status))return response.status(409).json({error:locale==="zh"?"任务仍在采集中，完成后才能生成 AI 分析。":"The run is still being collected. AI analysis becomes available when it is complete."});
      const dataResponse=await fetch(`${BACKEND}/api/download?runId=${encodeURIComponent(runId)}&format=json`,{headers:backendHeaders,signal:controller.signal});const data=await dataResponse.json();
      const posts=(data.posts||[]).sort((a,b)=>(b.impressions||0)-(a.impressions||0));
      report={event:run.title,reportedPosts:run.reportedPosts,auditedPosts:run.visiblePosts,coveragePercent:run.coveragePercent,totalImpressions:run.totalImpressions,likes:run.likes,replies:run.replies,reposts:run.reposts,keyword:run.keyword,keywordPosts:run.sparkPosts,keywordImpressions:run.sparkImpressions,keyAccountRecoveredPosts:run.accountFoundPosts,topPosts:posts.slice(0,5).map(post=>({author:post.author,impressions:post.impressions,summary:post.text||""})),method:"X Story Top and Latest timelines plus named key-account recovery, deduplicated by post ID. Visible sample, not a census."};
    }
    const prompt=`Analyze this X Trending Event audit in ${language}. Produce: (1) a concise executive summary, (2) 4 evidence-backed findings, (3) an assessment of the requested keyword, (4) 3 limitations, and (5) 3 recommended next research actions. Distinguish audited-sample facts from inference. Never present the audited sample as a complete census. Use plain text with short headings.\n\nAUDIT DATA\n${JSON.stringify(report)}`;
    if(!model){
      for(const base of bases){
        const modelsResponse=await fetch(`${base}/models`,{headers:{authorization:`Bearer ${apiKey}`},signal:controller.signal});
        if(!modelsResponse.ok)continue;
        const modelsPayload=await modelsResponse.json();
        const ids=(modelsPayload?.data||[]).map(item=>item.id).filter(id=>typeof id==="string");
        model=ids.find(id=>/^(kimi-k2|moonshot-v1)/i.test(id)&&!/vision|embedding/i.test(id))||ids[0];
        if(model){discoveredModel=model;discoveredBase=base;bases=[base,...bases.filter(item=>item!==base)];break}
      }
    }
    model=model||"moonshot-v1-8k";
    if(discoveredBase)bases=[discoveredBase,...bases.filter(item=>item!==discoveredBase)];
    let kimi;let payload;
    for(const base of bases){
      kimi=await fetch(`${base}/chat/completions`,{method:"POST",headers:{authorization:`Bearer ${apiKey}`,"content-type":"application/json"},body:JSON.stringify({model,messages:[{role:"system",content:"You are a careful media intelligence analyst. Use only the supplied audit data, quantify claims, and state uncertainty."},{role:"user",content:prompt}],max_tokens:1400}),signal:controller.signal});
      payload=await kimi.json();
      if(kimi.ok||![401,403].includes(kimi.status))break;
    }
    if(!kimi.ok)return response.status(502).json({error:payload?.error?.message||`Kimi request failed (${kimi.status})`});
    const analysis=payload?.choices?.[0]?.message?.content;
    if(!analysis)return response.status(502).json({error:"Kimi returned an empty analysis."});
    return response.status(200).json({analysis,model,generatedAt:new Date().toISOString()});
  }catch(error){return response.status(502).json({error:error?.name==="AbortError"?"Kimi request timed out.":"Unable to reach Kimi."})}finally{clearTimeout(timeout)}
}
