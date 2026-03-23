"use client";

import { categories, sectors, importanceLevels } from "@/data/categories";
import { CategoryKey, SectorKey, ImportanceLevel } from "@/types";

interface FilterBarProps {
  search: string;
  setSearch: (v: string) => void;
  selectedSector: SectorKey | "all";
  setSelectedSector: (v: SectorKey | "all") => void;
  selectedCategory: CategoryKey | "all";
  setSelectedCategory: (v: CategoryKey | "all") => void;
  selectedImportance: ImportanceLevel | "all";
  setSelectedImportance: (v: ImportanceLevel | "all") => void;
  totalCount: number;
  filteredCount: number;
}

export default function FilterBar({
  search,
  setSearch,
  selectedSector,
  setSelectedSector,
  selectedCategory,
  setSelectedCategory,
  selectedImportance,
  setSelectedImportance,
  totalCount,
  filteredCount,
}: FilterBarProps) {
  const filteredCategories =
    selectedSector === "all"
      ? categories
      : categories.filter((c) => c.sector === selectedSector);

  const hasFilters =
    search || selectedSector !== "all" || selectedCategory !== "all" || selectedImportance !== "all";

  return (
    <div className="sticky top-0 z-20 w-full border-b border-white/5 bg-[#0a0a0b]/90 backdrop-blur-md">
      <div className="mx-auto w-full max-w-6xl px-5 py-3">
        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Skill ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-white/5 bg-white/[0.03] py-2 pl-9 pr-3 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-white/10 focus:bg-white/[0.05]"
          />
        </div>

        {/* Filters Row */}
        <div className="mt-2.5 flex items-center gap-2 overflow-x-auto">
          <select
            value={selectedSector}
            onChange={(e) => {
              setSelectedSector(e.target.value as SectorKey | "all");
              setSelectedCategory("all");
            }}
            className="shrink-0 rounded-md border border-white/5 bg-white/[0.03] px-2.5 py-1.5 text-xs text-zinc-400 outline-none focus:border-white/10"
          >
            <option value="all">Tum Sektorler</option>
            {sectors.map((s) => (
              <option key={s.key} value={s.key}>
                {s.name}
              </option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(e.target.value as CategoryKey | "all")
            }
            className="shrink-0 rounded-md border border-white/5 bg-white/[0.03] px-2.5 py-1.5 text-xs text-zinc-400 outline-none focus:border-white/10"
          >
            <option value="all">Tum Kategoriler</option>
            {filteredCategories.map((c) => (
              <option key={c.key} value={c.key}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={selectedImportance}
            onChange={(e) =>
              setSelectedImportance(e.target.value as ImportanceLevel | "all")
            }
            className="shrink-0 rounded-md border border-white/5 bg-white/[0.03] px-2.5 py-1.5 text-xs text-zinc-400 outline-none focus:border-white/10"
          >
            <option value="all">Tum Onem</option>
            {importanceLevels.map((i) => (
              <option key={i.key} value={i.key}>
                {i.name}
              </option>
            ))}
          </select>

          {hasFilters && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedSector("all");
                setSelectedCategory("all");
                setSelectedImportance("all");
              }}
              className="shrink-0 rounded-md px-2 py-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-300"
            >
              Temizle
            </button>
          )}

          <span className="ml-auto shrink-0 text-[11px] tabular-nums text-zinc-600">
            {filteredCount}/{totalCount}
          </span>
        </div>
      </div>
    </div>
  );
}
