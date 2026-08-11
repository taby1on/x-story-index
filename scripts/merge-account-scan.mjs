import { readFile, writeFile } from "node:fs/promises";

const jsonPath = new URL("../public/data/x-story-snapshot.json", import.meta.url);
const csvPath = new URL("../public/data/x-story-posts.csv", import.meta.url);
const snapshot = JSON.parse(await readFile(jsonPath, "utf8"));
const accounts = ["@SparkLab_City","@istabyang","@thisisCHUAN","@_koiwest_","@Dai79603Zi","@RyanMfer","@Yiwei_growth","@WentaoZ4382","@west0nG","@marclou"];
const additions = [
  {post_id:"2086819921963745458",author_name:"Spark Lab",author_handle:"@SparkLab_City",text:"Catch the highlights from yesterday’s meetup with @marclou in our video recap!",impressions:1108,likes:9,replies:3,reposts:2,spark_lab_visible_match:true,spark_lab_body_match:false},
  {post_id:"2086745104220647788",author_name:"Spark Lab",author_handle:"@SparkLab_City",text:"And big thanks to our team @thisisCHUAN @istabyang @_koiwest_ @Dai79603Zi @RyanMfer and our friends @Yiwei_growth @WentaoZ4382 @west0nG",impressions:89,likes:4,replies:0,reposts:0,spark_lab_visible_match:true,spark_lab_body_match:false},
  {post_id:"2086736242063065116",author_name:"Spark Lab",author_handle:"@SparkLab_City",text:"Big thanks again to @marclou for an unforgettable afternoon of Q&A, stories, and inspiration.",impressions:164,likes:5,replies:0,reposts:1,spark_lab_visible_match:true,spark_lab_body_match:false},
  {post_id:"2086731923343446131",author_name:"Spark Lab",author_handle:"@SparkLab_City",text:"A typhoon hit Shanghai, yet we still made the meetup happen. Spark Lab turns your SPARK into reality!",impressions:989,likes:14,replies:2,reposts:6,spark_lab_visible_match:true,spark_lab_body_match:true},
  {post_id:"2086725783406690466",author_name:"Tab Y.",author_handle:"@istabyang",text:"Spark Lab 线下标识是购买的 MTR 港铁字体，整体是港铁风格。",impressions:24,likes:2,replies:0,reposts:0,spark_lab_visible_match:true,spark_lab_body_match:true},
  {post_id:"2086670815668646188",author_name:"Vincent Z.",author_handle:"@WentaoZ4382",text:"Marc Lou said he loves typhoons and heavy rain. Hope everyone who joined can find their own path too.",impressions:154,likes:3,replies:0,reposts:0,spark_lab_visible_match:false,spark_lab_body_match:false},
  {post_id:"2086413995171541325",author_name:"Vincent Z.",author_handle:"@WentaoZ4382",text:"What an unforgettable day. Typhoon outside, water at the entrance, and a room packed with builders. Huge thanks to Spark Lab and Marc.",impressions:1100,likes:8,replies:1,reposts:0,spark_lab_visible_match:true,spark_lab_body_match:true,metrics_approximate:true},
].map(post=>({...post,url:`https://x.com/${post.author_handle.slice(1)}/status/${post.post_id}`,published_at:null,source_tabs:["Key accounts"],bookmarks:0,metric_labels:[],visible_text:post.text}));
const known = new Set(snapshot.posts.map(post=>post.post_id));
const inserted = additions.filter(post=>!known.has(post.post_id));
snapshot.posts.push(...inserted);
snapshot.collection.unique_posts = snapshot.posts.length;
snapshot.collection.account_scan = {accounts, searched_at_utc:"2026-08-11T08:00:00.000Z",query_window:"2026-08-08 through 2026-08-11",new_posts:additions.length,scope_note:"Recent posts matched Story entities and keywords; candidates were deduplicated by post ID against Story Top + Latest."};
const total = key=>snapshot.posts.reduce((sum,post)=>sum+(Number(post[key])||0),0);
const visibleMatches=snapshot.posts.filter(post=>post.spark_lab_visible_match);const bodyMatches=snapshot.posts.filter(post=>post.spark_lab_body_match);
Object.assign(snapshot.aggregate,{post_count:snapshot.posts.length,known_impression_posts:snapshot.posts.length,total_impressions:total("impressions"),total_likes:total("likes"),total_replies:total("replies"),total_reposts:total("reposts"),engagement_rate:(total("likes")+total("replies")+total("reposts"))/total("impressions"),spark_lab_visible_match_posts:visibleMatches.length,spark_lab_visible_match_impressions:visibleMatches.reduce((s,p)=>s+p.impressions,0),spark_lab_visible_match_impression_share:visibleMatches.reduce((s,p)=>s+p.impressions,0)/total("impressions"),spark_lab_body_match_posts:bodyMatches.length,spark_lab_body_match_impressions:bodyMatches.reduce((s,p)=>s+p.impressions,0)});
await writeFile(jsonPath,JSON.stringify(snapshot,null,2)+"\n");
const columns=["post_id","url","author_name","author_handle","published_at","text","impressions","likes","replies","reposts","bookmarks","spark_lab_visible_match","spark_lab_body_match","source_tabs","metric_label"];
const quote=value=>`"${String(value??"").split("\n").map(line=>line.trimEnd()).join("\n").replaceAll('"','""')}"`;
const rows=snapshot.posts.map(post=>columns.map(key=>quote(key==="source_tabs"?post.source_tabs.join("|"):key==="metric_label"?(post.metric_labels?.[0]??""):post[key])).join(","));
await writeFile(csvPath,"\ufeff"+columns.join(",")+"\n"+rows.join("\n")+"\n");
console.log(`Account scan contains ${additions.length} recovery posts; total ${snapshot.posts.length}.`);
