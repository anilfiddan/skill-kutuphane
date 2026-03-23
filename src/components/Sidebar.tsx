"use client";

import { categories, sectors, importanceLevels } from "@/data/categories";
import { skills } from "@/data/skills";
import { CategoryKey, SectorKey, ImportanceLevel } from "@/types";

interface SidebarProps {
  selectedCategory: CategoryKey | "all";
  setSelectedCategory: (v: CategoryKey | "all") => void;
  selectedSector: SectorKey | "all";
  setSelectedSector: (v: SectorKey | "all") => void;
  selectedImportance: ImportanceLevel | "all";
  setSelectedImportance: (v: ImportanceLevel | "all") => void;
  categoryCounts: Record<string, number>;
  resetFilters: () => void;
}

const importanceDots: Record<string, string> = {
  kritik: "bg-red-500",
  yuksek: "bg-amber-500",
  orta: "bg-yellow-400",
  dusuk: "bg-zinc-300",
};

export default function Sidebar({
  selectedCategory,
  setSelectedCategory,
  selectedSector,
  setSelectedSector,
  selectedImportance,
  setSelectedImportance,
  categoryCounts,
}: SidebarProps) {
  const filteredCategories =
    selectedSector === "all"
      ? categories
      : categories.filter((c) => c.sector === selectedSector);

  return (
    <aside className="hidden h-full w-52 shrink-0 overflow-y-auto border-r border-zinc-100 bg-zinc-50/60 lg:block">
      {/* Brand */}
      <div className="px-4 pt-5 pb-5 border-b border-zinc-100">
        <div className="text-[13px] font-semibold text-zinc-800">Anıl Fidan ile</div>
        <div className="mt-0.5 text-[11px] text-zinc-400">
          Skill Kütüphanesine Doğru
        </div>
      </div>

      {/* Sektor */}
      <div className="px-2 pt-4 pb-2">
        <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
          Sektor
        </p>
        <Item
          active={selectedSector === "all"}
          onClick={() => { setSelectedSector("all"); setSelectedCategory("all"); }}
          label="Tum Sektorler"
        />
        {sectors.map((s) => (
          <Item
            key={s.key}
            active={selectedSector === s.key}
            onClick={() => { setSelectedSector(s.key); setSelectedCategory("all"); }}
            label={s.name}
          />
        ))}
      </div>

      {/* Onem */}
      <div className="px-2 pb-2">
        <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
          Onem Derecesi
        </p>
        <div className="flex flex-wrap gap-1 px-1.5">
          <Chip
            active={selectedImportance === "all"}
            onClick={() => setSelectedImportance("all")}
            label="Tumu"
          />
          {importanceLevels.map((i) => (
            <Chip
              key={i.key}
              active={selectedImportance === i.key}
              onClick={() => setSelectedImportance(i.key)}
              label={i.name}
              dot={importanceDots[i.key]}
            />
          ))}
        </div>
      </div>

      <div className="mx-3 my-1 border-t border-zinc-100" />

      {/* Kategoriler */}
      <div className="px-2 pt-2 pb-8">
        <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
          Kategoriler
        </p>
        <Item
          active={selectedCategory === "all"}
          onClick={() => setSelectedCategory("all")}
          label="Tum Kategoriler"
          count={skills.length}
        />
        {filteredCategories.map((c) => (
          <Item
            key={c.key}
            active={selectedCategory === c.key}
            onClick={() => setSelectedCategory(c.key)}
            label={c.name}
            count={categoryCounts[c.key] || 0}
          />
        ))}
      </div>
    </aside>
  );
}

function Item({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`mb-px flex w-full items-center justify-between rounded-md px-2 py-[5px] text-left text-[12px] transition-colors ${
        active
          ? "bg-zinc-900 text-white font-medium"
          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-800"
      }`}
    >
      <span className="truncate">{label}</span>
      {count !== undefined && (
        <span className={`shrink-0 tabular-nums text-[10px] ${active ? "text-zinc-400" : "text-zinc-400"}`}>
          {count}
        </span>
      )}
    </button>
  );
}

function Chip({
  active,
  onClick,
  label,
  dot,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  dot?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 rounded-full px-2 py-[3px] text-[11px] transition-colors ${
        active
          ? "bg-zinc-900 text-white"
          : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700"
      }`}
    >
      {dot && <span className={`inline-block h-[5px] w-[5px] rounded-full ${dot}`} />}
      {label}
    </button>
  );
}
