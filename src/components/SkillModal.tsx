"use client";

import { useEffect, useState, useCallback } from "react";
import { Skill } from "@/types";
import { categories, importanceLevels, sectors } from "@/data/categories";

const dotColors: Record<string, string> = {
  kritik: "bg-red-500",
  yuksek: "bg-amber-500",
  orta: "bg-yellow-400",
  dusuk: "bg-zinc-300",
};

const importanceBg: Record<string, string> = {
  kritik: "bg-red-50 text-red-600",
  yuksek: "bg-amber-50 text-amber-600",
  orta: "bg-yellow-50 text-yellow-700",
  dusuk: "bg-zinc-100 text-zinc-500",
};

function markdownToHtml(md: string): string {
  let html = md
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
    .replace(/^#### (.+)$/gm, "<h4>$1</h4>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/^---$/gm, "<hr/>")
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  html = html.replace(
    /^\|(.+)\|\n\|[-| :]+\|\n((?:\|.+\|\n?)*)/gm,
    (_, headerRow, bodyRows) => {
      const headers = headerRow.split("|").map((h: string) => h.trim()).filter(Boolean);
      const rows = bodyRows.trim().split("\n").map((r: string) => r.split("|").map((c: string) => c.trim()).filter(Boolean));
      let t = "<table><thead><tr>";
      for (const h of headers) t += `<th>${h}</th>`;
      t += "</tr></thead><tbody>";
      for (const row of rows) { t += "<tr>"; for (const c of row) t += `<td>${c}</td>`; t += "</tr>"; }
      t += "</tbody></table>";
      return t;
    }
  );

  html = html.replace(/^(\s*)[-*] (.+)$/gm, "<li>$2</li>");
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, "<ul>$1</ul>");
  html = html.replace(/^\d+\. (.+)$/gm, "<li>$1</li>");

  html = html
    .split("\n\n")
    .map((block) => {
      const t = block.trim();
      if (!t) return "";
      if (/^<(h[1-4]|ul|ol|pre|table|blockquote|hr|li)/.test(t)) return t;
      return `<p>${t.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("\n");

  return html;
}

export default function SkillModal({ skill, onClose }: { skill: Skill; onClose: () => void }) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const category = categories.find((c) => c.key === skill.category);
  const importance = importanceLevels.find((i) => i.key === skill.importance);
  const sector = sectors.find((s) => s.key === skill.sector);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(skill.filePath)
      .then((r) => { if (!r.ok) throw new Error(); return r.text(); })
      .then((text) => { setContent(text); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [skill.filePath]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleDownload = useCallback(() => {
    if (!content) return;
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${skill.slug}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, [content, skill.slug]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/20 backdrop-blur-sm">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Card — sabit yukseklik, sadece md icerigi scroll */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-200/50 mx-4">
        {/* Header — sabit */}
        <div className="shrink-0 flex items-start justify-between border-b border-zinc-100 px-6 pt-5 pb-4">
          <div className="min-w-0 flex-1 pr-4">
            <div className="mb-2 flex flex-wrap items-center gap-1.5 text-[11px] text-zinc-400">
              <span>{sector?.name}</span>
              <span>&rsaquo;</span>
              <span>{category?.name}</span>
              <span>&rsaquo;</span>
              <span className={`inline-flex items-center gap-1 rounded-full px-1.5 py-px text-[10px] font-medium ${importanceBg[skill.importance]}`}>
                <span className={`inline-block h-[5px] w-[5px] rounded-full ${dotColors[skill.importance]}`} />
                {importance?.name}
              </span>
            </div>

            <h2 className="text-lg font-semibold text-zinc-900">{skill.name}</h2>
            <p className="mt-0.5 text-[13px] text-zinc-500">{skill.description}</p>

            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              <span className="rounded bg-zinc-100 px-2 py-0.5 font-mono text-[10px] text-zinc-500">
                {skill.slug}
              </span>
              {skill.tags.map((t) => (
                <span key={t} className="rounded bg-zinc-50 px-2 py-0.5 text-[10px] text-zinc-400">
                  {t}
                </span>
              ))}
              <span className="rounded bg-zinc-50 px-2 py-0.5 text-[10px] text-zinc-400">
                {skill.source === "kalfa" ? "Kalfa" : skill.source === "tezgah" ? "Tezgah" : "SaaS Launcher"}
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={!content}
              className="flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3.5 py-2 text-[12px] font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-30"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Indir
            </button>

            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* MD icerigi — sadece burasi scroll eder */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {loading && (
            <div className="flex items-center justify-center gap-2 py-16 text-zinc-400">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-[13px]">Yukleniyor...</span>
            </div>
          )}
          {error && (
            <div className="py-16 text-center">
              <p className="text-[13px] text-zinc-500">Skill dosyasi bulunamadi.</p>
              <p className="mt-1 font-mono text-[11px] text-zinc-400">{skill.filePath}</p>
            </div>
          )}
          {content && (
            <div
              className="skill-content"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
            />
          )}
        </div>

        {/* Footer — sabit */}
        <div className="shrink-0 flex items-center justify-between border-t border-zinc-100 px-6 py-3">
          <span className="text-[11px] text-zinc-400">
            {skill.source === "kalfa" ? "Kalfa" : skill.source === "tezgah" ? "Tezgah" : "SaaS Launcher"} &middot; {category?.name}
          </span>
          <span className="flex items-center gap-1 rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] text-zinc-400">
            <kbd className="font-mono">esc</kbd> kapat
          </span>
        </div>
      </div>
    </div>
  );
}
