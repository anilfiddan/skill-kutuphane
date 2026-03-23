"use client";

import { useState, useMemo } from "react";
import { skills } from "@/data/skills";
import { CategoryKey, SectorKey, ImportanceLevel } from "@/types";
import FilterBar from "./FilterBar";
import SkillCard from "./SkillCard";

const PAGE_SIZE = 48;

export default function SkillLibrary() {
  const [search, setSearch] = useState("");
  const [selectedSector, setSelectedSector] = useState<SectorKey | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | "all">("all");
  const [selectedImportance, setSelectedImportance] = useState<ImportanceLevel | "all">("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return skills.filter((skill) => {
      if (selectedSector !== "all" && skill.sector !== selectedSector) return false;
      if (selectedCategory !== "all" && skill.category !== selectedCategory) return false;
      if (selectedImportance !== "all" && skill.importance !== selectedImportance) return false;
      if (q) {
        const haystack = `${skill.name} ${skill.description} ${skill.tags.join(" ")}`.toLowerCase();
        return haystack.includes(q);
      }
      return true;
    });
  }, [search, selectedSector, selectedCategory, selectedImportance]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <>
      <FilterBar
        search={search}
        setSearch={(v) => {
          setSearch(v);
          setVisibleCount(PAGE_SIZE);
        }}
        selectedSector={selectedSector}
        setSelectedSector={(v) => {
          setSelectedSector(v);
          setVisibleCount(PAGE_SIZE);
        }}
        selectedCategory={selectedCategory}
        setSelectedCategory={(v) => {
          setSelectedCategory(v);
          setVisibleCount(PAGE_SIZE);
        }}
        selectedImportance={selectedImportance}
        setSelectedImportance={(v) => {
          setSelectedImportance(v);
          setVisibleCount(PAGE_SIZE);
        }}
        totalCount={skills.length}
        filteredCount={filtered.length}
      />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-zinc-500">Aramanizla eslesen skill bulunamadi.</p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedSector("all");
                setSelectedCategory("all");
                setSelectedImportance("all");
              }}
              className="mt-3 text-sm text-zinc-400 underline hover:text-zinc-300"
            >
              Filtreleri temizle
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>

            {hasMore && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  className="rounded-lg border border-zinc-700 bg-zinc-800 px-6 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-700"
                >
                  Daha Fazla Goster ({filtered.length - visibleCount} kaldi)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
