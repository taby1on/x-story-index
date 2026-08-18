const BACKEND=(process.env.RUNS_BACKEND_URL||"https://x-story-index.tabyi0n.chatgpt.site").replace(/\/$/,"");
const recentRequests=new Map();

function backendHeaders(request){
  const token=process.env.SITES_BACKEND_BYPASS_TOKEN;
  if(!token)return null;
  return {"content-type":"application/json","accept-language":request.headers["accept-language"]||"en","OAI-Sites-Authorization":`Bearer ${token}`};
}

export default async function handler(request,response){
  if(!["GET","POST"].includes(request.method))return response.status(405).json({error:"Method not allowed"});
  const headers=backendHeaders(request);
  if(!headers)return response.status(503).json({error:"Run backend credentials are not configured. / 任务后端凭证尚未配置。"});
  try{
    const query=request.method==="GET"&&request.query?.id?`?id=${encodeURIComponent(request.query.id)}`:"";
    if(request.method==="POST"){
      const ip=String(request.headers["x-forwarded-for"]||request.socket?.remoteAddress||"unknown").split(",")[0];
      const now=Date.now();const previous=recentRequests.get(ip)||0;
      if(now-previous<10000)return response.status(429).json({error:"Please wait before queueing another run. / 请稍后再提交。"});
      recentRequests.set(ip,now);
    }
    const upstream=await fetch(`${BACKEND}/api/runs${query}`,{method:request.method,headers,body:request.method==="POST"?JSON.stringify(request.body):undefined});
    const payload=await upstream.json();
    return response.status(upstream.status).json(payload);
  }catch{return response.status(502).json({error:"Run backend is unavailable. / 任务后端暂时不可用。"})}
}
