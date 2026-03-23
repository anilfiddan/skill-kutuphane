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

  return (
    <div className="sticky top-0 z-20 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        {/* Search */}
        <div className="relative mb-4">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
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
            placeholder="Skill ara... (orn: api tasarimi, marka, fiyatlandirma)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 py-2.5 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Sektor */}
          <select
            value={selectedSector}
            onChange={(e) => {
              setSelectedSector(e.target.value as SectorKey | "all");
              setSelectedCategory("all");
            }}
            className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-300 outline-none focus:border-zinc-600"
          >
            <option value="all">Tum Sektorler</option>
            {sectors.map((s) => (
              <option key={s.key} value={s.key}>
                {s.name}
              </option>
            ))}
          </select>

          {/* Kategori */}
          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(e.target.value as CategoryKey | "all")
            }
            className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-300 outline-none focus:border-zinc-600"
          >
            <option value="all">Tum Kategoriler</option>
            {filteredCategories.map((c) => (
              <option key={c.key} value={c.key}>
                {c.icon} {c.name}
              </option>
            ))}
          </select>

          {/* Onem */}
          <select
            value={selectedImportance}
            onChange={(e) =>
              setSelectedImportance(
                e.target.value as ImportanceLevel | "all"
              )
            }
            className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-300 outline-none focus:border-zinc-600"
          >
            <option value="all">Tum Onem Dereceleri</option>
            {importanceLevels.map((i) => (
              <option key={i.key} value={i.key}>
                {i.name}
              </option>
            ))}
          </select>

          {/* Sonuc */}
          <span className="ml-auto text-xs text-zinc-500">
            {filteredCount} / {totalCount} skill
          </span>
        </div>
      </div>
    </div>
  );
}
