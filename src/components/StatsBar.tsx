"use client";

import { skills } from "@/data/skills";
import { categories, sectors } from "@/data/categories";

export default function StatsBar() {
  const kritikCount = skills.filter((s) => s.importance === "kritik").length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-center">
          <div className="text-2xl font-bold text-zinc-100">{skills.length}</div>
          <div className="text-xs text-zinc-500">Toplam Skill</div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-center">
          <div className="text-2xl font-bold text-zinc-100">{categories.length}</div>
          <div className="text-xs text-zinc-500">Kategori</div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-center">
          <div className="text-2xl font-bold text-zinc-100">{sectors.length}</div>
          <div className="text-xs text-zinc-500">Sektor</div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-center">
          <div className="text-2xl font-bold text-red-400">{kritikCount}</div>
          <div className="text-xs text-zinc-500">Kritik Skill</div>
        </div>
      </div>
    </div>
  );
}
