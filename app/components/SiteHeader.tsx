import Link from "next/link";
import { copy, Locale, route } from "../lib/i18n";

export function SiteHeader({ locale, path = "" }: { locale: Locale; path?: string }) {
  const t = copy[locale]; const other = locale === "en" ? "zh" : "en";
  return <header className="masthead"><Link href={route(locale)} className="brand">X/STORY INDEX</Link><nav><Link href={route(locale, "/records")}>{t.records}</Link><Link href={route(locale, "/report")}>{t.report}</Link><Link className="language-switch" href={route(other, path)}>{t.language}</Link></nav></header>;
}
