import { copy, Locale, route } from "../lib/i18n";

export function SiteHeader({ locale, path = "" }: { locale: Locale; path?: string }) {
  const t = copy[locale]; const other = locale === "en" ? "zh" : "en";
  return <header className="masthead"><a href={route(locale)} className="brand">X PR-STUNT INDEX</a><nav><a href={route(locale, "/records")}>{t.records}</a><a href={route(locale, "/report")}>{t.report}</a><a className="language-switch" href={route(other, path)}>{t.language}</a></nav></header>;
}
