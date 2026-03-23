"use client";

import { Skill } from "@/types";
import { categories, importanceLevels, sectors } from "@/data/categories";

const importanceColors: Record<string, string> = {
  kritik: "bg-red-500/15 text-red-400 border-red-500/20",
  yuksek: "bg-orange-500/15 text-orange-400 border-orange-500/20",
  orta: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  dusuk: "bg-zinc-500/15 text-zinc-400 border-zinc-500/20",
};

const importanceLabels: Record<string, string> = {
  kritik: "Kritik",
  yuksek: "Yuksek",
  orta: "Orta",
  dusuk: "Dusuk",
};

export default function SkillCard({ skill }: { skill: Skill }) {
  const category = categories.find((c) => c.key === skill.category);
  const sector = sectors.find((s) => s.key === skill.sector);
  const importance = importanceLevels.find((i) => i.key === skill.importance);

  return (
    <div className="group relative rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-zinc-700 hover:bg-zinc-900">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <span>{category?.icon}</span>
          <span>{category?.name}</span>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium ${importanceColors[skill.importance]}`}
        >
          {importance?.name}
        </span>
      </div>

      <h3 className="mb-1.5 text-base font-semibold text-zinc-100">
        {skill.name}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-zinc-400">
        {skill.description}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
          {sector?.name}
        </span>
        {skill.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-zinc-800/50 px-2 py-0.5 text-xs text-zinc-500"
          >
            {tag}
          </span>
        ))}
        <span className="ml-auto text-xs text-zinc-600">
          {skill.source === "kalfa" ? "Kalfa" : skill.source === "tezgah" ? "Tezgah" : "SaaS"}
        </span>
      </div>
    </div>
  );
}
