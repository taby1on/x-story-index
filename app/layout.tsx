import type { Metadata } from "next";
import "./globals.css";

export const metadata:Metadata={metadataBase:new URL(process.env.SITE_URL??"http://localhost:3000"),title:"X/Story Index — Story Analytics",description:"Collect, archive and visualize the public signals visible in any X Story.",icons:{icon:"/favicon.png",shortcut:"/favicon.png"},openGraph:{title:"X/Story Index · Story Analytics",description:"Trace the posts behind any X Story.",type:"website",images:[{url:"/og.png",width:1200,height:630,alt:"X/Story Index story analytics desk"}]},twitter:{card:"summary_large_image",title:"X/Story Index · Story Analytics",description:"Trace the posts behind any X Story.",images:["/og.png"]}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
