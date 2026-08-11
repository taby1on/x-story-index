import type { Metadata } from "next";
import "./globals.css";

export const metadata:Metadata={metadataBase:new URL(process.env.SITE_URL??"http://localhost:3000"),title:"X/Story Index — Bilingual Story Audit",description:"A bilingual archive for collecting, recording, and analyzing X Story signals. X Story 双语采集、记录与分析档案。",icons:{icon:"/favicon.png",shortcut:"/favicon.png"},openGraph:{title:"X/Story Index · X Story 双语审计",description:"Trace the story. 核对故事背后的帖子。",type:"website",images:[{url:"/og.png",width:1200,height:630,alt:"X/Story Index bilingual story audit"}]},twitter:{card:"summary_large_image",title:"X/Story Index · 双语故事审计",description:"Trace the story. 核对故事背后的帖子。",images:["/og.png"]}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
