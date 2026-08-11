const REPORT={event:"Indie Hackers Gather in Shanghai Despite Typhoon Floods",reportedPosts:"1.3k",auditedPosts:137,coveragePercent:10.54,totalImpressions:1019573,likes:5923,replies:840,reposts:277,engagementRate:0.0069049,sparkLabVisiblePosts:9,sparkLabVisibleImpressions:6282,keyAccountRecoveredPosts:7,topPosts:[{"author":"@damonchen","impressions":192234,"summary":"Meeting long-time internet friends is amazing"},{"author":"@marclou","impressions":173516,"summary":"Meetup cancellation update during typhoon flooding"},{"author":"@damonchen","impressions":163556,"summary":"Why Marc never shipped an AI wrapper"},{"author":"@marclou","impressions":149536,"summary":"I only build two types of startups now"},{"author":"@marclou","impressions":138046,"summary":"I met my indie hacker hero today"}],method:"X Story Top and Latest timelines, deduplicated by post ID, plus recent related-post searches across ten named key accounts. This is a visible sample, not a census."};

export default async function handler(request,response){
  if(request.method!=="POST")return response.status(405).json({error:"Method not allowed"});
  const locale=request.body?.locale==="zh"?"zh":"en";
  const apiKey=process.env.KIMI_API_KEY||process.env.kimi_api;
  if(!apiKey)return response.status(503).json({error:locale==="zh"?"Kimi API Key 尚未在 Vercel 中配置。":"Kimi API key is not configured in Vercel yet."});
  const bases=process.env.KIMI_BASE_URL
    ?[process.env.KIMI_BASE_URL.replace(/\/$/,"")]
    :["https://api.moonshot.cn/v1","https://api.moonshot.ai/v1"];
  const model=process.env.KIMI_MODEL||"kimi-k2.5";
  const language=locale==="zh"?"Simplified Chinese":"English";
  const prompt=`Analyze this fixed X Trending Event audit in ${language}. Produce: (1) a concise executive summary, (2) 4 evidence-backed findings, (3) a Spark Lab visibility assessment, (4) 3 limitations, and (5) 3 recommended next research actions. Distinguish audited-sample facts from inference. Never claim that 137 posts represent all 1.3k reported posts. Use plain text with short headings.\n\nAUDIT DATA\n${JSON.stringify(REPORT)}`;
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),45000);
  try{
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
