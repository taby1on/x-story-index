const BACKEND=(process.env.RUNS_BACKEND_URL||"https://x-story-index.tabyi0n.chatgpt.site").replace(/\/$/,"");

export default async function handler(request,response){
  if(request.method!=="GET")return response.status(405).json({error:"Method not allowed"});
  const token=process.env.SITES_BACKEND_BYPASS_TOKEN;
  if(!token)return response.status(503).json({error:"Download backend credentials are not configured."});
  const runId=String(request.query?.runId||"");const format=String(request.query?.format||"");
  if(!/^run_[A-Za-z0-9_-]+$/.test(runId)||!["csv","json","report"].includes(format))return response.status(400).json({error:"Invalid download request"});
  try{
    const upstream=await fetch(`${BACKEND}/api/download?runId=${encodeURIComponent(runId)}&format=${format}`,{redirect:"follow",headers:{"OAI-Sites-Authorization":`Bearer ${token}`}});
    const body=Buffer.from(await upstream.arrayBuffer());
    response.status(upstream.status);
    for(const name of ["content-type","content-disposition","cache-control"]){const value=upstream.headers.get(name);if(value)response.setHeader(name,value)}
    return response.send(body);
  }catch{return response.status(502).json({error:"Download backend is unavailable."})}
}
