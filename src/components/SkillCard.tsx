"use client";

import { Skill } from "@/types";
import { categories, importanceLevels } from "@/data/categories";

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
  dusuk: "bg-zinc-50 text-zinc-500",
};

export default function SkillCard({
  skill,
  onClick,
}: {
  skill: Skill;
  onClick: () => void;
}) {
  const category = categories.find((c) => c.key === skill.category);
  const importance = importanceLevels.find((i) => i.key === skill.importance);

  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-zinc-50 active:bg-zinc-100"
    >
      {/* Dot */}
      <span className={`inline-block h-[7px] w-[7px] shrink-0 rounded-full ${dotColors[skill.importance]}`} />

      {/* Main */}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="truncate text-[13px] font-medium text-zinc-800 group-hover:text-zinc-900">
            {skill.name}
          </span>
        </div>
        <p className="mt-px truncate text-[11px] text-zinc-400">
          {skill.description}
        </p>
      </div>

      {/* Category */}
      <span className="hidden w-40 shrink-0 truncate text-[11px] text-zinc-400 sm:block">
        {category?.name}
      </span>

      {/* Importance badge */}
      <span className={`hidden w-20 shrink-0 text-center md:inline-block rounded-full px-2 py-[2px] text-[10px] font-medium ${importanceBg[skill.importance]}`}>
        {importance?.name}
      </span>

      {/* Arrow */}
      <svg
        className="h-3.5 w-3.5 shrink-0 text-zinc-300 transition-colors group-hover:text-zinc-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}
